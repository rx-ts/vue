/*!
 * vue-qrious a vue component of generating qrcode with `qrious`
 * Version 0.1.1
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-qrious
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('qrious')) :
	typeof define === 'function' && define.amd ? define('vue-qrious', ['qrious'], factory) :
	(global.VueQrious = factory(global.QRious));
}(this, (function (QRious) { 'use strict';

QRious = 'default' in QRious ? QRious['default'] : QRious;

var LEVELS = ['L', 'M', 'Q', 'H'];

var index = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('img',{attrs:{"src":_vm.src}})},staticRenderFns: [],
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
      validator: function (level) { return LEVELS.indexOf(level) + 1; }
    },
    mime: String,
    padding: Number,
    size: Number
  },
  data: function data() {
    var qr = new QRious(this.$options.propsData);
    return {
      qr: qr,
      src: this.getSrc(qr)
    }
  },
  created: function created() {
    var this$1 = this;

    this.$options._propKeys.forEach(function (key) { return this$1.$watch(key, function () {
      this$1.qr[key] = this$1[key];
      this$1.src = this$1.getSrc();
    }); });
  },
  methods: {
    getSrc: function getSrc(qr) {
      return (this.qr || qr).toDataURL(this.mime)
    }
  }
};

return index;

})));
