import Qrious from 'vue-qrious'
import Vue from 'vue/dist/vue.esm'

// eslint-disable-next-line no-new
new Vue({
  // tslint:disable-line: no-unused-expression
  el: '#app',
  data() {
    return {
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
  components: {
    Qrious,
  },
})
