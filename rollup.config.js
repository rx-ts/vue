import buble from 'rollup-plugin-buble'
import vue from 'rollup-plugin-vue2'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

const plugins = [vue(), buble()]

isProd && plugins.push(uglify({
  output: {
    comments: true
  }
}))

export default {
  banner: `/*!
 * ${pkg.name} ${pkg.description}
 * Version ${pkg.version}
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-qrious
 */`,
  entry: 'lib/index.vue',
  dest: `dist/vue-qrious${isProd ? '.min' : ''}.js`,
  plugins,
  format: 'umd',
  external: ['qrious'],
  globals: {
    qrious: 'QRious'
  },
  moduleId: 'vue-qrious',
  moduleName: 'VueQrious'
}
