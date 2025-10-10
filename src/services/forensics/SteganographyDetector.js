// src/services/forensics/SteganographyDetector.js
import ForensicsValidator from './ForensicsValidator.js'
import SteganographyDetectorHelpers from './SteganographyDetectorHelpers.js'
import SteganographyAnalysis from './SteganographyAnalysis.js'

/**
 * Steganography and hidden message detection service
 * Provides detection of hidden messages and steganographic content
 */
class SteganographyDetector {
  /**
   * Detects hidden messages in text
   * @param {string} text - Text to analyze for hidden messages
   * @returns {object} - Hidden message detection results
   */
  static async detectSecretMessage(text) {
    try {
      const cleanText = ForensicsValidator.validateText(text)
      const secrets = []

      const acronymSecret = SteganographyDetectorHelpers.detectAcronymMessage(cleanText)
      if (acronymSecret) secrets.push(acronymSecret)

      const wordAcronym = SteganographyDetectorHelpers.detectWordAcronym(cleanText)
      if (wordAcronym) secrets.push(wordAcronym)

      const capitalizationSecret = SteganographyDetectorHelpers.detectCapitalizationPattern(cleanText)
      if (capitalizationSecret) secrets.push(capitalizationSecret)

      const numberSecret = SteganographyDetectorHelpers.detectNumberPattern(cleanText)
      if (numberSecret) secrets.push(numberSecret)

      const whitespaceSecret = SteganographyDetectorHelpers.detectWhitespacePattern(cleanText)
      if (whitespaceSecret) secrets.push(whitespaceSecret)

      return ForensicsValidator.createSuccessResponse({
        secretsFound: secrets.length,
        secrets: secrets,
        analysisComplete: true,
        confidence: SteganographyDetectorHelpers.calculateOverallConfidence(secrets)
      })
    } catch (error) {
      return ForensicsValidator.handleError(error, 'detect secret message')
    }
  }

  /**
   * Detects steganography in text
   * @param {string} text - Text to analyze for steganography
   * @returns {object} - Steganography detection results
   */
  static async detectSteganography(text) {
    try {
      const cleanText = ForensicsValidator.validateText(text)
      const findings = []

      const charPatterns = SteganographyAnalysis.analyzeCharacterPatterns(cleanText)
      if (charPatterns.suspicious) findings.push(charPatterns)

      const spacingAnomalies = SteganographyAnalysis.analyzeSpacingAnomalies(cleanText)
      if (spacingAnomalies.suspicious) findings.push(spacingAnomalies)

      const unicodeStego = SteganographyAnalysis.analyzeUnicodeSteganography(cleanText)
      if (unicodeStego.suspicious) findings.push(unicodeStego)

      const statAnomalies = SteganographyAnalysis.analyzeStatisticalAnomalies(cleanText)
      if (statAnomalies.suspicious) findings.push(statAnomalies)

      const overallSuspicion = SteganographyAnalysis.calculateSuspicionLevel(findings)

      return ForensicsValidator.createSuccessResponse({
        steganographyDetected: findings.length > 0,
        suspicionLevel: overallSuspicion,
        findings: findings,
        recommendations: SteganographyAnalysis.generateSteganographyRecommendations(overallSuspicion)
      })
    } catch (error) {
      return ForensicsValidator.handleError(error, 'detect steganography')
    }
  }
}

export default SteganographyDetector
