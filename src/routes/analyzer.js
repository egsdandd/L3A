
import { Router } from 'express';
import TextAnalyzerController from '../controllers/TextAnalyzerController.js';

const router = Router();
const analyzerController = new TextAnalyzerController();

// Räkna tecken (inklusive mellanslag)
router.post('/countcharacters', async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is missing" });
  
  const result = await analyzerController.countCharacters(text, true);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ count: result.count });
});

// Bokstavsfrekvens
router.post('/letterfrequency', async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is missing" });
  
  const result = await analyzerController.getLetterFrequency(text);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ frequency: result.frequency });
});

// Hitta palindromer
router.post('/findpalindromes', async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is missing" });
  
  const result = await analyzerController.findPalindromes(text);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ palindromes: result.palindromes });
});

router.post('/countwords', async (req, res) => {
  const { text, word } = req.body || {};
  if (!text || !word) {
    return res.status(400).json({ error: "Text eller ord saknas" });
  }
  
  const result = await analyzerController.countWordOccurrences(text, word);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ count: result.count });
});

// Räkna alla ord i texten
router.post('/counttotalwords', async (req, res) => {
  const { text } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: "Text saknas" });
  }
  
  const result = await analyzerController.countTotalWords(text);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ count: result.count });
});

// Räkna meningar i texten
router.post('/countsentences', async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Text is missing" });
  
  const result = await analyzerController.countSentences(text);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ count: result.count });
});

export default router;