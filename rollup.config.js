import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const ENV = process.env.ENV || 'client'
const NODE_ENV = process.env.NODE_ENV || 'development'

const isServer = ENV === 'server'
const isProd = NODE_ENV === 'production'

const config = {
  banner: `/*!
 * ${pkg.name} ${pkg.description}
 * Version ${pkg.version}
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-qrious
 */`,
  input: 'lib/index',
  output: {
    file: `dist/vue-qrious${isServer ? '' : '.browser'}${isProd ? '.min' : ''}.js`,
    format: 'umd'
  },
  plugins: [babel()],
  external: ['qrious', 'node-qrious'],
  globals: {
    qrious: 'QRious',
    'node-qrious': 'QRious'
  },
  amd: {
    id: 'vue-qrious'
  },
  name: 'VueQrious'
}

isServer &&
  (config.paths = {
    qrious: 'node-qrious'
  })

isProd &&
  config.plugins.push(
    uglify({
      output: {
        comments: true
      }
    })
  )

export default config
