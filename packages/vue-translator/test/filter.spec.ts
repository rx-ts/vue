import { createLocalVue } from '@vue/test-utils'
import _Vue from 'vue'

import VueTranslator from '../src'

_Vue.config.productionTip = false

const translations = {}

it('should define filter translate', () => {
  const Vue = createLocalVue()

  Vue.use(VueTranslator, {
    locale: 'zh',
    filter: true,
    translations,
  })

  expect(Vue.filter('translate')).toBe(Vue.translator)
})

it('should work with custom filter name', () => {
  const Vue = createLocalVue()

  Vue.use(VueTranslator, {
    locale: 'zh',
    filter: 't',
    translations,
  })

  expect(Vue.filter('t')).toBe(Vue.translator)
})
