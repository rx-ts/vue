const config = {
  plugins: {
    autoprefixer: {},
  },
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.cssnano = {}
}

module.exports = config
