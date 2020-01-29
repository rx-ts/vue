import Vue, { VueConstructor } from 'vue'

import {
  Translations,
  Translator,
  TranslatorOptions,
  createTranslator,
} from './translator'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    translator?: Translations
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $t: Translator
  }

  interface VueConstructor {
    translator: Translator
    util: {
      defineReactive: (obj: object, key: string, val: unknown) => void
      warn: (msg: string) => void
    }
  }
}

export * from './translator'

export type VueTranslatorOptions = TranslatorOptions & {
  filter?: boolean | string
  merge?: (prev: Translations, next: Translations) => Translations
}

const mergedCache: number[] = []

const VueTranslator = (
  $Vue: VueConstructor,
  options: string | VueTranslatorOptions,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  if (typeof options === 'string') {
    options = {
      locale: options,
    }
  }

  const { defaultLocale, locale, merge, translations = {} } = options

  const defaultTranslator = createTranslator({
    locale,
    translations,
    defaultLocale,
  })

  $Vue.translator = defaultTranslator

  $Vue.mixin({
    beforeCreate() {
      const { translator } = this.$options

      const { cid } = Object.getPrototypeOf(this).constructor

      if (!translator || mergedCache.indexOf(cid) + 1) {
        return
      }

      if (!merge) {
        // istanbul ignore next
        if (process.env.NODE_ENV === 'development') {
          $Vue.util.warn(
            'VueTranslator will not help you to merge translations, please pass your own merge strategy, `lodash.merge` for example',
          )
        }
        return
      }

      merge(translations, translator)

      mergedCache.push(cid)
    },
  })

  Object.defineProperty(
    $Vue.prototype,
    '$t',
    process.env.VUE_ENV === 'server'
      ? {
          get(this: Vue) {
            const { translator } = this.$ssrContext

            if (process.env.NODE_ENV === 'development' && !translator) {
              $Vue.util.warn(
                'there is no translator instance on ssrContext, you should register it manually',
              )
            }

            return translator || defaultTranslator
          },
          configurable: process.env.NODE_ENV === 'development',
        }
      : {
          value: defaultTranslator,
          writable: process.env.NODE_ENV === 'development',
        },
  )

  let { filter } = options

  if (!filter) {
    return
  }

  if (filter === true) {
    filter = 'translate'
  }

  if (process.env.VUE_ENV !== 'server') {
    $Vue.filter(filter, defaultTranslator)
    return
  }

  const { _f } = $Vue.prototype

  // a hacky way to support filter on server, so `filter` is not enabled by default
  $Vue.prototype._f = function(this: Vue, id: string) {
    if (
      process.env.NODE_ENV === 'development' &&
      this.$options.filters![filter as string]
    ) {
      $Vue.util.warn(
        `duplicate filter \`${filter}\` found, please rename to a unique filter name`,
      )
    }

    return id === filter ? this.$t : _f.call(this, id)
  }
}

export default VueTranslator

export const install = VueTranslator
