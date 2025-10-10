// src/services/TextGaming/ScrambleService.js

import WordGameUtils from '../../utils/TextGaming/WordGameUtils.js'

class ScrambleService {
  /**
   * Blandar (scramblar) valda ord från texten beroende på svårighetsgrad.
   * @param {string} text
   * @param {string} difficulty - 'easy', 'medium', or 'hard'
   * @returns {object}
   */
  static scrambleWord(text, difficulty = 'medium') {
    try {
      const cleanText = WordGameUtils.validateText(text)
      const words = cleanText.split(/\s+/).filter(word => word.length > 2)

      if (words.length === 0) {
        throw new Error('No suitable words found for scrambling')
      }

      // Välj ord enligt svårighetsgrad
      let targetWords
      switch (difficulty) {
        case 'easy':
          targetWords = words.filter(word => word.length >= 3 && word.length <= 5)
          break
        case 'hard':
          targetWords = words.filter(word => word.length >= 7)
          break
        default: // medium
          targetWords = words.filter(word => word.length >= 4 && word.length <= 8)
      }

      if (targetWords.length === 0) targetWords = words

      // Välj slumpmässigt ord
      const selectedWord = WordGameUtils.chooseRandom(targetWords)

      // Blanda bokstäverna
      const scrambledLetters = WordGameUtils.shuffleArray(selectedWord.split('')).join('')

      return {
        success: true,
        scrambledWord: scrambledLetters,
        originalWord: selectedWord,
        wordLength: selectedWord.length,
        difficulty,
        hint: `Ordet har ${selectedWord.length} bokstäver och börjar med "${selectedWord[0]}"`
      }
    } catch (error) {
      return ScrambleService.handleError(error, 'scrambleWord')
    }
  }

  /**
   * Felhantering och felrespons.
   * @param {Error} error
   * @param {string} operation
   * @returns {object}
   */
  static handleError(error, operation) {
    console.error(`ScrambleService.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }
}

export default ScrambleService
