import type {
  QRCodeErrorCorrectionLevel,
  QRCodeMaskPattern,
  QRCodeSegment,
  QRCodeToDataURLOptions,
  QRCodeToDataURLOptionsJpegWebp,
  QRCodeToSJISFunc,
} from 'qrcode'
import QRCode from 'qrcode'
import { type PropType, defineComponent, h, ref, watch } from 'vue'

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

export const MODES = ['alphanumeric', 'numeric', 'kanji', 'byte'] as const

export { QRCodeSegment } from 'qrcode'

export type QRCodeValue = QRCodeSegment[] | string

export const TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const

export type QRCodeProps = Omit<QRCodeToDataURLOptions, 'renderOptions'> &
  QRCodeToDataURLOptionsJpegWebp['rendererOpts'] & {
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
      type: Number as PropType<QRCodeMaskPattern>,
      validator: (maskPattern: QRCodeMaskPattern) =>
        MASK_PATTERNS.includes(maskPattern),
    },
    toSJISFunc: Function as PropType<QRCodeToSJISFunc>,
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
      required: false,
    },
    value: {
      type: [String, Array] as PropType<QRCodeSegment[] | string>,
      required: true,
      validator(value: QRCodeSegment[] | string) {
        if (typeof value === 'string') {
          return true
        }
        return value.every(
          it =>
            typeof it.data === 'string' &&
            'mode' in it &&
            MODES.includes(it.mode),
        )
      },
    },
  },
  setup(props, { attrs, emit }) {
    const dataUrlRef = ref<string>()

    const toDataURL = () => {
      const { quality, value, ...rest } = props
      QRCode.toDataURL(
        value,
        Object.assign(rest, quality == null || { renderOptions: { quality } }),
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
