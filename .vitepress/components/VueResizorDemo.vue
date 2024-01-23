<template>
  <div class="parent">
    <vue-resizor v-model:indicators="indicators">
      <div class="child">Child 1</div>
      <div class="child">Child 2</div>
    </vue-resizor>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import VueResizor, { Indicator } from 'vue-resizor'

import 'vue-resizor/styles.css'

const indicators = ref<Indicator[]>()
</script>
