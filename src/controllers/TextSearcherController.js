// src/controllers/TextSearcherController.js

import TextDocument from 'texttoolkit'

/**
 * Controller-klass för textsökning
 * Hanterar all logik för att söka i text med privata metoder och attribut
 */
class TextSearcherController {
  // Privata attribut för caching
  #textDocumentCache
  #lastText
  #regexCache

  /**
   *
   */
  constructor() {
    this.#textDocumentCache = null
    this.#lastText = null
    this.#regexCache = new Map() // Cache för RegExp objekt
  }

  /**
   * Privat metod för att validera inkommande text
   * @param {string} text - Texten som ska valideras
   * @throws {Error} Om texten är ogiltig
   */
  #validateText(text) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw new Error('Text is required and must be a non-empty string')
    }
  }

  /**
   * Privat metod för att validera sökfrågan
   * @param {string} query - Sökfrågan som ska valideras
   * @throws {Error} Om sökfrågan är ogiltig
   */
  #validateQuery(query) {
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new Error('Query is required and must be a non-empty string')
    }
  }

  /**
   * Privat metod för att skapa eller cache:a RegExp objekt
   * @param {string} pattern - RegExp mönstret
   * @param {string} flags - RegExp flaggor (default: 'g')
   * @returns {RegExp} RegExp objekt
   * @throws {Error} Om mönstret är ogiltigt
   */
  #getRegExp(pattern, flags = 'g') {
    const cacheKey = `${pattern}:${flags}`
    
    if (this.#regexCache.has(cacheKey)) {
      return this.#regexCache.get(cacheKey)
    }

    try {
      const regex = new RegExp(pattern, flags)
      this.#regexCache.set(cacheKey, regex)
      return regex
    } catch (error) {
      throw new Error(`Invalid RegExp pattern: ${pattern}`)
    }
  }

  /**
   * Privat metod för att hämta eller skapa TextDocument instans
   * @param {string} text - Texten som ska analyseras
   * @returns {TextDocument} TextDocument instans
   */
  #getTextDocument(text) {
    this.#validateText(text)
    
    // Använd cache om samma text
    if (this.#lastText === text && this.#textDocumentCache) {
      return this.#textDocumentCache
    }

    // Skapa ny instans och cache:a den
    this.#textDocumentCache = new TextDocument(text)
    this.#lastText = text
    return this.#textDocumentCache
  }

  /**
   * Privat metod för felhantering
   * @param {Error} error - Felet som kastades
   * @returns {object} Standardiserat felobjekt
   */
  #handleError(error) {
    return {
      error: error.message || 'An unexpected error occurred',
      success: false
    }
  }

  /**
   * Kontrollerar om en sökfråga finns i texten
   * @param {string} text - Texten som ska sökas i
   * @param {string} query - Sökfrågan
   * @returns {object} Resultat med boolean exists
   */
  async checkExists(text, query) {
    try {
      this.#validateQuery(query)
      const doc = this.#getTextDocument(text)
      const exists = doc.exists(query.trim())
      return { exists, query: query.trim(), success: true }
    } catch (error) {
      return this.#handleError(error)
    }
  }

  /**
   * Räknar förekomster av en sökfråga i texten
   * @param {string} text - Texten som ska sökas i
   * @param {string} query - Sökfrågan
   * @returns {object} Resultat med antal förekomster
   */
  async countOccurrences(text, query) {
    try {
      this.#validateQuery(query)
      const doc = this.#getTextDocument(text)
      const count = doc.count(query.trim())
      return { count, query: query.trim(), success: true }
    } catch (error) {
      return this.#handleError(error)
    }
  }

  /**
   * Hittar alla matchningar för ett RegExp mönster
   * @param {string} text - Texten som ska sökas i
   * @param {string} pattern - RegExp mönstret
   * @returns {object} Resultat med matchningar
   */
  async matchPattern(text, pattern) {
    try {
      if (!pattern || typeof pattern !== 'string') {
        throw new Error('Pattern is required and must be a string')
      }

      const doc = this.#getTextDocument(text)
      const regex = this.#getRegExp(pattern, 'g')
      const matches = doc.matchPattern(regex)
      
      return { 
        matches, 
        pattern, 
        matchCount: matches ? matches.length : 0,
        success: true 
      }
    } catch (error) {
      return this.#handleError(error)
    }
  }

  /**
   * Söker efter första förekomsten av ett RegExp mönster
   * @param {string} text - Texten som ska sökas i
   * @param {string} pattern - RegExp mönstret
   * @returns {object} Resultat med index för första matchningen
   */
  async searchRegExp(text, pattern) {
    try {
      if (!pattern || typeof pattern !== 'string') {
        throw new Error('Pattern is required and must be a string')
      }

      const doc = this.#getTextDocument(text)
      const regex = this.#getRegExp(pattern)
      const index = doc.searchRegexp(regex)
      
      return { 
        index, 
        pattern, 
        found: index !== -1,
        success: true 
      }
    } catch (error) {
      return this.#handleError(error)
    }
  }

  /**
   * Testar om ett RegExp mönster matchar texten
   * @param {string} text - Texten som ska testas
   * @param {string} pattern - RegExp mönstret
   * @returns {object} Resultat med boolean match
   */
  async testPattern(text, pattern) {
    try {
      if (!pattern || typeof pattern !== 'string') {
        throw new Error('Pattern is required and must be a string')
      }

      const doc = this.#getTextDocument(text)
      const regex = this.#getRegExp(pattern)
      const matches = doc.testPattern(regex)
      
      return { 
        matches, 
        pattern,
        success: true 
      }
    } catch (error) {
      return this.#handleError(error)
    }
  }

  /**
   * Hittar första förekomsten av en sökfråga
   * @param {string} text - Texten som ska sökas i
   * @param {string} query - Sökfrågan
   * @returns {object} Resultat med index för första förekomsten
   */
  async findFirst(text, query) {
    try {
      this.#validateQuery(query)
      const doc = this.#getTextDocument(text)
      const index = doc.findFirst(query.trim())
      
      return { 
        index, 
        query: query.trim(),
        found: index !== -1,
        success: true 
      }
    } catch (error) {
      return this.#handleError(error)
    }
  }

  /**
   * Hittar alla förekomster av en sökfråga
   * @param {string} text - Texten som ska sökas i
   * @param {string} query - Sökfrågan
   * @returns {object} Resultat med alla index
   */
  async findAll(text, query) {
    try {
      this.#validateQuery(query)
      const doc = this.#getTextDocument(text)
      const indexes = doc.findAll(query.trim())
      
      return { 
        indexes, 
        query: query.trim(),
        count: indexes ? indexes.length : 0,
        success: true 
      }
    } catch (error) {
      return this.#handleError(error)
    }
  }

  /**
   * Rensar alla caches (användbart för minneshantering)
   */
  clearCache() {
    this.#textDocumentCache = null
    this.#lastText = null
    this.#regexCache.clear()
  }

  /**
   * Hämtar statistik om cache:n (för debugging)
   * @returns {object} Cache-statistik
   */
  getCacheStats() {
    return {
      hasCachedDocument: this.#textDocumentCache !== null,
      lastTextLength: this.#lastText ? this.#lastText.length : 0,
      regexCacheSize: this.#regexCache.size,
      cachedPatterns: Array.from(this.#regexCache.keys())
    }
  }
}

export default TextSearcherController