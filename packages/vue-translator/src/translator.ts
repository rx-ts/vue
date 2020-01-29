import Vue from 'vue'

export interface Translator<Locale = string> {
  defaultLocale?: Locale
  locale?: Locale
  (key: string, params?: unknown, ignoreNonExist?: boolean): string
}

export interface Translations {
  [locale: string]: unknown
}

const LOCALE = 'locale'
const DEFAULT_LOCALE = 'defaultLocale'

const { defineReactive } = Vue.util

let translations: Translations

const getValue = (input: unknown, key: string): string => {
  key = key.replace(/\[(\d+)]/g, '.$1')
  let value = input

  key.split('.').some(k => {
    if (!value || typeof value !== 'object') {
      return true
    }

    value = (value as Record<string, unknown>)[k]
  })

  if (typeof value === 'object') {
    // istanbul ignore next
    if (process.env.NODE_ENV === 'development' && value !== null) {
      Vue.util.warn('you are trying to get non-literal value')
    }
    return (value && String(value)) as string
  }

  return value as string
}

export interface TranslatorOptions {
  locale: string
  translations?: Translations
  defaultLocale?: string
}

export const createTranslator = (
  translatorOptions: string | TranslatorOptions,
  // eslint-disable-next-line sonarjs/cognitive-complexity
): Translator => {
  if (typeof translatorOptions === 'string') {
    translatorOptions = { locale: translatorOptions }
  }

  const {
    locale: instanceLocale,
    translations: instanceTranslations,
    defaultLocale: instanceDefaultLocale,
  } = translatorOptions

  if (instanceTranslations) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!translations) {
      translations = instanceTranslations
    }
    // istanbul ignore next
    else if (
      process.env.NODE_ENV === 'development' &&
      translations !== instanceTranslations
    ) {
      Vue.util.warn('translations should only be injected once!')
    }
  } else if (process.env.NODE_ENV === 'development' && !translations) {
    Vue.util.warn('translations has not be injected, translator will not work!')
  }

  const instance: Translator = (
    key: string,
    params?: unknown,
    ignoreNonExist?: boolean,
  ) => {
    const { locale } = instance
    const translation = translations[locale!]

    let value = getValue(translation, key)

    if (value === undefined) {
      const { defaultLocale } = instance

      if (defaultLocale && defaultLocale !== locale) {
        const defaultTranslation = translations[defaultLocale]
        value = getValue(defaultTranslation, key)
      }

      if (
        process.env.NODE_ENV === 'development' &&
        value === undefined &&
        !ignoreNonExist
      ) {
        Vue.util.warn(
          `your are trying to get nonexistent key \`${key}\` without default locale fallback`,
        )
      }
    }

    value =
      value &&
      value.replace(/{([^{}]+)}/g, (_matched, $0: string) =>
        getValue(params, $0.trim()),
      )
    return value == null ? key : value
  }

  defineReactive(instance, LOCALE, instanceLocale)
  defineReactive(instance, DEFAULT_LOCALE, instanceDefaultLocale)

  return instance
}
