// src/services/mood/SentimentDictionary.js

/**
 * Dictionary containing sentiment words and emotion indicators for Swedish text analysis
 * Provides structured data for mood and emotion detection
 */
class SentimentDictionary {
  /**
   * Gets the complete sentiment word dictionary
   * @returns {object} - Dictionary with positive/negative words and emotions
   */
  static getSentimentWords() {
    return {
      positive: {
        high: ['fantastisk', 'underbar', 'älskar', 'perfekt', 'brilliant', 'magisk', 'otrolig', 'enastående'],
        medium: ['bra', 'fin', 'trevlig', 'glad', 'nöjd', 'positiv', 'lycklig', 'kul', 'rolig'],
        low: ['okej', 'hyfsad', 'duglig', 'acceptabel', 'rimlig']
      },
      negative: {
        high: ['förfärlig', 'hemsk', 'fruktansvärd', 'vidrig', 'avskyvärd', 'katastrof', 'mardröm'],
        medium: ['dålig', 'tråkig', 'ledsen', 'arg', 'irriterad', 'besviken', 'sur', 'taskig'],
        low: ['mindre', 'svag', 'inte', 'knappast', 'bara']
      },
      emotions: {
        joy: ['glädje', 'lycka', 'skratt', 'leende', 'kul', 'roligt', 'festlig', 'glad'],
        sadness: ['sorg', 'ledsen', 'gråt', 'deprimerad', 'melankolisk', 'trist', 'sorglig'],
        anger: ['arg', 'ilska', 'raseri', 'förbannad', 'irriterad', 'wretad', 'upprörd'],
        fear: ['rädd', 'skräck', 'oro', 'ångest', 'nervös', 'panisk', 'förskräckt'],
        surprise: ['förvånad', 'chockad', 'häpen', 'överraskad', 'förstummad'],
        disgust: ['äcklad', 'motbjudande', 'vidrigt', 'avskyvärd', 'motvilja']
      },
      stress: {
        high: ['stress', 'ångest', 'panik', 'pressure', 'deadline', 'kris', 'kaos', 'kollaps'],
        medium: ['oro', 'bekymmer', 'tension', 'nervös', 'orolig', 'ängslig'],
        indicators: ['måste', 'borde', 'ska', 'deadline', 'snabbt', 'bråttom', 'tid', 'hinner']
      }
    }
  }

  /**
   * Gets sentiment score for a word
   * @param {string} word - The word to analyze
   * @returns {number} - Sentiment score (-3 to +3)
   */
  static getWordSentiment(word) {
    const words = this.getSentimentWords()
    const lowerWord = word.toLowerCase()

    // Positive words
    if (words.positive.high.includes(lowerWord)) return 3
    if (words.positive.medium.includes(lowerWord)) return 2
    if (words.positive.low.includes(lowerWord)) return 1

    // Negative words
    if (words.negative.high.includes(lowerWord)) return -3
    if (words.negative.medium.includes(lowerWord)) return -2
    if (words.negative.low.includes(lowerWord)) return -1

    return 0
  }

  /**
   * Detects emotions in a word
   * @param {string} word - The word to analyze
   * @returns {Array} - Array of detected emotions
   */
  static detectWordEmotions(word) {
    const words = this.getSentimentWords()
    const lowerWord = word.toLowerCase()
    const detectedEmotions = []

    Object.entries(words.emotions).forEach(([emotion, wordList]) => {
      if (wordList.includes(lowerWord)) {
        detectedEmotions.push(emotion)
      }
    })

    return detectedEmotions
  }

  /**
   * Checks if a word indicates stress
   * @param {string} word - The word to analyze
   * @returns {object} - Stress analysis result
   */
  static analyzeWordStress(word) {
    const words = this.getSentimentWords()
    const lowerWord = word.toLowerCase()

    if (words.stress.high.includes(lowerWord)) {
      return { hasStress: true, level: 'high', word: lowerWord }
    }
    if (words.stress.medium.includes(lowerWord)) {
      return { hasStress: true, level: 'medium', word: lowerWord }
    }
    if (words.stress.indicators.includes(lowerWord)) {
      return { hasStress: true, level: 'indicator', word: lowerWord }
    }

    return { hasStress: false, level: 'none', word: lowerWord }
  }
}

export default SentimentDictionary