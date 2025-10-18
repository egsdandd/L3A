/**
 * Backend API Tests - Testar alla routes utan att ändra befintlig kod
 * Använder supertest för HTTP testing med korrekt app setup
 */

import { jest } from '@jest/globals'
import express from 'express'

// Mock för texttoolkit innan import
jest.unstable_mockModule('texttoolkit', () => ({
  TextAnalyzer: jest.fn().mockImplementation((text) => ({
    countWords: jest.fn().mockReturnValue(text.split(' ').length),
    countSentences: jest.fn().mockReturnValue(2),
    countCharacters: jest.fn().mockReturnValue(text.length),
    letterFrequency: jest.fn().mockReturnValue({ 'a': 3, 'b': 2 }),
    findPalindromes: jest.fn().mockReturnValue(['level', 'mom'])
  })),
  TextFormatter: jest.fn().mockImplementation((text) => ({
    toUpperCase: jest.fn().mockReturnValue(text.toUpperCase()),
    toLowerCase: jest.fn().mockReturnValue(text.toLowerCase()),
    capitalizeWords: jest.fn().mockReturnValue('Test Text'),
    toCamelCase: jest.fn().mockReturnValue('testText'),
    trimWhitespace: jest.fn().mockReturnValue(text.trim())
  })),
  TextTransformer: jest.fn().mockImplementation((text) => ({
    reverseWordOrder: jest.fn().mockReturnValue('world hello'),
    sortWords: jest.fn().mockReturnValue('hello world'),
    shuffleWords: jest.fn().mockReturnValue('world hello')
  })),
  TextSearcher: jest.fn().mockImplementation((text) => ({
    findFirst: jest.fn().mockReturnValue(0),
    findAll: jest.fn().mockReturnValue([0, 6]),
    exists: jest.fn().mockReturnValue(true),
    count: jest.fn().mockReturnValue(2),
    matchPattern: jest.fn().mockReturnValue(['hello']),
    searchRegexp: jest.fn().mockReturnValue(['hello'])
  }))
}))

// Mock express-fileupload
jest.unstable_mockModule('express-fileupload', () => ({
  default: jest.fn(() => (req, res, next) => next())
}))

// Skapa en testapp som inte startar servern
const createTestApp = async () => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Importera routes efter mock
  const analyzerRouter = await import('../src/routes/analyzer.js')
  const formatterRouter = await import('../src/routes/formatter.js')
  const transformerRouter = await import('../src/routes/transformer.js')
  const searcherRouter = await import('../src/routes/searcher.js')
  const uploadRouter = await import('../src/routes/upload.js')

  // Register routes
  app.use('/analyzer', analyzerRouter.default)
  app.use('/formatter', formatterRouter.default)
  app.use('/transformer', transformerRouter.default)
  app.use('/searcher', searcherRouter.default)
  app.use('/upload', uploadRouter.default)

  return app
}

import supertest from 'supertest'

describe('Backend API Tests', () => {
  let request
  let originalConsoleError

  beforeAll(async () => {
    // Spara original console.error och mocka den under tester
    originalConsoleError = console.error
    console.error = jest.fn()
    
    const app = await createTestApp()
    request = supertest(app)
  })

  afterAll(() => {
    // Återställ console.error efter tester
    console.error = originalConsoleError
  })
  
  describe('Analyzer Routes', () => {
    test('POST /analyzer/countwords - räknar ord', async () => {
      const response = await request
        .post('/analyzer/countwords')
        .send({ text: 'hello world test' })
        .expect(200)
      
      expect(response.body.result).toBe(3)
      expect(response.body.method).toBe('countwords')
    })
    
    test('POST /analyzer/countsentences - räknar meningar', async () => {
      const response = await request
        .post('/analyzer/countsentences')
        .send({ text: 'Hello world. How are you?' })
        .expect(200)
      
      expect(response.body.result).toBe(2)
      expect(response.body.method).toBe('countsentences')
    })
    
    test('POST /analyzer/letterfrequency - bokstavsfrekvens', async () => {
      const response = await request
        .post('/analyzer/letterfrequency')
        .send({ text: 'hello' })
        .expect(200)
      
      expect(response.body.result).toEqual({ 'a': 3, 'b': 2 })
      expect(response.body.method).toBe('letterfrequency')
    })
    
    test('POST /analyzer/countwords - felhantering tom text', async () => {
      const response = await request
        .post('/analyzer/countwords')
        .send({ text: '' })
        .expect(400)
      
      expect(response.body.error).toContain('No text provided or text is empty')
    })
    
    test('POST /analyzer/invalidmethod - okänd metod', async () => {
      // Rensa tidigare anrop till mocked console.error
      console.error.mockClear()
      
      const response = await request
        .post('/analyzer/invalidmethod')
        .send({ text: 'test' })
        .expect(400)
      
      expect(response.body.error).toContain('Okänd analysmetod')
      
      // Verifiera att error loggades korrekt
      expect(console.error).toHaveBeenCalledWith(
        'Analysfel:', 
        expect.stringContaining('Okänd analysmetod: invalidmethod')
      )
    })
  })
  
  describe('Formatter Routes', () => {
    test('POST /formatter/touppercase - konverterar till versaler', async () => {
      const response = await request
        .post('/formatter/touppercase')
        .send({ text: 'hello world' })
        .expect(200)
      
      expect(response.body.result).toBe('HELLO WORLD')
      expect(response.body.method).toBe('toUpperCase')
    })
    
    test('POST /formatter/tolowercase - konverterar till gemener', async () => {
      const response = await request
        .post('/formatter/tolowercase')
        .send({ text: 'HELLO WORLD' })
        .expect(200)
      
      expect(response.body.result).toBe('hello world')
      expect(response.body.method).toBe('toLowerCase')
    })
  })
  
  describe('Error Handling', () => {
    test('Searcher routes kräver både text och searchTerm', async () => {
      const response = await request
        .post('/searcher/findfirst')
        .send({ text: 'hello' })  // Saknar searchTerm
        .expect(400)
      
      expect(response.body.error).toContain('searchTerm required')
    })
  })
})