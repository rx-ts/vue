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
      const qr = new QRious(this.$options.propsData)
      return {
        qr,
        src: this.getSrc(qr)
      }
    },
    created() {
      this.$options._propKeys.forEach(key => this.$watch(key, () => {
        this.qr[key] = this[key]
        this.src = this.getSrc()
      }))
    },
    methods: {
      getSrc(qr) {
        return (this.qr || qr).toDataURL(this.mime)
      }
    }
  }
</script>
