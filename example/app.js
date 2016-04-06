Vue.config.debug = true

new Vue({
  el: '#app',
  components: {
    qrcode: VueQr
  },
  data () {
    return {
      val: "xxx",
      bgColor: "#FFFFFF",
      fgColor: "#000000",
      size: 200,
    }
  }
})