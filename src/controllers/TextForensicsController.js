// src/controllers/TextForensicsController.js
import texttoolkit from 'texttoolkit'
import AuthorshipAnalyzer from '../services/forensics/AuthorshipAnalyzer.js'
import CipherDetector from '../services/forensics/CipherDetector.js'
import PlagiarismChecker from '../services/forensics/PlagiarismChecker.js'
import SteganographyDetector from '../services/forensics/SteganographyDetector.js'
import ForensicsValidator from '../services/forensics/ForensicsValidator.js'

/** Main controller for text forensics analysis */
class TextForensicsController {
  /** Creates a new TextForensicsController instance */
  constructor() {
    // Private cache for TextDocument instances for better performance
    this.#textDocumentCache = new Map()
    this.#lastText = null
  }

  // Private attributes
  #textDocumentCache
  #lastText

  /**
   * @param {string} text Text
   * @returns {object} TextDocument instance
   */
  #getTextDocument(text) {
    if (this.#lastText === text && this.#textDocumentCache.has(text)) {
      return this.#textDocumentCache.get(text)
    }
    
    const textDoc = new texttoolkit(text)
    this.#textDocumentCache.set(text, textDoc)
    this.#lastText = text
    
    // Limit cache size
    if (this.#textDocumentCache.size > 10) {
      const firstKey = this.#textDocumentCache.keys().next().value
      this.#textDocumentCache.delete(firstKey)
    }
    
