// src/services/forensics/AuthorshipAnalyzer.js
import ForensicsValidator from './ForensicsValidator.js'

/**
 * Authorship analysis service for comparing writing styles
 * Provides detailed analysis of text similarities and authorship attribution
 */
class AuthorshipAnalyzer {
  /**
   * Analyzes authorship by comparing writing styles
   * @param {string} text1 - First text
   * @param {string} text2 - Second text to compare with
   * @returns {object} - Result with similarity score and analysis
   */
  static async analyzeAuthorship(text1, text2) {
    try {
      const { text1: cleanText1, text2: cleanText2 } = ForensicsValidator.validateComparisonTexts(text1, text2)
      
      // Calculate writing style metrics
      const metrics1 = this.calculateWritingMetrics(cleanText1)
      const metrics2 = this.calculateWritingMetrics(cleanText2)
      
      // Calculate similarity score (0-100%)
      const similarity = this.calculateSimilarityScore(metrics1, metrics2)
      
      return ForensicsValidator.createSuccessResponse({
        similarity: similarity,
        confidenceLevel: ForensicsValidator.getConfidenceLevel(similarity / 100),
        analysis: {
          text1_metrics: metrics1,
          text2_metrics: metrics2,
          verdict: this.getAuthorshipVerdict(similarity)
        },
        detailedComparison: this.generateDetailedComparison(metrics1, metrics2)
      })
    } catch (error) {
      return ForensicsValidator.handleError(error, 'analyze authorship')
    }
  }

  /**
   * Creates a style fingerprint for a text
   * @param {string} text - The text to analyze
   * @returns {object} - Style fingerprint with writing characteristics
   */
  static async createStyleFingerprint(text) {
    try {
      const cleanText = ForensicsValidator.validateText(text)
      const metrics = this.calculateWritingMetrics(cleanText)
      const fingerprint = this.generateStyleFingerprint(metrics, cleanText)
      
      return ForensicsValidator.createSuccessResponse({
        fingerprint: fingerprint,
        metrics: metrics,
        summary: this.generateStyleSummary(metrics)
      })
    } catch (error) {
      return ForensicsValidator.handleError(error, 'create style fingerprint')
    }
  }

  /**
   * Calculates comprehensive writing metrics
   * @param {string} text - Text to analyze
   * @returns {object} - Writing metrics
   */
  static calculateWritingMetrics(text) {
    const words = text.split(/\s+/)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    
    // Basic metrics
    const averageWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0
    const averageSentencesPerParagraph = paragraphs.length > 0 ? sentences.length / paragraphs.length : 0
    const averageWordLength = words.length > 0 ? words.join('').length / words.length : 0
    
    // Punctuation analysis
    const exclamationMarks = (text.match(/!/g) || []).length
    const questionMarks = (text.match(/\?/g) || []).length
    const commas = (text.match(/,/g) || []).length
    const semicolons = (text.match(/;/g) || []).length
    
    // Vocabulary analysis
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size
    const vocabularyRichness = words.length > 0 ? uniqueWords / words.length : 0
    
    // Word length distribution
    const wordLengths = words.map(w => w.length)
    const shortWords = wordLengths.filter(l => l <= 3).length
    const mediumWords = wordLengths.filter(l => l > 3 && l <= 6).length
    const longWords = wordLengths.filter(l => l > 6).length
    
    // Sentence complexity
    const complexSentences = sentences.filter(s => s.split(',').length > 2).length
    const sentenceComplexity = sentences.length > 0 ? complexSentences / sentences.length : 0
    
    return {
      basicMetrics: {
        wordCount: words.length,
        sentenceCount: sentences.length,
        paragraphCount: paragraphs.length,
        averageWordsPerSentence,
        averageSentencesPerParagraph,
        averageWordLength
      },
      punctuationMetrics: {
        exclamationMarks,
        questionMarks,
        commas,
        semicolons,
        punctuationDensity: (exclamationMarks + questionMarks + commas + semicolons) / words.length
      },
      vocabularyMetrics: {
        uniqueWords,
        vocabularyRichness,
        shortWords,
        mediumWords,
        longWords
      },
      complexityMetrics: {
        sentenceComplexity,
        averageClauseLength: averageWordsPerSentence / 2 // Simplified estimate
      }
    }
  }

