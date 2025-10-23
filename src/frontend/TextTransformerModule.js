// src/frontend/TextTransformerModule.js
import { TextTransformer } from 'texttoolkit'
import { isValidInput } from './utilities/validation.js'


/**
 * @class
 */
export class TextTransformerModule {

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  reverseWords(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return ''
    }
    return new TextTransformer(inputText).reverseWordOrder()
  }

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  sortWords(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return ''
    }
    return new TextTransformer(inputText).sortWords()
  }

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  shuffleWords(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return ''
    }
    return new TextTransformer(inputText).shuffleWords()
  }
}
