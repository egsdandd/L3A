// src/services/forensics/ForensicsValidator.js

/**
 * Validator for text forensics operations
 * Handles input validation and error management for forensics analysis
 */
class ForensicsValidator {
  /**
   * Validates text input for forensics analysis
   * @param {string} text - The text to validate
   * @returns {string} - Cleaned and validated text
   * @throws {Error} - If text is invalid
   */
  static validateText(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided for forensics analysis')
    }
    const cleaned = text.trim()
    if (cleaned.length === 0) {
      throw new Error('Text cannot be empty')
    }
    return cleaned
  }

  /**
   * Validates two texts for comparison
   * @param {string} text1 - First text
   * @param {string} text2 - Second text
   * @returns {object} - Validated texts
   * @throws {Error} - If texts are invalid
   */
  static validateComparisonTexts(text1, text2) {
    const cleanText1 = this.validateText(text1)
    const cleanText2 = this.validateText(text2)
    
    if (cleanText1.length < 10 || cleanText2.length < 10) {
      throw new Error('Texts must be at least 10 characters long for comparison')
    }
    
    return { text1: cleanText1, text2: cleanText2 }
  }

  /**
   * Validates cipher parameters
   * @param {string} text - Text to decode
   * @param {string} cipherType - Type of cipher
   * @returns {object} - Validated parameters
   * @throws {Error} - If parameters are invalid
   */
  static validateCipherParams(text, cipherType) {
    const cleanText = this.validateText(text)
    const validCiphers = ['caesar', 'atbash', 'reverse', 'morse', 'base64']
    
    if (!validCiphers.includes(cipherType.toLowerCase())) {
      throw new Error(`Invalid cipher type. Supported types: ${validCiphers.join(', ')}`)
    }
    
    return { text: cleanText, cipherType: cipherType.toLowerCase() }
  }

  /**
   * Handles errors consistently across forensics operations
   * @param {Error} error - The error object
   * @param {string} operation - The operation that failed
   * @returns {object} - Standardized error response
   */
  static handleError(error, operation) {
    console.error(`TextForensicsController.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`,
      operation
    }
  }

  /**
   * Creates a success response for forensics analysis
   * @param {object} data - The data to include in the response
   * @returns {object} - Standardized success response
   */
  static createSuccessResponse(data) {
    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...data
    }
  }

  /**
   * Validates similarity threshold
   * @param {number} threshold - Similarity threshold (0-1)
   * @returns {number} - Validated threshold
   */
  static validateSimilarityThreshold(threshold = 0.8) {
    if (typeof threshold !== 'number' || threshold < 0 || threshold > 1) {
      throw new Error('Similarity threshold must be a number between 0 and 1')
    }
    return threshold
  }

  /**
   * Validates analysis confidence level
   * @param {number} confidence - Confidence level (0-1)
   * @returns {string} - Confidence description
   */
  static getConfidenceLevel(confidence) {
    if (confidence >= 0.9) return 'Very High'
    if (confidence >= 0.7) return 'High'
    if (confidence >= 0.5) return 'Medium'
    if (confidence >= 0.3) return 'Low'
    return 'Very Low'
  }
}

export default ForensicsValidator