/* global Vue, VueQrious */
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: function() {
    return {
      background: '#ffffff',
      backgroundAlpha: 1,
      foreground: '#000000',
      foregroundAlpha: 1,
      level: 'L',
      mime: 'image/png',
      padding: 0,
      size: 100,
      value: 'http://1stg.me'
    }
  },
  components: {
    Qrious: VueQrious
  }
})
