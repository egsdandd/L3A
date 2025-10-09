// src/services/mood/EmotionDetector.js
import SentimentDictionary from './SentimentDictionary.js'
import MoodValidator from './MoodValidator.js'

/**
 * Advanced emotion detection and analysis service
 * Provides emotion heatmaps, happiness prediction, and emotional analysis
 */
class EmotionDetector {
  /**
   * Creates an emotional heatmap for text
   * @param {string} text - The text to analyze
   * @returns {object} - Heatmap with emotional zones
   */
  static async createEmotionHeatmap(text) {
    try {
      const cleanText = MoodValidator.validateText(text)
      
      // Split text into words with positions
      const words = cleanText.split(/\s+/)
      const emotionMap = []
      let currentPosition = 0
      
      words.forEach((word, index) => {
        const emotions = SentimentDictionary.detectWordEmotions(word)
        const sentiment = SentimentDictionary.getWordSentiment(word)
        
        if (emotions.length > 0 || sentiment !== 0) {
          emotionMap.push({
            word: word,
            position: index,
            startChar: currentPosition,
            endChar: currentPosition + word.length,
            emotions: emotions,
            sentiment: sentiment,
            intensity: Math.abs(sentiment)
          })
        }
        currentPosition += word.length + 1 // +1 for space
      })
      
      // Create zones based on emotional density
      const zones = this.createEmotionalZones(emotionMap, words.length)
      
      return MoodValidator.createSuccessResponse({
        emotionMap: emotionMap,
        zones: zones,
        summary: {
          totalEmotionalWords: emotionMap.length,
          averageIntensity: emotionMap.reduce((sum, item) => sum + item.intensity, 0) / emotionMap.length || 0,
          dominantEmotion: this.getDominantEmotionFromMap(emotionMap)
        }
      })
    } catch (error) {
      return MoodValidator.handleError(error, 'create emotion heatmap')
    }
  }

  /**
   * Predicts happiness level based on text analysis
   * @param {string} text - The text to analyze
   * @returns {object} - Happiness prediction with factors
   */
  static async predictHappiness(text) {
    try {
      const cleanText = MoodValidator.validateText(text)
      
      const happinessMetrics = this.analyzeHappiness(cleanText)
      const positivityScore = this.calculatePositivity(cleanText)
      const optimismLevel = this.detectOptimism(cleanText)
      
      const predictedMood = this.predictMood(happinessMetrics, positivityScore, optimismLevel)
      
      return MoodValidator.createSuccessResponse({
        happinessScore: happinessMetrics.score,
        positivityScore: positivityScore,
        optimismLevel: optimismLevel,
        predictedMood: predictedMood,
        moodFactors: {
          positiveWords: happinessMetrics.positiveWords,
          negativeWords: happinessMetrics.negativeWords,
          neutralWords: happinessMetrics.neutralWords
        },
        recommendations: this.generateMoodRecommendations(predictedMood),
        emotionalBalance: this.calculateEmotionalBalance(cleanText)
      })
    } catch (error) {
      return MoodValidator.handleError(error, 'predict happiness')
    }
  }

  /**
   * Color codes emotions in text
   * @param {string} text - The text to analyze
   * @returns {object} - Text with color-coded emotions
   */
  static async colorCodeEmotions(text) {
    try {
      const cleanText = MoodValidator.validateText(text)
      const words = cleanText.split(/\s+/)
      const colorCodedText = []
      
      words.forEach(word => {
        const emotions = SentimentDictionary.detectWordEmotions(word)
        const sentiment = SentimentDictionary.getWordSentiment(word)
        
        colorCodedText.push({
          word: word,
          color: this.getEmotionColor(emotions, sentiment),
          emotions: emotions,
          sentiment: sentiment
        })
      })
      
      return MoodValidator.createSuccessResponse({
        colorCodedText: colorCodedText,
        colorLegend: this.getColorLegend()
      })
    } catch (error) {
      return MoodValidator.handleError(error, 'color code emotions')
    }
  }

  /**
   * Creates emotional zones from emotion map
   * @param {Array} emotionMap - Array of emotional words with positions
   * @param {number} totalWords - Total number of words in text
   * @returns {Array} - Array of emotional zones
   */
  static createEmotionalZones(emotionMap, totalWords) {
    const zoneSize = Math.max(10, Math.floor(totalWords / 5)) // Create ~5 zones
    const zones = []
    
    for (let i = 0; i < totalWords; i += zoneSize) {
      const zoneWords = emotionMap.filter(item => 
        item.position >= i && item.position < i + zoneSize
      )
      
      if (zoneWords.length > 0) {
        const avgSentiment = zoneWords.reduce((sum, item) => sum + item.sentiment, 0) / zoneWords.length
        const emotions = [].concat(...zoneWords.map(item => item.emotions))
        
        zones.push({
          start: i,
          end: Math.min(i + zoneSize, totalWords),
          averageSentiment: avgSentiment,
          emotionalDensity: zoneWords.length / zoneSize,
          dominantEmotion: this.getDominantEmotion(emotions),
          intensity: Math.abs(avgSentiment)
        })
      }
    }
    
    return zones
  }

