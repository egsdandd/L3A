// src/services/mood/StressAnalyzer.js
import SentimentDictionary from './SentimentDictionary.js'
import MoodValidator from './MoodValidator.js'

/**
 * Specialized stress detection and analysis service
 * Provides comprehensive stress level analysis and recommendations
 */
class StressAnalyzer {
  /**
   * Detects stress level in text
   * @param {string} text - The text to analyze
   * @returns {object} - Comprehensive stress analysis
   */
  static async detectStress(text) {
    try {
      const cleanText = MoodValidator.validateText(text)
      
      const stressAnalysis = this.analyzeStressLevel(cleanText)
      const linguisticStress = this.analyzeLinguisticStress(cleanText)
      const temporalStress = this.analyzeTemporalStress(cleanText)
      
      const overallStress = (stressAnalysis.level + linguisticStress.level + temporalStress.level) / 3
      
      return MoodValidator.createSuccessResponse({
        overallStressLevel: overallStress,
        stressCategory: this.categorizeStress(overallStress),
        analysis: {
          vocabulary: stressAnalysis,
          linguistic: linguisticStress,
          temporal: temporalStress
        },
        recommendations: this.generateStressRecommendations(overallStress),
        stressIndicators: this.findStressIndicators(cleanText)
      })
    } catch (error) {
      return MoodValidator.handleError(error, 'detect stress')
    }
  }

  /**
   * Analyzes stress level based on vocabulary
   * @param {string} text - Text to analyze
   * @returns {object} - Vocabulary-based stress analysis
   */
  static analyzeStressLevel(text) {
    const words = text.toLowerCase().split(/\s+/)
    let stressScore = 0
    let stressWords = []
    
    words.forEach(word => {
      const stressAnalysis = SentimentDictionary.analyzeWordStress(word)
      if (stressAnalysis.hasStress) {
        stressWords.push({
          word: word,
          level: stressAnalysis.level
        })
        
        switch (stressAnalysis.level) {
          case 'high':
            stressScore += 3
            break
          case 'medium':
            stressScore += 2
            break
          case 'indicator':
            stressScore += 1
            break
        }
      }
    })
    
    const normalizedLevel = Math.min(1, stressScore / words.length * 10)
    
    return {
      level: normalizedLevel,
      stressWords: stressWords,
      totalStressWords: stressWords.length,
      percentage: (stressWords.length / words.length) * 100
    }
  }

  /**
   * Analyzes linguistic stress indicators
   * @param {string} text - Text to analyze
   * @returns {object} - Linguistic stress analysis
   */
  static analyzeLinguisticStress(text) {
    let stressScore = 0
    const indicators = []
    
    // Exclamation marks
    const exclamations = (text.match(/!/g) || []).length
    if (exclamations > 0) {
      stressScore += exclamations * 0.1
      indicators.push(`${exclamations} exclamation marks`)
    }
    
    // All caps words
    const capsWords = text.match(/\b[A-ZÅÄÖ]{3,}\b/g) || []
    if (capsWords.length > 0) {
      stressScore += capsWords.length * 0.2
      indicators.push(`${capsWords.length} words in ALL CAPS`)
    }
    
    // Question marks in succession
    const multiQuestions = (text.match(/\?{2,}/g) || []).length
    if (multiQuestions > 0) {
      stressScore += multiQuestions * 0.3
      indicators.push(`${multiQuestions} multiple question marks`)
    }
    
    // Short, fragmented sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const shortSentences = sentences.filter(s => s.trim().split(/\s+/).length < 5).length
    if (shortSentences > sentences.length * 0.5) {
      stressScore += 0.2
      indicators.push('Many short, fragmented sentences')
    }
    
    return {
      level: Math.min(1, stressScore),
      indicators: indicators,
      exclamations: exclamations,
      capsWords: capsWords.length,
      shortSentences: shortSentences
    }
  }

