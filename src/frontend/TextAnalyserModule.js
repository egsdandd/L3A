// src/frontend/TextAnalyserModule.js

import { TextAnalyzer } from 'texttoolkit'
import { isValidInput } from './utilities/validation.js'

/**
 * @class
 */
export class TextAnalyzerModule {

  /**
   * @param {string} inputText text
   * @returns {number} antal
   */
  countWords(inputText) {
    if (!isValidInput(inputText)) return 0
    return new TextAnalyzer(inputText).countWords()
  }

  /**
   * @param {string} inputText text
   * @returns {number} antal
   */
  countSentences(inputText) {
    if (!isValidInput(inputText)) return 0
    return new TextAnalyzer(inputText).countSentences()
  }

  /**
   * @param {string} inputText text
   * @returns {number} antal
   */
  countCharacters(inputText) {
    if (!isValidInput(inputText)) return 0
    return new TextAnalyzer(inputText).countCharacters()
  }

  /**
   * @param {string} inputText text
   * @returns {object} frekvens
   */
  letterFrequency(inputText) {
    if (!isValidInput(inputText)) return {}
    return new TextAnalyzer(inputText).letterFrequency()
  }

  /**
   * @param {string} inputText text
   * @returns {Array} palindromer
   */
  findPalindromes(inputText) {
    if (!isValidInput(inputText)) return []
    return new TextAnalyzer(inputText).findPalindromes()
  }
}