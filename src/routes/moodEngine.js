// src/routes/moodEngine.js
import express from 'express';
import MoodEngineController from '../controllers/MoodEngineController.js';

const router = express.Router();
const moodController = new MoodEngineController();

// Sentiment Timeline - spåra känslor över tid
router.post('/sentiment-timeline', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await moodController.analyzeSentimentTimeline(text);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Emotion Heatmap - visualisera känslointensitet
router.post('/emotion-heatmap', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await moodController.createEmotionHeatmap(text);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stress Detector - analysera skriv-stress
router.post('/stress-detector', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await moodController.detectStress(text);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Happiness Predictor - förutsäg text-mood
router.post('/happiness-predictor', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await moodController.predictHappiness(text);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Emotion Color Coding - färgkoda text efter känslor
router.post('/emotion-coloring', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await moodController.colorCodeEmotions(text);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mood Analytics - djupgående känslomässig analys
router.post('/mood-analytics', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await moodController.analyzeMoodComprehensive(text);
    
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
