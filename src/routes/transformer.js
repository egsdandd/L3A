import { Router } from 'express';
import texttoolkit from 'texttoolkit';

const router = Router();

router.post('/countwords', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  const analyzer = new texttoolkit.TextAnalyzer(text);
  const count = analyzer.countWords();

  res.json({ count });
});
// Lägg till fler analyzer-metoder här...

export default router;
