// src/controllers/ReverserController.js
import texttoolkit from 'texttoolkit'
import TextReverser from '../services/TextReverser.js'
import AdvancedReverser from '../services/AdvancedReverser.js'
import ComplexReverser from '../services/ComplexReverser.js'
import ReverserValidator from '../services/ReverserValidator.js'

/** Main controller for text reversal operations */
class ReverserController {
  /** Creates a new ReverserController instance */
  constructor() {
    // Private cache for TextDocument instances
    this.#textDocumentCache = new Map()
    this.#lastText = ''
  }

  // Private attributes
  #textDocumentCache
  #lastText

  /**
   * @param {string} text Text
   * @returns {object} TextDocument instance
   */
  #getTextDocument(text) {
    const cleanText = ReverserValidator.validateText(text)
    
    // Use cache if same text
    if (cleanText === this.#lastText && this.#textDocumentCache.has('current')) {
      return this.#textDocumentCache.get('current')
    }
    
    const textDoc = new texttoolkit(cleanText)
    this.#textDocumentCache.set('current', textDoc)
    this.#lastText = cleanText
    
    return textDoc
  }

  // Public methods delegating to specialized services

  /**
   * @param {string} text Text to count words in
   * @returns {object} Result with word count
   */
  async countWords(text) {
    try {
      const textDoc = this.#getTextDocument(text)
      const count = textDoc.countWords()
      
      return ReverserValidator.createSuccessResponse({ count })
    } catch (error) {
      return ReverserValidator.handleError(error, 'count words')
    }
  }

  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with reversed text
   */
  async reverseText(text) {
    return await TextReverser.reverseText(text)
  }

  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with words reversed
   */
  async reverseWords(text) {
    return await TextReverser.reverseWords(text)
  }

  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with word order reversed
   */
  async reverseWordOrder(text) {
    return await TextReverser.reverseWordOrder(text)
  }

  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with line order reversed
   */
  async reverseLines(text) {
    return await TextReverser.reverseLines(text)
  }

  /**
   * @param {string} text Text to reverse
   * @returns {object} Result with sentence order reversed
   */
  async reverseSentences(text) {
    return await AdvancedReverser.reverseSentences(text)
  }

  /**
   * @param {string} text Text to mirror
   * @returns {object} Result with mirrored text
   */
  async mirrorText(text) {
    return await AdvancedReverser.mirrorText(text)
  }

  /**
   * @param {string} text Text to encode
   * @returns {object} Result with ROT13 encoded text
   */
  async rot13(text) {
    return await AdvancedReverser.rot13(text)
  }

  /**
   * @param {string} text Text to check
   * @returns {object} Result with palindrome analysis
   */
  async checkPalindrome(text) {
    return await AdvancedReverser.checkPalindrome(text)
  }

  /**
   * @param {string} text Text to process
   * @param {Array} operations Array of operations
   * @returns {object} Result with complex reversal
   */
  async complexReverse(text, operations) {
    return await ComplexReverser.complexReverse(text, operations)
  }
}

export default ReverserController