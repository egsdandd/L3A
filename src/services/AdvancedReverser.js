// src/services/AdvancedReverser.js
import ReverserValidator from './ReverserValidator.js'

/**
 * Advanced text reversal and transformation operations
 * Handles complex manipulations and encoding operations
 */
class AdvancedReverser {
  /**
   * Reverses the order of sentences in the text
   * @param {string} text - The text to reverse
   * @returns {object} - Result with original and reversed text
   */
  static async reverseSentences(text) {
    try {
      const cleanText = ReverserValidator.validateText(text)
      const sentences = cleanText.split(/([.!?]+\s*)/)
      const reversedSentences = []
      
      // Group sentences with their punctuation
      for (let i = 0; i < sentences.length; i += 2) {
        const sentence = sentences[i] || ''
        const punctuation = sentences[i + 1] || ''
        if (sentence.trim()) {
          reversedSentences.unshift(sentence + punctuation)
        }
      }
      
      return ReverserValidator.createSuccessResponse({
        original: cleanText,
        reversed: reversedSentences.join('')
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'reverse sentences')
    }
  }

  /**
   * Creates a mirror effect by alternating characters
   * @param {string} text - The text to mirror
   * @returns {object} - Result with original and mirrored text
   */
  static async mirrorText(text) {
    try {
      const cleanText = ReverserValidator.validateText(text)
      const chars = cleanText.split('')
      const mirrored = chars.map((char, index) => {
        return index % 2 === 0 ? char : chars[chars.length - 1 - index] || char
      }).join('')
      
      return ReverserValidator.createSuccessResponse({
        original: cleanText,
        mirrored
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'mirror text')
    }
  }

  /**
   * Applies ROT13 encoding to the text
   * @param {string} text - The text to encode
   * @returns {object} - Result with original and ROT13 encoded text
   */
  static async rot13(text) {
    try {
      const cleanText = ReverserValidator.validateText(text)
      const rot13 = cleanText.replace(/[a-zA-Z]/g, char => {
        const start = char <= 'Z' ? 65 : 97
        return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
      })
      
      return ReverserValidator.createSuccessResponse({
        original: cleanText,
        rot13
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'apply ROT13')
    }
  }

  /**
   * Checks if the text is a palindrome
   * @param {string} text - The text to check
   * @returns {object} - Result with palindrome analysis
   */
  static async checkPalindrome(text) {
    try {
      const cleanText = ReverserValidator.validateText(text)
      const normalized = cleanText.toLowerCase().replace(/[^a-zåäö]/g, '')
      const reversed = normalized.split('').reverse().join('')
      const isPalindrome = normalized === reversed
      
      return ReverserValidator.createSuccessResponse({
        original: cleanText,
        normalized,
        reversed,
        isPalindrome
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'check palindrome')
    }
  }
}

export default AdvancedReverser