// src/routes/upload.js
import { Router } from 'express'
import { escapeHtml } from '../../public/js/utilities/server-utils.js'

const router = Router()

/**
 * Hanterar POST-förfrågningar för filuppladdning.
 * Laddar upp en textfil och renderar dess innehåll i vyn 'showFile'.
 */
router.post('/', async (req, res) => {
  // Kontrollera om en fil har laddats upp
  if (!req.files || !req.files.textfile) {
    return res.status(400).send('Ingen fil uppladdad.')
  }

  const textfile = req.files.textfile

  // För säkerhet: escapa filens innehåll innan rendering
  const content = escapeHtml(textfile.data.toString('utf8'))

  // Rendera 'showFile' vyn med filnamn och innehåll
  res.render('showFile', {
    filename: textfile.name,
    content: content
  })
})

export default router