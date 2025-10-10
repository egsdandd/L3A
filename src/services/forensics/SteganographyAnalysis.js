// src/services/forensics/SteganographyAnalysis.js

class SteganographyAnalysis {
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

    // Check for unusual Unicode characters (outside printable/Swedish range)
    const unusualChars = text.match(/[^\x20-\x7E\u00C0-\u017F]/g)
    if (unusualChars && unusualChars.length > 0) {
      analysis.suspicious = true
      analysis.anomalies.push(`${unusualChars.length} unusual Unicode characters detected`)
      analysis.confidence += 0.3
    }

    // Check for zero-width characters (common Unicode stego)
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

    const homoglyphs = SteganographyAnalysis.detectHomoglyphs(text)
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
        detected.push({ latin, cyrillic, positions: SteganographyAnalysis.findCharPositions(text, cyrillic) })
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
      if (text[i] === char) positions.push(i)
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

    const charFreq = SteganographyAnalysis.calculateCharacterFrequency(text)
    const expectedFreq = SteganographyAnalysis.getExpectedSwedishFrequency()

    const deviation = SteganographyAnalysis.calculateFrequencyDeviation(charFreq, expectedFreq)
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
   * Calculates suspicion level for steganography
   * @param {Array} findings - Array of findings
   * @returns {string} - Suspicion level
   */
  static calculateSuspicionLevel(findings) {
    if (findings.length === 0) return 'None'

    const avgConfidence =
      findings.reduce((sum, finding) => sum + (finding.confidence || 0), 0) / findings.length

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

export default SteganographyAnalysis
