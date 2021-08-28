import type {
  QRCodeErrorCorrectionLevel,
  QRCodeSegment,
  QRCodeToDataURLOptions,
} from 'qrcode'
import QRCode from 'qrcode'
import type { PropType } from 'vue-demi'
import { defineComponent, h, ref, watch } from 'vue-demi'

export const LEVELS = [
  'low',
  'medium',
  'quartile',
  'high',
  'L',
  'M',
  'Q',
  'H',
] as const

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const MASK_PATTERNS = [0, 1, 2, 3, 4, 5, 6, 7] as const

export type MaskPattern = typeof MASK_PATTERNS[number]

export const MODES = ['alphanumeric', 'numeric', 'kanji', 'byte'] as const

export { QRCodeSegment }

export type QRCodeValue = QRCodeSegment[] | string

export const TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const

export type QRCodeProps = Omit<QRCodeToDataURLOptions, 'renderOptions'> &
  QRCodeToDataURLOptions['rendererOpts'] & {
    value: QRCodeSegment[] | string
  }

const MAX_QR_VERSION = 40

export default defineComponent({
  props: {
    version: {
      type: Number,
      validator: (version: number) =>
        version === Number.parseInt(String(version), 10) &&
        version >= 1 &&
        version <= MAX_QR_VERSION,
    },
    errorCorrectionLevel: {
      type: String as PropType<QRCodeErrorCorrectionLevel>,
      validator: (level: QRCodeErrorCorrectionLevel) => LEVELS.includes(level),
    },
    maskPattern: {
      type: Number,
      validator: (maskPattern: MaskPattern) =>
        MASK_PATTERNS.includes(maskPattern),
    },
    toSJISFunc: Function as PropType<QRCodeProps['toSJISFunc']>,
    margin: Number,
    scale: Number,
    width: Number,
    color: {
      type: Object,
      validator: (color: QRCodeProps['color']) =>
        (['dark', 'light'] as const).every(c =>
          ['string', 'undefined'].includes(typeof color![c]),
        ),
      required: true,
    },
    type: {
      type: String as PropType<QRCodeProps['type']>,
      validator: (type: QRCodeProps['type']) => TYPES.includes(type!),
      required: true,
    },
    quality: {
      type: Number,
      validator: (quality: number) =>
        quality === Number.parseFloat(String(quality)) &&
        quality >= 0 &&
        quality <= 1,
      required: true,
    },
    value: {
      type: [String, Array] as PropType<QRCodeSegment[] | string>,
      required: true,
      validator(value: QRCodeSegment[] | string) {
        if (typeof value === 'string') {
          return true
        }
        return value.every(
          ({ data, mode }) => typeof data === 'string' && MODES.includes(mode),
        )
      },
    },
  },
  setup(props: QRCodeProps, { attrs, emit }) {
    const dataUrlRef = ref<string>()

    const toDataURL = () => {
      // no idea why, but vuepress emits error saying `props` is undefined
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const { quality, value, ...rest } = props || {}
      QRCode.toDataURL(
        value,
        Object.assign(
          rest,
          quality == null || {
            renderOptions: {
              quality,
            },
          },
        ),
      )
        .then(dataUrl => {
          dataUrlRef.value = dataUrl
        })
        .catch((err: unknown) => emit('error', err))
    }

    watch(props, toDataURL, { immediate: true })

    return () =>
      h('img', {
        ...attrs,
        src: dataUrlRef.value,
      })
  },
})
