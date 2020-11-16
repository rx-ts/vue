import QRCode, {
  QRCodeErrorCorrectionLevel,
  QRCodeSegment as _QRCodeSegment,
  QRCodeToDataURLOptions,
} from 'qrcode'
import * as Vue from 'vue'

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

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type MaskPattern = typeof MASK_PATTERNS[number]

export const MODES = ['alphanumeric', 'numeric', 'kanji', 'byte'] as const

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type QRCodeMode = _QRCodeSegment['mode']

export interface QRCodeSegment {
  data: string
  mode?: QRCodeMode | null
}

export type QRCodeValue = string | QRCodeSegment[]

export const TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const

export type QRCodeProps = Omit<QRCodeToDataURLOptions, 'renderOptions'> & {
  quality?: number
  value: QRCodeValue
}

const MAX_QR_VERSION = 40

export default {
  props: {
    version: {
      type: Number,
      validator: (version: number) =>
        version === Number.parseInt(String(version), 10) &&
        version >= 1 &&
        version <= MAX_QR_VERSION,
    },
    errorCorrectionLevel: {
      type: String,
      validator: (level: QRCodeErrorCorrectionLevel) => LEVELS.includes(level),
    },
    maskPattern: {
      type: Number,
      validator: (maskPattern: MaskPattern) =>
        MASK_PATTERNS.includes(maskPattern),
    },
    toSJISFunc: Function,
    margin: Number,
    scale: Number,
    width: Number,
    color: {
      type: Object,
      validator: (color: QRCodeProps['color']) =>
        (['dark', 'light'] as const).every(c =>
          ['string', 'undefined'].includes(typeof color![c]),
        ),
    },
    type: {
      type: String,
      validator: (type: QRCodeProps['type']) => TYPES.includes(type!),
    },
    quality: {
      type: Number,
      validator: (quality: number) =>
        quality === Number.parseFloat(String(quality)) &&
        quality >= 0 &&
        quality <= 1,
    },
    value: {
      type: [String, Array],
      required: true,
      validator(value: string | QRCodeSegment[]) {
        if (typeof value === 'string') {
          return true
        }
        return value.every(
          ({ data, mode }) =>
            typeof data === 'string' && (mode == null || MODES.includes(mode)),
        )
      },
    },
  },
  data() {
    return {
      dataUrl: '',
    }
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler(this: { $props: QRCodeProps; dataUrl: string; value: string }) {
        const { quality, ...props } = this.$props
        return QRCode.toDataURL(
          this.value,
          Object.assign(
            props,
            quality == null || {
              renderOptions: {
                quality,
              },
            },
          ),
        ).then(dataUrl => (this.dataUrl = dataUrl))
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
