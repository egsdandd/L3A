import { Router } from 'express'
import texttoolkit from 'texttoolkit'

const router = Router()


/**
 * Escapar <, > och & i en sträng för säker HTML-rendering.
 * @param {string} str - Strängen att escapera
 * @returns {string} Escapad sträng
 */
function escapeHtml(str) {
  return str.replace(/[<>&]/g, m => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]
  ))
}

// Route för filuppladdning och säker rendering
router.post('/', async (req, res) => {
  if (!req.files || !req.files.textfile) {
    return res.status(400).send('Ingen fil uppladdad.')
  }
  const textfile = req.files.textfile
  const content = escapeHtml(textfile.data.toString('utf8'))
  res.render('showFile', {
    filename: textfile.name,
    content
  })
})

// Route för word count med återanvändbart resultatformat
router.post('/countwords', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided.' })

  const analyzer = new texttoolkit.TextAnalyzer(text)
  const count = analyzer.countWords()
  res.json({ result: count, method: 'countWords' }) // Enhetlig API
})

export default router
