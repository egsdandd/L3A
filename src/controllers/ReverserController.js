// src/controllers/ReverserController.js
import texttoolkit from 'texttoolkit'

/**
 *
 */
class ReverserController {
  /**
   *
   */
  constructor() {
    // Private cache för TextDocument instanser
    this.#textDocumentCache = new Map()
    this.#lastText = ''
  }

  // Private attribut
  #textDocumentCache
  #lastText

  // Private metoder
  /**
   *
   * @param text
   */
  #validateText(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided')
    }
    return text.trim()
  }

  /**
   *
   * @param text
   */
  #getTextDocument(text) {
    const cleanText = this.#validateText(text)
    
    // Använd cache om samma text
    if (cleanText === this.#lastText && this.#textDocumentCache.has('current')) {
      return this.#textDocumentCache.get('current')
    }
    
    const textDoc = new texttoolkit(cleanText)
    this.#textDocumentCache.set('current', textDoc)
    this.#lastText = cleanText
    
    return textDoc
  }

  /**
   *
   * @param error
   * @param operation
   */
  #handleError(error, operation) {
    console.error(`ReverserController.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }

  // Publika metoder för text-reversering

  // Räkna ord (för bakåtkompatibilitet)
  /**
   *
   * @param text
   */
  async countWords(text) {
    try {
      const textDoc = this.#getTextDocument(text)
      const count = textDoc.countWords()
      
      return {
        success: true,
        count
      }
    } catch (error) {
      return this.#handleError(error, 'count words')
    }
  }

  // Reversera hela texten
  /**
   *
   * @param text
   */
  async reverseText(text) {
    try {
      const cleanText = this.#validateText(text)
      const reversed = cleanText.split('').reverse().join('')
      
      return {
        success: true,
        original: cleanText,
        reversed
      }
    } catch (error) {
      return this.#handleError(error, 'reverse text')
    }
  }

  // Reversera varje ord separat
  /**
   *
   * @param text
   */
  async reverseWords(text) {
    try {
      const cleanText = this.#validateText(text)
      const words = cleanText.split(/(\s+)/) // Behåller whitespace
      const reversedWords = words.map(word => {
        if (/\s/.test(word)) return word // Behåll whitespace
        return word.split('').reverse().join('')
      })
      
      return {
        success: true,
        original: cleanText,
        reversed: reversedWords.join('')
      }
    } catch (error) {
      return this.#handleError(error, 'reverse words')
    }
  }

  // Reversera ordföljden
  /**
   *
   * @param text
   */
  async reverseWordOrder(text) {
    try {
      const cleanText = this.#validateText(text)
      const words = cleanText.split(/\s+/)
      const reversed = words.reverse().join(' ')
      
      return {
        success: true,
        original: cleanText,
        reversed
      }
    } catch (error) {
      return this.#handleError(error, 'reverse word order')
    }
  }

  // Reversera meningar
  /**
   *
   * @param text
   */
  async reverseSentences(text) {
    try {
      const cleanText = this.#validateText(text)
      const sentences = cleanText.split(/([.!?]+\s*)/)
      const reversedSentences = []
      
      // Gruppera meningar med deras skiljetecken
      for (let i = 0; i < sentences.length; i += 2) {
        const sentence = sentences[i] || ''
        const punctuation = sentences[i + 1] || ''
        if (sentence.trim()) {
          reversedSentences.unshift(sentence + punctuation)
        }
      }
      
      return {
        success: true,
        original: cleanText,
        reversed: reversedSentences.join('')
      }
    } catch (error) {
      return this.#handleError(error, 'reverse sentences')
    }
  }

  // Reversera rader
  /**
   *
   * @param text
   */
  async reverseLines(text) {
    try {
      const cleanText = this.#validateText(text)
      const lines = cleanText.split('\n')
      const reversed = lines.reverse().join('\n')
      
      return {
        success: true,
        original: cleanText,
        reversed
      }
    } catch (error) {
      return this.#handleError(error, 'reverse lines')
    }
  }

  // Spegla text (alternativt tecken bakåt)
  /**
   *
   * @param text
   */
  async mirrorText(text) {
    try {
      const cleanText = this.#validateText(text)
      const chars = cleanText.split('')
      const mirrored = chars.map((char, index) => {
        return index % 2 === 0 ? char : chars[chars.length - 1 - index] || char
      }).join('')
      
      return {
        success: true,
        original: cleanText,
        mirrored
      }
    } catch (error) {
      return this.#handleError(error, 'mirror text')
    }
  }

  // ROT13 (typ av reversering/kryptering)
  /**
   *
   * @param text
   */
  async rot13(text) {
    try {
      const cleanText = this.#validateText(text)
      const rot13 = cleanText.replace(/[a-zA-Z]/g, char => {
        const start = char <= 'Z' ? 65 : 97
        return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
      })
      
      return {
        success: true,
        original: cleanText,
        rot13
      }
    } catch (error) {
      return this.#handleError(error, 'apply ROT13')
    }
  }

  // Palindrom-kontroll
  /**
   *
   * @param text
   */
  async checkPalindrome(text) {
    try {
      const cleanText = this.#validateText(text)
      const normalized = cleanText.toLowerCase().replace(/[^a-zåäö]/g, '')
      const reversed = normalized.split('').reverse().join('')
      const isPalindrome = normalized === reversed
      
      return {
        success: true,
        original: cleanText,
        normalized,
        reversed,
        isPalindrome
      }
    } catch (error) {
      return this.#handleError(error, 'check palindrome')
    }
  }

  // Komplex reversering med flera operationer
  /**
   *
   * @param text
   * @param operations
   */
  async complexReverse(text, operations) {
    try {
      let result = this.#validateText(text)
      const appliedOperations = []
      
      for (const operation of operations) {
        const { type, ...params } = operation
        
        switch (type) {
          case 'text':
            const textResult = await this.reverseText(result)
            if (textResult.success) {
              result = textResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
          case 'words':
            const wordsResult = await this.reverseWords(result)
            if (wordsResult.success) {
              result = wordsResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
          case 'wordOrder':
            const orderResult = await this.reverseWordOrder(result)
            if (orderResult.success) {
              result = orderResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
          case 'sentences':
            const sentencesResult = await this.reverseSentences(result)
            if (sentencesResult.success) {
              result = sentencesResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
          case 'lines':
            const linesResult = await this.reverseLines(result)
            if (linesResult.success) {
              result = linesResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
          case 'rot13':
            const rot13Result = await this.rot13(result)
            if (rot13Result.success) {
              result = rot13Result.rot13
              appliedOperations.push({ type, applied: true })
            }
            break
          default:
            appliedOperations.push({ type, applied: false, error: `Unknown operation: ${type}` })
        }
      }
      
      return {
        success: true,
        original: text,
        result,
        operations: appliedOperations
      }
    } catch (error) {
      return this.#handleError(error, 'complex reverse')
    }
  }
}

export default ReverserController