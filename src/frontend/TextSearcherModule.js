import { TextSearcher } from 'texttoolkit'
import { isValidInputPair } from './utilities/validation.js'

// src/frontend/TextSearcherModule.js
/**
 *
 */
export class TextSearcherModule {
  /**
   * @param {string} inputText text
   * @param {string} searchQuery s
   * @returns {string} resultat
   */
  findFirst(inputText, searchQuery) {
    isValidInputPair(inputText, searchQuery)
    return new TextSearcher(inputText).findFirst(searchQuery)
  }

  /**
   * @param {string} inputText text
   * @param {string} searchQuery s
   * @returns {Array} resultat
   */
  findAll(inputText, searchQuery) {
    isValidInputPair(inputText, searchQuery)
    return new TextSearcher(inputText).findAll(searchQuery)
  }

  /**
   * @param {string} inputText text
   * @param {string} searchQuery s
   * @returns {number} antal
   */
  count(inputText, searchQuery) {
    isValidInputPair(inputText, searchQuery)
    return new TextSearcher(inputText).count(searchQuery)
  }

  /**
   * @param {string} inputText text
   * @param {string} searchQuery s
   * @returns {boolean} finns
   */
  exists(inputText, searchQuery) {
    isValidInputPair(inputText, searchQuery)
    return new TextSearcher(inputText).exists(searchQuery)
  }

}
