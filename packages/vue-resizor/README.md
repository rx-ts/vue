# VueResizor

> 🖱 A Vue component for resizing with dragging

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

<VueResizorDemo />

## Usage

```vue
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
```

## Available Props

| prop         | type (range)                      | default value |
| ------------ | --------------------------------- | ------------- |
| `indicators` | `Indicator[]`                     | N/A           |
| `size`       | `number` (indicator width/height) | `2`           |

## Available Events

| event               | type          |
| ------------------- | ------------- |
| 'update:indicators' | `Indicator[]` |

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
