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
  },
  render() {
    return <img src={this.src}/>
  }
}
