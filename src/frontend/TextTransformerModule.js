import { TextTransformer } from 'texttoolkit'

export class TextTransformerModule {
  #isValidInput(inputText) {
    return typeof inputText === 'string' && inputText.trim().length > 0
  }

  reverseWords(inputText) {
    if (!this.#isValidInput(inputText)) return ''
    return new TextTransformer(inputText).reverseWordOrder()
  }

  sortWords(inputText) {
    if (!this.#isValidInput(inputText)) return ''
    return new TextTransformer(inputText).sortWords()
  }

  shuffleWords(inputText) {
    if (!this.#isValidInput(inputText)) return ''
    return new TextTransformer(inputText).shuffleWords()
  }
}
