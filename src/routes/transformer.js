import { Router } from 'express'
import { TextTransformer } from 'texttoolkit'

const router = Router()

// Text Transformer endpoints using texttoolkit
router.post('/reversewordorder', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const transformer = new TextTransformer(text)
  const result = transformer.reverseWordOrder()
  res.json({ result, method: 'reverseWordOrder' })
})

router.post('/replaceword', (req, res) => {
  const { text, oldWord, newWord } = req.body
  if (!text || !oldWord || !newWord) {
    return res.status(400).json({ error: 'Text, oldWord and newWord required.' })
  }

  const transformer = new TextTransformer(text)
  const result = transformer.replaceWord(oldWord, newWord)
  res.json({ result, method: 'replaceWord' })
})

router.post('/removewords', (req, res) => {
  const { text, wordsToRemove } = req.body
  if (!text || !wordsToRemove) {
    return res.status(400).json({ error: 'Text and wordsToRemove required.' })
  }

  const transformer = new TextTransformer(text)
  const result = transformer.removeWords(wordsToRemove)
  res.json({ result, method: 'removeWords' })
})

router.post('/filterwords', (req, res) => {
  const { text} = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const transformer = new TextTransformer(text)
  // Simple filter function - keep words longer than 3 characters
  const result = transformer.filterWords(word => word.length > 3)
  res.json({ result, method: 'filterWords' })
})

router.post('/sortwords', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const transformer = new TextTransformer(text)
  const result = transformer.sortWords()
  res.json({ result, method: 'sortWords' })
})

router.post('/shufflewords', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const transformer = new TextTransformer(text)
  const result = transformer.shuffleWords()
  res.json({ result, method: 'shuffleWords' })
})

export default router