// src/services/TextReverser.js
import ReverserValidator from './ReverserValidator.js'

/** Basic text reversal operations */
class TextReverser {
  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with original and reversed text
   */
  static async reverseText(text) {
    try {
      const cleanText = ReverserValidator.validateText(text)
      const reversed = cleanText.split('').reverse().join('')
      
      return ReverserValidator.createSuccessResponse({
        original: cleanText,
        reversed
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'reverse text')
    }
  }

  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with original and reversed text
   */
  static async reverseWords(text) {
    try {
      const cleanText = ReverserValidator.validateText(text)
      const words = cleanText.split(/(\s+)/) // Preserves whitespace
      const reversedWords = words.map(word => {
        if (/\s/.test(word)) return word // Keep whitespace
        return word.split('').reverse().join('')
      })
      
      return ReverserValidator.createSuccessResponse({
        original: cleanText,
        reversed: reversedWords.join('')
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'reverse words')
    }
  }

  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with original and reversed text
   */
  static async reverseWordOrder(text) {
    try {
      const cleanText = ReverserValidator.validateText(text)
      const words = cleanText.split(/\s+/)
      const reversed = words.reverse().join(' ')
      
      return ReverserValidator.createSuccessResponse({
        original: cleanText,
        reversed
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'reverse word order')
    }
  }

  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with original and reversed text
   */
  static async reverseLines(text) {
    try {
      const cleanText = ReverserValidator.validateText(text)
      const lines = cleanText.split('\n')
      const reversed = lines.reverse().join('\n')
      
      return ReverserValidator.createSuccessResponse({
        original: cleanText,
        reversed
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'reverse lines')
    }
  }
}

export default TextReverser