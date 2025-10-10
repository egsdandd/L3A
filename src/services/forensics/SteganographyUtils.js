// src/services/forensics/SteganographyUtils.js

class SteganographyUtils {
  /**
   * Calculates character frequency map for lowercase a-z and åäö.
   * @param {string} text - The text to analyze
   * @returns {object} - Frequency map: {char: frequency}
   */
  static calculateCharacterFrequency(text) {
    const freq = {}
    const cleanText = text.toLowerCase().replace(/[^a-zåäö]/g, '')

    for (const char of cleanText) {
      freq[char] = (freq[char] || 0) + 1
    }

    const total = cleanText.length
    if (total === 0) return freq

    Object.keys(freq).forEach(char => {
      freq[char] = freq[char] / total
    })

    return freq
  }

  /**
   * Returns expected character frequency for the Swedish alphabet.
   * @returns {object} - Expected letter frequencies in Swedish
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
   * Calculates the mean absolute deviation between two frequency maps.
   * @param {object} observed - Observed frequency map
   * @param {object} expected - Expected frequency map
   * @returns {number} - Deviation score (0 = perfect match)
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
   * Finds all positions for a given character in a string.
   * @param {string} text - Search in this string
   * @param {string} char - Character to find
   * @returns {Array<number>} - Array of found positions
   */
  static findCharPositions(text, char) {
    const positions = []
    for (let i = 0; i < text.length; i++) {
      if (text[i] === char) positions.push(i)
    }
    return positions
  }
}

export default SteganographyUtils
