// src/services/forensics/PlagiarismChecker.js
import ForensicsValidator from './ForensicsValidator.js'

/**
 * Plagiarism detection and similarity analysis service
 * Provides comprehensive text comparison and plagiarism detection
 */
class PlagiarismChecker {
  /**
   * Checks for plagiarism between original and suspect texts
   * @param {string} originalText - Original text
   * @param {string} suspectText - Suspect text to compare
   * @param {number} threshold - Similarity threshold (0-1)
   * @returns {object} - Plagiarism analysis results
   */
  static async checkPlagiarism(originalText, suspectText, threshold = 0.8) {
    try {
      const { text1: cleanOriginal, text2: cleanSuspect } = ForensicsValidator.validateComparisonTexts(originalText, suspectText)
      const validThreshold = ForensicsValidator.validateSimilarityThreshold(threshold)
      
      // Perform various similarity analyses
      const exactMatches = this.findExactMatches(cleanOriginal, cleanSuspect)
      const phraseMatches = this.findPhraseMatches(cleanOriginal, cleanSuspect)
      const semanticSimilarity = this.calculateSemanticSimilarity(cleanOriginal, cleanSuspect)
      const structuralSimilarity = this.calculateStructuralSimilarity(cleanOriginal, cleanSuspect)
      
      // Calculate overall plagiarism score
      const overallScore = this.calculateOverallPlagiarismScore(exactMatches, phraseMatches, semanticSimilarity, structuralSimilarity)
      
      // Determine plagiarism verdict
      const isPlagiarism = overallScore >= validThreshold
      const riskLevel = this.assessPlagiarismRisk(overallScore)
      
      return ForensicsValidator.createSuccessResponse({
        isPlagiarism: isPlagiarism,
        overallSimilarity: Math.round(overallScore * 100),
        riskLevel: riskLevel,
        threshold: Math.round(validThreshold * 100),
        analysis: {
          exactMatches: exactMatches,
          phraseMatches: phraseMatches,
          semanticSimilarity: Math.round(semanticSimilarity * 100),
          structuralSimilarity: Math.round(structuralSimilarity * 100)
        },
        recommendations: this.generatePlagiarismRecommendations(overallScore, isPlagiarism)
      })
    } catch (error) {
      return ForensicsValidator.handleError(error, 'check plagiarism')
    }
  }

  /**
   * Finds exact word matches between texts
   * @param {string} text1 - First text
   * @param {string} text2 - Second text
   * @returns {object} - Exact match analysis
   */
  static findExactMatches(text1, text2) {
    const words1 = text1.toLowerCase().split(/\s+/)
    const words2 = text2.toLowerCase().split(/\s+/)
    
    const wordSet1 = new Set(words1)
    const wordSet2 = new Set(words2)
    
    // Find common words
    const commonWords = [...wordSet1].filter(word => wordSet2.has(word))
    
    // Calculate match statistics
    const matchCount = commonWords.length
    const totalUniqueWords = new Set([...words1, ...words2]).size
    const matchPercentage = totalUniqueWords > 0 ? matchCount / totalUniqueWords : 0
    
    return {
      matchCount: matchCount,
      matchPercentage: Math.round(matchPercentage * 100),
      commonWords: commonWords.slice(0, 20), // Top 20 common words
      totalWords1: words1.length,
      totalWords2: words2.length
    }
  }

