// src/services/TextGaming/TextGuessService.js

import WordGameUtils from '../../utils/TextGaming/WordGameUtils.js'

class TextGuessService {
  /**
   * Skapar textgissningsledtrådar och statistik från inmatad text.
   * @param {string} text
   * @returns {object}
   */
  static createTextGuess(text) {
    try {
      const cleanText = WordGameUtils.validateText(text)
      const words = cleanText
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.replace(/[^\wåäö]/g, '')) // Tar bort skiljetecken men behåller svenska tecken
        .filter(word => word.length > 3)

      if (words.length === 0) {
        throw new Error('No suitable words found for clues')
      }

      // Skapa ordfrekvens
      const frequency = {}
      words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1
      })

      // Hitta de 5 vanligaste orden
      const sortedWords = Object.entries(frequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)

      // Skapar ledtrådar för varje ord
      const clues = sortedWords.map(([word, count]) => ({
        wordLength: word.length,
        frequency: count,
        firstLetter: word[0],
        lastLetter: word[word.length - 1],
        maskedWord: word[0] + '*'.repeat(word.length - 2) + word[word.length - 1]
      }))

      return {
        success: true,
        textLength: cleanText.length,
        wordCount: words.length,
        clues,
        hint: 'Gissa vad texten handlar om baserat på de vanligaste orden!'
      }
    } catch (error) {
      return TextGuessService.handleError(error, 'createTextGuess')
    }
  }

  /**
   * Felhantering och felrapport.
   * @param {Error} error
   * @param {string} operation
   * @returns {object}
   */
  static handleError(error, operation) {
    console.error(`TextGuessService.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }
}

export default TextGuessService
