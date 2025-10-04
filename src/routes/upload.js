import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  if(!req.files || !req.files.textfile){
    return res.status(400).send('Ingen fil uppladdad.');
  }
  const textfile = req.files.textfile;
  const content = textfile.data.toString('utf8')
    .replace(/[<>&]/g, m => ({'<': '&lt;', '>': '&gt;', '&': '&amp;'}[m])); // Escapa!

  res.render('showFile', {
    filename: textfile.name,
    content
  });
});

import texttoolkit from 'texttoolkit';

router.post('/countwords', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided." });

  // Skapa instans av din wrapper eller klass om det behövs
  const analyzer = new texttoolkit.TextAnalyzer(text);
  const count = analyzer.countWords();

  res.json({ count });
});

export default router;
