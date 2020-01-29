import { createLocalVue, mount } from '@vue/test-utils'
import _Vue from 'vue'

import VueTranslator from '../src'

_Vue.config.productionTip = false
const mockFn = (_Vue.config.warnHandler = jest.fn())

const Vue = createLocalVue()

Vue.use(VueTranslator, 'zh')

test('no merge will not work', () => {
  const wrapper = mount(
    {
      name: 'no_merge',
      template: `<div>{{ $t('no_merge') }}</div>`,
      translator: {
        zh: {
          no_merge: '没有使用合并选项',
        },
        en: {
          no_merge: 'No Merge',
        },
      },
    },
    {
      localVue: Vue,
    },
  )

  expect(mockFn).toBeCalled()
  expect(wrapper.element.innerHTML).toBe('no_merge')
})
