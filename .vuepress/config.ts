import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { SiteConfig } from 'vuepress-types'
import registerComponentsPlugin from '@vuepress/plugin-register-components'
import path from 'path'

const description = process.env.npm_package_description

const COMPONENTS = path.resolve(__dirname, 'components')

const config: SiteConfig = {
  title: [process.env.npm_package_name, description].join(' - '),
  description,
  dest: 'dist',
  chainWebpack(config, isServer) {
    config.resolve.alias
      .set('lodash$', 'lodash-es')
      .end()
      .plugin('tsconfig-paths')
      .use(new TsconfigPathsPlugin())
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
      registerComponentsPlugin,
      {
        componentsDir: path.resolve(__dirname, './components')
      },
    ],
  ],
}

export default config
