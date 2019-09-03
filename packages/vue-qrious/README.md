## Usage

```vue
<template>
  <qrious value="https://blog.1stg.me" />
</template>
<script>
import Qrious from 'vue-qrious'

export default {
  components: {
    Qrious,
  },
}
</script>
```

## Available Props

| prop              | type                                 | default value |
| ----------------- | ------------------------------------ | ------------- |
| `background`      | `string` (CSS color)                 | `"#fff"`      |
| `backgroundAlpha` | `number` (0.1-1.0)                   | `1.0`         |
| `foreground`      | `string` (CSS color)                 | `"#000"`      |
| `foregroundAlpha` | `number` (0.1-1.0)                   | `1.0`         |
| `level`           | `string` ("L", "M", "Q", "H")        | `"L"`         |
| `mime`            | `string` ("image/png", "image/jpeg") | `"image/png"` |
| `padding`         | `number`                             | `null`        |
| `size`            | `number`                             | `100`         |
| `value`           | `string`                             |
