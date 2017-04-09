/*!
 * vue-qrious a vue component of generating qrcode with `qrious`
 * Version 0.2.0
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
    var qr = new QRious(this.$options.propsData);
    return {
      qr: qr,
      src: this.getSrc(qr)
    };
  },
  created: function created() {
    var _this = this;

    this.$options._propKeys.forEach(function (key) {
      return _this.$watch(key, function () {
        _this.qr[key] = _this[key];
        _this.src = _this.getSrc();
      });
    });
  },

  methods: {
    getSrc: function getSrc(qr) {
      return (this.qr || qr).toDataURL(this.mime);
    }
  },
  render: function render() {
    var h = this.$createElement;

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
