import Vue from 'vue'

import { createTranslator } from '../src'

Vue.config.productionTip = false
const mockFn = (Vue.config.warnHandler = jest.fn())

describe('translator instance', () => {
  const translator = createTranslator({
    locale: 'zh',
    translations: {
      zh: {
        obj_param: '{ a } 加 { b } 等于 { sum }',
        arr_param: '{ 0 }，{ 1 }，{ 2 }',
        nested: {
          content: '嵌套内容',
        },
        arr_keys: ['数组项1', '数组项2'],
        nested_temp: '{ nested.value }',
      },
      en: {
        fallback: 'Fallback',
        obj_param: '{ a } plus { b } equals { sum }',
        arr_param: '{ 0 }, { 1 }, { 2 }',
        nested: {
          content: 'Nested Content',
        },
        arr_keys: ['Array Item 1', 'Array Item 2'],
        nested_temp: '{ nested.value }',
        a: {
          b: ['{ 0.a }'], // do not use `[0].a` here, `0[a]` is also OK
        },
      },
    },
    defaultLocale: 'en',
  })

  it('should fallback to default locale', () => {
    expect(translator('fallback')).toBe('Fallback')
    expect(translator('non-exist', null)).toBe('non-exist')
    expect(mockFn).toBeCalled()
  })

  it('should work with object param', () => {
    const objParam = { a: 1, b: 2, sum: 3 }
    expect(translator('obj_param', objParam)).toBe('1 加 2 等于 3')
    translator.locale = 'en'
    expect(translator('obj_param', objParam)).toBe('1 plus 2 equals 3')
  })

  it('should work with array param', () => {
    expect(translator('arr_param', ['A', 'B', 'C'])).toBe('A, B, C')
    translator.locale = 'zh'
    expect(translator('arr_param', ['甲', '乙', '丙'])).toBe('甲，乙，丙')
  })

  it('should work with nested param', () => {
    expect(translator('nested.content')).toBe('嵌套内容')
    translator.locale = 'en'
    expect(translator('nested.content')).toBe('Nested Content')
  })

  it('should work with nested array param', () => {
    expect(translator('arr_keys[0]')).toBe('Array Item 1')
    expect(translator('arr_keys[1]')).toBe('Array Item 2')
    translator.locale = 'zh'
    expect(translator('arr_keys[0]')).toBe('数组项1')
    expect(translator('arr_keys[1]')).toBe('数组项2')
  })

  it('should work with nested template', () => {
    expect(translator('nested_temp', { nested: { value: '值' } })).toBe('值')
    translator.locale = 'en'
    expect(translator('nested_temp', { nested: { value: 'Value' } })).toBe(
      'Value',
    )
  })

  it('should work with nested with array key and template', () => {
    expect(translator('a.b[0]', [{ a: 1 }])).toBe('1')
  })

  it('should return string value', () => {
    expect(translator('nested')).toBe('[object Object]')
    expect(mockFn).toBeCalled()
  })
})
