import { createLocalVue } from '@vue/test-utils'
import _Vue from 'vue'

import VueTranslator from '../src'

_Vue.config.productionTip = false
const mockFn = (_Vue.config.warnHandler = jest.fn())

describe('install vue translator', () => {
  it('should throw error with no options', () => {
    expect(() => createLocalVue().use(VueTranslator)).toThrowError()
  })

  it('should work will string options as locale', () => {
    expect(() => createLocalVue().use(VueTranslator, 'zh')).not.toThrowError()
  })

  it('should register `translator` on `Vue` as defaultTranslator', () => {
    const Vue = createLocalVue()
    Vue.use(VueTranslator, 'zh')
    expect(mockFn).toBeCalled()
    expect(Vue.translator).not.toBeUndefined()
  })
})
