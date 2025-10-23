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
    if (!isValidInputPair(inputText, searchQuery)) {
      console.error('findFirst: inputText eller searchQuery är inte en sträng eller är tom:', inputText, searchQuery)
      return ''
    }
    return new TextSearcher(inputText).findFirst(searchQuery)
  }

  /**
   * @param {string} inputText text
   * @param {string} searchQuery s
   * @returns {Array} resultat
   */
  findAll(inputText, searchQuery) {
    if (!isValidInputPair(inputText, searchQuery)) {
      console.error('findAll: inputText eller searchQuery är inte en sträng eller är tom:', inputText, searchQuery)
      return []
    }
    return new TextSearcher(inputText).findAll(searchQuery)
  }

  /**
   * @param {string} inputText text
   * @param {string} searchQuery s
   * @returns {number} antal
   */
  count(inputText, searchQuery) {
    if (!isValidInputPair(inputText, searchQuery)) {
      console.error('count: inputText eller searchQuery är inte en sträng eller är tom:', inputText, searchQuery)
      return 0
    }
    return new TextSearcher(inputText).count(searchQuery)
  }

  /**
   * @param {string} inputText text
   * @param {string} searchQuery s
   * @returns {boolean} finns
   */
  exists(inputText, searchQuery) {
    if (!isValidInputPair(inputText, searchQuery)) {
      console.error('exists: inputText eller searchQuery är inte en sträng eller är tom:', inputText, searchQuery)
      return false
    }
    return new TextSearcher(inputText).exists(searchQuery)
  }

}
