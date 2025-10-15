import { Router } from 'express'
import { TextAnalyzer } from 'texttoolkit'

const router = Router()

// Text Analyzer endpoints using texttoolkit
router.post('/countwords', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const analyzer = new TextAnalyzer(text)
  const count = analyzer.countWords()
  res.json({ result: count, method: 'countWords' })
})

router.post('/countsentences', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const analyzer = new TextAnalyzer(text)
  const count = analyzer.countSentences()
  res.json({ result: count, method: 'countSentences' })
})

router.post('/countcharacters', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const analyzer = new TextAnalyzer(text)
  const count = analyzer.countCharacters()
  res.json({ result: count, method: 'countCharacters' })
})

router.post('/letterfrequency', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const analyzer = new TextAnalyzer(text)
  const frequency = analyzer.letterFrequency()
  res.json({ result: frequency, method: 'letterFrequency' })
})

router.post('/findpalindromes', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const analyzer = new TextAnalyzer(text)
  const palindromes = analyzer.findPalindromes()
  res.json({ result: palindromes, method: 'findPalindromes' })
})

export default router