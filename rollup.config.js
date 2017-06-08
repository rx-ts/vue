import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const ENV = process.env.ENV || 'client'
const NODE_ENV = process.env.NODE_ENV || 'development'

const isServer = ENV === 'server'
const isProd = NODE_ENV === 'production'

const plugins = [babel()]

isServer && plugins.push(replace({
  qrious: 'node-qrious'
}))

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
  dest: `dist/vue-qrious${isServer ? '' : '.browser'}${isProd ? '.min' : ''}.js`,
  plugins,
  format: 'umd',
  external: ['qrious', 'node-qrious'],
  globals: {
    qrious: 'QRious',
    'node-qrious': 'QRious'
  },
  amd: {
    id: 'vue-qrious'
  },
  moduleName: 'VueQrious'
}
