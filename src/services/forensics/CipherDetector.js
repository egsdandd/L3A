// src/services/forensics/CipherDetector.js
import ForensicsValidator from './ForensicsValidator.js'

/**
 * Cipher detection and decoding service
 * Provides various cipher decoding capabilities for forensic analysis
 */
class CipherDetector {
  /**
   * Decodes various types of ciphers
   * @param {string} text - Text to decode
   * @param {string} cipherType - Type of cipher ('caesar', 'atbash', 'reverse', 'morse', 'base64', 'all')
   * @returns {object} - Results with decoded alternatives
   */
  static async decodeCipher(text, cipherType = 'caesar') {
    try {
      const { text: cleanText, cipherType: validCipherType } = ForensicsValidator.validateCipherParams(text, cipherType)
      
      const results = []
      
      switch (validCipherType) {
        case 'caesar':
          results.push(...this.decodeCaesarCipher(cleanText))
          break
        case 'atbash':
          results.push(this.decodeAtbashCipher(cleanText))
          break
        case 'reverse':
          results.push(this.decodeReverseCipher(cleanText))
          break
        case 'morse':
          results.push(this.decodeMorseCipher(cleanText))
          break
        case 'base64':
          results.push(this.decodeBase64Cipher(cleanText))
          break
        case 'all':
          results.push(...this.decodeAllCiphers(cleanText))
          break
      }
      
      const bestGuess = this.findBestDecoding(results)
      
      return ForensicsValidator.createSuccessResponse({
        decodingResults: results,
        bestGuess: bestGuess,
        totalAttempts: results.length
      })
    } catch (error) {
      return ForensicsValidator.handleError(error, 'decode cipher')
    }
  }

  /**
   * Decodes Caesar cipher with all possible shifts
   * @param {string} text - Text to decode
   * @returns {Array} - Array of Caesar cipher results
   */
  static decodeCaesarCipher(text) {
    const results = []
    
    // Try all Caesar cipher shifts (1-25)
    for (let shift = 1; shift <= 25; shift++) {
      const decoded = this.applyCaesarShift(text, shift)
      results.push({
        type: `Caesar Cipher (shift ${shift})`,
        decoded: decoded,
        shift: shift,
        confidence: this.calculateTextQuality(decoded)
      })
    }
    
    return results
  }

  /**
   * Decodes Atbash cipher
   * @param {string} text - Text to decode
   * @returns {object} - Atbash decoding result
   */
  static decodeAtbashCipher(text) {
    const decoded = text.replace(/[a-zA-Z]/g, char => {
      const isUpper = char === char.toUpperCase()
      const code = char.toLowerCase().charCodeAt(0)
      const reversed = String.fromCharCode(122 - code + 97) // 'z' - char + 'a'
      return isUpper ? reversed.toUpperCase() : reversed
    })
    
    return {
      type: 'Atbash Cipher',
      decoded: decoded,
      confidence: this.calculateTextQuality(decoded)
    }
  }

  /**
   * Decodes reverse cipher
   * @param {string} text - Text to decode
   * @returns {object} - Reverse decoding result
   */
  static decodeReverseCipher(text) {
    const decoded = text.split('').reverse().join('')
    
    return {
      type: 'Reverse Cipher',
      decoded: decoded,
      confidence: this.calculateTextQuality(decoded)
    }
  }

  /**
   * Decodes Morse code
   * @param {string} text - Text to decode
   * @returns {object} - Morse decoding result
   */
  static decodeMorseCipher(text) {
    const morseCode = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
      '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
      '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
      '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
      '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
      '--..': 'Z',
      '-----': '0', '.----': '1', '..---': '2', '...--': '3',
      '....-': '4', '.....': '5', '-....': '6', '--...': '7',
      '---..': '8', '----.': '9'
    }
    
