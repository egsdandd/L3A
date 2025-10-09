import express from 'express'
import TransformerController from '../controllers/TransformerController.js'

const router = express.Router()
const transformerController = new TransformerController()

router.post('/countwords', async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided' })
    
    const result = await transformerController.countWords(text)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }
    res.json({ count: result.count })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
