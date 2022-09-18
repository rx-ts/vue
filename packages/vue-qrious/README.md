# VueQrious

> 🤳 A Vue component for QR code generation with [qrious](https://github.com/neocotic/qrious)

## TOC <!-- omit in toc -->

- [Demo](#demo)
- [Usage](#usage)
- [Available Props](#available-props)
- [Available Events](#available-events)
- [Sponsors](#sponsors)
- [Backers](#backers)
- [Changelog](#changelog)
- [License](#license)

## Demo

<VueQriousDemo />

## Usage

```vue
<template>
  <vue-qrious
    value="https://www.1stg.me"
    @change="onDataUrlChange"
  />
</template>
<script>
import VueQrious from 'vue-qrious'

export default {
  data() {
    return {
      dataUrl: null,
    }
  },
  components: {
    VueQrious,
  },
  methods: {
    onDataUrlChange(dataUrl) {
      this.dataUrl = dataUrl
    },
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
| `value`           | `string`                             | N/A           |

## Available Events

| event  | type              |
| ------ | ----------------- |
| change | `dataUrl: string` |

## Sponsors

| 1stG                                                                                                                               | RxTS                                                                                                                               | UnTS                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/organizations.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/organizations.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/organizations.svg)](https://opencollective.com/unts) |

## Backers

[![Backers](https://raw.githubusercontent.com/1stG/static/master/sponsors.svg)](https://github.com/sponsors/JounQin)

| 1stG                                                                                                                             | RxTS                                                                                                                             | UnTS                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/individuals.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/individuals.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/individuals.svg)](https://opencollective.com/unts) |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
