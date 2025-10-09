// src/routes/textForensics.js
import express from 'express';
import TextForensicsController from '../controllers/TextForensicsController.js';

const router = express.Router();
const forensicsController = new TextForensicsController();

// Authorship Analysis - jämför skrivstilar
router.post('/authorship-analysis', async (req, res) => {
  try {
    const { text1, text2 } = req.body;
    const result = await forensicsController.analyzeAuthorship(text1, text2);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Secret Message Detector - hitta dolda meddelanden
router.post('/secret-message', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await forensicsController.detectSecretMessage(text);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Code Breaking Tools - Caesar cipher, ROT13, etc.
router.post('/decode-cipher', async (req, res) => {
  try {
    const { text, cipherType = 'caesar' } = req.body;
    const result = await forensicsController.decodeCipher(text, cipherType);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Plagiarism Checker - jämför textlikhet
router.post('/plagiarism-check', async (req, res) => {
  try {
    const { originalText, suspectText } = req.body;
    const result = await forensicsController.checkPlagiarism(originalText, suspectText);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Writing Style Fingerprint - analysera skrivmönster
router.post('/style-fingerprint', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await forensicsController.createStyleFingerprint(text);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Steganography Detector - hitta gömda mönster
router.post('/steganography-detect', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await forensicsController.detectSteganography(text);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;