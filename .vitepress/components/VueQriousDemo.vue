<template>
  <div class="container">
    <ul class="lists">
      <li>
        <label>background(color)</label>
        <input
          v-model="background"
          type="color"
        />
      </li>
      <li>
        <label>backgroundAlpha(0.1-1.0)</label>
        <input
          v-model.number="backgroundAlpha"
          type="number"
        />
      </li>
      <li>
        <label>foreground(color)</label>
        <input
          v-model="foreground"
          type="color"
        />
      </li>
      <li>
        <label>foregroundAlpha(0.1-1.0)</label>
        <input
          v-model.number="foregroundAlpha"
          type="number"
        />
      </li>
      <li>
        <label>level</label>
        <select v-model="level">
          <option
            v-for="l of LEVELS"
            :key="l"
            :value="l"
          >
            {{ l }}
          </option>
        </select>
      </li>
      <li>
        <label>mime</label>
        <select v-model="mime">
          <option value="image/png">image/png</option>
          <option value="image/jpeg">image/jpeg</option>
        </select>
      </li>
      <li>
        <label>padding(px)</label>
        <input
          v-model.number="padding"
          type="number"
        />
      </li>
      <li>
        <label>size(px)</label>
        <input
          v-model.number="size"
          type="number"
        />
      </li>
      <li>
        <label>value</label>
        <textarea
          v-model="value"
          rows="6"
          cols="80"
        ></textarea>
      </li>
    </ul>
    <client-only>
      <a
        download="qrious-demo.png"
        :href="dataUrl"
      >
        <vue-qrious
          v-bind="qriousProps as any"
          @change="onChange"
          @error="onError"
        />
      </a>
      <div
        v-if="dataUrl"
        class="data-url"
      >
        {{ dataUrl }}
      </div>
    </client-only>
  </div>
</template>
<script lang="ts">
import { pick } from 'lodash-es'
import { defineComponent } from 'vue'

import VueQrious, { LEVELS } from 'vue-qrious'

const QRIOUS_PROPS = [
  'background',
  'backgroundAlpha',
  'foreground',
  'foregroundAlpha',
  'level',
  'mime',
  'padding',
  'size',
  'value',
] as const

export default defineComponent({
  components: {
    VueQrious,
  },
  data() {
    return {
      LEVELS,
      background: '#ffffff',
      backgroundAlpha: 1,
      foreground: '#000000',
      foregroundAlpha: 1,
      level: 'L',
      mime: 'image/png',
      padding: 0,
      size: 100,
      value: 'http://www.1stg.me',
      dataUrl: undefined as string | undefined,
    }
  },
  computed: {
    qriousProps() {
      return pick(this, QRIOUS_PROPS)
    },
  },
  methods: {
    onChange(dataUrl: string) {
      this.dataUrl = dataUrl
    },
    onError(err: Error) {
      window.alert(err.message)
    },
  },
})
</script>
<style lang="scss">
.container {
  margin: 10px auto;
  text-align: center;
}

.lists {
  padding: 0;
  text-align: left;
  list-style: none;
  width: 300px;
  margin: 0 auto 30px;

  li {
    margin-bottom: 8px;
  }

  label {
    display: block;
    margin-bottom: 5px;

    &:after {
      content: ':';
    }
  }

  input {
    &[type='color'] {
      padding: 0;
    }
  }

  textarea {
    width: 100%;
  }
}

.data-url {
  max-width: 100%;
  overflow-x: auto;
}
</style>
