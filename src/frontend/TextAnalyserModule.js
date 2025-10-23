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
    try {
      isValidInput(inputText)
    } catch {
      return 0
    }
    return new TextAnalyzer(inputText).countWords()
  }

  /**
   * @param {string} inputText text
   * @returns {number} antal
   */
  countSentences(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return 0
    }
    return new TextAnalyzer(inputText).countSentences()
  }

  /**
   * @param {string} inputText text
   * @returns {number} antal
   */
  countCharacters(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return 0
    }
    return new TextAnalyzer(inputText).countCharacters()
  }

  /**
   * @param {string} inputText text
   * @returns {object} frekvens
   */
  letterFrequency(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return {}
    }
    return new TextAnalyzer(inputText).letterFrequency()
  }

  /**
   * @param {string} inputText text
   * @returns {Array} palindromer
   */
  findPalindromes(inputText) {
    try {
      isValidInput(inputText)
    } catch {
      return []
    }
    return new TextAnalyzer(inputText).findPalindromes()
  }
}