// src/services/forensics/SteganographyDetectorHelpers.js

class SteganographyDetectorHelpers {
  /**
   * Detects acronym messages from sentence beginnings
   * @param {string} text - Text to analyze
   * @returns {object|null} - Acronym message or null
   */
  static detectAcronymMessage(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    if (sentences.length < 3) return null

    const acronym = sentences.map(s => s.trim()[0]).join('').toUpperCase()

    if (acronym.length > 2 && /^[A-ZÅÄÖ]+$/.test(acronym)) {
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

    if (
      acronym.length > 4 &&
      acronym.length < 20 &&
      /[AEIOUYÅÄÖ]/.test(acronym)
    ) {
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

    const intervals = []
    for (let i = 1; i < capitalPositions.length; i++) {
      intervals.push(capitalPositions[i] - capitalPositions[i - 1])
    }

    const avgInterval =
      intervals.reduce((sum, int) => sum + int, 0) / intervals.length
    const variance =
      intervals.reduce(
        (sum, int) => sum + Math.pow(int - avgInterval, 2),
        0
      ) / intervals.length

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

    const asciiCandidates = numbers.filter(num => {
      const val = parseInt(num)
      return val >= 32 && val <= 126 // Printable ASCII range
    })

    if (asciiCandidates.length >= 3) {
      const decoded = asciiCandidates
        .map(num => String.fromCharCode(parseInt(num)))
        .join('')

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
    const spaceRuns = text.match(/  +/g) // Multiple spaces
    if (!spaceRuns || spaceRuns.length < 3) return null

    const spaceCounts = spaceRuns.map(run => run.length)
    const uniqueCounts = [...new Set(spaceCounts)]

    if (uniqueCounts.length >= 2 && uniqueCounts.length <= 4) {
      const pattern = spaceCounts.map(count => (count === 2 ? '0' : '1')).join('')

      if (pattern.length >= 8 && pattern.length % 8 === 0) {
        const chunks = pattern.match(/.{8}/g)
        const decoded = chunks
          .map(chunk => String.fromCharCode(parseInt(chunk, 2)))
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
   * Calculates acronym confidence
   * @param {string} acronym - The acronym
   * @param {number} sourceLength - Length of source text
   * @returns {number} - Confidence score
   */
  static calculateAcronymConfidence(acronym, sourceLength) {
    let confidence = 0.5

    if (acronym.length > 5) confidence += 0.2
    if (acronym.length > 10) confidence += 0.2

    if (/[AEIOUYÅÄÖ]/.test(acronym)) confidence += 0.2

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

    const avgConfidence =
      secrets.reduce((sum, secret) => sum + (secret.confidence || 0), 0) / secrets.length
    const countBonus = Math.min(0.2, secrets.length * 0.1)

    return Math.min(0.95, avgConfidence + countBonus)
  }
}

export default SteganographyDetectorHelpers
