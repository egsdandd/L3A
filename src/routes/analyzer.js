
import { Router } from 'express';
import TextDocument from 'texttoolkit';

const router = Router();

// Räkna tecken (inklusive mellanslag)
router.post('/countcharacters', (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is missing" });
  const doc = new TextDocument(text);
  const count = doc.countCharacters(true); // true = inkludera mellanslag
  res.json({ count });
});

// Bokstavsfrekvens
router.post('/letterfrequency', (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is missing" });
  const doc = new TextDocument(text);
  const frequency = doc.letterFrequency();
  res.json({ frequency });
});

// Hitta palindromer
router.post('/findpalindromes', (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is missing" });
  const doc = new TextDocument(text);
  const palindromes = doc.findPalindromes();
  res.json({ palindromes });
});

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

// Räkna meningar i texten

router.post('/countsentences', (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is missing" });
  const doc = new TextDocument(text);
  const count = doc.countSentences();
  res.json({ count });
});

export default router;