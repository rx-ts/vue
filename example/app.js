Vue.config.debug = true

new Vue({
  el: '#app',
  components: {
    qrcode: VueQr
  },
  data () {
    return {
      val: "http://github.com",
      bgColor: "#FFFFFF",
      fgColor: "#000000",
      size: 200,
    }
  }
})