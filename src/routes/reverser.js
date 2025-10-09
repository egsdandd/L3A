import express from "express";
import ReverserController from "../controllers/ReverserController.js";

const router = express.Router();
const reverserController = new ReverserController();

// Räkna ord (för bakåtkompatibilitet)
router.post("/countwords", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });
    
    const result = await reverserController.countWords(text);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json({ count: result.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reversera hela texten
router.post("/text", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });
    
    const result = await reverserController.reverseText(text);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reversera varje ord
router.post("/words", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });
    
    const result = await reverserController.reverseWords(text);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reversera ordföljd
router.post("/wordorder", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });
    
    const result = await reverserController.reverseWordOrder(text);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kontrollera palindrom
router.post("/palindrome", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });
    
    const result = await reverserController.checkPalindrome(text);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
