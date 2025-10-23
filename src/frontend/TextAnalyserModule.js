// src/frontend/TextAnalyzerModule.js
import { TextAnalyzer } from 'texttoolkit'

/**
 *
 */
export class TextAnalyzerModule {
  /**
   *
   */
  constructor() { }

  /**
   *
   * @param text
   */
  countWords(inputText) {
    if (typeof inputText !== 'string') {
      console.error('countWords: inputText är inte en sträng:', inputText)
      return 0
    }
    if (!inputText.trim()) {
      console.error('countWords: inputText är tomt')
      return 0
    }
    return new TextAnalyzer(inputText).countWords()
  }

  /**
   *
   * @param text
   */
  countSentences(inputText) {
    if (typeof inputText !== 'string') {
      console.error('countSentences: inputText är inte en sträng:', inputText)
      return 0
    }
    if (!inputText.trim()) {
      console.error('countSentences: inputText är tomt')
      return 0
    }
    return new TextAnalyzer(inputText).countSentences()
  }

  /**
   *
   * @param text
   */
  countCharacters(inputText) {
    if (typeof inputText !== 'string') {
      console.error('countCharacters: inputText är inte en sträng:', inputText)
      return 0
    }
    if (!inputText.trim()) {
      console.error('countCharacters: inputText är tomt')
      return 0
    }
    return new TextAnalyzer(inputText).countCharacters()
  }

  /**
   *
   * @param text
   */
  letterFrequency(inputText) {
    if (typeof inputText !== 'string') {
      console.error('letterFrequency: inputText är inte en sträng:', inputText)
      return {}
    }
    if (!inputText.trim()) {
      console.error('letterFrequency: inputText är tomt')
      return {}
    }
    return new TextAnalyzer(inputText).letterFrequency()
  }

  /**
   *
   * @param text
   */
  findPalindromes(inputText) {
    if (typeof inputText !== 'string') {
      console.error('findPalindromes: inputText är inte en sträng:', inputText)
      return []
    }
    if (!inputText.trim()) {
      console.error('findPalindromes: inputText är tomt')
      return []
    }
    return new TextAnalyzer(inputText).findPalindromes()
  }
}