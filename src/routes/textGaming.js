import express from "express";
import TextGamingController from "../controllers/TextGamingController.js";

const router = express.Router();
const gamingController = new TextGamingController();

// Anagram Solver
router.post("/anagram-solver", async (req, res) => {
  try {
    const { letters } = req.body;
    if (!letters) return res.status(400).json({ error: "Letters are required" });
    
    const result = await gamingController.solveAnagram(letters);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Word Scramble
router.post("/word-scramble", async (req, res) => {
  try {
    const { text, difficulty } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const result = await gamingController.scrambleWord(text, difficulty);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Text Guesser
router.post("/text-guesser", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const result = await gamingController.createTextGuess(text);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Speed Challenge
router.post("/speed-challenge", async (req, res) => {
  try {
    const { writtenText, timeInSeconds } = req.body;
    const result = await gamingController.calculateSpeed(writtenText, timeInSeconds);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Word Association
router.post("/word-association", async (req, res) => {
  try {
    const { startWord, chainLength } = req.body;
    if (!startWord) return res.status(400).json({ error: "Start word is required" });
    
    const result = await gamingController.buildWordChain(startWord, chainLength);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
