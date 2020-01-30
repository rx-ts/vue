<template>
  <div class="container">
    <ul class="lists">
      <li>
        <label>background(color)</label>
        <input type="color" v-model="background" />
      </li>
      <li>
        <label>backgroundAlpha(0.1-1.0)</label>
        <input type="number" v-model.number="backgroundAlpha" />
      </li>
      <li>
        <label>foreground(color)</label>
        <input type="color" v-model="foreground" />
      </li>
      <li>
        <label>foregroundAlpha(0.1-1.0)</label>
        <input type="number" v-model.number="foregroundAlpha" />
      </li>
      <li>
        <label>level</label>
        <select v-model="level">
          <option v-for="l of LEVELS" :value="l">{{ l }}</option>
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
        <input type="number" v-model.number="padding" />
      </li>
      <li>
        <label>size(px)</label>
        <input type="number" v-model.number="size" />
      </li>
      <li>
        <label>value</label>
        <textarea rows="6" cols="80" v-model="value"></textarea>
      </li>
    </ul>
    <client-only>
      <vue-qrious v-bind="$data" />
    </client-only>
  </div>
</template>
<script>
import VueQrious, { LEVELS } from 'vue-qrious'

export default {
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
    }
  },
}
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