  /**
   * Calculates similarity score between two sets of metrics
   * @param {object} metrics1 - First text metrics
   * @param {object} metrics2 - Second text metrics
   * @returns {number} - Similarity score (0-100)
   */
  static calculateSimilarityScore(metrics1, metrics2) {
    const weights = {
      averageWordsPerSentence: 0.2,
      averageWordLength: 0.15,
      vocabularyRichness: 0.2,
      sentenceComplexity: 0.15,
      punctuationDensity: 0.1,
      shortWords: 0.1,
      longWords: 0.1
    }
    
    let totalSimilarity = 0
    let totalWeight = 0
    
    // Compare key metrics
    Object.entries(weights).forEach(([metric, weight]) => {
      const value1 = this.getMetricValue(metrics1, metric)
      const value2 = this.getMetricValue(metrics2, metric)
      
      if (value1 !== null && value2 !== null) {
        const maxValue = Math.max(value1, value2)
        const minValue = Math.min(value1, value2)
        const similarity = maxValue > 0 ? (minValue / maxValue) : 1
        
        totalSimilarity += similarity * weight
        totalWeight += weight
      }
    })
    
    return totalWeight > 0 ? Math.round((totalSimilarity / totalWeight) * 100) : 0
  }

  /**
   * Gets a specific metric value from metrics object
   * @param {object} metrics - Metrics object
   * @param {string} metricName - Name of the metric
   * @returns {number|null} - Metric value or null if not found
   */
  static getMetricValue(metrics, metricName) {
    // Navigate through nested metrics structure
    if (metrics.basicMetrics && metrics.basicMetrics[metricName] !== undefined) {
      return metrics.basicMetrics[metricName]
    }
    if (metrics.vocabularyMetrics && metrics.vocabularyMetrics[metricName] !== undefined) {
      return metrics.vocabularyMetrics[metricName]
    }
    if (metrics.complexityMetrics && metrics.complexityMetrics[metricName] !== undefined) {
      return metrics.complexityMetrics[metricName]
    }
    if (metrics.punctuationMetrics && metrics.punctuationMetrics[metricName] !== undefined) {
      return metrics.punctuationMetrics[metricName]
    }
    return null
  }

  /**
   * Generates authorship verdict based on similarity score
   * @param {number} similarity - Similarity score (0-100)
   * @returns {string} - Authorship verdict
   */
  static getAuthorshipVerdict(similarity) {
    if (similarity > 80) return 'Troligen samma författare'
    if (similarity > 60) return 'Möjligen samma författare'
    if (similarity > 40) return 'Osäker likhet'
    return 'Troligen olika författare'
  }

  /**
   * Generates detailed comparison between two texts
   * @param {object} metrics1 - First text metrics
   * @param {object} metrics2 - Second text metrics
   * @returns {object} - Detailed comparison
   */
  static generateDetailedComparison(metrics1, metrics2) {
    return {
      wordUsage: {
        text1_averageWordLength: metrics1.basicMetrics.averageWordLength,
        text2_averageWordLength: metrics2.basicMetrics.averageWordLength,
        difference: Math.abs(metrics1.basicMetrics.averageWordLength - metrics2.basicMetrics.averageWordLength)
      },
      sentenceStructure: {
        text1_averageWordsPerSentence: metrics1.basicMetrics.averageWordsPerSentence,
        text2_averageWordsPerSentence: metrics2.basicMetrics.averageWordsPerSentence,
        difference: Math.abs(metrics1.basicMetrics.averageWordsPerSentence - metrics2.basicMetrics.averageWordsPerSentence)
      },
      vocabulary: {
        text1_richness: metrics1.vocabularyMetrics.vocabularyRichness,
        text2_richness: metrics2.vocabularyMetrics.vocabularyRichness,
        difference: Math.abs(metrics1.vocabularyMetrics.vocabularyRichness - metrics2.vocabularyMetrics.vocabularyRichness)
      }
    }
  }

