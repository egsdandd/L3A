import { TextTransformer } from 'texttoolkit'

/**
 *
 */
export class TextTransformerModule {
  /**
   *
   * @param text
   */
  reverseWords(inputText) {
    if (typeof inputText !== 'string') {
      console.error('reverseWords: inputText är inte en sträng:', inputText)
      return ''
    }
    if (!inputText.trim()) {
      console.error('reverseWords: inputText är tomt')
      return ''
    }
    return new TextTransformer(inputText).reverseWordOrder()
  }

  /**
   *
   * @param text
   */
  sortWords(inputText) {
    if (typeof inputText !== 'string') {
      console.error('sortWords: inputText är inte en sträng:', inputText)
      return ''
    }
    if (!inputText.trim()) {
      console.error('sortWords: inputText är tomt')
      return ''
    }
    return new TextTransformer(inputText).sortWords()
  }

  /**
   *
   * @param text
   */
  shuffleWords(inputText) {
    if (typeof inputText !== 'string') {
      console.error('shuffleWords: inputText är inte en sträng:', inputText)
      return ''
    }
    if (!inputText.trim()) {
      console.error('shuffleWords: inputText är tomt')
      return ''
    }
    return new TextTransformer(inputText).shuffleWords()
  }
}