  /**
   * Finds phrase matches between texts
   * @param {string} text1 - First text
   * @param {string} text2 - Second text
   * @returns {object} - Phrase match analysis
   */
  static findPhraseMatches(text1, text2) {
    const sentences1 = text1.split(/[.!?]+/).map(s => s.trim().toLowerCase()).filter(s => s.length > 0)
    const sentences2 = text2.split(/[.!?]+/).map(s => s.trim().toLowerCase()).filter(s => s.length > 0)
    
    const phraseMatches = []
    const minPhraseLength = 5 // Minimum words in a phrase
    
    // Check for similar phrases
    sentences1.forEach((sentence1, index1) => {
      const words1 = sentence1.split(/\s+/)
      if (words1.length < minPhraseLength) return
      
      sentences2.forEach((sentence2, index2) => {
        const words2 = sentence2.split(/\s+/)
        if (words2.length < minPhraseLength) return
        
        const similarity = this.calculatePhraseSimilarity(words1, words2)
        if (similarity > 0.7) { // 70% similarity threshold
          phraseMatches.push({
            similarity: Math.round(similarity * 100),
            phrase1: sentence1.substring(0, 100) + (sentence1.length > 100 ? '...' : ''),
            phrase2: sentence2.substring(0, 100) + (sentence2.length > 100 ? '...' : ''),
            position1: index1,
            position2: index2
          })
        }
      })
    })
    
    // Sort by similarity and take top matches
    phraseMatches.sort((a, b) => b.similarity - a.similarity)
    
    return {
      matchCount: phraseMatches.length,
      averageSimilarity: phraseMatches.length > 0 ? 
        Math.round(phraseMatches.reduce((sum, match) => sum + match.similarity, 0) / phraseMatches.length) : 0,
      topMatches: phraseMatches.slice(0, 10) // Top 10 matches
    }
  }

  /**
   * Calculates phrase similarity between two word arrays
   * @param {Array} words1 - First word array
   * @param {Array} words2 - Second word array
   * @returns {number} - Similarity score (0-1)
   */
  static calculatePhraseSimilarity(words1, words2) {
    const set1 = new Set(words1)
    const set2 = new Set(words2)
    
    const intersection = new Set([...set1].filter(word => set2.has(word)))
    const union = new Set([...set1, ...set2])
    
    return union.size > 0 ? intersection.size / union.size : 0
  }

  /**
   * Calculates semantic similarity between texts
   * @param {string} text1 - First text
   * @param {string} text2 - Second text
   * @returns {number} - Semantic similarity score (0-1)
   */
  static calculateSemanticSimilarity(text1, text2) {
    // Simplified semantic analysis based on word frequency and context
    const words1 = text1.toLowerCase().split(/\s+/)
    const words2 = text2.toLowerCase().split(/\s+/)
    
    // Create word frequency maps
    const freq1 = this.createWordFrequencyMap(words1)
    const freq2 = this.createWordFrequencyMap(words2)
    
    // Calculate cosine similarity
    return this.calculateCosineSimilarity(freq1, freq2)
  }

  /**
   * Calculates structural similarity between texts
   * @param {string} text1 - First text
   * @param {string} text2 - Second text
   * @returns {number} - Structural similarity score (0-1)
   */
  static calculateStructuralSimilarity(text1, text2) {
    const stats1 = this.getTextStructure(text1)
    const stats2 = this.getTextStructure(text2)
    
    // Compare structural elements
    const similarities = []
    
    // Sentence count similarity
    const sentenceSim = 1 - Math.abs(stats1.sentences - stats2.sentences) / Math.max(stats1.sentences, stats2.sentences, 1)
    similarities.push(sentenceSim)
    
    // Paragraph count similarity
    const paragraphSim = 1 - Math.abs(stats1.paragraphs - stats2.paragraphs) / Math.max(stats1.paragraphs, stats2.paragraphs, 1)
    similarities.push(paragraphSim)
    
    // Average sentence length similarity
    const sentenceLengthSim = 1 - Math.abs(stats1.avgSentenceLength - stats2.avgSentenceLength) / 
      Math.max(stats1.avgSentenceLength, stats2.avgSentenceLength, 1)
    similarities.push(sentenceLengthSim)
    
    return similarities.reduce((sum, sim) => sum + sim, 0) / similarities.length
  }

