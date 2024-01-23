import type { VNode } from 'vue'

export type Percent = `${number}%`
export type Pixel = `${number}px`

export interface Indicator {
  top: Percent
  left: Percent
  horizontal: boolean
}

export interface ResizableSlots {
  default?(): Array<VNode<HTMLElement>>
}

export interface ClientRect {
  width: number
  height: number
  top: number
  left: number
}
