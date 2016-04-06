import Qrcode from './Qrcode.vue'

Vue.config.debug = true

new Vue({
	el: '#app',
	components: {
    Qrcode
  },
  data () {
    return {
   		val: "https://github.com",
      bgColor: "#FFFFFF",
      fgColor: "#000000",
      size: 200
    }
  },
  filters: {
    toNumber: {
      read (val) {
        return Number(val)
      },
      write (val) {
        return Number(val)
      }  
    }
  }
})

