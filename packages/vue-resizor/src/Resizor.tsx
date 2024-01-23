import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

import { Bem } from './bem.js'
import {
  getClientRect,
  mean,
  percentToRatio,
  pixel,
  preventDefault,
  ratioToPercent,
  setElementHeight,
  setElementWidth,
} from './helpers.js'
import type { ClientRect, Indicator, ResizableSlots } from './types.js'

const bem = new Bem('vue-resizor')

export default defineComponent({
  props: {
    indicators: Array<Indicator>,
    size: Number,
  },
  setup(props, context) {
    const slots = context.slots as Required<ResizableSlots>
    const children = slots.default()

    const innerIndicators = ref<Indicator[]>(props.indicators ?? [])

    const updateIndicators = (indicators: Indicator[], updateProps = false) => {
      if (props.indicators || updateProps) {
        context.emit('update:indicators', indicators)
      }
      innerIndicators.value = indicators
    }

    const containerClassName = bem.element('container').toString()

    // eslint-disable-next-line sonarjs/cognitive-complexity
    onMounted(() => {
      if (children.length <= 1) {
        return
      }

      const container = children[0].el!.parentElement!

      container.classList.add(containerClassName)

      if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative'
      }

      const containerRect = container.getBoundingClientRect()
      const { width: containerWidth, height: containerHeight } =
        getClientRect(container)

      const indicators: Indicator[] = []

      let widthSum: number | undefined
      let heightSum: number | undefined

      for (const [index, current] of Object.entries(children)) {
        const currentElement = current.el!
        const currentRect = currentElement.getBoundingClientRect()

        const nextVNode = children.at(+index + 1)

        if (!nextVNode) {
          break
        }

        const nextElement = nextVNode.el!
        const nextRect = nextElement.getBoundingClientRect()

        const horizontal = currentRect.top === nextRect.top
        const top =
          (horizontal
            ? currentRect.top
            : mean([currentRect.bottom, nextRect.top])) - containerRect.top
        const left =
          (horizontal
            ? mean([currentRect.right, nextRect.left])
            : currentRect.left) - containerRect.left

        const indicator = props.indicators?.[+index]

        if (indicator) {
          const offset = horizontal
            ? containerWidth * percentToRatio(indicator.left) - left
            : containerHeight * percentToRatio(indicator.top) - top
          const currentRect = getClientRect(currentElement)
          const nextRect = getClientRect(nextElement)
          if (horizontal) {
            widthSum = setElementWidth(
              nextElement,
              nextRect.width - offset,
              setElementWidth(
                currentElement,
                currentRect.width + offset,
                widthSum,
              ),
            )
          } else {
            heightSum = setElementHeight(
              nextElement,
              nextRect.height - offset,
              setElementHeight(
                currentElement,
                currentRect.height + offset,
                heightSum,
              ),
            )
          }
        } else {
          indicators.push({
            top: ratioToPercent(top / containerHeight),
            left: ratioToPercent(left / containerWidth),
            horizontal,
          })
        }
      }

      updateIndicators(indicators)
    })

    onUnmounted(() => {
      if (children.length <= 1) {
        return
      }

      children[0].el!.parentElement!.classList.remove(containerClassName)
    })

    const draggingClassName = bem.modifier('dragging').toString()

    let previousRect: ClientRect
    let currentRect: ClientRect
    let indicatorRect: ClientRect

    // eslint-disable-next-line sonarjs/cognitive-complexity
    return () => {
      const indicators = props.indicators || innerIndicators.value

      return children.flatMap((node, index) => {
        const indicator = indicators.at(index - 1)

        if (!indicator || !index) {
          return node
        }

        const { top, left, horizontal } = indicator
        const previousElement = children.at(index - 1)!.el!
        const currentElement = node.el!

        return [
          <div
            class={[
              bem.modifier('indicator'),
              { [bem.modifier('horizontal').toString()]: horizontal },
            ]}
            style={{
              top,
              left,
              [horizontal ? 'height' : 'width']: '100%',
              [`border-${horizontal ? 'left' : 'top'}-width`]: pixel(
                props.size ?? 2,
              ),
            }}
            draggable
            onDragstart={event => {
              document.addEventListener('dragover', preventDefault)
              previousRect = getClientRect(previousElement)
              currentRect = getClientRect(currentElement)
              indicatorRect = getClientRect(event.currentTarget as HTMLElement)
            }}
            onDrag={event => {
              const offset = horizontal ? event.offsetX : event.offsetY

              const indicatorElement = event.currentTarget as HTMLElement
              indicatorElement.classList.add(draggingClassName)

              const { width, height } = getClientRect(
                indicatorElement.parentElement!,
              )

              if (horizontal) {
                const previousWidth = previousRect.width + offset
                const currentWidth = currentRect.width - offset
                if (
                  previousWidth > 0 &&
                  previousWidth < width &&
                  currentWidth > 0 &&
                  currentWidth < width
                ) {
                  setElementWidth(previousElement, previousWidth)
                  setElementWidth(currentElement, currentWidth)
                }
              } else {
                const previousHeight = previousRect.height + offset
                const currentHeight = currentRect.height - offset
                if (
                  previousHeight > 0 &&
                  previousHeight < height &&
                  currentHeight > 0 &&
                  currentHeight < height
                ) {
                  setElementHeight(previousElement, previousHeight)
                  setElementHeight(currentElement, currentHeight)
                }
              }
            }}
            onDragend={event => {
              document.removeEventListener('dragover', preventDefault)
              const offset = horizontal ? event.offsetX : event.offsetY
              const indicatorElement = event.currentTarget as HTMLElement
              indicatorElement.classList.remove(draggingClassName)
              const { width, height } = getClientRect(
                indicatorElement.parentElement!,
              )
              const ratio = horizontal
                ? (indicatorRect.left + offset) / width
                : (indicatorRect.top + offset) / height
              if (ratio > 0 && ratio < 1) {
                updateIndicators(
                  indicators.toSpliced(index - 1, 1, {
                    ...indicator,
                    [horizontal ? 'left' : 'top']: ratioToPercent(ratio),
                  }),
                  true,
                )
              } else if (horizontal) {
                setElementWidth(previousElement, previousRect.width)
                setElementWidth(currentElement, currentRect.width)
              } else {
                setElementHeight(previousElement, previousRect.height)
                setElementHeight(currentElement, currentRect.height)
              }
            }}
          />,
          node,
        ]
      })
    }
  },
})
