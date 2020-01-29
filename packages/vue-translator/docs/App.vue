<template>
  <div id="app" class="container">
    <table class="table table-bordered">
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
  </div>
</template>
<script lang="ts">
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
    }
  },
}
</script>
<style lang="scss" scoped>
.table td {
  vertical-align: middle;

  &:first-child {
    text-align: center;
  }
}
</style>
