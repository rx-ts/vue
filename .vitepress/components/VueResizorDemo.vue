<template>
  <div ref="parent" class="parent">
    <vue-resizor :parent="parent" v-model:indicators="indicators">
      <div class="child">Child 1</div>
      <div class="child">Child 2</div>
    </vue-resizor>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import VueResizor, { Indicator } from 'vue-resizor'

import 'vue-resizor/styles.css'

const parent = ref<HTMLElement>()

const indicators = ref<Indicator[]>()
</script>
<style lang="less" scoped>
.parent {
  height: 200px;
  background-color: pink;
}

.child {
  height: 20%;

  ~ .child {
    height: 80%;
    background-color: lightgreen;
    min-height: 0;
  }
}
</style>
