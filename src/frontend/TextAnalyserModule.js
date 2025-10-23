// src/frontend/TextAnalyzerModule.js
import { TextAnalyzer } from 'texttoolkit'

export class TextAnalyzerModule {
  #isValidInput(inputText) {
    return typeof inputText === 'string' && inputText.trim().length > 0
  }

  countWords(inputText) {
    if (!this.#isValidInput(inputText)) return 0
    return new TextAnalyzer(inputText).countWords()
  }

  countSentences(inputText) {
    if (!this.#isValidInput(inputText)) return 0
    return new TextAnalyzer(inputText).countSentences()
  }

  countCharacters(inputText) {
    if (!this.#isValidInput(inputText)) return 0
    return new TextAnalyzer(inputText).countCharacters()
  }

  letterFrequency(inputText) {
    if (!this.#isValidInput(inputText)) return {}
    return new TextAnalyzer(inputText).letterFrequency()
  }

  findPalindromes(inputText) {
    if (!this.#isValidInput(inputText)) return []
    return new TextAnalyzer(inputText).findPalindromes()
  }
}