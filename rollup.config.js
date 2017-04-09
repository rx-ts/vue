import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

const plugins = [babel()]

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
  entry: 'lib/index',
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
