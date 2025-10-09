// src/controllers/WordOptimizerController.js

import TextDocument from 'texttoolkit';

/**
 * Controller-klass för ordoptimering
 * Hanterar all logik för att förbättra textens ordval och struktur
 */
class WordOptimizerController {
  // Privata attribut för caching och konfiguration
  #textDocumentCache;
  #lastText;
  #commonWords;
  #weakWords;
  #powerVerbs;

  constructor() {
    this.#textDocumentCache = null;
    this.#lastText = null;
    this.#initializeWordLists();
  }

  /**
   * Privat metod för att initialisera ordlistor
   */
  #initializeWordLists() {
    this.#commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
    ]);

    this.#weakWords = [
      'very', 'really', 'quite', 'rather', 'somewhat', 'fairly', 'pretty',
      'just', 'actually', 'basically', 'literally', 'totally', 'completely',
      'absolutely', 'extremely', 'incredibly', 'amazingly', 'definitely',
      'probably', 'maybe', 'perhaps', 'possibly', 'apparently', 'obviously'
    ];

    this.#powerVerbs = {
      'big': { normal: 'towers', intensified: 'dominates' },
      'large': { normal: 'looms', intensified: 'dominates' },
      'huge': { normal: 'dwarfs', intensified: 'dwarfs' },
      'small': { normal: 'nestles', intensified: 'nestles' },
      'tiny': { normal: 'huddles', intensified: 'huddles' },
      'good': { normal: 'succeeds', intensified: 'excels' },
      'bad': { normal: 'fails', intensified: 'devastates' },
      'great': { normal: 'shines', intensified: 'triumphs' },
      'amazing': { normal: 'dazzles', intensified: 'dazzles' },
      'beautiful': { normal: 'mesmerizes', intensified: 'mesmerizes' },
      'ugly': { normal: 'repulses', intensified: 'repulses' },
      'fast': { normal: 'speeds', intensified: 'races' },
      'slow': { normal: 'crawls', intensified: 'crawls' },
      'strong': { normal: 'overpowers', intensified: 'dominates' },
      'weak': { normal: 'falters', intensified: 'falters' },
      'happy': { normal: 'beams', intensified: 'radiates joy' },
      'sad': { normal: 'mourns', intensified: 'grieves' },
      'angry': { normal: 'seethes', intensified: 'rages' },
      'excited': { normal: 'buzzes with energy', intensified: 'buzzes with energy' },
      'tired': { normal: 'droops', intensified: 'collapses' },
      'bored': { normal: 'yawns', intensified: 'yawns' }
    };
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
   * @param {string} text - Texten som ska analyseras
   * @returns {TextDocument} TextDocument instans
   */
  #getTextDocument(text) {
    this.#validateText(text);
    
    if (this.#lastText === text && this.#textDocumentCache) {
      return this.#textDocumentCache;
    }

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
   * Privat metod för att extrahera ord från text
   * @param {string} text - Texten som ska analyseras
   * @returns {Array} Array med ord
   */
  #extractWords(text) {
    return text.toLowerCase().match(/\b[a-zA-ZåäöÅÄÖ]+\b/g) || [];
  }

  /**
   * Privat metod för att ge förslag på svaga ord
   * @param {string} word - Ordet som ska få förslag
   * @returns {string} Förbättringsförslag
   */
  #getWeakWordSuggestion(word) {
    const suggestions = {
      'very': 'Consider removing or use a stronger adjective',
      'really': 'Consider removing or be more specific',
      'quite': 'Consider removing or use a stronger adjective',
      'just': 'Often unnecessary - consider removing',
      'actually': 'Usually unnecessary - consider removing',
      'basically': 'Consider being more specific',
      'literally': 'Often misused - consider removing',
      'totally': 'Consider "completely" or remove',
      'definitely': 'Consider being more specific about certainty',
      'probably': 'Consider "likely" or be more specific'
    };
    
    return suggestions[word] || 'Consider using a more specific word';
  }

  /**
   * Privat metod för att få kraftfullare verb
   * @param {string} adjective - Adjektivet som ska ersättas
   * @param {boolean} hasIntensifier - Om det finns en förstärkare
   * @returns {string|null} Kraftfullare verb eller null
   */
  #getPowerVerb(adjective, hasIntensifier) {
    const verbOptions = this.#powerVerbs[adjective.toLowerCase()];
    if (!verbOptions) return null;
    
    return hasIntensifier ? verbOptions.intensified : verbOptions.normal;
  }

  /**
   * Hittar överanvända ord i texten
   * @param {string} text - Texten som ska analyseras
   * @param {number} threshold - Minsta antal förekomster (default: 3)
   * @returns {Object} Resultat med överanvända ord
   */
  async findRepetitions(text, threshold = 3) {
    try {
      this.#validateText(text);
      
      const words = this.#extractWords(text);
      const wordCount = {};
      
      // Räkna ord (exklusive vanliga ord)
      words.forEach(word => {
        if (!this.#commonWords.has(word) && word.length > 2) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
      
      // Hitta ord som används mer än threshold antal gånger
      const repetitions = Object.entries(wordCount)
        .filter(([word, count]) => count > threshold)
        .sort((a, b) => b[1] - a[1])
        .map(([word, count]) => ({ word, count }));
      
      return { 
        repetitions, 
        threshold,
        totalAnalyzedWords: words.length,
        success: true 
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Hittar svaga/fyllnadsord i texten
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} Resultat med svaga ord och förslag
   */
  async findWeakWords(text) {
    try {
      this.#validateText(text);
      
      const foundWeakWords = [];
      const words = this.#extractWords(text);
      
      // Hitta svaga ord och deras positioner
      this.#weakWords.forEach(weakWord => {
        const regex = new RegExp(`\\b${weakWord}\\b`, 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
          foundWeakWords.push({
            word: match[0],
            position: match.index,
            suggestion: this.#getWeakWordSuggestion(weakWord),
            context: this.#getWordContext(text, match.index, match[0].length)
          });
        }
      });
      
      return { 
        weakWords: foundWeakWords,
        totalFound: foundWeakWords.length,
        success: true 
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Hittar "is/was + adjektiv" mönster och föreslår kraftfullare verb
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} Resultat med kraftfulla ordförslag
   */
  async findPowerWords(text) {
    try {
      this.#validateText(text);
      
      const suggestions = [];
      
      // Regex för "is/was/are/were + (very) + adjektiv"
      const weakPattern = /\b(is|was|are|were)\s+(very\s+)?(big|large|huge|small|tiny|good|bad|nice|great|amazing|awful|terrible|beautiful|ugly|fast|slow|strong|weak|happy|sad|angry|excited|tired|bored)\b/gi;
      
      let match;
      while ((match = weakPattern.exec(text)) !== null) {
        const fullMatch = match[0];
        const verb = match[1];
        const intensifier = match[2] || '';
        const adjective = match[3];
        
        const powerVerb = this.#getPowerVerb(adjective, !!intensifier.trim());
        if (powerVerb) {
          suggestions.push({
            original: fullMatch,
            position: match.index,
            suggestion: powerVerb,
            reason: `Replace weak "${verb} ${intensifier}${adjective}" with stronger verb`,
            context: this.#getWordContext(text, match.index, fullMatch.length)
          });
        }
      }
      
      return { 
        powerWords: suggestions,
        totalSuggestions: suggestions.length,
        success: true 
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Privat metod för att få kontext runt ett ord
   * @param {string} text - Den fullständiga texten
   * @param {number} position - Positionen för ordet
   * @param {number} length - Längden på ordet/frasen
   * @returns {string} Kontext runt ordet
   */
  #getWordContext(text, position, length) {
    const contextLength = 30;
    const start = Math.max(0, position - contextLength);
    const end = Math.min(text.length, position + length + contextLength);
    
    let context = text.substring(start, end);
    
    // Lägg till "..." om vi klippte texten
    if (start > 0) context = '...' + context;
    if (end < text.length) context = context + '...';
    
    return context;
  }

  /**
   * Komplett analys av alla ordoptimeringsmöjligheter
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} Fullständigt resultat med alla analyser
   */
  async completeAnalysis(text) {
    try {
      this.#validateText(text);
      
      const [repetitions, weakWords, powerWords] = await Promise.all([
        this.findRepetitions(text),
        this.findWeakWords(text),
        this.findPowerWords(text)
      ]);
      
      const totalIssues = 
        (repetitions.success ? repetitions.repetitions.length : 0) +
        (weakWords.success ? weakWords.totalFound : 0) +
        (powerWords.success ? powerWords.totalSuggestions : 0);
      
      return {
        repetitions: repetitions.success ? repetitions : null,
        weakWords: weakWords.success ? weakWords : null,
        powerWords: powerWords.success ? powerWords : null,
        summary: {
          totalIssues,
          textLength: text.length,
          wordCount: this.#extractWords(text).length
        },
        success: true
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Rensar cache:n
   */
  clearCache() {
    this.#textDocumentCache = null;
    this.#lastText = null;
  }

  /**
   * Hämtar cache-statistik
   * @returns {Object} Cache-statistik
   */
  getCacheStats() {
    return {
      hasCachedDocument: this.#textDocumentCache !== null,
      lastTextLength: this.#lastText ? this.#lastText.length : 0,
      configuredWeakWords: this.#weakWords.length,
      configuredPowerVerbs: Object.keys(this.#powerVerbs).length
    };
  }
}

export default WordOptimizerController;