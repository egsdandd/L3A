import { TextTransformer } from 'texttoolkit'

/**
 *
 */
export class TextTransformerModule {
  /**
   *
   * @param text
   */
  reverseWords(text) {
    if (typeof text !== 'string') {
      console.error('reverseWords: text är inte en sträng:', text)
      return ''
    }
    if (!text.trim()) {
      console.error('reverseWords: text är tomt')
      return ''
    }
    return new TextTransformer(text).reverseWordOrder()
  }

  /**
   *
   * @param text
   */
  sortWords(text) {
    if (typeof text !== 'string') {
      console.error('sortWords: text är inte en sträng:', text)
      return ''
    }
    if (!text.trim()) {
      console.error('sortWords: text är tomt')
      return ''
    }
    return new TextTransformer(text).sortWords()
  }

  /**
   *
   * @param text
   */
  shuffleWords(text) {
    if (typeof text !== 'string') {
      console.error('shuffleWords: text är inte en sträng:', text)
      return ''
    }
    if (!text.trim()) {
      console.error('shuffleWords: text är tomt')
      return ''
    }
    return new TextTransformer(text).shuffleWords()
  }
}
