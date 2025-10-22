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
  toUpperCase(text) {
    if (typeof text !== 'string') {
      console.error('toUpperCase: text är inte en sträng:', text)
      return ''
    }
    if (!text.trim()) {
      console.error('toUpperCase: text är tomt')
      return ''
    }
    return new TextFormatter(text).toUpperCase()
  }

  /**
   *
   * @param text
   */
  toLowerCase(text) {
    if (typeof text !== 'string') {
      console.error('toLowerCase: text är inte en sträng:', text)
      return ''
    }
    if (!text.trim()) {
      console.error('toLowerCase: text är tomt')
      return ''
    }
    return new TextFormatter(text).toLowerCase()
  }

  /**
   *
   * @param text
   */
  capitalize(text) {
    if (typeof text !== 'string') {
      console.error('capitalize: text är inte en sträng:', text)
      return ''
    }
    if (!text.trim()) {
      console.error('capitalize: text är tomt')
      return ''
    }
    return new TextFormatter(text).capitalizeWords()
  }

  /**
   *
   * @param text
   */
  camelCase(text) {
    if (typeof text !== 'string') {
      console.error('camelCase: text är inte en sträng:', text)
      return ''
    }
    if (!text.trim()) {
      console.error('camelCase: text är tomt')
      return ''
    }
    return new TextFormatter(text).toCamelCase()
  }
}