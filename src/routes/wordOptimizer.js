// src/routes/wordOptimizer.js
import express from 'express'
import WordOptimizerController from '../controllers/WordOptimizerController.js'

const router = express.Router()
const optimizerController = new WordOptimizerController()

// Hitta överanvända ord (exklusive vanliga ord)
router.post('/repetitions', async (req, res) => {
  try {
    const { text, threshold } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await optimizerController.findRepetitions(text, threshold)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ repetitions: result.repetitions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Hitta svaga/fyllnadsord
router.post('/weakwords', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await optimizerController.findWeakWords(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ weakWords: result.weakWords })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Hitta "is/was + adjektiv" mönster och föreslå kraftfullare verb
router.post('/powerwords', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await optimizerController.findPowerWords(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ powerWords: result.powerWords })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Komplett analys av alla ordoptimeringsmöjligheter
router.post('/complete', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await optimizerController.completeAnalysis(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router