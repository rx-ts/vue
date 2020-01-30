# vue-translator

> A deadly simple i18n translate plugin for Vue, ready for Server Side Rendering.

## TOC <!-- omit in toc -->

- [Demo](#demo)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [SSR related](#ssr-related)
- [template syntax](#template-syntax)
- [Changelog](#changelog)
- [License](#license)

## Demo

- client side rendering

<VueTranslatorDemo />

- [server side rendering](https://rubick.1stg.me) ([source code](https://github.com/JounQin/Rubick))

## Usage

```bash
yarn add vue-translator
```

### Basic Usage

```ts
import Vue from 'vue'
import VueTranslator from 'vue-translator'

Vue.use(VueTranslator, {
  locale?: string, // set it on initialize or before first rendering
  translations?: {  // If you want to define translations in component only, no need to set it on initialize
    [locale: string]: {
      [key:string]: string | array | object
    }
  },
  defaultLocale?: string, // when no value can be found in current locale, try to fallback to defaultLocale
  filter?: boolean | string, // whether to enable filter `translate` or custom define filter name (>= 0.7.0)
  merge?: Function // `lodash.merge` for example, if you want to use component translator you must pass it
})
```

You will get a default translator instance on `Vue.translator`, it is safe to use it on client, but please avoid use it on server, be careful!

`translations` is often generated via `require.context` provided by `webpack` from `*.{locale}.i18n.json`:

```ts
const context = require.context('.', true, /([\w-]*[\w]+)\.i18n\.json$/)

const LOCALE_KEYS: { [key: string]: string[] } = {}

const translations: {
  [locale: string]: {
    [key: string]: string
  }
} = context.keys().reduce((modules: any, key: string) => {
  const module = context(key)
  const lang = key.match(/([\w-]*[\w]+)\.i18n\.json$/)[1]
  const matched = modules[lang] || (modules[lang] = {})

  if (process.env.NODE_ENV === 'development') {
    const keys = LOCALE_KEYS[lang] || LOCALE_KEYS[lang] || []
    const moduleKeys = Object.keys(module)

    const duplicates = _.intersection(keys, moduleKeys)

    if (duplicates.length) {
      console.warn('detect duplicate keys:', duplicates)
    }

    keys.push(...moduleKeys)
  }

  Object.assign(matched, module)
  return modules
}, {})
```

Then you will be able to use `$t` in all your component template.

```vue
<template>
  <div>
    {{ $t('message', obj_params?) }}
    {{ $t('nested.message', arr_params?) }}
  </div>
</template>
<script>
export default {
  name: 'custom-component', // it is needed for better cache for < 0.6.0, after >= 0.6.0 not required
  translator: {
    zh: {
      message: '我的信息',
    },
    en: {
      message: 'My Message',
    },
  },
}
</script>
```

If you are trying to get a non-exist key or value is undefined, you will get a warning in console on development. And if you want to ignore it, pass a third parameter `ignoreNonExist: boolean`: `$t('non-exist-key', null, true)`.

If you want to watch locale change in any component, global watch should be defined on root component:

```js
new Vue({
  el: '#app',
  watch: {
    '$t.locale'(curr, prev) {
      // do something
    },
  },
})
```

Or you want to change locale on client:

```js
{
  methods: {
    changeLocale() {
      this.$t.locale = 'locale'
    }
  }
}
```

### SSR related

You'd better to detect user custom locale via cookie and fallback to [accept-language](https://github.com/tinganho/node-accept-language) on first request.

And you need to generate a single translator instance for every user request (cache by locale would be better) via `createTranslator`, `koa` for example:

```ts
import { createTranslator } from 'vue-translator'

app.use(async (ctx, next) => {
  const translator = createTranslator({
    locale: string, // ctx.cookies.get('locale_cookie')
    defaultLocale: string,
  })

  const context = {} // user context

  context.translator = translator

  // ... do anything
})
```

Then `$t` will be `translator` generated above, if you don't mind user's locale cookie and not pass `translator` instance into `user context`, it will fallback to the default `translator`.

Remember, always get translator instance via `this.$t` of `context.translator` instead of `Vue.translator` unless you are not handling user request.

And notice implement of filter `translate` on server is a little hacky which overwrites `Vue.prototype._f` internally to get `this.$t` for every request.

## template syntax

Translation key should be string, but `.`(dot) will be parsed as nested key, it will also work in template!

```js
$t('a.b.c') // will try to find `a.b.c` on your custom transition, if a is falsy, will render undefined and try default locale

// render `nested value`
new Vue({
  translator: {
    en: {
      a: {
        b: {
          c: 'nested value',
        },
      },
    },
  },
})

// render `nested template`
$t('a.b', {c: d: 'nested template'})
new Vue({
  translator: {
    en: {
      a: {
        b: '{ c.d }'
      },
    },
  },
})
```

Array is also supported, `.index`(dot) or `[index]` can both be used!

```js
// nested with array key and template
// render `1`
$t('a.b[0]', [{ a: 1 }])

new Vue({
  translator: {
    en: {
      a: {
        b: ['{ 0.a }'], // do not use `[0].a` here, `0[a]` is also OK
      },
    },
  },
})
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
