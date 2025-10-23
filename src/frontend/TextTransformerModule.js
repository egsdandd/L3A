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
    if (!isValidInput(inputText)) return ''
    return new TextTransformer(inputText).reverseWordOrder()
  }

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  sortWords(inputText) {
    if (!isValidInput(inputText)) return ''
    return new TextTransformer(inputText).sortWords()
  }

  /**
   * @param {string} inputText text
   * @returns {string} resultat
   */
  shuffleWords(inputText) {
    if (!isValidInput(inputText)) return ''
    return new TextTransformer(inputText).shuffleWords()
  }
}
