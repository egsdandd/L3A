import { Router } from 'express'
import { TextSearcher } from 'texttoolkit'

const router = Router()

/**
 * Helper för att skapa DRY och tydliga endpoints för TextSearcher-API:t.
 * @param {object} options - Options object
 * @param {function(TextSearcher, object): any} options.handler - Funktionen som utför sökningen
 * @param {string[]} options.requiredFields - Vilka req.body-fält som krävs
 * @param {string} options.methodName - Namnet på metoden (returneras i JSON)
 * @param {string} [options.errorMessage] - Eget felmeddelande vid saknad input
 * @returns {Function} Express-handler
 */
function searcherEndpoint({ handler, requiredFields, methodName, errorMessage }) {
  return (req, res) => {
    const missing = requiredFields.filter(f => !req.body[f])
    if (missing.length > 0) {
      return res.status(400).json({ error: errorMessage || `Missing: ${missing.join(', ')}` })
    }
    const searcher = new TextSearcher(req.body.text)
    const result = handler(searcher, req.body)
    res.json({ result, method: methodName })
  }
}

// Samtliga searcher endpoints

router.post('/findfirst', searcherEndpoint({
  handler: (s, b) => s.findFirst(b.searchTerm),
  requiredFields: ['text', 'searchTerm'],
  methodName: 'findFirst',
  errorMessage: 'Text and searchTerm required.'
}))

router.post('/findall', searcherEndpoint({
  handler: (s, b) => s.findAll(b.searchTerm),
  requiredFields: ['text', 'searchTerm'],
  methodName: 'findAll',
  errorMessage: 'Text and searchTerm required.'
}))

router.post('/exists', searcherEndpoint({
  handler: (s, b) => s.exists(b.searchTerm),
  requiredFields: ['text', 'searchTerm'],
  methodName: 'exists',
  errorMessage: 'Text and searchTerm required.'
}))

router.post('/count', searcherEndpoint({
  handler: (s, b) => s.count(b.searchTerm),
  requiredFields: ['text', 'searchTerm'],
  methodName: 'count',
  errorMessage: 'Text and searchTerm required.'
}))

router.post('/matchpattern', searcherEndpoint({
  handler: (s, b) => s.matchPattern(b.pattern),
  requiredFields: ['text', 'pattern'],
  methodName: 'matchPattern',
  errorMessage: 'Text and pattern required.'
}))

router.post('/searchregexp', searcherEndpoint({
  handler: (s, b) => s.searchRegexp(new RegExp(b.regexp, 'g')),
  requiredFields: ['text', 'regexp'],
  methodName: 'searchRegexp',
  errorMessage: 'Text and regexp required.'
}))

// Lägg enkelt till fler endpoints på samma sätt

export default router
