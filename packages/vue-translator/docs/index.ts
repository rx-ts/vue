import { merge } from 'lodash'
import Vue from 'vue'

import VueTranslator from '../src'

import App from './App.vue'
import { getItem, setItem } from './cookie'

Vue.use(VueTranslator, {
  defaultLocale: 'en',
  filter: true,
  locale: getItem('locale') || 'zh',
  merge,
  translations: {
    zh: {
      basic: '基础',
      default: '缺省',
      nestedKey: '嵌套',
      obj_param: ' 对象参数',
      arr_param: ' 数组参数',
      arr_key: '数组键',
      component_translator: '组件翻译',
      hello_world: '你好世界',
      nested: {
        a: '嵌套 A',
        b: '嵌套 B',
      },
      objParam: '{ a } 与 { b } 的和是 { sum }',
      arrParam: '我有三个兄弟，他们叫{0}，{1}和{2}',
      zhang_san: '张三',
      zhao_si: '赵四',
      wang_wu: '王五',
      filter: '过滤器',
    },
    en: {
      basic: 'Basic',
      default: 'Default',
      nestedKey: 'Nested',
      obj_param: 'Object Param',
      arr_param: 'Array Param',
      arr_key: 'Array Key',
      component_translator: 'Component Translator',
      hello_world: 'Hello World',
      default_message: 'Default Message',
      nested: {
        a: 'Nested A',
        b: 'Nested B',
      },
      objParam: '{ a } plus { b } equals { sum }',
      arrParam: 'I have three brothers, their names ars {0}, {1} and {2}',
      zhang_san: 'Peter',
      zhao_si: 'Tom',
      wang_wu: 'John',
      arr_keys: ['Key1', 'Key2'],
      filter: 'Filter',
    },
  },
})

let changed = 0

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  watch: {
    '$t.locale': function(curr: string, prev: string) {
      console.log('prev:', prev)
      console.log('curr:', curr)
      setItem('locale', curr)

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (++changed % 3 === 0) {
        alert(`you have changed locale ${changed} times!`)
      }
    },
  },
  render: h => h(App),
})
