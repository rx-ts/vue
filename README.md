# vue-qrious

[![peerDependencies status](https://david-dm.org/JounQin/vue-qrious/peer-status.svg)](https://david-dm.org/JounQin/vue-qrious?type=peer)
[![devDependency Status](https://david-dm.org/JounQin/vue-qrious/dev-status.svg)](https://david-dm.org/JounQin/vue-qrious?type=dev)

a [vue](https://www.npmjs.com/package/vue) component of generating qrcode with [qrious](https://github.com/neocotic/qrious)

## Demo
http://vue-qrious.1stg.me

## Usage

``` vue
<qrious value="https://blog.1stg.me/"/>
```

## Available Props

prop      | type                 | default value
----------|----------------------|--------------
`background` | `string` (CSS color) | `"#ffffff"`
`backgroundAlpha` | `number` (0.1-1.0) | `1.0`
`foreground` | `string` (CSS color) | `"#000000"`
`foregroundAlpha` | `number` (0.1-1.0) | `1.0`
`level` | `string` ("L", "M", "Q", "H") | `"L"`
`mime` | `string` ("image/png", "image/jpeg") | `"image/png"`
`padding` | `number` | `null`
`size`    | `number`             | `100`
`value`   | `string`             |
