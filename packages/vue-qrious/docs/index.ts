import Vue from 'vue'
import Qrious, { LEVELS } from 'vue-qrious'

// eslint-disable-next-line no-new
new Vue({
  // tslint:disable-line: no-unused-expression
  el: '#app',
  components: {
    Qrious,
  },
  data() {
    return {
      LEVELS,
      background: '#ffffff',
      backgroundAlpha: 1,
      foreground: '#000000',
      foregroundAlpha: 1,
      level: 'L',
      mime: 'image/png',
      padding: 0,
      size: 100,
      value: 'http://www.1stg.me',
    }
  },
})
