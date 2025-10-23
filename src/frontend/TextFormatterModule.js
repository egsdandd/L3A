import { TextFormatter } from 'texttoolkit'

export class TextFormatterModule {
  #isValidInput(inputText) {
    return typeof inputText === 'string' && inputText.trim().length > 0
  }

  toUpperCase(inputText) {
    if (!this.#isValidInput(inputText)) return ''
    return new TextFormatter(inputText).toUpperCase()
  }

  toLowerCase(inputText) {
    if (!this.#isValidInput(inputText)) return ''
    return new TextFormatter(inputText).toLowerCase()
  }

  capitalize(inputText) {
    if (!this.#isValidInput(inputText)) return ''
    return new TextFormatter(inputText).capitalizeWords()
  }

  camelCase(inputText) {
    if (!this.#isValidInput(inputText)) return ''
    return new TextFormatter(inputText).toCamelCase()
  }
}