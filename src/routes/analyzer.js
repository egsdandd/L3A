import { Router } from 'express';
import TextDocument from 'texttoolkit';

const router = Router();

router.post('/countwords', (req, res) => {
  const { text, word } = req.body || {};
  if (!text || !word) {
    return res.status(400).json({ error: "Text eller ord saknas" });
  }
  const doc = new TextDocument(text);
  const count = doc.count(word); // använder modulens count-funktion för att räkna förekomster
  res.json({ count });
});



// Räkna alla ord i texten
router.post('/counttotalwords', (req, res) => {
  const { text } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: "Text saknas" });
  }
  const doc = new TextDocument(text);
  const count = doc.countWords();
  res.json({ count });
});

export default router;