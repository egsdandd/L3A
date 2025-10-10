// src/services/TextGaming/WordChainService.js

import { wordAssociations } from '../../utils/TextGaming/WordData.js'

class WordChainService {
  /**
   * Bygger en ordkedja utifrån associationsmatris.
   * @param {string} startWord
   * @param {number} chainLength
   * @returns {object}
   */
  static buildWordChain(startWord, chainLength = 5) {
    try {
      if (!startWord || typeof startWord !== 'string') {
        throw new Error('Start word is required')
      }

      const chain = [startWord.toLowerCase()]
      let currentWord = startWord.toLowerCase()

      for (let i = 0; i < chainLength - 1; i++) {
        const associations = wordAssociations[currentWord]
        const possibleWords = Array.isArray(associations) && associations.length > 0
          ? associations
          : ['slumpmässigt', 'ord', 'här']

        // Välj slumpmässigt nästa ord
        const nextWord = possibleWords[Math.floor(Math.random() * possibleWords.length)]
        chain.push(nextWord)
        currentWord = nextWord
      }

      return {
        success: true,
        startWord,
        chain,
        explanation: 'Varje ord associeras med nästa baserat på relationsdata',
        challenge: `Kan du bygga en längre kedja från "${startWord}"?`
      }
    } catch (error) {
      return WordChainService.handleError(error, 'buildWordChain')
    }
  }

  /**
   * Felhantering och felrapport.
   * @param {Error} error
   * @param {string} operation
   * @returns {object}
   */
  static handleError(error, operation) {
    console.error(`WordChainService.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }
}

export default WordChainService
