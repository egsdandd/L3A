// src/controllers/FormatterController.js
import texttoolkit from 'texttoolkit';

export default class FormatterController {
  #textDocumentCache = new Map();
  #lastText = null;
  
  constructor() {
    // Privat cache för TextDocument instanser för bättre prestanda
  }

  /**
   * Privat metod för att validera inkommande text
   * @param {string} text - Texten som ska valideras
   * @returns {boolean} - True om texten är giltig
   */
  #validateText(text) {
    return typeof text === 'string' && text.trim().length > 0;
  }

  /**
   * Privat metod för att få TextDocument instans med caching
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} - TextDocument instans
   */
  #getTextDocument(text) {
    if (this.#lastText === text && this.#textDocumentCache.has(text)) {
      return this.#textDocumentCache.get(text);
    }
    
    const textDoc = new texttoolkit(text);
    this.#textDocumentCache.set(text, textDoc);
    this.#lastText = text;
    
    // Begränsa cache-storlek
    if (this.#textDocumentCache.size > 10) {
      const firstKey = this.#textDocumentCache.keys().next().value;
      this.#textDocumentCache.delete(firstKey);
    }
    
    return textDoc;
  }

  /**
   * Privat metod för felhantering
   * @param {Error} error - Felet som uppstod
   * @returns {Object} - Standardiserat felmeddelande
   */
  #handleError(error) {
    console.error('FormatterController error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred during formatting'
    };
  }

  /**
   * Räknar antal ord i texten
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} - Resultat med ordräkning
   */
  async countWords(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Invalid text provided' };
      }

      const textDoc = this.#getTextDocument(text);
      const count = textDoc.countWords();
      
      return {
        success: true,
        count: count
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Formaterar text till versaler
   * @param {string} text - Texten som ska formateras
   * @returns {Object} - Resultat med formaterad text
   */
  async toUpperCase(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Invalid text provided' };
      }

      return {
        success: true,
        formatted: text.toUpperCase()
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Formaterar text till gemener
   * @param {string} text - Texten som ska formateras
   * @returns {Object} - Resultat med formaterad text
   */
  async toLowerCase(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Invalid text provided' };
      }

      return {
        success: true,
        formatted: text.toLowerCase()
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Formaterar text med initial kapital (Title Case)
   * @param {string} text - Texten som ska formateras
   * @returns {Object} - Resultat med formaterad text
   */
  async toTitleCase(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Invalid text provided' };
      }

      const formatted = this.#formatTitleCase(text);
      
      return {
        success: true,
        formatted: formatted
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Privat metod för Title Case formatering
   * @param {string} text - Texten som ska formateras
   * @returns {string} - Formaterad text
   */
  #formatTitleCase(text) {
    return text.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
  }

  /**
   * Formaterar text med specifik linjebredd
   * @param {string} text - Texten som ska formateras
   * @param {number} width - Önskad linjebredd (default: 80)
   * @returns {Object} - Resultat med formaterad text
   */
  async wrapLines(text, width = 80) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Invalid text provided' };
      }

      if (typeof width !== 'number' || width < 1) {
        return { success: false, error: 'Invalid width provided' };
      }

      const wrapped = this.#wrapTextLines(text, width);
      
      return {
        success: true,
        formatted: wrapped
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Privat metod för att linda text på specifik bredd
   * @param {string} text - Texten som ska lindas
   * @param {number} width - Linjebredd
   * @returns {string} - Lindad text
   */
  #wrapTextLines(text, width) {
    const words = text.split(/\s+/);
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + word).length <= width) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.join('\n');
  }

  /**
   * Tar bort extra whitespace från text
   * @param {string} text - Texten som ska rensas
   * @returns {Object} - Resultat med rensat text
   */
  async trimWhitespace(text) {
    try {
      if (!text || typeof text !== 'string') {
        return { success: false, error: 'Invalid text provided' };
      }

      const trimmed = this.#normalizeWhitespace(text);
      
      return {
        success: true,
        formatted: trimmed
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Privat metod för att normalisera whitespace
   * @param {string} text - Texten som ska normaliseras
   * @returns {string} - Normaliserad text
   */
  #normalizeWhitespace(text) {
    return text
      .replace(/\s+/g, ' ')  // Ersätt multipla spaces med en
      .replace(/\n\s*\n/g, '\n\n')  // Normalisera tomma rader
      .trim();  // Ta bort leading/trailing whitespace
  }

  /**
   * Lägger till indentering till text
   * @param {string} text - Texten som ska indenteras
   * @param {number} spaces - Antal spaces för indentering (default: 2)
   * @returns {Object} - Resultat med indenterad text
   */
  async addIndentation(text, spaces = 2) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Invalid text provided' };
      }

      if (typeof spaces !== 'number' || spaces < 0) {
        return { success: false, error: 'Invalid indentation value' };
      }

      const indented = this.#indentText(text, spaces);
      
      return {
        success: true,
        formatted: indented
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Privat metod för att indentera text
   * @param {string} text - Texten som ska indenteras
   * @param {number} spaces - Antal spaces
   * @returns {string} - Indenterad text
   */
  #indentText(text, spaces) {
    const indent = ' '.repeat(spaces);
    return text
      .split('\n')
      .map(line => line.trim() ? indent + line : line)
      .join('\n');
  }
}