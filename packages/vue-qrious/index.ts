import QRious, { QRiousOptions } from 'qrious'
import Vue from 'vue'

export const LEVELS = ['L', 'M', 'Q', 'H'] as const

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Level = typeof LEVELS[number]

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    background: String,
    backgroundAlpha: Number,
    foreground: String,
    foregroundAlpha: Number,
    level: {
      type: String,
      validator: (level: Level) => LEVELS.includes(level),
    },
    mime: String,
    padding: Number,
    size: Number,
  },
  data(this: { $props: QRiousOptions; mime: string }) {
    const qrious = new QRious(this.$props)
    return {
      qrious,
      dataUrl: qrious.toDataURL(this.mime),
    }
  },
  watch: {
    $props: {
      deep: true,
      handler(this: {
        $props: QRiousOptions
        mime: string
        qrious: QRious
        dataUrl: string
      }) {
        this.qrious.set(this.$props)
        this.dataUrl = this.qrious.toDataURL(this.mime)
      },
    },
  },
  // ! hack, compatible with Vue2 and Vue3 at the same time
  render(
    this: Vue & {
      dataUrl: string
    },
    h,
  ) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, import/namespace
    const vueH = Vue.h
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    h = vueH || h
    const imgProps = {
      ...this.$attrs,
      src: this.dataUrl,
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return h(
      'img',
      // @ts-expect-error
      vueH
        ? imgProps
        : {
            domProps: imgProps,
          },
    )
  },
} as Vue.ComponentOptions<Vue>
