// src/controllers/MoodEngineController.js
import texttoolkit from 'texttoolkit'
import SentimentAnalyzer from '../services/mood/SentimentAnalyzer.js'
import EmotionDetector from '../services/mood/EmotionDetector.js'
import StressAnalyzer from '../services/mood/StressAnalyzer.js'
import MoodValidator from '../services/mood/MoodValidator.js'

/** Main controller for mood and emotion analysis */
class MoodEngineController {
  /** Creates a new MoodEngineController instance */
  constructor() {
    // Private cache for TextDocument instances for better performance
    this.#textDocumentCache = new Map()
    this.#lastText = null
  }

  // Private attributes
  #textDocumentCache
  #lastText

  /**
   * @param {string} text Text
   * @returns {object} TextDocument instance
   */
  #getTextDocument(text) {
    const cleanText = MoodValidator.validateText(text)
    
    // Use cache if same text
    if (cleanText === this.#lastText && this.#textDocumentCache.has('current')) {
      return this.#textDocumentCache.get('current')
    }
    
    const textDoc = new texttoolkit(cleanText)
    this.#textDocumentCache.set('current', textDoc)
    this.#lastText = cleanText
    
    return textDoc
  }

  // Public methods delegating to specialized services

  /**
   * @param {string} text Text to analyze
   * @returns {object} Sentiment timeline analysis
   */
  async analyzeSentimentTimeline(text) {
    return await SentimentAnalyzer.analyzeSentimentTimeline(text)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Heatmap with emotional zones
   */
  async createEmotionHeatmap(text) {
    return await EmotionDetector.createEmotionHeatmap(text)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Stress analysis with recommendations
   */
  async detectStress(text) {
    return await StressAnalyzer.detectStress(text)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Happiness prediction with factors
   */
  async predictHappiness(text) {
    return await EmotionDetector.predictHappiness(text)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Text with color-coded emotions
   */
  async colorCodeEmotions(text) {
    return await EmotionDetector.colorCodeEmotions(text)
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Complete mood analysis report
   */
  async analyzeMoodComprehensive(text) {
    try {
      const cleanText = MoodValidator.validateText(text)
      
      // Run all analyses in parallel for better performance
      const [
        sentimentTimeline,
        emotionHeatmap,
        stressAnalysis,
        happinessPrediction,
        colorCodedEmotions
      ] = await Promise.all([
        this.analyzeSentimentTimeline(cleanText),
        this.createEmotionHeatmap(cleanText),
        this.detectStress(cleanText),
        this.predictHappiness(cleanText),
        this.colorCodeEmotions(cleanText)
      ])

      // Combine all analyses into comprehensive report
      const comprehensiveAnalysis = {
        sentimentTimeline: sentimentTimeline.success ? sentimentTimeline : { error: sentimentTimeline.error },
        emotionHeatmap: emotionHeatmap.success ? emotionHeatmap : { error: emotionHeatmap.error },
        stressAnalysis: stressAnalysis.success ? stressAnalysis : { error: stressAnalysis.error },
        happinessPrediction: happinessPrediction.success ? happinessPrediction : { error: happinessPrediction.error },
        colorCodedEmotions: colorCodedEmotions.success ? colorCodedEmotions : { error: colorCodedEmotions.error }
      }

      // Generate overall summary
      const overallSummary = this.#generateOverallSummary(comprehensiveAnalysis)

      return MoodValidator.createSuccessResponse({
        comprehensive: comprehensiveAnalysis,
        summary: overallSummary,
        textStats: this.#getTextStats(cleanText)
      })
    } catch (error) {
      return MoodValidator.handleError(error, 'analyze mood comprehensive')
    }
  }

  /**
   * @param {object} analyses All analysis results
   * @returns {object} Overall summary
   */
  #generateOverallSummary(analyses) {
    const summary = {
      overallMood: 'neutral',
      dominantEmotion: 'neutral',
      stressLevel: 'unknown',
      recommendedActions: [],
      confidence: 0
    }

    try {
      // Extract key metrics
      if (analyses.sentimentTimeline.summary) {
        const avgSentiment = analyses.sentimentTimeline.summary.averageSentiment
        summary.overallMood = this.#classifyOverallMood(avgSentiment)
      }

      if (analyses.emotionHeatmap.summary) {
        summary.dominantEmotion = analyses.emotionHeatmap.summary.dominantEmotion
      }

      if (analyses.stressAnalysis.stressCategory) {
        summary.stressLevel = analyses.stressAnalysis.stressCategory
      }

      // Combine recommendations
      const allRecommendations = []
      if (analyses.stressAnalysis.recommendations) {
        allRecommendations.push(...analyses.stressAnalysis.recommendations)
      }
      if (analyses.happinessPrediction.recommendations) {
        allRecommendations.push(...analyses.happinessPrediction.recommendations)
      }
      
      summary.recommendedActions = [...new Set(allRecommendations)].slice(0, 5) // Top 5 unique recommendations

      // Calculate overall confidence
      const successfulAnalyses = Object.values(analyses).filter(a => !a.error).length
      summary.confidence = successfulAnalyses / Object.keys(analyses).length

    } catch (error) {
      console.warn('Error generating overall summary:', error)
    }

    return summary
  }

  /**
   * @param {number} sentiment Average sentiment score
   * @returns {string} Mood classification
   */
  #classifyOverallMood(sentiment) {
    if (sentiment > 1) return 'very positive'
    if (sentiment > 0.3) return 'positive'
    if (sentiment > -0.3) return 'neutral'
    if (sentiment > -1) return 'negative'
    return 'very negative'
  }

  /**
   * @param {string} text Text to analyze
   * @returns {object} Text statistics
   */
  #getTextStats(text) {
    const words = text.split(/\s+/)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const characters = text.length
    
    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      characterCount: characters,
      averageWordsPerSentence: sentences.length > 0 ? words.length / sentences.length : 0,
      averageCharactersPerWord: words.length > 0 ? characters / words.length : 0
    }
  }
}

export default MoodEngineController