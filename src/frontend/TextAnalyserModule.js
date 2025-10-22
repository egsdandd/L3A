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
  countWords(text) {
    if (typeof text !== 'string') {
      console.error('countWords: text är inte en sträng:', text)
      return 0
    }
    if (!text.trim()) {
      console.error('countWords: text är tomt')
      return 0
    }
    return new TextAnalyzer(text).countWords()
  }

  /**
   *
   * @param text
   */
  countSentences(text) {
    if (typeof text !== 'string') {
      console.error('countSentences: text är inte en sträng:', text)
      return 0
    }
    if (!text.trim()) {
      console.error('countSentences: text är tomt')
      return 0
    }
    return new TextAnalyzer(text).countSentences()
  }

  /**
   *
   * @param text
   */
  countCharacters(text) {
    if (typeof text !== 'string') {
      console.error('countCharacters: text är inte en sträng:', text)
      return 0
    }
    if (!text.trim()) {
      console.error('countCharacters: text är tomt')
      return 0
    }
    return new TextAnalyzer(text).countCharacters()
  }

  /**
   *
   * @param text
   */
  letterFrequency(text) {
    if (typeof text !== 'string') {
      console.error('letterFrequency: text är inte en sträng:', text)
      return {}
    }
    if (!text.trim()) {
      console.error('letterFrequency: text är tomt')
      return {}
    }
    return new TextAnalyzer(text).letterFrequency()
  }

  /**
   *
   * @param text
   */
  findPalindromes(text) {
    if (typeof text !== 'string') {
      console.error('findPalindromes: text är inte en sträng:', text)
      return []
    }
    if (!text.trim()) {
      console.error('findPalindromes: text är tomt')
      return []
    }
    return new TextAnalyzer(text).findPalindromes()
  }
}