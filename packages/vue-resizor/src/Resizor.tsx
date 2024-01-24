import type { ComponentPublicInstance, PropType } from 'vue'
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

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
import type { ClientRect, Indicator, ResizorSlots } from './types.js'

const bem = new Bem('vue-resizor')

const containerClassName = bem.element('container').toString()
const draggingClassName = bem.modifier('dragging').toString()
const indicatorClassName = bem.modifier('indicator').toString()
const horizontalClassName = bem.modifier('horizontal').toString()

export default defineComponent({
  props: {
    parent: Object as PropType<HTMLElement>,
    indicators: Array<Indicator>,
    size: {
      type: Number,
      default: 2,
    },
  },
  setup(props, context) {
    const slots = context.slots as Required<ResizorSlots>
    const children = slots.default()

    const innerIndicators = ref<Indicator[]>(props.indicators ?? [])

    const updateIndicators = (indicators: Indicator[], updateProps = false) => {
      if (props.indicators || updateProps) {
        context.emit('update:indicators', indicators)
      }
      innerIndicators.value = indicators
    }

    let container: HTMLElement
    let elements: HTMLElement[]

    // eslint-disable-next-line sonarjs/cognitive-complexity
    onMounted(async () => {
      if (children.length <= 1) {
        return
      }

      const hackingContainer =
        children[0].el?.parentElement ??
        // prettier-ignore
        // @ts-expect-error
        // type-coverage:ignore-next-line -- we can't control
        ((getCurrentInstance()?.parent.ctx as ComponentPublicInstance | undefined)?.$el as
          | HTMLElement
          | undefined)

      if (hackingContainer) {
        container = hackingContainer
      } else {
        await nextTick()
        if (!props.parent) {
          throw new Error(
            'No `parent` provided nor hacking container can be auto injected, please provide `parent` correctly',
          )
        }
        container = props.parent
      }

      // eslint-disable-next-line unicorn/prefer-spread
      elements = (Array.from(container.children) as HTMLElement[]).filter(
        el => !el.classList.contains(indicatorClassName),
      )

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

      for (const [index, curr] of Object.entries(children)) {
        const currEl = curr.el ?? (elements.at(+index) as HTMLElement)
        const currentRect = currEl.getBoundingClientRect()

        const nextIndex = +index + 1

        const nextVNode = children.at(nextIndex)

        if (!nextVNode) {
          break
        }

        const nextEl = nextVNode.el ?? (elements.at(+index + 1) as HTMLElement)
        const nextRect = nextEl.getBoundingClientRect()

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
          const currentRect = getClientRect(currEl)
          const nextRect = getClientRect(nextEl)
          if (horizontal) {
            widthSum = setElementWidth(
              nextEl,
              nextRect.width - offset,
              setElementWidth(currEl, currentRect.width + offset, widthSum),
            )
          } else {
            heightSum = setElementHeight(
              nextEl,
              nextRect.height - offset,
              setElementHeight(currEl, currentRect.height + offset, heightSum),
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

      container.classList.remove(containerClassName)
    })

    let prevRect: ClientRect
    let currRect: ClientRect
    let indicatorRect: ClientRect

    // eslint-disable-next-line sonarjs/cognitive-complexity
    return () => {
      const indicators = props.indicators || innerIndicators.value

      return children.flatMap((node, index) => {
        const indicator = index && indicators.at(index - 1)

        if (!indicator) {
          return node
        }

        const { top, left, horizontal } = indicator

        const prevEl =
          children.at(index - 1)!.el ?? (elements.at(index - 1) as HTMLElement)
        const currEl = node.el ?? (elements.at(index) as HTMLElement)

        return [
          <div
            key={`indicator-${index}`}
            class={[indicatorClassName, { [horizontalClassName]: horizontal }]}
            style={{
              top,
              left,
              [horizontal ? 'height' : 'width']: '100%',
              [`border-${horizontal ? 'left' : 'top'}-width`]: pixel(
                props.size,
              ),
            }}
            draggable
            onDragstart={event => {
              document.addEventListener('dragover', preventDefault)
              prevRect = getClientRect(prevEl)
              currRect = getClientRect(currEl)
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
                const prevWidth = prevRect.width + offset
                const currWidth = currRect.width - offset
                if (
                  prevWidth > 0 &&
                  prevWidth < width &&
                  currWidth > 0 &&
                  currWidth < width
                ) {
                  setElementWidth(prevEl, prevWidth)
                  setElementWidth(currEl, currWidth)
                }
              } else {
                const prevHeight = prevRect.height + offset
                const currHeight = currRect.height - offset
                if (
                  prevHeight > 0 &&
                  prevHeight < height &&
                  currHeight > 0 &&
                  currHeight < height
                ) {
                  setElementHeight(prevEl, prevHeight)
                  setElementHeight(currEl, currHeight)
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
                setElementWidth(prevEl, prevRect.width)
                setElementWidth(currEl, currRect.width)
              } else {
                setElementHeight(prevEl, prevRect.height)
                setElementHeight(currEl, currRect.height)
              }
            }}
          />,
          node,
        ]
      })
    }
  },
})
