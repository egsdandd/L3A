// src/services/TextGaming/WordleGameService.js

import WordGameUtils from '../../utils/TextGaming/WordGameUtils.js'

class WordleGameService {
  /**
   * Skapar och utvärderar en Wordle-liknande spelomgång.
   * @param {string} targetWord
   * @param {string} guess
   * @returns {object}
   */
  static createWordleChallenge(targetWord, guess) {
    try {
      if (!targetWord || typeof targetWord !== 'string') {
        throw new Error('Target word is required')
      }

      const wordLength = targetWord.length
      const normalizedTarget = targetWord.toLowerCase()

      // Om ingen gissning, returnera endast spelupplägg/hint
      if (!guess) {
        return {
          success: true,
          wordLength,
          hint: `Gissa ordet (${wordLength} bokstäver)`,
          attempts: 0,
          maxAttempts: 6
        }
      }

      const normalizedGuess = guess.toLowerCase()
      if (normalizedGuess.length !== wordLength) {
        throw new Error(`Guess must be ${wordLength} letters long`)
      }

      // Grundläggande Wordle-feedback
      const result = []
      const targetLetterCount = {}
      for (let c of normalizedTarget) {
        targetLetterCount[c] = (targetLetterCount[c] || 0) + 1
      }

      // Första varvet: korrekta bokstäver på rätt plats
      for (let i = 0; i < wordLength; i++) {
        const guessedLetter = normalizedGuess[i]
        if (guessedLetter === normalizedTarget[i]) {
          result.push({ letter: guessedLetter, status: 'correct' })
          targetLetterCount[guessedLetter]--
        } else {
          result.push(null) // fylls i nästa steg
        }
      }
      // Andra varvet: kontrollera närvaro av bokstav på annan plats
      for (let i = 0; i < wordLength; i++) {
        if (result[i]) continue
        const guessedLetter = normalizedGuess[i]
        if (targetLetterCount[guessedLetter] > 0) {
          result[i] = { letter: guessedLetter, status: 'present' }
          targetLetterCount[guessedLetter]--
        } else {
          result[i] = { letter: guessedLetter, status: 'absent' }
        }
      }

      const isCorrect = normalizedGuess === normalizedTarget

      return {
        success: true,
        guess: normalizedGuess,
        result,
        isCorrect,
        targetWord: isCorrect ? normalizedTarget : undefined
      }
    } catch (error) {
      return WordleGameService.handleError(error, 'createWordleChallenge')
    }
  }

  /**
   * Felhantering och felrapport.
   * @param {Error} error
   * @param {string} operation
   * @returns {object}
   */
  static handleError(error, operation) {
    console.error(`WordleGameService.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }
}

export default WordleGameService
