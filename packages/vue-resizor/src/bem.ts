export class Bem {
  readonly #block: string
  readonly #element?: string
  readonly #modifier?: string

  constructor(block: string, element?: string, modifier?: string) {
    this.#block = block
    this.#element = element
    this.#modifier = modifier
  }

  element(element: string) {
    return new Bem(this.#block, element)
  }

  modifier(modifier: string) {
    return new Bem(this.#block, this.#element, modifier)
  }

  toString() {
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    return `${this.#block}${this.#element ? `__${this.#element}` : ''}${this.#modifier ? `--${this.#modifier}` : ''}`
  }
}
