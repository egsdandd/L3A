// src/frontend/TextFormatterModule.js
import { TextFormatter } from 'texttoolkit'

/**
 *
 */
export class TextFormatterModule {
  /**
   *
   * @param text
   */
  toUpperCase(inputText) {
    if (typeof inputText !== 'string') {
      console.error('toUpperCase: inputText är inte en sträng:', inputText)
      return ''
    }
    if (!inputText.trim()) {
      console.error('toUpperCase: inputText är tomt')
      return ''
    }
    return new TextFormatter(inputText).toUpperCase()
  }

  /**
   *
   * @param text
   */
  toLowerCase(inputText) {
    if (typeof inputText !== 'string') {
      console.error('toLowerCase: inputText är inte en sträng:', inputText)
      return ''
    }
    if (!inputText.trim()) {
      console.error('toLowerCase: inputText är tomt')
      return ''
    }
    return new TextFormatter(inputText).toLowerCase()
  }

  /**
   *
   * @param text
   */
  capitalize(inputText) {
    if (typeof inputText !== 'string') {
      console.error('capitalize: inputText är inte en sträng:', inputText)
      return ''
    }
    if (!inputText.trim()) {
      console.error('capitalize: inputText är tomt')
      return ''
    }
    return new TextFormatter(inputText).capitalizeWords()
  }

  /**
   *
   * @param text
   */
  camelCase(inputText) {
    if (typeof inputText !== 'string') {
      console.error('camelCase: inputText är inte en sträng:', inputText)
      return ''
    }
    if (!inputText.trim()) {
      console.error('camelCase: inputText är tomt')
      return ''
    }
    return new TextFormatter(inputText).toCamelCase()
  }
}