  /**
   * Gets dominant emotion from emotion map
   * @param {Array} emotionMap - Emotion map array
   * @returns {string} - Dominant emotion
   */
  static getDominantEmotionFromMap(emotionMap) {
    const allEmotions = [].concat(...emotionMap.map(item => item.emotions))
    return this.getDominantEmotion(allEmotions)
  }

  /**
   * Gets dominant emotion from emotions array
   * @param {Array} emotions - Array of emotions
   * @returns {string} - Dominant emotion
   */
  static getDominantEmotion(emotions) {
    if (emotions.length === 0) return 'neutral'
    
    const emotionCounts = {}
    emotions.forEach(emotion => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
    })
    
    return Object.keys(emotionCounts).reduce((a, b) => 
      emotionCounts[a] > emotionCounts[b] ? a : b
    )
  }

  /**
   * Analyzes happiness metrics in text
   * @param {string} text - Text to analyze
   * @returns {object} - Happiness analysis
   */
  static analyzeHappiness(text) {
    const words = text.toLowerCase().split(/\s+/)
    let positiveWords = 0
    let negativeWords = 0
    let neutralWords = 0
    
    words.forEach(word => {
      const sentiment = SentimentDictionary.getWordSentiment(word)
      if (sentiment > 0) positiveWords++
      else if (sentiment < 0) negativeWords++
      else neutralWords++
    })
    
    const totalWords = words.length
    const score = (positiveWords - negativeWords) / totalWords
    
    return {
      score,
      positiveWords,
      negativeWords,
      neutralWords,
      totalWords
    }
  }

  /**
   * Calculates positivity score
   * @param {string} text - Text to analyze
   * @returns {number} - Positivity score
   */
  static calculatePositivity(text) {
    const happiness = this.analyzeHappiness(text)
    return Math.max(0, happiness.score)
  }

  /**
   * Detects optimism level
   * @param {string} text - Text to analyze
   * @returns {number} - Optimism level (0-1)
   */
  static detectOptimism(text) {
    const optimismWords = ['kommer', 'ska', 'hoppas', 'tror', 'förväntar', 'planerar']
    const words = text.toLowerCase().split(/\s+/)
    const optimismCount = words.filter(word => optimismWords.includes(word)).length
    return Math.min(1, optimismCount / words.length * 10)
  }

  /**
   * Predicts mood based on metrics
   * @param {object} happiness - Happiness metrics
   * @param {number} positivity - Positivity score
   * @param {number} optimism - Optimism level
   * @returns {string} - Predicted mood
   */
  static predictMood(happiness, positivity, optimism) {
    const combinedScore = (happiness.score + positivity + optimism) / 3
    
    if (combinedScore > 0.6) return 'very happy'
    if (combinedScore > 0.3) return 'happy'
    if (combinedScore > -0.3) return 'neutral'
    if (combinedScore > -0.6) return 'sad'
    return 'very sad'
  }

  /**
   * Calculates emotional balance
   * @param {string} text - Text to analyze
   * @returns {number} - Balance score
   */
  static calculateEmotionalBalance(text) {
    const happiness = this.analyzeHappiness(text)
    const ratio = happiness.positiveWords / (happiness.negativeWords + 1)
    return Math.min(1, ratio / 3) // Normalize to 0-1
  }

  /**
   * Gets color for emotion/sentiment
   * @param {Array} emotions - Detected emotions
   * @param {number} sentiment - Sentiment score
   * @returns {string} - Color code
   */
  static getEmotionColor(emotions, sentiment) {
    if (emotions.includes('joy')) return '#FFD700'
    if (emotions.includes('anger')) return '#FF4500'
    if (emotions.includes('sadness')) return '#4169E1'
    if (emotions.includes('fear')) return '#800080'
    if (emotions.includes('surprise')) return '#FFA500'
    if (emotions.includes('disgust')) return '#556B2F'
    
    if (sentiment > 0) return '#90EE90'
    if (sentiment < 0) return '#FFB6C1'
    return '#D3D3D3'
  }

  /**
   * Gets color legend for emotions
   * @returns {object} - Color legend
   */
  static getColorLegend() {
    return {
      joy: '#FFD700',
      anger: '#FF4500',
      sadness: '#4169E1',
      fear: '#800080',
      surprise: '#FFA500',
      disgust: '#556B2F',
      positive: '#90EE90',
      negative: '#FFB6C1',
      neutral: '#D3D3D3'
    }
  }

  /**
   * Generates mood recommendations
   * @param {string} mood - Predicted mood
   * @returns {Array} - Array of recommendations
   */
  static generateMoodRecommendations(mood) {
    const recommendations = {
      'very happy': ['Keep doing what makes you happy!', 'Share your positivity with others'],
      'happy': ['Maintain your positive outlook', 'Engage in activities you enjoy'],
      'neutral': ['Try to find something that brings you joy', 'Consider mindfulness practices'],
      'sad': ['Talk to someone you trust', 'Consider gentle physical activity'],
      'very sad': ['Seek support from friends or professionals', 'Take small steps toward self-care']
    }
    
    return recommendations[mood] || ['Take care of yourself']
  }
}

export default EmotionDetector