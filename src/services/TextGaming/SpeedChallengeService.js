// src/services/TextGaming/SpeedChallengeService.js

import WordGameUtils from '../../utils/TextGaming/WordGameUtils.js'

class SpeedChallengeService {
  /**
   * Beräknar skrivhastighet, tecken/min och enkel noggrannhet.
   * @param {string} writtenText 
   * @param {number} timeInSeconds 
   * @returns {object}
   */
  static calculateSpeed(writtenText, timeInSeconds) {
    try {
      const cleanText = WordGameUtils.validateText(writtenText)

      if (!writtenText || !timeInSeconds || isNaN(timeInSeconds) || timeInSeconds <= 0) {
        throw new Error('Written text and valid time are required')
      }

      const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length
      const wordsPerMinute = Math.round((wordCount / timeInSeconds) * 60)
      const charactersPerMinute = Math.round((cleanText.length / timeInSeconds) * 60)

      // Enkel noggrannhet: räknar extra mellanslag som "fel"
      const extraSpaces = (cleanText.match(/\s{2,}/g) || []).length
      const accuracy = Math.max(
        0,
        Math.round((wordCount / (wordCount + extraSpaces)) * 100)
      )

      return {
        success: true,
        wordCount,
        timeInSeconds,
        wordsPerMinute,
        charactersPerMinute,
        performance: WordGameUtils.getPerformanceRating(wordsPerMinute),
        accuracy
      }
    } catch (error) {
      return SpeedChallengeService.handleError(error, 'calculateSpeed')
    }
  }

  /**
   * Felhantering och felrapport.
   * @param {Error} error 
   * @param {string} operation 
   * @returns {object}
   */
  static handleError(error, operation) {
    console.error(`SpeedChallengeService.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }
}

export default SpeedChallengeService
