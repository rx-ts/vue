<template>
  <div class="container">
    <ul class="lists">
      <li>
        <label>version</label>
        <select v-model="version">
          <option v-for="v of 40" :value="v">{{ v }}</option>
        </select>
      </li>
      <li>
        <label>errorCorrectionLevel</label>
        <select v-model="errorCorrectionLevel">
          <option v-for="level of LEVELS" :value="level">{{ level }}</option>
        </select>
      </li>
      <li>
        <label>maskPattern</label>
        <select v-model="maskPattern">
          <option v-for="pattern of MASK_PATTERNS" :value="pattern">
            {{ pattern }}
          </option>
        </select>
      </li>
      <li>
        <label>margin</label>
        <input type="number" v-model.number="margin" />
      </li>
      <li></li>
      <li>
        <label>scale</label>
        <input type="number" v-model.number="scale" />
      </li>
      <li>
        <label>width</label>
        <input type="number" v-model.number="width" />
      </li>
      <li>
        <label>color.dark</label>
        <input type="color" v-model="color.dark" />
      </li>
      <li>
        <label>color.light</label>
        <input type="color" v-model="color.light" />
      </li>
      <li>
        <label>type</label>
        <select v-model="type">
          <option v-for="t of TYPES" :value="t">{{ t }}</option>
        </select>
      </li>
      <li>
        <label>quality</label>
        <input type="number" step="0.01" v-model.number="quality" />
      </li>
      <li>
        <label>
          manualMode
          <input type="checkbox" v-model="manualMode" />
        </label>
      </li>
      <li>
        <label>
          value
          <button v-if="manualMode" @click="addValue">+</button>
        </label>
        <ul v-if="manualMode">
          <li v-for="(v, index) of value">
            <label v-if="value.length">
              <button @click="removeValue(index)">-</button>
            </label>
            <div>
              <label>mode</label>
              <select v-model="v.mode">
                <option v-for="mode of MODES" :value="mode">
                  {{ mode }}
                </option>
              </select>
            </div>
            <div>
              <label>data</label>
              <textarea rows="6" cols="80" v-model="v.data"></textarea>
            </div>
          </li>
        </ul>
        <textarea v-else rows="6" cols="80" v-model="value"></textarea>
      </li>
    </ul>
    <vue-qrcode v-bind="$data" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import VueQrcode, {
  LEVELS,
  MASK_PATTERNS,
  MODES,
  QRCodeSegment,
  QRCodeValue,
  TYPES,
} from 'vue-qrcode'

const DEFAULT_TEXT = 'http://www.1stg.me'

export default Vue.extend({
  components: {
    VueQrcode,
  },
  data() {
    return {
      LEVELS,
      MASK_PATTERNS,
      MODES,
      TYPES,
      version: undefined,
      errorCorrectionLevel: 'M',
      maskPattern: undefined,
      margin: 4,
      scale: 4,
      width: undefined,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      type: 'image/png',
      quality: 0.92,
      value: DEFAULT_TEXT as QRCodeValue,
      manualMode: false,
    }
  },
  watch: {
    manualMode() {
      this.value = this.manualMode
        ? [
            {
              data: DEFAULT_TEXT,
            },
          ]
        : DEFAULT_TEXT
    },
  },
  methods: {
    addValue() {
      ;(this.value as QRCodeSegment[]).push({
        data: DEFAULT_TEXT,
      })
    },
    removeValue(index: number) {
      ;(this.value as QRCodeSegment[]).splice(index, 1)
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
</style>
