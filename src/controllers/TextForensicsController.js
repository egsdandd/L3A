// src/controllers/TextForensicsController.js
import texttoolkit from 'texttoolkit';

export default class TextForensicsController {
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
    console.error('TextForensicsController error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred during forensics analysis'
    };
  }

  /**
   * Analyserar författarskap genom att jämföra skrivstilar
   * @param {string} text1 - Första texten
   * @param {string} text2 - Andra texten att jämföra med
   * @returns {Object} - Resultat med likhetsscore och analys
   */
  async analyzeAuthorship(text1, text2) {
    try {
      if (!this.#validateText(text1) || !this.#validateText(text2)) {
        return { success: false, error: 'Two valid texts are required for comparison' };
      }

      // Beräkna skrivstilsmetriker
      const metrics1 = this.#calculateWritingMetrics(text1);
      const metrics2 = this.#calculateWritingMetrics(text2);
      
      // Beräkna likhetsscore (0-100%)
      const similarity = this.#calculateSimilarityScore(metrics1, metrics2);
      
      return {
        success: true,
        similarity: similarity,
        analysis: {
          text1_metrics: metrics1,
          text2_metrics: metrics2,
          verdict: similarity > 80 ? "Troligen samma författare" :
                  similarity > 60 ? "Möjligen samma författare" :
                  similarity > 40 ? "Osäker likhet" : "Troligen olika författare"
        }
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Söker efter dolda meddelanden i text
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} - Resultat med funna dolda meddelanden
   */
  async detectSecretMessage(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const secrets = [];
      
      // Akronym-detektor (första bokstäverna i varje mening)
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const acronym = sentences.map(s => s.trim()[0]).join('').toUpperCase();
      
      if (acronym.length > 2) {
        secrets.push({
          type: "Akronym från meningar",
          message: acronym,
          method: "Första bokstaven i varje mening"
        });
      }
      
      // Första bokstav i varje ord
      const words = text.split(/\s+/);
      const wordAcronym = words.map(w => w[0]).join('').toUpperCase();
      if (wordAcronym.length > 5 && wordAcronym.length < 50) {
        secrets.push({
          type: "Akronym från ord",
          message: wordAcronym,
          method: "Första bokstaven i varje ord"
        });
      }
      
      // Versaler-detektor
      const capitals = text.match(/[A-Z]/g);
      if (capitals && capitals.length > 2) {
        secrets.push({
          type: "Versaler",
          message: capitals.join(''),
          method: "Alla versaler i följd"
        });
      }
      
      // Siffror i text
      const numbers = text.match(/\d/g);
      if (numbers && numbers.length > 1) {
        secrets.push({
          type: "Numerisk kod",
          message: numbers.join(''),
          method: "Alla siffror i texten"
        });
      }
      
      return {
        success: true,
        secretsFound: secrets.length,
        secrets: secrets,
        analysis: secrets.length > 0 ? 
          "Potentiella dolda meddelanden hittade!" : 
          "Inga uppenbara dolda meddelanden funna."
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Dekoderar chiffer (Caesar, ROT13, Atbash)
   * @param {string} text - Text som ska dekoderas
   * @param {string} cipherType - Typ av chiffer ('caesar', 'rot13', 'atbash', 'all')
   * @returns {Object} - Resultat med dekodade alternativ
   */
  async decodeCipher(text, cipherType = 'caesar') {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const results = [];
      
      if (cipherType === 'caesar' || cipherType === 'all') {
        // Prova alla Caesar cipher shifts (1-25)
        for (let shift = 1; shift <= 25; shift++) {
          const decoded = this.#caesarCipher(text, shift);
          results.push({
            type: `Caesar Cipher (shift ${shift})`,
            decoded: decoded,
            shift: shift
          });
        }
      }
      
      if (cipherType === 'rot13' || cipherType === 'all') {
        // ROT13
        const rot13 = this.#caesarCipher(text, 13);
        results.push({
          type: "ROT13",
          decoded: rot13,
          shift: 13
        });
      }
      
      if (cipherType === 'atbash' || cipherType === 'all') {
        // Atbash cipher (A=Z, B=Y, etc.)
        const atbash = this.#atbashCipher(text);
        results.push({
          type: "Atbash Cipher",
          decoded: atbash,
          shift: "reverse"
        });
      }
      
      return {
        success: true,
        originalText: text,
        cipherType: cipherType,
        results: results,
        hint: "Leta efter meningsfull text bland resultaten!"
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Kontrollerar plagiat mellan två texter
   * @param {string} originalText - Originaltext
   * @param {string} suspectText - Misstänkt plagierad text
   * @returns {Object} - Resultat med plagiatsanalys
   */
  async checkPlagiarism(originalText, suspectText) {
    try {
      if (!this.#validateText(originalText) || !this.#validateText(suspectText)) {
        return { success: false, error: 'Both original and suspect texts are required' };
      }

      // Enkel plagiatanalys baserad på ord-överlappning
      const originalWords = new Set(originalText.toLowerCase().split(/\s+/));
      const suspectWords = suspectText.toLowerCase().split(/\s+/);
      
      let matchingWords = 0;
      const matches = [];
      
      suspectWords.forEach(word => {
        if (originalWords.has(word) && word.length > 3) {
          matchingWords++;
          matches.push(word);
        }
      });
      
      const similarity = Math.round((matchingWords / suspectWords.length) * 100);
      
      // Hitta längsta gemensamma sekvenser
      const commonPhrases = this.#findCommonPhrases(originalText, suspectText);
      
      return {
        success: true,
        similarity: similarity,
        matchingWords: matchingWords,
        totalWords: suspectWords.length,
        uniqueMatches: [...new Set(matches)],
        commonPhrases: commonPhrases,
        verdict: similarity > 70 ? "🚨 Hög risk för plagiat" :
                similarity > 40 ? "⚠️ Måttlig likhet" :
                similarity > 20 ? "💭 Låg likhet" : "✅ Minimal likhet",
        confidence: similarity > 50 ? "Hög" : similarity > 25 ? "Medium" : "Låg"
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Skapar ett stilfingeravtryck för text
   * @param {string} text - Text som ska analyseras
   * @returns {Object} - Stilfingeravtryck och metriker
   */
  async createStyleFingerprint(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const metrics = this.#calculateWritingMetrics(text);
      
      // Skapa en unik "fingerprint" baserad på skrivstil
      const fingerprint = {
        avgWordLength: metrics.avgWordLength,
        avgSentenceLength: metrics.avgSentenceLength,
        lexicalDiversity: metrics.lexicalDiversity,
        punctuationDensity: metrics.punctuationDensity,
        capitalizationPattern: metrics.capitalizationPattern
      };
      
      // Generera stilprofil
      const styleProfile = this.#generateStyleProfile(metrics);
      
      return {
        success: true,
        fingerprint: fingerprint,
        metrics: metrics,
        styleProfile: styleProfile,
        uniquenessScore: this.#calculateUniquenessScore(metrics)
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Detekterar steganografi-mönster i text
   * @param {string} text - Text som ska analyseras
   * @returns {Object} - Resultat med funna mönster
   */
  async detectSteganography(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const patterns = [];
      
      // Analysera mellanslag-mönster
      const spacePatterns = this.#analyzeSpacePatterns(text);
      if (spacePatterns.suspicious) {
        patterns.push({
          type: "Mellanslag-kodning",
          description: "Ovanliga mellanslag-mönster upptäckta",
          pattern: spacePatterns.pattern
        });
      }
      
      // Analysera radlängder
      const lines = text.split('\n');
      const lineLengths = lines.map(line => line.length);
      if (this.#hasPatternInLengths(lineLengths)) {
        patterns.push({
          type: "Radlängd-kodning",
          description: "Mönster i radlängder",
          pattern: lineLengths.join(',')
        });
      }
      
      // Analysera interpunktion-mönster
      const punctuationPattern = this.#analyzePunctuationPattern(text);
      if (punctuationPattern.suspicious) {
        patterns.push({
          type: "Interpunktion-kodning",
          description: "Ovanliga interpunktionsmönster",
          pattern: punctuationPattern.pattern
        });
      }
      
      return {
        success: true,
        patternsFound: patterns.length,
        patterns: patterns,
        analysis: patterns.length > 0 ? 
          "Misstänkta steganografi-mönster hittade!" : 
          "Inga uppenbara steganografi-mönster funna.",
        recommendation: patterns.length > 2 ? 
          "Text innehåller flera misstänkta mönster - djupare analys rekommenderas" :
          "Text verkar normal"
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  // Privata hjälpmetoder
  
  /**
   * Beräknar skrivstilsmetriker för text
   * @param {string} text - Text som ska analyseras
   * @returns {Object} - Metriker för skrivstil
   */
  #calculateWritingMetrics(text) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    
    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      avgWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
      avgSentenceLength: words.length / sentences.length,
      lexicalDiversity: uniqueWords.size / words.length,
      punctuationDensity: (text.match(/[.!?,:;]/g) || []).length / text.length,
      capitalizationPattern: (text.match(/[A-Z]/g) || []).length / text.length
    };
  }

  /**
   * Beräknar likhetsscore mellan två metriker
   * @param {Object} metrics1 - Första textens metriker
   * @param {Object} metrics2 - Andra textens metriker
   * @returns {number} - Likhetsscore (0-100)
   */
  #calculateSimilarityScore(metrics1, metrics2) {
    const weights = {
      avgWordLength: 0.2,
      avgSentenceLength: 0.25,
      lexicalDiversity: 0.3,
      punctuationDensity: 0.15,
      capitalizationPattern: 0.1
    };
    
    let totalSimilarity = 0;
    for (const metric in weights) {
      const diff = Math.abs(metrics1[metric] - metrics2[metric]);
      const maxVal = Math.max(metrics1[metric], metrics2[metric]);
      const similarity = maxVal > 0 ? (1 - diff / maxVal) : 1;
      totalSimilarity += similarity * weights[metric];
    }
    
    return Math.round(totalSimilarity * 100);
  }

  /**
   * Caesar cipher implementation
   * @param {string} text - Text att koda/dekoda
   * @param {number} shift - Antal steg att skifta
   * @returns {string} - Kodad/dekodad text
   */
  #caesarCipher(text, shift) {
    return text.replace(/[a-zA-Z]/g, char => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
  }

  /**
   * Atbash cipher implementation
   * @param {string} text - Text att koda/dekoda
   * @returns {string} - Kodad/dekodad text
   */
  #atbashCipher(text) {
    return text.replace(/[a-zA-Z]/g, char => {
      if (char <= 'Z') {
        return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
      } else {
        return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
      }
    });
  }

  /**
   * Hittar gemensamma fraser mellan två texter
   * @param {string} text1 - Första texten
   * @param {string} text2 - Andra texten
   * @returns {Array} - Lista med gemensamma fraser
   */
  #findCommonPhrases(text1, text2) {
    const phrases1 = this.#extractPhrases(text1);
    const phrases2 = this.#extractPhrases(text2);
    
    return phrases1.filter(phrase => 
      phrases2.some(p2 => p2.toLowerCase() === phrase.toLowerCase()) && 
      phrase.split(' ').length >= 3
    ).slice(0, 10);
  }

  /**
   * Extraherar fraser från text
   * @param {string} text - Text att analysera
   * @returns {Array} - Lista med fraser
   */
  #extractPhrases(text) {
    const words = text.split(/\s+/);
    const phrases = [];
    
    for (let i = 0; i < words.length - 2; i++) {
      phrases.push(words.slice(i, i + 3).join(' '));
      if (i < words.length - 3) {
        phrases.push(words.slice(i, i + 4).join(' '));
      }
    }
    
    return phrases;
  }

  /**
   * Genererar stilprofil baserat på metriker
   * @param {Object} metrics - Textmetriker
   * @returns {Array} - Lista med stilbeskrivningar
   */
  #generateStyleProfile(metrics) {
    const profile = [];
    
    if (metrics.avgWordLength > 5.5) profile.push("Använder långa ord");
    if (metrics.avgWordLength < 4) profile.push("Använder korta ord");
    
    if (metrics.avgSentenceLength > 20) profile.push("Skriver långa meningar");
    if (metrics.avgSentenceLength < 10) profile.push("Skriver korta meningar");
    
    if (metrics.lexicalDiversity > 0.7) profile.push("Varierat ordförråd");
    if (metrics.lexicalDiversity < 0.4) profile.push("Begränsat ordförråd");
    
    if (metrics.punctuationDensity > 0.1) profile.push("Använder mycket interpunktion");
    if (metrics.punctuationDensity < 0.03) profile.push("Minimal interpunktion");
    
    return profile.length > 0 ? profile : ["Neutral skrivstil"];
  }

  /**
   * Beräknar unikhetsscore för skrivstil
   * @param {Object} metrics - Textmetriker
   * @returns {number} - Unikhetsscore (0-100)
   */
  #calculateUniquenessScore(metrics) {
    const score = (metrics.lexicalDiversity * 0.4) + 
                  (Math.min(metrics.avgWordLength / 10, 1) * 0.3) +
                  (Math.min(metrics.punctuationDensity * 10, 1) * 0.3);
    return Math.round(score * 100);
  }

  /**
   * Analyserar mellanslag-mönster
   * @param {string} text - Text att analysera
   * @returns {Object} - Analys av mellanslag-mönster
   */
  #analyzeSpacePatterns(text) {
    const multiSpaces = text.match(/\s{2,}/g) || [];
    return {
      suspicious: multiSpaces.length > text.length * 0.02,
      pattern: multiSpaces.join('|')
    };
  }

  /**
   * Kontrollerar om det finns mönster i radlängder
   * @param {Array} lengths - Lista med radlängder
   * @returns {boolean} - True om mönster hittas
   */
  #hasPatternInLengths(lengths) {
    if (lengths.length < 5) return false;
    
    // Kolla efter upprepande mönster
    const pattern = lengths.slice(0, 3);
    let matches = 0;
    
    for (let i = 3; i < lengths.length - 2; i += 3) {
      if (lengths.slice(i, i + 3).join(',') === pattern.join(',')) {
        matches++;
      }
    }
    
    return matches > 2;
  }

  /**
   * Analyserar interpunktionsmönster
   * @param {string} text - Text att analysera
   * @returns {Object} - Analys av interpunktionsmönster
   */
  #analyzePunctuationPattern(text) {
    const punctuation = text.match(/[.!?,:;]/g) || [];
    const pattern = punctuation.join('');
    
    // Kolla efter ovanliga mönster
    const repeats = pattern.match(/(.)\1{2,}/g) || [];
    
    return {
      suspicious: repeats.length > 0,
      pattern: pattern
    };
  }
}