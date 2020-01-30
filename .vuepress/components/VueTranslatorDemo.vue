<template>
  <table class="table">
    <tbody>
      <tr>
        <td>{{ $t('basic') }}</td>
        <td>
          <div class="form-group">
            <label class="col-sm-2 control-label">
              {{ $t('hello_world') }}
            </label>
            <div class="col-sm-10">
              <select v-model="$t.locale" class="form-control">
                <option value="zh">中文</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>{{ $t('default') }}</td>
        <td>
          <div>{{ $t('default_message') }}</div>
        </td>
      </tr>
      <tr>
        <td>{{ $t('nestedKey') }}</td>
        <td>{{ $t('nested.a') }}</td>
      </tr>
      <tr>
        <td>{{ $t('obj_param') }}</td>
        <td>
          <div>
            {{ $t('objParam', { a: a, b: b, sum: a + b }) }}
            <button class="btn btn-default" @click="a++">a + 1</button>
            <button class="btn btn-default" @click="b++">b + 1</button>
          </div>
        </td>
      </tr>
      <tr>
        <td>{{ $t('arr_param') }}</td>
        <td>
          <div>
            {{
              $t('arrParam', [$t('zhang_san'), $t('zhao_si'), $t('wang_wu')])
            }}
          </div>
        </td>
      </tr>
      <tr>
        <td>{{ $t('arr_key') }}</td>
        <td>
          <div>{{ $t('arr_keys[0]') }}, {{ $t('arr_keys[1]') }}</div>
        </td>
      </tr>
      <tr>
        <td>{{ $t('component_translator') }}</td>
        <td>
          <custom-el></custom-el>
        </td>
      </tr>
      <tr>
        <td>{{ 'filter' | translate }}</td>
        <td>{{ 'filter' | translate }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import { setItem } from '@@/utils'

const CustomEl = {
  name: 'custom-el',
  translator: {
    zh: {
      x_man: 'X 战警',
    },
    en: {
      x_man: 'X Men',
    },
  },
  render(h) {
    return h('div', null, [this.$t('x_man')])
  },
}

export default {
  components: {
    CustomEl,
  },
  data() {
    return {
      a: 1,
      b: 1,
      changed: 0,
    }
  },
  translator: {
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
  watch: {
    '$t.locale'(curr, prev) {
      console.log('prev:', prev)
      console.log('curr:', curr)
      setItem('locale', curr)

      // eslint-disable-next-line no-magic-numbers
      if (++this.changed % 3 === 0) {
        alert(`you have changed locale ${this.changed} times!`)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.table {
  td {
    vertical-align: middle;
    &:first-child {
      text-align: center;
    }
  }
}
</style>
