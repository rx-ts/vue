import QRious from 'qrious'

const LEVELS = ['L', 'M', 'Q', 'H']

const numberString = {
  type: [Number, String],
  validator: val => !isNaN(+val)
}

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    background: String,
    backgroundAlpha: numberString,
    foreground: String,
    foregroundAlpha: numberString,
    level: {
      type: String,
      validator: level => LEVELS.indexOf(level) + 1
    },
    mime: String,
    padding: numberString,
    size: numberString
  },
  data() {
    const qr = new QRious(this.$props)
    return {
      qr,
      src: qr.toDataURL(this.mime)
    }
  },
  watch: {
    $props: {
      deep: true,
      handler() {
        this.qr.set(this.$props)
        this.src = this.qr.toDataURL(this.mime)
      }
    },
  },
  render() {
    return <img src={this.src}/>
  }
}
