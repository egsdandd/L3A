// src/services/TextGaming/AnagramService.js

import { swedishWords } from '../../utils/TextGaming/WordData.js'
import WordGameUtils from '../../utils/TextGaming/WordGameUtils.js'

class AnagramService {
  /**
   * Löser möjliga svenska ord från givna bokstäver.
   * @param {string} letters
   * @returns {object}
   */
  static solveAnagram(letters) {
    try {
      if (!letters || typeof letters !== 'string') {
        throw new Error('Letters are required')
      }

      const availableLetters = letters.toLowerCase().split('')
      const possibleWords = swedishWords.filter(word =>
        WordGameUtils.canFormWord(word, availableLetters)
      )

      return {
        success: true,
        letters,
        foundWords: possibleWords.sort((a, b) => b.length - a.length),
        count: possibleWords.length
      }
    } catch (error) {
      return AnagramService.handleError(error, 'solveAnagram')
    }
  }

  /**
   * Felfångst och felrespons.
   * @param {Error} error
   * @param {string} operation
   * @returns {object}
   */
  static handleError(error, operation) {
    console.error(`AnagramService.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }
}

export default AnagramService
