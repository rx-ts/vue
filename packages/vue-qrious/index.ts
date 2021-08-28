import QRious from 'qrious'
import type { PropType } from 'vue-demi'
import { defineComponent, h, ref, watch } from 'vue-demi'

export const LEVELS = ['L', 'M', 'Q', 'H'] as const

export type Level = typeof LEVELS[number]

export default defineComponent({
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
      type: String as PropType<Level>,
      validator: (level: Level) => LEVELS.includes(level),
    },
    mime: String,
    padding: Number,
    size: Number,
  },
  setup(props, { attrs }) {
    const qrious = new QRious(props)

    const dataUrlRef = ref<string>(qrious.toDataURL(props.mime))

    watch(props, props => {
      qrious.set(props)
      dataUrlRef.value = qrious.toDataURL(props.mime)
    })

    return h('img', {
      ...attrs,
      src: dataUrlRef.value,
    })
  },
})
