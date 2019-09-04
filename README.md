<p align="center">
  <a href="https://rxjs.dev">
    <img src="https://rxjs.dev/assets/images/logos/Rx_Logo_S.png" height="50">
  </a>
  <a href="#readme">
    <img src="https://rx-ts.github.io/assets/heart.svg" height="50">
  </a>
  <a href="https://vuejs.org">
    <img src="https://vuejs.org/images/logo.png"  height="50">
  </a>
</p>

[![Travis](https://img.shields.io/travis/com/rx-ts/vue.svg)](https://travis-ci.com/rx-ts/vue)
[![Codacy Grade](https://img.shields.io/codacy/grade/d5e7b6c031264056a0d1c126f3cc4857)](https://www.codacy.com/app/JounQin/vue)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frx-ts%2Fvue%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![GitHub release](https://img.shields.io/github/release/rx-ts/vue)](https://github.com/rx-ts/vue/releases)
[![David Dev](https://img.shields.io/david/dev/rx-ts/vue.svg)](https://david-dm.org/rx-ts/vue?type=dev)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![codechecks.io](https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true)](https://codechecks.io)

> Make [Vue][] greater with [RxTS][].

## TOC <!-- omit in toc -->

- [Homepage](#homepage)
- [Packages](#packages)
- [Install](#install)
- [Changelog](#changelog)
- [License](#license)

## Homepage

<a href="https://rx-vue.now.sh" target="_blank">rx-vue</a>

## Packages

This repository is a monorepo managed by [Lerna][] what means we actually publish several packages to npm from same codebase, including:

| Package                              | Description                                               | Version                                                                                                     | Peer Dependencies                                                                                                                                            | Dependencies                                                                                                                             |
| ------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [`vue-qrcode`](/packages/vue-qrcode) | 🤳 A Vue component for QR code generation with [qrcode][] | [![npm](https://img.shields.io/npm/v/@rxts/vue-qrcode.svg)](https://www.npmjs.com/package/@rxts/vue-qrcode) | [![David Peer](https://img.shields.io/david/peer/rx-ts/vue.svg?path=packages/vue-qrcode)](https://david-dm.org/rx-ts/vue?path=packages/vue-qrcode&type=peer) | [![David](https://img.shields.io/david/rx-ts/vue.svg?path=packages/vue-qrcode)](https://david-dm.org/rx-ts/vue?path=packages/vue-qrcode) |
| [`vue-qrious`](/packages/vue-qrious) | 🤳 A Vue component for QR code generation with [qrious][] | [![npm](https://img.shields.io/npm/v/vue-qrious.svg)](https://www.npmjs.com/package/vue-qrious)             | [![David Peer](https://img.shields.io/david/peer/rx-ts/vue.svg?path=packages/vue-qrious)](https://david-dm.org/rx-ts/vue?path=packages/vue-qrious&type=peer) | [![David](https://img.shields.io/david/rx-ts/vue.svg?path=packages/vue-qrious)](https://david-dm.org/rx-ts/vue?path=packages/vue-qrious) |

## Install

```sh
# yarn
yarn add @rxts/vue-qrcode vue-qrious

# npm
npm i @rxts/vue-qrcode vue-qrious
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[rxts]: https://rxjs.dev
[vue]: https://vuejs.org
[jounqin]: https://GitHub.com/JounQin
[lerna]: https://github.com/lerna/lerna
[mit]: http://opensource.org/licenses/MIT
[qrcode]: https://github.com/soldair/node-qrcode
[qrious]: https://github.com/neocotic/qrious
