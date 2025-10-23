
import { TextSearcher } from 'texttoolkit'

export class TextSearcherModule {
  /**
   * Finds the first occurrence of searchQuery in inputText.
   * @param {string} inputText
   * @param {string} searchQuery
   * @returns {string}
   */
  findFirst(inputText, searchQuery) {
    if (!this.#isValidInput(inputText, searchQuery, 'findFirst')) return ''
    return new TextSearcher(inputText).findFirst(searchQuery)
  }

  /**
   * Finds all occurrences of searchQuery in inputText.
   * @param {string} inputText
   * @param {string} searchQuery
   * @returns {Array}
   */
  findAll(inputText, searchQuery) {
    if (!this.#isValidInput(inputText, searchQuery, 'findAll')) return []
    return new TextSearcher(inputText).findAll(searchQuery)
  }

  /**
   * Counts the number of occurrences of searchQuery in inputText.
   * @param {string} inputText
   * @param {string} searchQuery
   * @returns {number}
   */
  count(inputText, searchQuery) {
    if (!this.#isValidInput(inputText, searchQuery, 'count')) return 0
    return new TextSearcher(inputText).count(searchQuery)
  }

  /**
   * Checks if searchQuery exists in inputText.
   * @param {string} inputText
   * @param {string} searchQuery
   * @returns {boolean}
   */
  exists(inputText, searchQuery) {
    if (!this.#isValidInput(inputText, searchQuery, 'exists')) return false
    return new TextSearcher(inputText).exists(searchQuery)
  }

  /**
   * Validates input for search operations.
   * @param {string} inputText
   * @param {string} searchQuery
   * @param {string} methodName
   * @returns {boolean}
   */
  #isValidInput(inputText, searchQuery, methodName) {
    if (typeof inputText !== 'string' || typeof searchQuery !== 'string') {
      console.error(`${methodName}: inputText eller searchQuery är inte en sträng:`, inputText, searchQuery)
      return false
    }
    if (!inputText.trim() || !searchQuery.trim()) {
      console.error(`${methodName}: inputText eller searchQuery är tomt`)
      return false
    }
    return true
  }
}
