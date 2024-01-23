import type { ClientRect, Percent, Pixel } from './types.js'

export const percent = (value: number | string) => {
  value = String(value)
  return (value.endsWith('%') ? value : `${value}%`) as Percent
}

export const percentToRatio = (value: Percent) => +value.slice(0, -1) / 100

export const ratioToPercent = (value: number): Percent => percent(value * 100)

export const pixel = (value: number | string) => {
  value = String(value)
  return (value.endsWith('px') ? value : `${value}px`) as Pixel
}

const parsePixel = (value: string) => +value.replace(/\s*px\s*$/i, '')

export const getClientRect = (element: Element): ClientRect => {
  const { width, height, top, left } = getComputedStyle(element)
  return {
    width: parsePixel(width),
    height: parsePixel(height),
    top: parsePixel(top),
    left: parsePixel(left),
  }
}

export const setElementWidth = (
  element: HTMLElement,
  width: number,
  sum = 0,
) => {
  const containerWidth = getClientRect(element.parentElement!).width
  const previousRatio = sum / containerWidth
  const currentRatio = width / containerWidth
  const percentWidth = ratioToPercent(
    previousRatio + currentRatio > 1 ? 1 - previousRatio : currentRatio,
  )
  Object.assign(element.style, {
    width: percentWidth,
    flexBasis: percentWidth,
    maxWidth: percentWidth,
  })
  return sum + width
}

export const setElementHeight = (
  element: HTMLElement,
  height: number,
  sum = 0,
) => {
  const containerHeight = getClientRect(element.parentElement!).height
  const previousRatio = sum / containerHeight
  const currentRatio = height / containerHeight
  element.style.height = ratioToPercent(
    previousRatio + currentRatio > 1 ? 1 - previousRatio : currentRatio,
  )
  return sum + height
}

export const preventDefault = (event: Event) => {
  event.preventDefault()
}

export const mean = (arr: number[]) =>
  arr.reduce((acc, num) => acc + num, 0) / arr.length