  /**
   * Generates style fingerprint from metrics
   * @param {object} metrics - Text metrics
   * @param {string} text - Original text
   * @returns {object} - Style fingerprint
   */
  static generateStyleFingerprint(metrics, text) {
    const commonWords = this.getMostCommonWords(text, 10)
    const writingStyle = this.determineWritingStyle(metrics)
    
    return {
      id: this.generateFingerprintId(metrics),
      writingStyle: writingStyle,
      keyCharacteristics: {
        averageWordsPerSentence: Math.round(metrics.basicMetrics.averageWordsPerSentence * 100) / 100,
        vocabularyRichness: Math.round(metrics.vocabularyMetrics.vocabularyRichness * 100) / 100,
        sentenceComplexity: Math.round(metrics.complexityMetrics.sentenceComplexity * 100) / 100,
        punctuationStyle: this.getPunctuationStyle(metrics.punctuationMetrics)
      },
      commonWords: commonWords,
      textLength: metrics.basicMetrics.wordCount
    }
  }

  /**
   * Gets most common words from text
   * @param {string} text - Text to analyze
   * @param {number} count - Number of common words to return
   * @returns {Array} - Array of common words with frequencies
   */
  static getMostCommonWords(text, count = 10) {
    const words = text.toLowerCase().split(/\s+/)
    const wordCount = {}
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '')
      if (cleanWord.length > 2) { // Ignore very short words
        wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1
      }
    })
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, count)
      .map(([word, frequency]) => ({ word, frequency }))
  }

  /**
   * Determines writing style based on metrics
   * @param {object} metrics - Text metrics
   * @returns {string} - Writing style description
   */
  static determineWritingStyle(metrics) {
    const avgWords = metrics.basicMetrics.averageWordsPerSentence
    const complexity = metrics.complexityMetrics.sentenceComplexity
    const richness = metrics.vocabularyMetrics.vocabularyRichness
    
    if (avgWords > 20 && complexity > 0.5 && richness > 0.7) {
      return 'Academic/Formal'
    } else if (avgWords < 10 && complexity < 0.3) {
      return 'Simple/Conversational'
    } else if (richness > 0.8) {
      return 'Rich/Literary'
    } else if (avgWords > 15 && complexity > 0.4) {
      return 'Professional/Business'
    } else {
      return 'Standard/Mixed'
    }
  }

  /**
   * Gets punctuation style description
   * @param {object} punctuationMetrics - Punctuation metrics
   * @returns {string} - Punctuation style
   */
  static getPunctuationStyle(punctuationMetrics) {
    const density = punctuationMetrics.punctuationDensity
    
    if (density > 0.15) return 'Heavy punctuation'
    if (density > 0.08) return 'Moderate punctuation'
    return 'Light punctuation'
  }

  /**
   * Generates a unique fingerprint ID
   * @param {object} metrics - Text metrics
   * @returns {string} - Fingerprint ID
   */
  static generateFingerprintId(metrics) {
    const seed = Math.round(
      metrics.basicMetrics.averageWordsPerSentence * 100 +
      metrics.vocabularyMetrics.vocabularyRichness * 1000 +
      metrics.complexityMetrics.sentenceComplexity * 100
    )
    return `FP-${seed.toString(36).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`
  }

  /**
   * Generates style summary
   * @param {object} metrics - Text metrics
   * @returns {string} - Style summary
   */
  static generateStyleSummary(metrics) {
    const style = this.determineWritingStyle(metrics)
    const avgWords = Math.round(metrics.basicMetrics.averageWordsPerSentence)
    const richness = Math.round(metrics.vocabularyMetrics.vocabularyRichness * 100)
    
    return `${style} writing style with ${avgWords} words per sentence on average and ${richness}% vocabulary richness.`
  }
}

export default AuthorshipAnalyzer