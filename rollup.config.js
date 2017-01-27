import buble from 'rollup-plugin-buble'
import vue from 'rollup-plugin-vue2'
import uglify from 'rollup-plugin-uglify'

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

const plugins = [vue(), buble()]

isProd && plugins.push(uglify())

export default {
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
