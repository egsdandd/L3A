import { Router } from 'express'
import { TextFormatter } from 'texttoolkit'

const router = Router()

/**
 * Endpoint-helper för TextFormatter-API:n med tydliga objektargument.
 * @param {object} options - Options object
 * @param {function(TextFormatter, object): any} options.handler - Function to execute with TextFormatter instance and request body
 * @param {string[]} options.requiredFields - Fields required in request body
 * @param {string} options.methodName - Method name to return in response
 * @param {string} [options.errorMessage] - Custom error message if any input is missing
 * @returns {Function} Express-handler
 */
function formatterEndpoint({ handler, requiredFields, methodName, errorMessage }) {
  return (req, res) => {
    const missing = requiredFields.filter(f => !req.body[f])
    if (missing.length > 0) {
      return res.status(400).json({ error: errorMessage || `Missing: ${missing.join(', ')}` })
    }
    const formatter = new TextFormatter(req.body.text)
    const result = handler(formatter, req.body)
    res.json({ result, method: methodName })
  }
}

// SAMLIGA ENDPOINTS DEFINIERAS NEDANFÖR

router.post('/touppercase', formatterEndpoint({
  handler: (f) => f.toUpperCase(),
  requiredFields: ['text'],
  methodName: 'toUpperCase'
}))

router.post('/tolowercase', formatterEndpoint({
  handler: (f) => f.toLowerCase(),
  requiredFields: ['text'],
  methodName: 'toLowerCase'
}))

router.post('/capitalizewords', formatterEndpoint({
  handler: (f) => f.capitalizeWords(),
  requiredFields: ['text'],
  methodName: 'capitalizeWords'
}))

router.post('/tocamelcase', formatterEndpoint({
  handler: (f) => f.toCamelCase(),
  requiredFields: ['text'],
  methodName: 'toCamelCase'
}))

router.post('/tosnakecase', formatterEndpoint({
  handler: (f) => f.toSnakeCase(),
  requiredFields: ['text'],
  methodName: 'toSnakeCase'
}))

router.post('/topascalcase', formatterEndpoint({
  handler: (f) => f.toPascalCase(),
  requiredFields: ['text'],
  methodName: 'toPascalCase'
}))

router.post('/tokebabcase', formatterEndpoint({
  handler: (f) => f.toKebabCase(),
  requiredFields: ['text'],
  methodName: 'toKebabCase'
}))

router.post('/trimwhitespace', formatterEndpoint({
  handler: (f) => f.trimWhitespace(),
  requiredFields: ['text'],
  methodName: 'trimWhitespace'
}))

router.post('/replaceword', formatterEndpoint({
  handler: (f, b) => f.replaceWord(b.oldWord, b.newWord),
  requiredFields: ['text', 'oldWord', 'newWord'],
  methodName: 'replaceWord',
  errorMessage: 'Text, oldWord and newWord required.'
}))

// Lägg till framtida endpoints i exakt samma stil!

export default router
