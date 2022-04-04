<template>
  <div class="container">
    <ul class="lists">
      <li>
        <label>version</label>
        <select v-model="version">
          <option
            v-for="v of 40"
            :key="v"
            :value="v"
          >
            {{ v }}
          </option>
        </select>
      </li>
      <li>
        <label>errorCorrectionLevel</label>
        <select v-model="errorCorrectionLevel">
          <option
            v-for="level of LEVELS"
            :key="level"
            :value="level"
          >
            {{ level }}
          </option>
        </select>
      </li>
      <li>
        <label>maskPattern</label>
        <select v-model="maskPattern">
          <option
            v-for="pattern of MASK_PATTERNS"
            :key="pattern"
            :value="pattern"
          >
            {{ pattern }}
          </option>
        </select>
      </li>
      <li>
        <label>margin</label>
        <input
          v-model.number="margin"
          type="number"
        />
      </li>
      <li></li>
      <li>
        <label>scale</label>
        <input
          v-model.number="scale"
          type="number"
        />
      </li>
      <li>
        <label>width</label>
        <input
          v-model.number="width"
          type="number"
        />
      </li>
      <li>
        <label>color.dark</label>
        <input
          v-model="color.dark"
          type="color"
        />
      </li>
      <li>
        <label>color.light</label>
        <input
          v-model="color.light"
          type="color"
        />
      </li>
      <li>
        <label>type</label>
        <select v-model="type">
          <option
            v-for="t of TYPES"
            :key="t"
            :value="t"
          >
            {{ t }}
          </option>
        </select>
      </li>
      <li>
        <label>quality</label>
        <input
          v-model.number="quality"
          type="number"
          step="0.01"
        />
      </li>
      <li>
        <label>
          manualMode
          <input
            v-model="manualMode"
            type="checkbox"
          />
        </label>
      </li>
      <li>
        <label>
          value
          <button
            v-if="manualMode"
            @click="addValue"
          >
            +
          </button>
        </label>
        <ul v-if="manualMode">
          <li
            v-for="(v, index) of value"
            :key="v"
          >
            <label v-if="value.length > 0">
              <button @click="removeValue(index)">-</button>
            </label>
            <div>
              <label>mode</label>
              <select v-model="v.mode">
                <option
                  v-for="mode of MODES"
                  :key="mode"
                  :value="mode"
                >
                  {{ mode }}
                </option>
              </select>
            </div>
            <div>
              <label>data</label>
              <textarea
                v-model="v.data"
                rows="6"
                cols="80"
              ></textarea>
            </div>
          </li>
        </ul>
        <textarea
          v-else
          v-model="value"
          rows="6"
          cols="80"
        ></textarea>
      </li>
    </ul>
    <a
      download="qrcode-demo.png"
      href
    >
      <vue-qrcode
        v-bind="qrcodeProps"
        @error="onError"
      />
    </a>
  </div>
</template>
<script lang="ts">
import { pick } from 'lodash'
import { defineComponent } from 'vue'

import VueQrcode, {
  LEVELS,
  MASK_PATTERNS,
  MODES,
  QRCodeSegment,
  QRCodeValue,
  TYPES,
} from 'vue-qrcode'

const DEFAULT_TEXT = 'http://www.1stg.me'
const QRCODE_PROPS = [
  'version',
  'errorCorrectionLevel',
  'maskPattern',
  'margin',
  'scale',
  'width',
  'color',
  'type',
  'quality',
  'value',
] as const

export default defineComponent({
  components: {
    VueQrcode,
  },
  data() {
    return {
      LEVELS,
      MASK_PATTERNS,
      MODES,
      TYPES,
      version: 2,
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
  computed: {
    qrcodeProps() {
      return pick(this, QRCODE_PROPS)
    },
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
</style>
