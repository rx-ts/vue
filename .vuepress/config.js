const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const description = process.env.npm_package_description

/**
 * @return {import('vuepress-types').SiteConfig}
 */
module.exports = {
  title: [process.env.npm_package_name, description].join(' - '),
  description,
  dest: 'dist',
  /**
   * @param {import('webpack-chain')} config
   */
  chainWebpack(config, isServer) {
    config.resolve.alias
      .set('lodash$', 'lodash-es')
      .end()
      .plugin('tsconfig-paths')
      .use(new TsconfigPathsPlugin())
    config.plugin('injections').tap(([options]) => [
      Object.assign(options, {
        'process.env.VUE_ENV': JSON.stringify(isServer ? 'server' : 'client'),
      }),
    ])
  },
  evergreen: true,
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          compilerOptions: {
            noEmit: false,
          },
        },
      },
    ],
  ],
}
