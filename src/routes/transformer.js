import { Router } from 'express'
import { TextTransformer } from 'texttoolkit'

const router = Router()

/**
 * Helper för att skapa DRY och självdokumenterande endpoints för TextTransformer-API.
 * @param {object} options - Options object
 * @param {function(TextTransformer, object): any} options.handler - Hur transformationen ska utföras
 * @param {string[]} options.requiredFields - Fält som måste finnas i req.body
 * @param {string} options.methodName - Namn på metoden (returneras i JSON)
 * @param {string} [options.errorMessage] - Eget felmeddelande om input saknas
 * @returns {Function} Express-handler
 */
function transformerEndpoint({ handler, requiredFields, methodName, errorMessage }) {
  return (req, res) => {
    const missing = requiredFields.filter(f => !req.body[f])
    if (missing.length > 0) {
      return res.status(400).json({ error: errorMessage || `Missing: ${missing.join(', ')}` })
    }
    const transformer = new TextTransformer(req.body.text)
    const result = handler(transformer, req.body)
    res.json({ result, method: methodName })
  }
}

// Alla endpoints för transformerings-API:t

router.post('/reversewordorder', transformerEndpoint({
  handler: (t) => t.reverseWordOrder(),
  requiredFields: ['text'],
  methodName: 'reverseWordOrder'
}))

router.post('/replaceword', transformerEndpoint({
  handler: (t, b) => t.replaceWord(b.oldWord, b.newWord),
  requiredFields: ['text', 'oldWord', 'newWord'],
  methodName: 'replaceWord',
  errorMessage: 'Text, oldWord and newWord required.'
}))

router.post('/removewords', transformerEndpoint({
  handler: (t, b) => t.removeWords(b.wordsToRemove),
  requiredFields: ['text', 'wordsToRemove'],
  methodName: 'removeWords',
  errorMessage: 'Text and wordsToRemove required.'
}))

router.post('/filterwords', transformerEndpoint({
  handler: (t) => t.filterWords(word => word.length > 3),
  requiredFields: ['text'],
  methodName: 'filterWords'
}))

router.post('/sortwords', transformerEndpoint({
  handler: (t) => t.sortWords(),
  requiredFields: ['text'],
  methodName: 'sortWords'
}))

router.post('/shufflewords', transformerEndpoint({
  handler: (t) => t.shuffleWords(),
  requiredFields: ['text'],
  methodName: 'shuffleWords'
}))

// Lägg enkelt till fler transformer endpoints på exakt samma sätt!

export default router
