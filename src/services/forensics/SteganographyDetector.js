// src/services/forensics/SteganographyDetector.js
import ForensicsValidator from './ForensicsValidator.js'

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
      
      // Acronym detector (first letters of each sentence)
      const acronymSecret = this.detectAcronymMessage(cleanText)
      if (acronymSecret) {
        secrets.push(acronymSecret)
      }
      
      // First letter of each word
      const wordAcronym = this.detectWordAcronym(cleanText)
      if (wordAcronym) {
        secrets.push(wordAcronym)
      }
      
      // Capitalization patterns
      const capitalizationSecret = this.detectCapitalizationPattern(cleanText)
      if (capitalizationSecret) {
        secrets.push(capitalizationSecret)
      }
      
      // Number patterns
      const numberSecret = this.detectNumberPattern(cleanText)
      if (numberSecret) {
        secrets.push(numberSecret)
      }
      
      // Whitespace patterns
      const whitespaceSecret = this.detectWhitespacePattern(cleanText)
      if (whitespaceSecret) {
        secrets.push(whitespaceSecret)
      }
      
      return ForensicsValidator.createSuccessResponse({
        secretsFound: secrets.length,
        secrets: secrets,
        analysisComplete: true,
        confidence: this.calculateOverallConfidence(secrets)
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
      
      // Analyze character patterns
      const charPatterns = this.analyzeCharacterPatterns(cleanText)
      if (charPatterns.suspicious) {
        findings.push(charPatterns)
      }
      
      // Analyze spacing anomalies
      const spacingAnomalies = this.analyzeSpacingAnomalies(cleanText)
      if (spacingAnomalies.suspicious) {
        findings.push(spacingAnomalies)
      }
      
      // Analyze unicode steganography
      const unicodeStego = this.analyzeUnicodeSteganography(cleanText)
      if (unicodeStego.suspicious) {
        findings.push(unicodeStego)
      }
      
      // Analyze statistical anomalies
      const statAnomalies = this.analyzeStatisticalAnomalies(cleanText)
      if (statAnomalies.suspicious) {
        findings.push(statAnomalies)
      }
      
      const overallSuspicion = this.calculateSuspicionLevel(findings)
      
      return ForensicsValidator.createSuccessResponse({
        steganographyDetected: findings.length > 0,
        suspicionLevel: overallSuspicion,
        findings: findings,
        recommendations: this.generateSteganographyRecommendations(overallSuspicion)
      })
    } catch (error) {
      return ForensicsValidator.handleError(error, 'detect steganography')
    }
  }

  /**
   * Detects acronym messages from sentence beginnings
   * @param {string} text - Text to analyze
   * @returns {object|null} - Acronym message or null
   */
  static detectAcronymMessage(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    if (sentences.length < 3) return null
    
    const acronym = sentences.map(s => s.trim()[0]).join('').toUpperCase()
    
    if (acronym.length > 2 && /^[A-Z]+$/.test(acronym)) {
      return {
        type: 'Akronym från meningar',
        message: acronym,
        method: 'Första bokstaven i varje mening',
        confidence: this.calculateAcronymConfidence(acronym, sentences.length)
      }
    }
    
    return null
  }

  /**
   * Detects acronym from first letter of each word
   * @param {string} text - Text to analyze
   * @returns {object|null} - Word acronym or null
   */
  static detectWordAcronym(text) {
    const words = text.split(/\s+/).filter(w => w.length > 0)
    if (words.length < 5) return null
    
    const acronym = words.map(w => w[0]).join('').toUpperCase()
    
    // Check if it could be meaningful (contains vowels, reasonable length)
    if (acronym.length > 4 && acronym.length < 20 && /[AEIOUYÅÄÖ]/.test(acronym)) {
      return {
        type: 'Akronym från ord',
        message: acronym,
        method: 'Första bokstaven i varje ord',
        confidence: this.calculateAcronymConfidence(acronym, words.length)
      }
    }
    
    return null
  }

  /**
   * Detects patterns in capitalization
   * @param {string} text - Text to analyze
   * @returns {object|null} - Capitalization pattern or null
   */
  static detectCapitalizationPattern(text) {
    const chars = text.split('')
    const capitalPositions = []
    
    chars.forEach((char, index) => {
      if (/[A-ZÅÄÖ]/.test(char) && index > 0) {
        capitalPositions.push(index)
      }
    })
    
    if (capitalPositions.length < 3) return null
    
    // Check for regular patterns
    const intervals = []
    for (let i = 1; i < capitalPositions.length; i++) {
      intervals.push(capitalPositions[i] - capitalPositions[i-1])
    }
    
    const avgInterval = intervals.reduce((sum, int) => sum + int, 0) / intervals.length
    const variance = intervals.reduce((sum, int) => sum + Math.pow(int - avgInterval, 2), 0) / intervals.length
    
    // If variance is low, there might be a pattern
    if (variance < avgInterval * 0.2 && capitalPositions.length > 5) {
      return {
        type: 'Versaler mönster',
        message: `Regelbundet mönster med ${Math.round(avgInterval)} tecken mellanrum`,
        method: 'Analys av versaler positioner',
        confidence: Math.min(0.8, capitalPositions.length / 10)
      }
    }
    
    return null
  }

  /**
   * Detects patterns in numbers
   * @param {string} text - Text to analyze
   * @returns {object|null} - Number pattern or null
   */
  static detectNumberPattern(text) {
    const numbers = text.match(/\d+/g)
    if (!numbers || numbers.length < 3) return null
    
    // Check if numbers could represent ASCII codes
    const asciiCandidates = numbers.filter(num => {
      const val = parseInt(num)
      return val >= 32 && val <= 126 // Printable ASCII range
    })
    
    if (asciiCandidates.length >= 3) {
      const decoded = asciiCandidates.map(num => String.fromCharCode(parseInt(num))).join('')
      
      return {
        type: 'ASCII kod meddelande',
        message: decoded,
        method: 'Nummer tolkade som ASCII värden',
        confidence: Math.min(0.9, asciiCandidates.length / 10)
      }
    }
    
    return null
  }

  /**
   * Detects patterns in whitespace
   * @param {string} text - Text to analyze
   * @returns {object|null} - Whitespace pattern or null
   */
  static detectWhitespacePattern(text) {
    // Look for unusual spacing patterns
    const spaceRuns = text.match(/  +/g) // Multiple spaces
    if (!spaceRuns || spaceRuns.length < 3) return null
    
    const spaceCounts = spaceRuns.map(run => run.length)
    const uniqueCounts = [...new Set(spaceCounts)]
    
    // If there are distinct space lengths, might be encoding
    if (uniqueCounts.length >= 2 && uniqueCounts.length <= 4) {
      const pattern = spaceCounts.map(count => count === 2 ? '0' : '1').join('')
      
      if (pattern.length >= 8 && pattern.length % 8 === 0) {
        // Try to decode as binary
        const chunks = pattern.match(/.{8}/g)
        const decoded = chunks.map(chunk => String.fromCharCode(parseInt(chunk, 2)))
          .filter(char => char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126)
          .join('')
        
        if (decoded.length > 0) {
          return {
            type: 'Whitespace binär encoding',
            message: decoded,
            method: 'Mellanslag tolkade som binär kod',
            confidence: 0.7
          }
        }
      }
    }
    
    return null
  }

  /**
   * Analyzes character patterns for steganography
   * @param {string} text - Text to analyze
   * @returns {object} - Character pattern analysis
   */
  static analyzeCharacterPatterns(text) {
    const analysis = {
      suspicious: false,
      anomalies: [],
      confidence: 0
    }
    
    // Check for unusual Unicode characters
    const unusualChars = text.match(/[^\x20-\x7E\u00C0-\u017F]/g)
    if (unusualChars && unusualChars.length > 0) {
      analysis.suspicious = true
      analysis.anomalies.push(`${unusualChars.length} unusual Unicode characters detected`)
      analysis.confidence += 0.3
    }
    
    // Check for zero-width characters
    const zeroWidth = text.match(/[\u200B-\u200D\uFEFF]/g)
    if (zeroWidth && zeroWidth.length > 0) {
      analysis.suspicious = true
      analysis.anomalies.push(`${zeroWidth.length} zero-width characters detected`)
      analysis.confidence += 0.5
    }
    
    return analysis
  }

  /**
   * Analyzes spacing anomalies
   * @param {string} text - Text to analyze
   * @returns {object} - Spacing analysis
   */
  static analyzeSpacingAnomalies(text) {
    const analysis = {
      suspicious: false,
      anomalies: [],
      confidence: 0
    }
    
    // Check for unusual spacing patterns
    const multiSpaces = (text.match(/  +/g) || []).length
    const totalSpaces = (text.match(/ /g) || []).length
    
    if (totalSpaces > 0 && multiSpaces / totalSpaces > 0.1) {
      analysis.suspicious = true
      analysis.anomalies.push('High frequency of multiple consecutive spaces')
      analysis.confidence += 0.4
    }
    
    return analysis
  }

  /**
   * Analyzes Unicode steganography
   * @param {string} text - Text to analyze
   * @returns {object} - Unicode steganography analysis
   */
  static analyzeUnicodeSteganography(text) {
    const analysis = {
      suspicious: false,
      anomalies: [],
      confidence: 0
    }
    
    // Check for homoglyphs (visually similar characters)
    const homoglyphs = this.detectHomoglyphs(text)
    if (homoglyphs.length > 0) {
      analysis.suspicious = true
      analysis.anomalies.push(`${homoglyphs.length} potential homoglyph substitutions`)
      analysis.confidence += 0.6
    }
    
    return analysis
  }

  /**
   * Detects homoglyphs in text
   * @param {string} text - Text to analyze
   * @returns {Array} - Array of detected homoglyphs
   */
  static detectHomoglyphs(text) {
    const homoglyphPairs = [
      ['a', 'а'], ['o', 'о'], ['p', 'р'], ['c', 'с'], ['e', 'е'],
      ['x', 'х'], ['y', 'у'], ['B', 'В'], ['H', 'Н'], ['K', 'К']
    ]
    
    const detected = []
    homoglyphPairs.forEach(([latin, cyrillic]) => {
      if (text.includes(cyrillic)) {
        detected.push({ latin, cyrillic, positions: this.findCharPositions(text, cyrillic) })
      }
    })
    
    return detected
  }

  /**
   * Finds positions of a character in text
   * @param {string} text - Text to search
   * @param {string} char - Character to find
   * @returns {Array} - Array of positions
   */
  static findCharPositions(text, char) {
    const positions = []
    for (let i = 0; i < text.length; i++) {
      if (text[i] === char) {
        positions.push(i)
      }
    }
    return positions
  }

  /**
   * Analyzes statistical anomalies
   * @param {string} text - Text to analyze
   * @returns {object} - Statistical analysis
   */
  static analyzeStatisticalAnomalies(text) {
    const analysis = {
      suspicious: false,
      anomalies: [],
      confidence: 0
    }
    
    // Character frequency analysis
    const charFreq = this.calculateCharacterFrequency(text)
    const expectedFreq = this.getExpectedSwedishFrequency()
    
    const deviation = this.calculateFrequencyDeviation(charFreq, expectedFreq)
    if (deviation > 0.3) {
      analysis.suspicious = true
      analysis.anomalies.push('Unusual character frequency distribution')
      analysis.confidence += 0.3
    }
    
    return analysis
  }

  /**
   * Calculates character frequency
   * @param {string} text - Text to analyze
   * @returns {object} - Character frequency map
   */
  static calculateCharacterFrequency(text) {
    const freq = {}
    const cleanText = text.toLowerCase().replace(/[^a-zåäö]/g, '')
    
    for (const char of cleanText) {
      freq[char] = (freq[char] || 0) + 1
    }
    
    // Normalize frequencies
    const total = cleanText.length
    Object.keys(freq).forEach(char => {
      freq[char] = freq[char] / total
    })
    
    return freq
  }

  /**
   * Gets expected Swedish character frequency
   * @returns {object} - Expected frequency map
   */
  static getExpectedSwedishFrequency() {
    return {
      'e': 0.096, 'a': 0.094, 'n': 0.087, 't': 0.087, 'r': 0.084,
      's': 0.063, 'l': 0.052, 'i': 0.051, 'd': 0.045, 'o': 0.042,
      'u': 0.019, 'g': 0.028, 'k': 0.031, 'm': 0.035, 'h': 0.021,
      'f': 0.020, 'v': 0.024, 'p': 0.018, 'å': 0.018, 'ä': 0.018,
      'ö': 0.013, 'b': 0.013, 'j': 0.007, 'c': 0.015, 'y': 0.007,
      'x': 0.001, 'z': 0.001, 'q': 0.0002, 'w': 0.0014
    }
  }

  /**
   * Calculates frequency deviation
   * @param {object} observed - Observed frequencies
   * @param {object} expected - Expected frequencies
   * @returns {number} - Deviation score
   */
  static calculateFrequencyDeviation(observed, expected) {
    let totalDeviation = 0
    let charCount = 0
    
    Object.keys(expected).forEach(char => {
      if (observed[char] !== undefined) {
        totalDeviation += Math.abs(observed[char] - expected[char])
        charCount++
      }
    })
    
    return charCount > 0 ? totalDeviation / charCount : 0
  }

  /**
   * Calculates acronym confidence
   * @param {string} acronym - The acronym
   * @param {number} sourceLength - Length of source text
   * @returns {number} - Confidence score
   */
  static calculateAcronymConfidence(acronym, sourceLength) {
    let confidence = 0.5
    
    // Longer acronyms are more likely to be intentional
    if (acronym.length > 5) confidence += 0.2
    if (acronym.length > 10) confidence += 0.2
    
    // Acronyms with vowels are more likely to be words
    if (/[AEIOUYÅÄÖ]/.test(acronym)) confidence += 0.2
    
    // More source sentences give higher confidence
    if (sourceLength > 10) confidence += 0.1
    
    return Math.min(0.9, confidence)
  }

  /**
   * Calculates overall confidence for all secrets
   * @param {Array} secrets - Array of detected secrets
   * @returns {number} - Overall confidence
   */
  static calculateOverallConfidence(secrets) {
    if (secrets.length === 0) return 0
    
    const avgConfidence = secrets.reduce((sum, secret) => sum + secret.confidence, 0) / secrets.length
    const countBonus = Math.min(0.2, secrets.length * 0.1)
    
    return Math.min(0.95, avgConfidence + countBonus)
  }

  /**
   * Calculates suspicion level for steganography
   * @param {Array} findings - Array of steganography findings
   * @returns {string} - Suspicion level
   */
  static calculateSuspicionLevel(findings) {
    if (findings.length === 0) return 'None'
    
    const avgConfidence = findings.reduce((sum, finding) => sum + finding.confidence, 0) / findings.length
    
    if (avgConfidence > 0.7) return 'High'
    if (avgConfidence > 0.4) return 'Medium'
    return 'Low'
  }

  /**
   * Generates steganography recommendations
   * @param {string} suspicionLevel - Suspicion level
   * @returns {Array} - Array of recommendations
   */
  static generateSteganographyRecommendations(suspicionLevel) {
    const recommendations = []
    
    switch (suspicionLevel) {
      case 'High':
        recommendations.push('High probability of steganographic content detected')
        recommendations.push('Perform detailed forensic analysis')
        recommendations.push('Check for additional hidden layers')
        break
      case 'Medium':
        recommendations.push('Moderate suspicion of steganographic content')
        recommendations.push('Verify findings with additional tools')
        recommendations.push('Examine text encoding and formatting')
        break
      case 'Low':
        recommendations.push('Low suspicion of steganographic content')
        recommendations.push('Monitor for additional indicators')
        break
      default:
        recommendations.push('No clear steganographic indicators found')
        recommendations.push('Text appears to be clean')
    }
    
    return recommendations
  }
}

export default SteganographyDetector