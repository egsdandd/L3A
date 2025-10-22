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
  findFirst(text, query) {
    if (typeof text !== 'string' || typeof query !== 'string') {
      console.error('findFirst: text eller query är inte en sträng:', text, query)
      return ''
    }
    if (!text.trim() || !query.trim()) {
      console.error('findFirst: text eller query är tomt')
      return ''
    }
    return new TextSearcher(text).findFirst(query)
  }

  /**
   *
   * @param text
   * @param query
   */
  findAll(text, query) {
    if (typeof text !== 'string' || typeof query !== 'string') {
      console.error('findAll: text eller query är inte en sträng:', text, query)
      return []
    }
    if (!text.trim() || !query.trim()) {
      console.error('findAll: text eller query är tomt')
      return []
    }
    return new TextSearcher(text).findAll(query)
  }

  /**
   *
   * @param text
   * @param query
   */
  count(text, query) {
    if (typeof text !== 'string' || typeof query !== 'string') {
      console.error('count: text eller query är inte en sträng:', text, query)
      return 0
    }
    if (!text.trim() || !query.trim()) {
      console.error('count: text eller query är tomt')
      return 0
    }
    return new TextSearcher(text).count(query)
  }

  /**
   *
   * @param text
   * @param query
   */
  exists(text, query) {
    if (typeof text !== 'string' || typeof query !== 'string') {
      console.error('exists: text eller query är inte en sträng:', text, query)
      return false
    }
    if (!text.trim() || !query.trim()) {
      console.error('exists: text eller query är tomt')
      return false
    }
    return new TextSearcher(text).exists(query)
  }
}
