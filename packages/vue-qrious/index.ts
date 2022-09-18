import QRious from 'qrious'
import { type PropType, defineComponent, h, ref, watch } from 'vue'

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
  setup(props, { attrs, emit }) {
    const qrious = new QRious(props)

    const toDataURL = () => {
      try {
        const dataUrl = qrious.toDataURL(props.mime)
        emit('change', dataUrl)
        return dataUrl
      } catch (err) {
        emit('error', err)
      }
    }

    const dataUrlRef = ref<string | undefined>(toDataURL())

    watch(props, () => {
      qrious.set(props)
      dataUrlRef.value = toDataURL()
    })

    return () =>
      h('img', {
        ...attrs,
        src: dataUrlRef.value,
      })
  },
})
