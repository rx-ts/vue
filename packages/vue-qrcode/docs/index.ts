import Vue from 'vue'
import Qrcode, {
  LEVELS,
  MASK_PATTERNS,
  MODES,
  QRCodeSegment,
  QRCodeValue,
  TYPES,
} from 'vue-qrcode'

const DEFAULT_TEXT = 'http://www.1stg.me'

// eslint-disable-next-line no-new
new Vue({
  // tslint:disable-line: no-unused-expression
  el: '#app',
  data() {
    return {
      LEVELS,
      MASK_PATTERNS,
      MODES,
      TYPES,
      version: undefined,
      errorCorrectionLevel: 'M',
      maskPattern: undefined,
      margin: 4,
      scale: 4,
      width: undefined,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      type: 'image/png',
      quality: 0.92,
      value: DEFAULT_TEXT as QRCodeValue,
      manualMode: false,
    }
  },
  watch: {
    manualMode() {
      this.value = this.manualMode
        ? [
            {
              data: DEFAULT_TEXT,
            },
          ]
        : DEFAULT_TEXT
    },
  },
  methods: {
    addValue() {
      ;(this.value as QRCodeSegment[]).push({
        data: DEFAULT_TEXT,
      })
    },
    removeValue(index: number) {
      ;(this.value as QRCodeSegment[]).splice(index, 1)
    },
  },
  components: {
    Qrcode,
  },
})
