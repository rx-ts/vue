<template>
  <img :src="src">
</template>
<script>
  import QRious from 'qrious'

  const LEVELS = ['L', 'M', 'Q', 'H']

  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      background: String,
      backgroundAlpha: Number,
      foreground: String,
      foregroundAlpha: String,
      level: {
        type: String,
        validator: level => LEVELS.indexOf(level) + 1
      },
      mime: String,
      padding: Number,
      size: Number
    },
    data() {
      return this.init()
    },
    mounted() {
      this.$options._propKeys.forEach(key => this.$watch(key, this.update))
    },
    methods: {
      init() {
        const qr = new QRious(this.$options.propsData)
        return {
          qr,
          src: qr.toDataURL(this.mime)
        }
      },
      update() {
        Object.assign(this, this.init())
      }
    }
  }
</script>
