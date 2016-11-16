<template>
  <div>
    <!-- todo: ':val' is set as workaround for update not being fired on props change.. -->
    <canvas
      :style="{height: size + 'px', width: size + 'px'}"
      :height="size"
      :width="size"
      ref="qr"
      :val="val"
    ></canvas>
  </div>
</template>


<script>
import qr from 'qr.js'

const update = function() {
  this.update();
}

export default {
  props: {
    val: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 100
    },
    // 'L', 'M', 'Q', 'H'
    level: String,
    bgColor: {
      type: String,
      default: '#FFFFFF'
    },
    fgColor: {
      type: String,
      default: '#000000'
    }
  },
  beforeUpdate: update,
  mounted: update,
  methods: {
    update() {
      var size = this.size
      var bgColor = this.bgColor
      var fgColor = this.fgColor
      var $qr = this.$refs.qr

      var qrcode = qr(this.val)

      var ctx = $qr.getContext('2d')
      var cells = qrcode.modules
      var tileW = size / cells.length
      var tileH = size / cells.length
      var scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx)

      $qr.height = $qr.width = size * scale
      ctx.scale(scale, scale)

      cells.forEach( (row, rdx) => {
        row.forEach( (cell, cdx) => {
          ctx.fillStyle = cell ? fgColor : bgColor
          var w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
          var h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
          ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
        })
      })
    }
  }
}

function getBackingStorePixelRatio(ctx) {
  return (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  )
}

</script>
