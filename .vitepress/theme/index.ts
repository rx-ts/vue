import DefaultTheme from 'vitepress/theme'
import { Theme } from 'vitepress'

import VueQrcodeDemo from '../components/VueQrcodeDemo.vue'
import VueQriousDemo from '../components/VueQriousDemo.vue'

const config: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('VueQrcodeDemo', VueQrcodeDemo)
    app.component('VueQriousDemo', VueQriousDemo)
  },
}

export default config
