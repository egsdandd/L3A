import { TextSearcher } from 'texttoolkit'

/**
 *
 */
export class TextSearcherModule {
  /**
   *
   * @param text
   * @param query
   */
  findFirst(inputText, searchQuery) {
    if (typeof inputText !== 'string' || typeof searchQuery !== 'string') {
      console.error('findFirst: inputText eller searchQuery är inte en sträng:', inputText, searchQuery)
      return ''
    }
    if (!inputText.trim() || !searchQuery.trim()) {
      console.error('findFirst: inputText eller searchQuery är tomt')
      return ''
    }
    return new TextSearcher(inputText).findFirst(searchQuery)
  }

  /**
   *
   * @param text
   * @param query
   */
  findAll(inputText, searchQuery) {
    if (typeof inputText !== 'string' || typeof searchQuery !== 'string') {
      console.error('findAll: inputText eller searchQuery är inte en sträng:', inputText, searchQuery)
      return []
    }
    if (!inputText.trim() || !searchQuery.trim()) {
      console.error('findAll: inputText eller searchQuery är tomt')
      return []
    }
    return new TextSearcher(inputText).findAll(searchQuery)
  }

  /**
   *
   * @param text
   * @param query
   */
  count(inputText, searchQuery) {
    if (typeof inputText !== 'string' || typeof searchQuery !== 'string') {
      console.error('count: inputText eller searchQuery är inte en sträng:', inputText, searchQuery)
      return 0
    }
    if (!inputText.trim() || !searchQuery.trim()) {
      console.error('count: inputText eller searchQuery är tomt')
      return 0
    }
    return new TextSearcher(inputText).count(searchQuery)
  }

  /**
   *
   * @param text
   * @param query
   */
  exists(inputText, searchQuery) {
    if (typeof inputText !== 'string' || typeof searchQuery !== 'string') {
      console.error('exists: inputText eller searchQuery är inte en sträng:', inputText, searchQuery)
      return false
    }
    if (!inputText.trim() || !searchQuery.trim()) {
      console.error('exists: inputText eller searchQuery är tomt')
      return false
    }
    return new TextSearcher(inputText).exists(searchQuery)
  }
}
