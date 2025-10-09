// src/services/mood/SentimentAnalyzer.js
import SentimentDictionary from './SentimentDictionary.js'
import MoodValidator from './MoodValidator.js'

/**
 * Advanced sentiment analysis service
 * Provides detailed sentiment analysis including timeline and trends
 */
class SentimentAnalyzer {
  /**
   * Analyzes sentiment of a text segment
   * @param {string} text - The text to analyze
   * @returns {object} - Detailed sentiment analysis
   */
  static analyzeSentiment(text) {
    const words = text.toLowerCase().split(/\s+/)
    let totalScore = 0
    let wordCount = 0
    const emotions = []

    words.forEach(word => {
      const sentiment = SentimentDictionary.getWordSentiment(word)
      if (sentiment !== 0) {
        totalScore += sentiment
        wordCount++
      }

      const wordEmotions = SentimentDictionary.detectWordEmotions(word)
      emotions.push(...wordEmotions)
    })

    const score = wordCount > 0 ? totalScore / wordCount : 0
    const dominantEmotion = this.getDominantEmotion(emotions)
    const intensity = Math.abs(score)

    return {
      score,
      dominantEmotion,
      intensity,
      classification: this.classifySentiment(score),
      wordCount,
      emotions: emotions.filter((emotion, index, arr) => arr.indexOf(emotion) === index)
    }
  }

  /**
   * Creates a sentiment timeline from text
   * @param {string} text - The text to analyze
   * @returns {object} - Timeline analysis with trends
   */
  static async analyzeSentimentTimeline(text) {
    try {
      const cleanText = MoodValidator.validateText(text)
      
      // Split text into segments (sentences)
      const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0)
      const timeline = []
      
      sentences.forEach((sentence, index) => {
        const sentiment = this.analyzeSentiment(sentence)
        timeline.push({
          segment: index + 1,
          text: sentence.trim().substring(0, 100) + (sentence.length > 100 ? '...' : ''),
          sentiment: sentiment.score,
          emotion: sentiment.dominantEmotion,
          intensity: sentiment.intensity,
          timestamp: `${index + 1}/${sentences.length}`
        })
      })
      
      // Calculate trend
      const avgSentiment = timeline.reduce((sum, item) => sum + item.sentiment, 0) / timeline.length
      const trend = this.calculateTrend(timeline.map(item => item.sentiment))
      
      return MoodValidator.createSuccessResponse({
        timeline: timeline,
        summary: {
          averageSentiment: avgSentiment,
          trend: trend,
          totalSegments: timeline.length,
          emotionalRange: Math.max(...timeline.map(t => t.sentiment)) - Math.min(...timeline.map(t => t.sentiment))
        }
      })
    } catch (error) {
      return MoodValidator.handleError(error, 'analyze sentiment timeline')
    }
  }

  /**
   * Classifies sentiment score into categories
   * @param {number} score - Sentiment score
   * @returns {string} - Sentiment classification
   */
  static classifySentiment(score) {
    if (score > 1.5) return 'very positive'
    if (score > 0.5) return 'positive'
    if (score > -0.5) return 'neutral'
    if (score > -1.5) return 'negative'
    return 'very negative'
  }

  /**
   * Determines the dominant emotion from an array of emotions
   * @param {Array} emotions - Array of detected emotions
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
   * Calculates sentiment trend from a series of scores
   * @param {Array} scores - Array of sentiment scores
   * @returns {string} - Trend description
   */
  static calculateTrend(scores) {
    if (scores.length < 2) return 'stable'
    
    const firstHalf = scores.slice(0, Math.floor(scores.length / 2))
    const secondHalf = scores.slice(Math.floor(scores.length / 2))
    
    const firstAvg = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length
    
    const difference = secondAvg - firstAvg
    
    if (difference > 0.3) return 'improving'
    if (difference < -0.3) return 'declining'
    return 'stable'
  }
}

export default SentimentAnalyzer