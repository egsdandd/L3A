// src/controllers/TextGamingController.js

import AnagramService from '../services/TextGaming/AnagramService.js'
import ScrambleService from '../services/TextGaming/ScrambleService.js'
import TextGuessService from '../services/TextGaming/TextGuessService.js'
import SpeedChallengeService from '../services/TextGaming/SpeedChallengeService.js'
import WordChainService from '../services/TextGaming/WordChainService.js'
import WordleGameService from '../services/TextGaming/WordleGameService.js'

/**
 * Controller för hantering av textbaserade spel och utmaningar.
 */
class TextGamingController {
  /**
   * Lös anagarm utifrån bokstäver.
   * @param {string} letters
   */
  async solveAnagram(letters) {
    return AnagramService.solveAnagram(letters)
  }

  /**
   * Blanda (scramble) ord från text på vald svårighetsgrad.
   * @param {string} text
   * @param {string} difficulty
   */
  async scrambleWord(text, difficulty = 'medium') {
    return ScrambleService.scrambleWord(text, difficulty)
  }

  /**
   * Skapa textgissningsledtrådar från text.
   * @param {string} text
   */
  async createTextGuess(text) {
    return TextGuessService.createTextGuess(text)
  }

  /**
   * Räkna ut skrivhastighet och noggrannhet.
   * @param {string} writtenText 
   * @param {number} timeInSeconds 
   */
  async calculateSpeed(writtenText, timeInSeconds) {
    return SpeedChallengeService.calculateSpeed(writtenText, timeInSeconds)
  }

  /**
   * Bygg ordkedja från startord.
   * @param {string} startWord 
   * @param {number} chainLength 
   */
  async buildWordChain(startWord, chainLength = 5) {
    return WordChainService.buildWordChain(startWord, chainLength)
  }

  /**
   * Skapa eller spela Wordle-liknande utmaning.
   * @param {string} targetWord 
   * @param {string} guess 
   */
  async createWordleChallenge(targetWord, guess) {
    return WordleGameService.createWordleChallenge(targetWord, guess)
  }
}

export default TextGamingController
