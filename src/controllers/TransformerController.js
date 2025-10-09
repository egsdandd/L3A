// src/controllers/TransformerController.js
import texttoolkit from 'texttoolkit'

/**
 *
 */
class TransformerController {
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
    console.error(`TransformerController.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }

  // Publika metoder för texttransformationer

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

  // Ersätt text
  /**
   *
   * @param text
   * @param searchTerm
   * @param replacement
   * @param options
   */
  async replaceText(text, searchTerm, replacement, options = {}) {
    try {
      const cleanText = this.#validateText(text)
      const { caseSensitive = false, wholeWords = false, global = true } = options
      
      let flags = global ? 'g' : ''
      if (!caseSensitive) flags += 'i'
      
      let pattern = searchTerm
      if (wholeWords) {
        pattern = `\\b${searchTerm}\\b`
      }
      
      const regex = new RegExp(pattern, flags)
      const transformed = cleanText.replace(regex, replacement)
      
      return {
        success: true,
        original: cleanText,
        transformed,
        replacements: (cleanText.match(regex) || []).length
      }
    } catch (error) {
      return this.#handleError(error, 'replace text')
    }
  }

  // Transformera med regex
  /**
   *
   * @param text
   * @param pattern
   * @param replacement
   * @param flags
   */
  async transformWithRegex(text, pattern, replacement, flags = 'g') {
    try {
      const cleanText = this.#validateText(text)
      const regex = new RegExp(pattern, flags)
      const transformed = cleanText.replace(regex, replacement)
      
      return {
        success: true,
        original: cleanText,
        transformed,
        pattern,
        replacement,
        matches: (cleanText.match(regex) || []).length
      }
    } catch (error) {
      return this.#handleError(error, 'transform with regex')
    }
  }

  // Ta bort HTML taggar
  /**
   *
   * @param text
   */
  async stripHtml(text) {
    try {
      const cleanText = this.#validateText(text)
      const stripped = cleanText.replace(/<[^>]*>/g, '')
      
      return {
        success: true,
        original: cleanText,
        transformed: stripped
      }
    } catch (error) {
      return this.#handleError(error, 'strip HTML')
    }
  }

  // Normalisera whitespace
  /**
   *
   * @param text
   */
  async normalizeWhitespace(text) {
    try {
      const cleanText = this.#validateText(text)
      const normalized = cleanText
        .replace(/\s+/g, ' ')  // Ersätt multipla spaces med en
        .replace(/\n\s*\n/g, '\n\n')  // Normalisera line breaks
        .trim()
      
      return {
        success: true,
        original: cleanText,
        transformed: normalized
      }
    } catch (error) {
      return this.#handleError(error, 'normalize whitespace')
    }
  }

  // Escape special characters
  /**
   *
   * @param text
   * @param type
   */
  async escapeSpecialChars(text, type = 'html') {
    try {
      const cleanText = this.#validateText(text)
      let escaped
      
      switch (type) {
        case 'html':
          escaped = cleanText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
          break
        case 'regex':
          escaped = cleanText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          break
        case 'url':
          escaped = encodeURIComponent(cleanText)
          break
        default:
          throw new Error(`Unknown escape type: ${type}`)
      }
      
      return {
        success: true,
        original: cleanText,
        transformed: escaped,
        type
      }
    } catch (error) {
      return this.#handleError(error, 'escape special characters')
    }
  }

  // Konvertera line endings
  /**
   *
   * @param text
   * @param format
   */
  async convertLineEndings(text, format = 'unix') {
    try {
      const cleanText = this.#validateText(text)
      let converted
      
      switch (format) {
        case 'unix':
          converted = cleanText.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
          break
        case 'windows':
          converted = cleanText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '\r\n')
          break
        case 'mac':
          converted = cleanText.replace(/\r\n/g, '\n').replace(/\n/g, '\r')
          break
        default:
          throw new Error(`Unknown line ending format: ${format}`)
      }
      
      return {
        success: true,
        original: cleanText,
        transformed: converted,
        format
      }
    } catch (error) {
      return this.#handleError(error, 'convert line endings')
    }
  }

  // Komplett transformation med flera operationer
  /**
   *
   * @param text
   * @param operations
   */
  async complexTransformation(text, operations) {
    try {
      let result = this.#validateText(text)
      const appliedOperations = []
      
      for (const operation of operations) {
        const { type, ...params } = operation
        
        switch (type) {
          case 'replace':
            const replaceResult = await this.replaceText(result, params.search, params.replacement, params.options)
            if (replaceResult.success) {
              result = replaceResult.transformed
              appliedOperations.push({ type, applied: true, replacements: replaceResult.replacements })
            }
            break
          case 'regex':
            const regexResult = await this.transformWithRegex(result, params.pattern, params.replacement, params.flags)
            if (regexResult.success) {
              result = regexResult.transformed
              appliedOperations.push({ type, applied: true, matches: regexResult.matches })
            }
            break
          case 'stripHtml':
            const stripResult = await this.stripHtml(result)
            if (stripResult.success) {
              result = stripResult.transformed
              appliedOperations.push({ type, applied: true })
            }
            break
          case 'normalizeWhitespace':
            const normalizeResult = await this.normalizeWhitespace(result)
            if (normalizeResult.success) {
              result = normalizeResult.transformed
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
        transformed: result,
        operations: appliedOperations
      }
    } catch (error) {
      return this.#handleError(error, 'complex transformation')
    }
  }
}

export default TransformerController