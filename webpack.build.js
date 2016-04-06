var config = require('./webpack.config.js')

config.entry = {
  'vue-qrcode': './src/index.js',
}

config.output = {

  filename: './dist/[name].js',
  library: 'VueQr',
  libraryTarget: 'umd'
}


module.exports = config
