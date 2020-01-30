const fs = require('fs')
const { resolve } = require('path')

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
    const { alias } = config.resolve
    alias.set('@@', resolve()).set('lodash$', 'lodash-es')
    const pkgs = resolve('packages')
    fs.readdirSync(pkgs).forEach(pkgName => {
      const pkg = resolve(pkgs, pkgName)
      const { name } = require(resolve(pkg, 'package.json'))
      alias.set(name, resolve(pkg, 'src'))
    })
    config.plugin('injections').tap(([options]) => [
      Object.assign(options, {
        'process.env.VUE_ENV': JSON.stringify(isServer ? 'server' : 'client'),
        global: isServer ? 'global' : 'window',
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
