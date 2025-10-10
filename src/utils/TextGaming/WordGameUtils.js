// src/utils/TextGaming/WordGameUtils.js

class WordGameUtils {
  /**
   * Trimma och säkra text.
   * @param {string} text
   * @returns {string}
   */
  static validateText(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided')
    }
    return text.trim()
  }

  /**
   * Blanda en array (Fisher-Yates).
   * @param {Array} array
   * @returns {Array}
   */
  static shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  /**
   * Väljer ett slumpmässigt element från en array.
   * @param {Array} array
   * @returns {*}
   */
  static chooseRandom(array) {
    if (!Array.isArray(array) || array.length === 0) return undefined
    return array[Math.floor(Math.random() * array.length)]
  }

  /**
   * Kan ordet byggas av tillgängliga bokstäver?
   * @param {string} word
   * @param {Array} availableLetters
   * @returns {boolean}
   */
  static canFormWord(word, availableLetters) {
    const wordLetters = word.split('')
    const lettersCopy = [...availableLetters]
    for (let letter of wordLetters) {
      const idx = lettersCopy.indexOf(letter)
      if (idx === -1) return false
      lettersCopy.splice(idx, 1)
    }
    return true
  }

  /**
   * Prestandabetyg för WPM (ord/min).
   * @param {number} wpm
   * @returns {string}
   */
  static getPerformanceRating(wpm) {
    if (wpm >= 80) return '🔥 Fantastisk!'
    if (wpm >= 60) return '🚀 Utmärkt!'
    if (wpm >= 40) return '👍 Bra jobbat!'
    if (wpm >= 20) return '📝 Fortsätt öva!'
    return '🐌 Börja långsamt!'
  }
}

export default WordGameUtils
