import { Router } from 'express'
import { TextSearcher } from 'texttoolkit'

const router = Router()

// Text Searcher endpoints using texttoolkit
router.post('/findfirst', (req, res) => {
  const { text, searchTerm } = req.body
  if (!text || !searchTerm) {
    return res.status(400).json({ error: 'Text and searchTerm required.' })
  }

  const searcher = new TextSearcher(text)
  const result = searcher.findFirst(searchTerm)
  res.json({ result, method: 'findFirst' })
})

router.post('/findall', (req, res) => {
  const { text, searchTerm } = req.body
  if (!text || !searchTerm) {
    return res.status(400).json({ error: 'Text and searchTerm required.' })
  }

  const searcher = new TextSearcher(text)
  const result = searcher.findAll(searchTerm)
  res.json({ result, method: 'findAll' })
})

router.post('/exists', (req, res) => {
  const { text, searchTerm } = req.body
  if (!text || !searchTerm) {
    return res.status(400).json({ error: 'Text and searchTerm required.' })
  }

  const searcher = new TextSearcher(text)
  const result = searcher.exists(searchTerm)
  res.json({ result, method: 'exists' })
})

router.post('/count', (req, res) => {
  const { text, searchTerm } = req.body
  if (!text || !searchTerm) {
    return res.status(400).json({ error: 'Text and searchTerm required.' })
  }

  const searcher = new TextSearcher(text)
  const result = searcher.count(searchTerm)
  res.json({ result, method: 'count' })
})

router.post('/matchpattern', (req, res) => {
  const { text, pattern } = req.body
  if (!text || !pattern) {
    return res.status(400).json({ error: 'Text and pattern required.' })
  }

  const searcher = new TextSearcher(text)
  const result = searcher.matchPattern(pattern)
  res.json({ result, method: 'matchPattern' })
})

router.post('/searchregexp', (req, res) => {
  const { text, regexp } = req.body
  if (!text || !regexp) {
    return res.status(400).json({ error: 'Text and regexp required.' })
  }

  const searcher = new TextSearcher(text)
  const result = searcher.searchRegexp(new RegExp(regexp, 'g'))
  res.json({ result, method: 'searchRegexp' })
})

export default router