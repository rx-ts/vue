# VueQrcode

> 🤳 A Vue component for QR code generation with [qrcode](https://github.com/soldair/node-qrcode)

## TOC <!-- omit in toc -->

- [Demo](#demo)
- [Usage](#usage)
- [Available Props](#available-props)
- [Changelog](#changelog)
- [License](#license)

## Demo

<VueQrcodeDemo/>

## Usage

```vue
<template>
  <vue-qrcode value="https://www.1stg.me" />
</template>
<script>
import VueQrcode from 'vue-qrcode'

export default {
  components: {
    VueQrcode,
  },
}
</script>
```

## Available Props

| prop                   | type (range)                                                       | default value                               |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| `version`              | `number` (1-40)                                                    | N/A                                         |
| `errorCorrectionLevel` | `String` ('low', 'medium', 'quartile', 'high', 'L', 'M', 'Q', 'H') | `'M'`                                       |
| `maskPattern`          | `number` (0-7)                                                     | N/A                                         |
| `toSJISFunc`           | `Function`                                                         | N/A                                         |
| `margin`               | `number`                                                           | `4`                                         |
| `scale`                | `number`                                                           | `4`                                         |
| `width`                | `number`                                                           | N/A                                         |
| `color`                | `{ dark: string; light:string }`                                   | `{ dark: '#000000ff', light: '#ffffffff' }` |
| `type`                 | `string` ('image/png', 'image/jpeg', 'image/webp')                 | `'image/png'`                               |
| `quality`              | `number`(0-1)                                                      | `0.92`                                      |
| `value`                | `string | Array<{ data: string; mode?: string }>`                  | N/A                                         |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
