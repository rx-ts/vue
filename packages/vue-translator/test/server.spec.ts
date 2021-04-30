import { createLocalVue } from '@vue/test-utils'
import _Vue from 'vue'

import VueTranslator, { createTranslator } from '../src'

process.env.VUE_ENV = 'server'

_Vue.config.productionTip = false
const mockFn = (_Vue.config.warnHandler = jest.fn())

const Vue = createLocalVue()

const { _f } = Vue.prototype as { _f: (...args: unknown[]) => unknown }

Vue.use(VueTranslator, {
  locale: 'zh',
  filter: true,
  translations: {
    zh: {
      filter: '过滤器',
    },
    en: {
      filter: 'Filter',
    },
  },
})

describe('work on server', () => {
  const app: Vue & {
    _f: (...args: unknown[]) => unknown
  } = new Vue({
    template: `<div>{{ 'filter' | translate }}</div>`,
  })
  const ssrContext: Record<string, unknown> = {}

  Object.assign(app, {
    $vnode: {
      ssrContext,
    },
  })

  test('fallback to default translator', () => {
    expect(app.$t).toBe(Vue.translator)
    expect(mockFn).toBeCalled()
  })

  test('should respect context translator', () => {
    const translator = createTranslator('zh')
    ssrContext.translator = translator
    expect(app.$t).toBe(translator)
  })

  test('filter on server', () => {
    expect(app._f).not.toBe(_f)
    expect(app._f('translate')).toBe(ssrContext.translator)
    app._f('not-exist')
    expect(mockFn).toBeCalled()
    const filter = jest.fn()
    Vue.filter('translate', filter)
    app._f('translate')
    expect(mockFn).toBeCalled()
    expect(filter).not.toBeCalled()
  })

  afterAll(() => {
    delete process.env.VUE_ENV
  })
})