    return textDoc
  }

  // Public methods delegating to specialized services

  /**
   * @param {string} text1 First text
   * @param {string} text2 Second text
   * @returns {object} Analysis result
   */
  async analyzeAuthorship(text1, text2) {
    return await AuthorshipAnalyzer.analyzeAuthorship(text1, text2)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Style fingerprint
   */
  async createStyleFingerprint(text) {
    return await AuthorshipAnalyzer.createStyleFingerprint(text)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Secret messages found
   */
  async detectSecretMessage(text) {
    return await SteganographyDetector.detectSecretMessage(text)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Steganography detection results
   */
  async detectSteganography(text) {
    return await SteganographyDetector.detectSteganography(text)
  }

  /**
   * @param {string} text Text to decode
   * @param {string} cipherType Cipher type
   * @returns {object} Decoded results
   */
  async decodeCipher(text, cipherType = 'caesar') {
    return await CipherDetector.decodeCipher(text, cipherType)
  }

  /**
   * @param {string} originalText Original text
   * @param {string} suspectText Suspect text
   * @param {number} threshold Similarity threshold
   * @returns {object} Plagiarism results
   */
  async checkPlagiarism(originalText, suspectText, threshold = 0.8) {
    return await PlagiarismChecker.checkPlagiarism(originalText, suspectText, threshold)
  }

  /**
   * @param {string} text Text to analyze
   * @param {object} options Analysis options
   * @returns {object} Complete forensic report
   */
  async analyzeForensicsComprehensive(text, options = {}) {
    try {
      const cleanText = ForensicsValidator.validateText(text)
      
      // Determine which analyses to run
      const runSecretDetection = options.detectSecrets !== false
      const runSteganography = options.detectSteganography !== false
      const runCipherDetection = options.detectCiphers !== false
      const runStyleAnalysis = options.analyzeStyle !== false
      
      const analyses = {}
      
      // Run selected analyses in parallel
      const promises = []
      
      if (runSecretDetection) {
        promises.push(
          this.detectSecretMessage(cleanText).then(result => ({ key: 'secretMessages', result }))
        )
      }
      
      if (runSteganography) {
        promises.push(
          this.detectSteganography(cleanText).then(result => ({ key: 'steganography', result }))
        )
      }
      
      if (runCipherDetection) {
        promises.push(
          this.decodeCipher(cleanText, 'all').then(result => ({ key: 'cipherDecoding', result }))
        )
      }
      
      if (runStyleAnalysis) {
        promises.push(
          this.createStyleFingerprint(cleanText).then(result => ({ key: 'styleFingerprint', result }))
        )
      }
      
      // Wait for all analyses to complete
      const results = await Promise.all(promises)
      
      // Organize results
      results.forEach(({ key, result }) => {
        analyses[key] = result.success ? result : { error: result.error }
      })
      
      // Generate overall assessment
      const overallAssessment = this.#generateOverallAssessment(analyses)
      
      return ForensicsValidator.createSuccessResponse({
        comprehensive: analyses,
        assessment: overallAssessment,
        textStats: this.#getTextStats(cleanText),
        options: options
      })
    } catch (error) {
      return ForensicsValidator.handleError(error, 'analyze forensics comprehensive')
    }
  }

  /**
   * @param {object} analyses All analysis results
   * @returns {object} Overall assessment
   */
  #generateOverallAssessment(analyses) {
    const assessment = {
      suspicionLevel: 'None',
      findings: [],
      recommendations: [],
      confidence: 0
    }

    let totalSuspicion = 0
    let analysisCount = 0

    try {
      // Evaluate secret messages
      if (analyses.secretMessages && !analyses.secretMessages.error) {
        if (analyses.secretMessages.secretsFound > 0) {
          assessment.findings.push(`${analyses.secretMessages.secretsFound} potential hidden messages detected`)
          totalSuspicion += analyses.secretMessages.confidence || 0.5
        }
        analysisCount++
      }

      // Evaluate steganography
      if (analyses.steganography && !analyses.steganography.error) {
        if (analyses.steganography.steganographyDetected) {
          assessment.findings.push(`Steganographic content detected (${analyses.steganography.suspicionLevel} suspicion)`)
          totalSuspicion += this.#convertSuspicionToScore(analyses.steganography.suspicionLevel)
        }
        analysisCount++
      }

      // Evaluate cipher decoding
      if (analyses.cipherDecoding && !analyses.cipherDecoding.error) {
        if (analyses.cipherDecoding.bestGuess && analyses.cipherDecoding.bestGuess.confidence > 0.7) {
          assessment.findings.push('High-confidence cipher decoding available')
          totalSuspicion += analyses.cipherDecoding.bestGuess.confidence
        }
        analysisCount++
      }

      // Evaluate style fingerprint
      if (analyses.styleFingerprint && !analyses.styleFingerprint.error) {
        const style = analyses.styleFingerprint.fingerprint?.writingStyle
        if (style) {
          assessment.findings.push(`Writing style identified as: ${style}`)
        }
        analysisCount++
      }

      // Calculate overall suspicion
      const avgSuspicion = analysisCount > 0 ? totalSuspicion / analysisCount : 0
      assessment.suspicionLevel = this.#calculateSuspicionLevel(avgSuspicion)
      assessment.confidence = Math.min(0.95, avgSuspicion)

      // Generate recommendations
      assessment.recommendations = this.#generateForensicRecommendations(assessment, analyses)

    } catch (error) {
      console.warn('Error generating overall assessment:', error)
      assessment.findings.push('Assessment generation incomplete due to analysis errors')
    }

    return assessment
  }

  /**
   * @param {string} suspicionLevel Suspicion level string
   * @returns {number} Numerical score
   */
  #convertSuspicionToScore(suspicionLevel) {
    const levels = {
      'None': 0,
      'Low': 0.3,
      'Medium': 0.6,
      'High': 0.9
    }
    return levels[suspicionLevel] || 0
  }

  /**
   * @param {number} score Average suspicion score
   * @returns {string} Suspicion level
   */
  #calculateSuspicionLevel(score) {
    if (score > 0.7) return 'High'
    if (score > 0.4) return 'Medium'
    if (score > 0.1) return 'Low'
    return 'None'
  }

  /**
   * @param {object} assessment Overall assessment
   * @param {object} analyses All analysis results
   * @returns {Array} Array of recommendations
   */
  #generateForensicRecommendations(assessment, analyses) {
    const recommendations = []

    if (assessment.suspicionLevel === 'High') {
      recommendations.push('Multiple forensic indicators detected - detailed investigation recommended')
      recommendations.push('Consider professional forensic analysis')
      recommendations.push('Preserve original text for evidence')
    } else if (assessment.suspicionLevel === 'Medium') {
      recommendations.push('Some forensic indicators detected - further analysis recommended')
      recommendations.push('Cross-reference findings with additional tools')
    } else if (assessment.suspicionLevel === 'Low') {
      recommendations.push('Minor forensic indicators detected - monitor for additional evidence')
    } else {
      recommendations.push('No significant forensic indicators detected')
      recommendations.push('Text appears to be standard content')
    }

    // Add specific recommendations from individual analyses
    Object.values(analyses).forEach(analysis => {
      if (analysis.recommendations) {
        recommendations.push(...analysis.recommendations.slice(0, 2)) // Top 2 from each
      }
    })

    // Remove duplicates and limit to reasonable number
    return [...new Set(recommendations)].slice(0, 8)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Text statistics
   */
  #getTextStats(text) {
    const words = text.split(/\s+/)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    const characters = text.length
    
    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      characterCount: characters,
      averageWordsPerSentence: sentences.length > 0 ? Math.round((words.length / sentences.length) * 100) / 100 : 0,
      averageCharactersPerWord: words.length > 0 ? Math.round((characters / words.length) * 100) / 100 : 0
    }
  }
}

export default TextForensicsController