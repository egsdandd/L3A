// src/controllers/TextAnalyzerController.js

import TextDocument from 'texttoolkit';

/**
 * Controller-klass för textanalys
 * Hanterar all logik för analys av text med privata metoder och attribut
 */
class TextAnalyzerController {
  // Privat attribut för att cache:a TextDocument instanser
  #textDocumentCache;
  #lastText;

  constructor() {
    this.#textDocumentCache = null;
    this.#lastText = null;
  }

  /**
   * Privat metod för att validera inkommande text
   * @param {string} text - Texten som ska valideras
   * @throws {Error} Om texten är ogiltig
   */
  #validateText(text) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw new Error('Text is required and must be a non-empty string');
    }
  }

  /**
   * Privat metod för att hämta eller skapa TextDocument instans
   * Använder caching för att undvika att skapa samma dokument flera gånger
   * @param {string} text - Texten som ska analyseras
   * @returns {TextDocument} TextDocument instans
   */
  #getTextDocument(text) {
    this.#validateText(text);
    
    // Använd cache om samma text
    if (this.#lastText === text && this.#textDocumentCache) {
      return this.#textDocumentCache;
    }

    // Skapa ny instans och cache:a den
    this.#textDocumentCache = new TextDocument(text);
    this.#lastText = text;
    return this.#textDocumentCache;
  }

  /**
   * Privat metod för felhantering
   * @param {Error} error - Felet som kastades
   * @returns {Object} Standardiserat felobjekt
   */
  #handleError(error) {
    return {
      error: error.message || 'An unexpected error occurred',
      success: false
    };
  }

  /**
   * Räknar antal tecken i texten
   * @param {string} text - Texten som ska analyseras
   * @param {boolean} includeSpaces - Om mellanslag ska räknas (default: true)
   * @returns {Object} Resultat med antal tecken
   */
  async countCharacters(text, includeSpaces = true) {
    try {
      const doc = this.#getTextDocument(text);
      const count = doc.countCharacters(includeSpaces);
      return { count, success: true };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Analyserar bokstavsfrekvens i texten
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} Resultat med frekvensdata
   */
  async getLetterFrequency(text) {
    try {
      const doc = this.#getTextDocument(text);
      const frequency = doc.letterFrequency();
      return { frequency, success: true };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Hittar palindromer i texten
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} Resultat med palindromer
   */
  async findPalindromes(text) {
    try {
      const doc = this.#getTextDocument(text);
      const palindromes = doc.findPalindromes();
      return { palindromes, success: true };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Räknar förekomster av ett specifikt ord
   * @param {string} text - Texten som ska analyseras
   * @param {string} word - Ordet som ska räknas
   * @returns {Object} Resultat med antal förekomster
   */
  async countWordOccurrences(text, word) {
    try {
      if (!word || typeof word !== 'string' || word.trim().length === 0) {
        throw new Error('Word parameter is required and must be a non-empty string');
      }

      const doc = this.#getTextDocument(text);
      const count = doc.count(word.trim());
      return { count, word: word.trim(), success: true };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Räknar totalt antal ord i texten
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} Resultat med antal ord
   */
  async countTotalWords(text) {
    try {
      const doc = this.#getTextDocument(text);
      const count = doc.countWords();
      return { count, success: true };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Räknar antal meningar i texten
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} Resultat med antal meningar
   */
  async countSentences(text) {
    try {
      const doc = this.#getTextDocument(text);
      const count = doc.countSentences();
      return { count, success: true };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Rensar cache:n (användbart för minneshantering)
   */
  clearCache() {
    this.#textDocumentCache = null;
    this.#lastText = null;
  }

  /**
   * Hämtar statistik om cache:n (för debugging)
   * @returns {Object} Cache-statistik
   */
  getCacheStats() {
    return {
      hasCachedDocument: this.#textDocumentCache !== null,
      lastTextLength: this.#lastText ? this.#lastText.length : 0,
      lastTextPreview: this.#lastText ? this.#lastText.substring(0, 50) + '...' : null
    };
  }
}

export default TextAnalyzerController;