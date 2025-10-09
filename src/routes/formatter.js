// src/routes/formatter.js
import express from 'express'
import FormatterController from '../controllers/FormatterController.js'

const router = express.Router()
const formatterController = new FormatterController()

// Räkna ord i text
router.post('/countwords', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await formatterController.countWords(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ count: result.count })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Konvertera till versaler
router.post('/uppercase', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await formatterController.toUpperCase(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ formatted: result.formatted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Konvertera till gemener
router.post('/lowercase', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await formatterController.toLowerCase(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ formatted: result.formatted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Konvertera till Title Case
router.post('/titlecase', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await formatterController.toTitleCase(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ formatted: result.formatted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Linda text på specifik bredd
router.post('/wrap', async (req, res) => {
  try {
    const { text, width } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await formatterController.wrapLines(text, width)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ formatted: result.formatted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Ta bort extra whitespace
router.post('/trim', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await formatterController.trimWhitespace(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ formatted: result.formatted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Lägg till indentering
router.post('/indent', async (req, res) => {
  try {
    const { text, spaces } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await formatterController.addIndentation(text, spaces)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ formatted: result.formatted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
