import { createLocalVue, mount } from '@vue/test-utils'
import { merge } from 'lodash'

import VueTranslator from '../src'

const Vue = createLocalVue()

Vue.use(VueTranslator, {
  locale: 'zh',
  merge,
  translations: {
    zh: {
      hello_world: '你好世界',
    },
    en: {
      hello_world: 'Hello World',
    },
  },
})

const { translator } = Vue

test('plugin should be able to be watched', () => {
  return new Promise(resolve => {
    const app = new Vue()
    const unwatch = app.$watch('$t.locale', (curr: string, prev: string) => {
      expect(curr).toBe('en')
      expect(prev).toBe('zh')
      unwatch()
      resolve()
    })
    translator.locale = 'en'
  })
})

test('render correct locale text and watch locale change', () => {
  const wrapper = mount(
    {
      template: `<div>{{ $t('hello_world') }}</div>`,
    },
    {
      localVue: Vue,
    },
  )

  expect(wrapper.element.innerHTML).toBe('Hello World')
  translator.locale = 'zh'
  Vue.nextTick(() => expect(wrapper.element.innerHTML).toBe('你好世界'))
})

test('translator defined in component options', () => {
  const wrapper = mount(
    {
      name: 'custom-component',
      template: `<div>{{ $t('component') }}</div>`,
      translator: {
        zh: {
          component: '组件',
        },
        en: {
          component: 'Component',
        },
      },
    },
    {
      localVue: Vue,
    },
  )

  expect(wrapper.element.innerHTML).toBe('组件')
  translator.locale = 'en'
  Vue.nextTick(() => expect(wrapper.element.innerHTML).toBe('Component'))
})
