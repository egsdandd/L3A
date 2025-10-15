import { Router } from 'express'
import { TextFormatter } from 'texttoolkit'

const router = Router()

// Text Formatter endpoints using texttoolkit
router.post('/touppercase', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const formatter = new TextFormatter(text)
  const result = formatter.toUpperCase()
  res.json({ result, method: 'toUpperCase' })
})

router.post('/tolowercase', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const formatter = new TextFormatter(text)
  const result = formatter.toLowerCase()
  res.json({ result, method: 'toLowerCase' })
})

router.post('/capitalizewords', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const formatter = new TextFormatter(text)
  const result = formatter.capitalizeWords()
  res.json({ result, method: 'capitalizeWords' })
})

router.post('/tocamelcase', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const formatter = new TextFormatter(text)
  const result = formatter.toCamelCase()
  res.json({ result, method: 'toCamelCase' })
})

router.post('/tosnakecase', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const formatter = new TextFormatter(text)
  const result = formatter.toSnakeCase()
  res.json({ result, method: 'toSnakeCase' })
})

router.post('/topascalcase', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const formatter = new TextFormatter(text)
  const result = formatter.toPascalCase()
  res.json({ result, method: 'toPascalCase' })
})

router.post('/tokebabcase', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const formatter = new TextFormatter(text)
  const result = formatter.toKebabCase()
  res.json({ result, method: 'toKebabCase' })
})

router.post('/trimwhitespace', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const formatter = new TextFormatter(text)
  const result = formatter.trimWhitespace()
  res.json({ result, method: 'trimWhitespace' })
})

export default router