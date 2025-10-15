import { Router } from 'express'
import { TextAnalyzer } from 'texttoolkit'

const router = Router()

/**
 * Helper för att skapa DRY och tydliga endpoints för TextAnalyzer-API.
 * @param {object} options - Options object
 * @param {function(TextAnalyzer, object): any} options.handler - Funktion för analysoperation
 * @param {string[]} options.requiredFields - Vilka req.body-fält som krävs
 * @param {string} options.methodName - Namnet på metoden (returneras i JSON)
 * @param {string} [options.errorMessage] - Eget felmeddelande vid saknad input
 * @returns {Function} Express-handler
 */
function analyzerEndpoint({ handler, requiredFields, methodName, errorMessage }) {
  return (req, res) => {
    const missing = requiredFields.filter(field => !req.body[field])
    if (missing.length > 0) {
      return res.status(400).json({ error: errorMessage || `Missing: ${missing.join(', ')}` })
    }
    const analyzer = new TextAnalyzer(req.body.text)
    const result = handler(analyzer, req.body)
    res.json({ result, method: methodName })
  }
}

// Samtliga analyzer endpoints

router.post('/countwords', analyzerEndpoint({
  handler: (analyzer) => analyzer.countWords(),
  requiredFields: ['text'],
  methodName: 'countWords'
}))

router.post('/countsentences', analyzerEndpoint({
  handler: (analyzer) => analyzer.countSentences(),
  requiredFields: ['text'],
  methodName: 'countSentences'
}))

router.post('/countcharacters', analyzerEndpoint({
  handler: (analyzer) => analyzer.countCharacters(),
  requiredFields: ['text'],
  methodName: 'countCharacters'
}))

router.post('/letterfrequency', analyzerEndpoint({
  handler: (analyzer) => analyzer.letterFrequency(),
  requiredFields: ['text'],
  methodName: 'letterFrequency'
}))

router.post('/findpalindromes', analyzerEndpoint({
  handler: (analyzer) => analyzer.findPalindromes(),
  requiredFields: ['text'],
  methodName: 'findPalindromes'
}))

// Lägg enkelt till fler analyzer endpoints på samma sätt

export default router
