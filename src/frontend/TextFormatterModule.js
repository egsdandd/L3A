// src/frontend/TextFormatterModule.js
import { TextFormatter } from 'texttoolkit'
import { isValidInput } from './utilities/validation.js'

/**
 * @class
 */
export class TextFormatterModule {

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  toUpperCase(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return ''
    }
    return new TextFormatter(inputText).toUpperCase()
  }

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  toLowerCase(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return ''
    }
    return new TextFormatter(inputText).toLowerCase()
  }

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  capitalize(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return ''
    }
    return new TextFormatter(inputText).capitalizeWords()
  }

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  camelCase(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return ''
    }
    return new TextFormatter(inputText).toCamelCase()
  }
}