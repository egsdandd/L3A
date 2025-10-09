// src/services/ReverserValidator.js

/**
 * Validator class for text reverser operations
 * Handles input validation and error management
 */
class ReverserValidator {
  /**
   * Validates text input
   * @param {string} text - The text to validate
   * @returns {string} - Cleaned and validated text
   * @throws {Error} - If text is invalid
   */
  static validateText(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided')
    }
    return text.trim()
  }

  /**
   * Handles errors consistently across reverser operations
   * @param {Error} error - The error object
   * @param {string} operation - The operation that failed
   * @returns {object} - Standardized error response
   */
  static handleError(error, operation) {
    console.error(`ReverserController.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }

  /**
   * Creates a success response
   * @param {object} data - The data to include in the response
   * @returns {object} - Standardized success response
   */
  static createSuccessResponse(data) {
    return {
      success: true,
      ...data
    }
  }
}

export default ReverserValidator