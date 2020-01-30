// eslint-disable-next-line unicorn/filename-case
import { merge } from 'lodash'
import { EnhanceApp } from 'vuepress-types'

import VueTranslator from 'vue-translator'
import { getItem } from '@@/utils'

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.use(VueTranslator, {
    defaultLocale: 'en',
    filter: true,
    locale: (typeof window !== 'undefined' && getItem('locale')) || 'zh',
    merge,
  })
}

export default enhanceApp
