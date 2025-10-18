// src/routes/analyzer.js
import { Router } from 'express'
import { TextAnalysisService } from '../services/TextAnalysisService.js'

const router = Router()

// Skapa en instans av service-klassen
const analysisService = new TextAnalysisService()

/**
 * Middleware för att extrahera text från request body och validera den.
 * Använder TextAnalysisService för validering.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next function
 * @returns {void}
 */
function validateTextMiddleware(req, res, next) {
  const { text } = req.body
  
  try {
    analysisService.validateText(text)
    req.analyzedText = text // Lägg till texten i request-objektet för senare användning
    next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * Rout-hanterare för generiska analysförfrågningar.
 * Använder TextAnalysisService för att utföra analysen.
 *
 * Exempel: POST /analyzer/countwords med { "text": "din text" }
 */
router.post('/:action', validateTextMiddleware, async (req, res) => {
  const { action } = req.params // Fånga 'action' från URL-parametern (t.ex. 'countwords')
  const text = req.analyzedText // Hämta validerad text från middleware

  try {
    const result = await analysisService.performAnalysis(text, action)
    // Skicka tillbaka den ursprungliga 'action' för klienten om den föredrar det
    res.json({ result: result, method: action })
  } catch (error) {
    // Fånga fel från analysService (t.ex. okänd metod, fel under instansiering)
    console.error('Analysfel:', error.message) // Logga felet internt
    res.status(400).json({ error: error.message })
  }
})

export default router