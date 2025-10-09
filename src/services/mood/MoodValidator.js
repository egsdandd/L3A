// src/services/mood/MoodValidator.js

/**
 * Validator for mood analysis operations
 * Handles input validation and error management for mood-related functions
 */
class MoodValidator {
  /**
   * Validates text input for mood analysis
   * @param {string} text - The text to validate
   * @returns {string} - Cleaned and validated text
   * @throws {Error} - If text is invalid
   */
  static validateText(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided for mood analysis')
    }
    const cleaned = text.trim()
    if (cleaned.length === 0) {
      throw new Error('Text cannot be empty')
    }
    return cleaned
  }

  /**
   * Handles errors consistently across mood operations
   * @param {Error} error - The error object
   * @param {string} operation - The operation that failed
   * @returns {object} - Standardized error response
   */
  static handleError(error, operation) {
    console.error(`MoodEngineController.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`,
      operation
    }
  }

  /**
   * Creates a success response for mood analysis
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
   * Validates sentiment analysis parameters
   * @param {object} params - Parameters to validate
   * @returns {object} - Validated parameters
   * @throws {Error} - If parameters are invalid
   */
  static validateSentimentParams(params = {}) {
    const validated = {
      includeNeutral: params.includeNeutral ?? true,
      threshold: params.threshold ?? 0.1,
      detailed: params.detailed ?? false
    }

    if (typeof validated.threshold !== 'number' || validated.threshold < 0 || validated.threshold > 1) {
      throw new Error('Threshold must be a number between 0 and 1')
    }

    return validated
  }

  /**
   * Validates emotion detection parameters
   * @param {object} params - Parameters to validate
   * @returns {object} - Validated parameters
   */
  static validateEmotionParams(params = {}) {
    return {
      includeIntensity: params.includeIntensity ?? true,
      minConfidence: params.minConfidence ?? 0.3,
      maxEmotions: params.maxEmotions ?? 10
    }
  }
}

export default MoodValidator