  /**
   * Analyzes temporal stress (urgency indicators)
   * @param {string} text - Text to analyze
   * @returns {object} - Temporal stress analysis
   */
  static analyzeTemporalStress(text) {
    const urgencyWords = [
      'snabbt', 'omedelbart', 'nu', 'direkt', 'akut', 'deadline', 'bråttom',
      'tid', 'sent', 'för sent', 'hinner inte', 'stress', 'pressar'
    ]
    
    const timeWords = [
      'imorgon', 'idag', 'ikväll', 'innan', 'tills', 'senast', 'före'
    ]
    
    const words = text.toLowerCase()
    let urgencyCount = 0
    let timeCount = 0
    const foundIndicators = []
    
    urgencyWords.forEach(word => {
      if (words.includes(word)) {
        urgencyCount++
        foundIndicators.push(word)
      }
    })
    
    timeWords.forEach(word => {
      if (words.includes(word)) {
        timeCount++
      }
    })
    
    const totalWords = text.split(/\s+/).length
    const urgencyRatio = urgencyCount / totalWords
    const timeRatio = timeCount / totalWords
    
    const temporalStress = (urgencyRatio * 2 + timeRatio) * 10
    
    return {
      level: Math.min(1, temporalStress),
      urgencyWords: urgencyCount,
      timeWords: timeCount,
      indicators: foundIndicators,
      urgencyRatio: urgencyRatio,
      timeRatio: timeRatio
    }
  }

  /**
   * Categorizes stress level
   * @param {number} stressLevel - Overall stress level (0-1)
   * @returns {string} - Stress category
   */
  static categorizeStress(stressLevel) {
    if (stressLevel >= 0.8) return 'Very High Stress'
    if (stressLevel >= 0.6) return 'High Stress'
    if (stressLevel >= 0.4) return 'Moderate Stress'
    if (stressLevel >= 0.2) return 'Low Stress'
    return 'Minimal Stress'
  }

  /**
   * Finds specific stress indicators in text
   * @param {string} text - Text to analyze
   * @returns {Array} - Array of stress indicators
   */
  static findStressIndicators(text) {
    const indicators = []
    const words = text.toLowerCase().split(/\s+/)
    
    words.forEach((word, index) => {
      const stressAnalysis = SentimentDictionary.analyzeWordStress(word)
      if (stressAnalysis.hasStress) {
        indicators.push({
          word: word,
          position: index,
          level: stressAnalysis.level,
          context: this.getWordContext(words, index, 2)
        })
      }
    })
    
    return indicators
  }

  /**
   * Gets context around a word
   * @param {Array} words - Array of words
   * @param {number} index - Index of target word
   * @param {number} contextSize - Number of words to include on each side
   * @returns {string} - Context string
   */
  static getWordContext(words, index, contextSize) {
    const start = Math.max(0, index - contextSize)
    const end = Math.min(words.length, index + contextSize + 1)
    return words.slice(start, end).join(' ')
  }

  /**
   * Generates stress management recommendations
   * @param {number} stressLevel - Overall stress level
   * @returns {Array} - Array of recommendations
   */
  static generateStressRecommendations(stressLevel) {
    if (stressLevel >= 0.8) {
      return [
        'Consider taking immediate steps to reduce stress',
        'Practice deep breathing exercises',
        'Talk to a counselor or therapist',
        'Break large tasks into smaller, manageable pieces',
        'Consider professional stress management support'
      ]
    } else if (stressLevel >= 0.6) {
      return [
        'Take regular breaks throughout your day',
        'Practice mindfulness or meditation',
        'Prioritize your most important tasks',
        'Get adequate sleep and exercise',
        'Consider stress reduction techniques'
      ]
    } else if (stressLevel >= 0.4) {
      return [
        'Maintain a balanced work-life schedule',
        'Use time management techniques',
        'Stay organized with to-do lists',
        'Take short walks or breaks when feeling overwhelmed'
      ]
    } else if (stressLevel >= 0.2) {
      return [
        'Continue with your current stress management',
        'Stay aware of potential stress triggers',
        'Maintain healthy habits'
      ]
    } else {
      return [
        'Great job managing stress!',
        'Keep up your positive approach',
        'Share your stress management techniques with others'
      ]
    }
  }
}

export default StressAnalyzer