    try {
      const words = text.split('  ') // Double space for word separation
      const decoded = words.map(word => {
        const letters = word.split(' ') // Single space for letter separation
        return letters.map(letter => morseCode[letter] || '?').join('')
      }).join(' ')
      
      return {
        type: 'Morse Code',
        decoded: decoded,
        confidence: this.calculateTextQuality(decoded)
      }
    } catch {
      return {
        type: 'Morse Code',
        decoded: 'Invalid Morse code format',
        confidence: 0
      }
    }
  }

  /**
   * Decodes Base64
   * @param {string} text - Text to decode
   * @returns {object} - Base64 decoding result
   */
  static decodeBase64Cipher(text) {
    try {
      const decoded = Buffer.from(text, 'base64').toString('utf-8')
      
      return {
        type: 'Base64',
        decoded: decoded,
        confidence: this.calculateTextQuality(decoded)
      }
    } catch {
      return {
        type: 'Base64',
        decoded: 'Invalid Base64 format',
        confidence: 0
      }
    }
  }

  /**
   * Attempts to decode with all cipher types
   * @param {string} text - Text to decode
   * @returns {Array} - Array of all decoding attempts
   */
  static decodeAllCiphers(text) {
    const results = []
    
    results.push(...this.decodeCaesarCipher(text))
    results.push(this.decodeAtbashCipher(text))
    results.push(this.decodeReverseCipher(text))
    results.push(this.decodeMorseCipher(text))
    results.push(this.decodeBase64Cipher(text))
    
    return results
  }

  /**
   * Applies Caesar cipher shift to text
   * @param {string} text - Text to shift
   * @param {number} shift - Shift amount
   * @returns {string} - Shifted text
   */
  static applyCaesarShift(text, shift) {
    return text.replace(/[a-zA-Z]/g, char => {
      const isUpper = char === char.toUpperCase()
      const code = char.toLowerCase().charCodeAt(0)
      const shifted = ((code - 97 + shift) % 26) + 97
      const result = String.fromCharCode(shifted)
      return isUpper ? result.toUpperCase() : result
    })
  }

  /**
   * Calculates text quality score for decoded text
   * @param {string} text - Decoded text to evaluate
   * @returns {number} - Quality score (0-1)
   */
  static calculateTextQuality(text) {
    if (!text || text.length === 0) return 0
    
    let score = 0
    const words = text.toLowerCase().split(/\s+/)
    
    // Common Swedish words for quality assessment
    const commonWords = [
      'och', 'att', 'det', 'en', 'är', 'för', 'på', 'med', 'av', 'som',
      'till', 'har', 'de', 'var', 'ett', 'om', 'så', 'från', 'kan', 'han',
      'den', 'efter', 'vid', 'ska', 'här', 'när', 'inte', 'då', 'mycket',
      'under', 'få', 'kommer', 'ta', 'mellan', 'år', 'också', 'redan'
    ]
    
    // Score based on common words
    const commonWordCount = words.filter(word => commonWords.includes(word)).length
    score += (commonWordCount / words.length) * 0.6
    
    // Score based on character distribution
    const alphabeticChars = text.replace(/[^a-zA-ZåäöÅÄÖ]/g, '').length
    const totalChars = text.length
    score += (alphabeticChars / totalChars) * 0.3
    
    // Score based on word structure (reasonable word lengths)
    const reasonableWords = words.filter(word => word.length >= 2 && word.length <= 15).length
    score += (reasonableWords / words.length) * 0.1
    
    return Math.min(1, score)
  }

  /**
   * Finds the best decoding from results
   * @param {Array} results - Array of decoding results
   * @returns {object} - Best decoding result
   */
  static findBestDecoding(results) {
    if (results.length === 0) return null
    
    return results.reduce((best, current) => {
      return current.confidence > best.confidence ? current : best
    })
  }

  /**
   * Detects possible cipher type from text characteristics
   * @param {string} text - Text to analyze
   * @returns {object} - Cipher type suggestions
   */
  static detectCipherType(text) {
    const suggestions = []
    
    // Check for Base64 characteristics
    if (/^[A-Za-z0-9+/]*={0,2}$/.test(text) && text.length % 4 === 0) {
      suggestions.push({ type: 'base64', confidence: 0.8 })
    }
    
    // Check for Morse code characteristics
    if (/^[.\- ]+$/.test(text)) {
      suggestions.push({ type: 'morse', confidence: 0.9 })
    }
    
    // Check for all uppercase (common in classical ciphers)
    if (text === text.toUpperCase() && /^[A-Z\s]+$/.test(text)) {
      suggestions.push({ type: 'caesar', confidence: 0.6 })
      suggestions.push({ type: 'atbash', confidence: 0.5 })
    }
    
    // Default suggestions
    if (suggestions.length === 0) {
      suggestions.push(
        { type: 'caesar', confidence: 0.4 },
        { type: 'atbash', confidence: 0.3 },
        { type: 'reverse', confidence: 0.2 }
      )
    }
    
    return suggestions.sort((a, b) => b.confidence - a.confidence)
  }
}

export default CipherDetector