  /**
   * Creates word frequency map
   * @param {Array} words - Array of words
   * @returns {Map} - Word frequency map
   */
  static createWordFrequencyMap(words) {
    const freq = new Map()
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '').toLowerCase()
      if (cleanWord.length > 2) { // Ignore very short words
        freq.set(cleanWord, (freq.get(cleanWord) || 0) + 1)
      }
    })
    return freq
  }

  /**
   * Calculates cosine similarity between two frequency maps
   * @param {Map} freq1 - First frequency map
   * @param {Map} freq2 - Second frequency map
   * @returns {number} - Cosine similarity (0-1)
   */
  static calculateCosineSimilarity(freq1, freq2) {
    const allWords = new Set([...freq1.keys(), ...freq2.keys()])
    
    let dotProduct = 0
    let norm1 = 0
    let norm2 = 0
    
    allWords.forEach(word => {
      const f1 = freq1.get(word) || 0
      const f2 = freq2.get(word) || 0
      
      dotProduct += f1 * f2
      norm1 += f1 * f1
      norm2 += f2 * f2
    })
    
    const denominator = Math.sqrt(norm1) * Math.sqrt(norm2)
    return denominator > 0 ? dotProduct / denominator : 0
  }

  /**
   * Gets text structure statistics
   * @param {string} text - Text to analyze
   * @returns {object} - Structure statistics
   */
  static getTextStructure(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    const words = text.split(/\s+/)
    
    return {
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      words: words.length,
      avgSentenceLength: sentences.length > 0 ? words.length / sentences.length : 0
    }
  }

  /**
   * Calculates overall plagiarism score
   * @param {object} exactMatches - Exact match results
   * @param {object} phraseMatches - Phrase match results
   * @param {number} semanticSimilarity - Semantic similarity score
   * @param {number} structuralSimilarity - Structural similarity score
   * @returns {number} - Overall plagiarism score (0-1)
   */
  static calculateOverallPlagiarismScore(exactMatches, phraseMatches, semanticSimilarity, structuralSimilarity) {
    const weights = {
      exactMatches: 0.3,
      phraseMatches: 0.4,
      semantic: 0.2,
      structural: 0.1
    }
    
    const exactScore = exactMatches.matchPercentage / 100
    const phraseScore = phraseMatches.averageSimilarity / 100
    
    return (
      exactScore * weights.exactMatches +
      phraseScore * weights.phraseMatches +
      semanticSimilarity * weights.semantic +
      structuralSimilarity * weights.structural
    )
  }

  /**
   * Assesses plagiarism risk level
   * @param {number} score - Overall plagiarism score (0-1)
   * @returns {string} - Risk level description
   */
  static assessPlagiarismRisk(score) {
    if (score >= 0.9) return 'Critical Risk'
    if (score >= 0.8) return 'High Risk'
    if (score >= 0.6) return 'Medium Risk'
    if (score >= 0.4) return 'Low Risk'
    return 'Minimal Risk'
  }

  /**
   * Generates plagiarism recommendations
   * @param {number} score - Overall plagiarism score
   * @param {boolean} isPlagiarism - Whether plagiarism was detected
   * @returns {Array} - Array of recommendations
   */
  static generatePlagiarismRecommendations(score, isPlagiarism) {
    const recommendations = []
    
    if (isPlagiarism) {
      recommendations.push('Significant text similarity detected - review required')
      recommendations.push('Check for proper citations and attribution')
      recommendations.push('Consider paraphrasing similar content')
      
      if (score > 0.9) {
        recommendations.push('Critical similarity level - immediate action required')
        recommendations.push('Potential copyright infringement risk')
      }
    } else {
      if (score > 0.5) {
        recommendations.push('Moderate similarity detected - verify originality')
        recommendations.push('Consider adding more original content')
      } else {
        recommendations.push('Text appears to be sufficiently original')
        recommendations.push('Continue following good attribution practices')
      }
    }
    
    return recommendations
  }
}

export default PlagiarismChecker