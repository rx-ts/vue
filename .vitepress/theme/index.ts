import DefaultTheme from 'vitepress/theme'
import { Theme } from 'vitepress'

import * as components from '../components'

const config: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export default config
