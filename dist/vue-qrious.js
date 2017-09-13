/*!
 * vue-qrious a vue component of generating qrcode with `qrious`
 * Version 1.1.1
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-qrious
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('node-qrious')) :
	typeof define === 'function' && define.amd ? define('vue-qrious', ['node-qrious'], factory) :
	(global.VueQrious = factory(global.QRious));
}(this, (function (QRious) { 'use strict';

QRious = QRious && QRious.hasOwnProperty('default') ? QRious['default'] : QRious;

var LEVELS = ['L', 'M', 'Q', 'H'];

var numberString = {
  type: [Number, String],
  validator: function validator(val) {
    return !isNaN(+val);
  }
};

var index = {
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
      validator: function validator(level) {
        return LEVELS.indexOf(level) + 1;
      }
    },
    mime: String,
    padding: numberString,
    size: numberString
  },
  data: function data() {
    var qr = new QRious(this.$props);
    return {
      qr: qr,
      src: qr.toDataURL(this.mime)
    };
  },

  watch: {
    $props: {
      deep: true,
      handler: function handler() {
        this.qr.set(this.$props);
        this.src = this.qr.toDataURL(this.mime);
      }
    }
  },
  render: function render() {
    var h = arguments[0];

    return h(
      'img',
      {
        attrs: { src: this.src }
      },
      []
    );
  }
};

return index;

})));
