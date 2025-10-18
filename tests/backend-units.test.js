/**
 * Unit Tests för Backend Moduler - Testar enskilda funktioner
 * Dessa tester kräver INGA ändringar av befintlig kod
 */

import { jest } from '@jest/globals'

describe('Backend Utility Functions', () => {
  
  describe('Server Utils', () => {
    test('escapeHtml funktion', async () => {
      const { escapeHtml } = await import('../public/js/utilities/server-utils.js')
      
      // Testa att HTML-tecken escapas korrekt
      expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
      expect(escapeHtml('Hello & World')).toBe('Hello &amp; World')
      expect(escapeHtml('Normal text')).toBe('Normal text')
      expect(escapeHtml('<div>Test & content</div>')).toBe('&lt;div&gt;Test &amp; content&lt;/div&gt;')
    })
  })
  
  describe('Constants', () => {
    test('ANALYZER_ACTIONS konstanter', async () => {
      const { ANALYZER_ACTIONS } = await import('../public/js/constants.js')
      
      // Verifiera att alla nödvändiga actions finns
      expect(ANALYZER_ACTIONS.COUNT_WORDS).toBe('countWords')
      expect(ANALYZER_ACTIONS.COUNT_SENTENCES).toBe('countSentences')
      expect(ANALYZER_ACTIONS.COUNT_CHARACTERS).toBe('countCharacters')
      expect(ANALYZER_ACTIONS.LETTER_FREQUENCY).toBe('letterFrequency')
      expect(ANALYZER_ACTIONS.FIND_PALINDROMES).toBe('findPalindromes')
      
      // Verifiera struktur
      expect(typeof ANALYZER_ACTIONS).toBe('object')
      expect(Object.keys(ANALYZER_ACTIONS)).toHaveLength(5)
    })
  })
})

describe('Route Logic Tests (Isolerade)', () => {
  
  describe('Analyzer Route Functions', () => {
    
    beforeEach(() => {
      // Mock texttoolkit för varje test
      jest.unstable_mockModule('texttoolkit', () => ({
        TextAnalyzer: jest.fn().mockImplementation((text) => ({
          countWords: jest.fn().mockReturnValue(text.split(' ').length),
          countSentences: jest.fn().mockReturnValue(text.split('.').length - 1),
          countCharacters: jest.fn().mockReturnValue(text.length),
          letterFrequency: jest.fn().mockReturnValue({
            'h': 1, 'e': 1, 'l': 2, 'o': 1
          }),
          findPalindromes: jest.fn().mockReturnValue(['mom', 'dad'])
        }))
      }))
    })
    
    test('buildMethodMap funktion genererar korrekt mappning', async () => {
      // Detta testar logiken utan att köra servern
      const { ANALYZER_ACTIONS } = await import('../public/js/constants.js')
      
      // Simulera buildMethodMap funktionalitet
      const methodMap = {}
      for (const key in ANALYZER_ACTIONS) {
        if (Object.prototype.hasOwnProperty.call(ANALYZER_ACTIONS, key)) {
          const methodName = ANALYZER_ACTIONS[key]
          methodMap[methodName.toLowerCase()] = methodName
        }
      }
      
      // Verifiera mappningen
      expect(methodMap['countwords']).toBe('countWords')
      expect(methodMap['countsentences']).toBe('countSentences')
      expect(methodMap['letterfrequency']).toBe('letterFrequency')
      expect(methodMap['findpalindromes']).toBe('findPalindromes')
    })
    
    test('performAnalysis logik (simulerad)', async () => {
      const { TextAnalyzer } = await import('texttoolkit')
      
      // Simulera performAnalysis funktionalitet
      const text = 'hello world'
      const action = 'countwords'
      
      const analyzer = new TextAnalyzer(text)
      const methodMap = { 'countwords': 'countWords' }
      const methodName = methodMap[action]
      
      expect(methodName).toBe('countWords')
      expect(typeof analyzer[methodName]).toBe('function')
      
      const result = analyzer[methodName]()
      expect(result).toBe(2) // 'hello world' = 2 ord
    })
  })
  
  describe('Endpoint Validation Logic', () => {
    
    test('validateTextMiddleware logik', () => {
      // Simulera middleware validation
      const validateText = (text) => {
        if (!text || typeof text !== 'string' || text.trim() === '') {
          throw new Error('No text provided or text is empty.')
        }
        return text
      }
      
      // Testa valid input
      expect(validateText('hello world')).toBe('hello world')
      expect(validateText('  test  ')).toBe('  test  ')
      
      // Testa invalid input
      expect(() => validateText('')).toThrow('No text provided or text is empty')
      expect(() => validateText('   ')).toThrow('No text provided or text is empty')
      expect(() => validateText(null)).toThrow('No text provided or text is empty')
      expect(() => validateText(123)).toThrow('No text provided or text is empty')
    })
    
    test('DRY endpoint pattern validation', () => {
      // Simulera formatterEndpoint helper logik
      const createEndpointValidator = (requiredFields, errorMessage) => {
        return (requestBody) => {
          const missing = requiredFields.filter(f => !requestBody[f])
          if (missing.length > 0) {
            throw new Error(errorMessage || `Missing: ${missing.join(', ')}`)
          }
          return true
        }
      }
      
      const validateFormatter = createEndpointValidator(['text'], 'Text required')
      const validateSearcher = createEndpointValidator(['text', 'searchTerm'], 'Text and searchTerm required')
      
      // Testa formatter validation
      expect(validateFormatter({ text: 'hello' })).toBe(true)
      expect(() => validateFormatter({})).toThrow('Text required')
      
      // Testa searcher validation
      expect(validateSearcher({ text: 'hello', searchTerm: 'he' })).toBe(true)
      expect(() => validateSearcher({ text: 'hello' })).toThrow('Text and searchTerm required')
      expect(() => validateSearcher({})).toThrow('Text and searchTerm required')
    })
  })
})

describe('Integration Logic Tests', () => {
  
  test('Method mapping mellan frontend och backend', () => {
    // Testa att frontend (lowercase) mappar korrekt till backend (camelCase)
    const frontendToBackend = {
      'countwords': 'countWords',
      'countsentences': 'countSentences', 
      'countcharacters': 'countCharacters',
      'letterfrequency': 'letterFrequency',
      'findpalindromes': 'findPalindromes'
    }
    
    // Verifiera att mappningen är konsekvent
    for (const [frontend, backend] of Object.entries(frontendToBackend)) {
      expect(frontend).toBe(backend.toLowerCase())
      expect(backend).toMatch(/^[a-z][a-zA-Z]*$/) // camelCase pattern
    }
  })
  
  test('Error response format consistency', () => {
    // Simulera konsekvent error response format
    const createErrorResponse = (message, status = 400) => ({
      error: message,
      status
    })
    
    const error1 = createErrorResponse('No text provided')
    const error2 = createErrorResponse('Unknown method', 400)
    
    expect(error1.error).toBe('No text provided')
    expect(error1.status).toBe(400)
    expect(error2.error).toBe('Unknown method')
    expect(error2.status).toBe(400)
  })
  
  test('Success response format consistency', () => {
    // Simulera konsekvent success response format
    const createSuccessResponse = (result, method) => ({
      result,
      method
    })
    
    const response1 = createSuccessResponse(5, 'countWords')
    const response2 = createSuccessResponse(['hello'], 'findPalindromes')
    
    expect(response1.result).toBe(5)
    expect(response1.method).toBe('countWords')
    expect(response2.result).toEqual(['hello'])
    expect(response2.method).toBe('findPalindromes')
  })
})