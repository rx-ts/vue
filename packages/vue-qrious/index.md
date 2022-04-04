# VueQrious

> 🤳 A Vue component for QR code generation with [qrious](https://github.com/neocotic/qrious)

## Demo

<VueQriousDemo />

## Usage

```vue
<template>
  <vue-qrious value="https://www.1stg.me" />
</template>
<script>
import VueQrious from 'vue-qrious'

export default {
  components: {
    VueQrious,
  },
}
</script>
```

## Available Props

| prop              | type (range)                         | default value |
| ----------------- | ------------------------------------ | ------------- |
| `background`      | `string` (CSS color)                 | `"#ffffff"`   |
| `backgroundAlpha` | `number` (0.1-1.0)                   | `1.0`         |
| `foreground`      | `string` (CSS color)                 | `"#000000"`   |
| `foregroundAlpha` | `number` (0.1-1.0)                   | `1.0`         |
| `level`           | `string` ("L", "M", "Q", "H")        | `"L"`         |
| `mime`            | `string` ("image/png", "image/jpeg") | `"image/png"` |
| `padding`         | `number`                             | `null`        |
| `size`            | `number`                             | `100`         |
| `value`           | `string`                             |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
