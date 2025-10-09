
import { Router } from 'express';
import TextSearcherController from '../controllers/TextSearcherController.js';

const router = Router();
const searcherController = new TextSearcherController();

// Exists
router.post('/exists', async (req, res) => {
  const { text, query } = req.body;
  if (!text || !query) return res.status(400).json({ error: 'Text or query missing' });
  
  const result = await searcherController.checkExists(text, query);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ exists: result.exists });
});

// Count occurrences
router.post('/count', async (req, res) => {
  const { text, query } = req.body;
  if (!text || !query) return res.status(400).json({ error: 'Text or query missing' });
  
  const result = await searcherController.countOccurrences(text, query);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ count: result.count });
});

// Match pattern (RegExp)
router.post('/matchpattern', async (req, res) => {
  const { text, pattern } = req.body;
  if (!text || !pattern) return res.status(400).json({ error: 'Text or pattern missing' });
  
  const result = await searcherController.matchPattern(text, pattern);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ matches: result.matches });
});

// Search RegExp index
router.post('/searchregexp', async (req, res) => {
  const { text, pattern } = req.body;
  if (!text || !pattern) return res.status(400).json({ error: 'Text or pattern missing' });
  
  const result = await searcherController.searchRegExp(text, pattern);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ index: result.index });
});

// Test RegExp pattern
router.post('/testpattern', async (req, res) => {
  const { text, pattern } = req.body;
  if (!text || !pattern) return res.status(400).json({ error: 'Text or pattern missing' });
  
  const result = await searcherController.testPattern(text, pattern);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ matches: result.matches });
});

// Find first occurrence
router.post('/findfirst', async (req, res) => {
  const { text, query } = req.body;
  if (!text || !query) return res.status(400).json({ error: 'Text or query missing' });
  
  const result = await searcherController.findFirst(text, query);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ index: result.index });
});

// Find all occurrences
router.post('/findall', async (req, res) => {
  const { text, query } = req.body;
  if (!text || !query) return res.status(400).json({ error: 'Text or query missing' });
  
  const result = await searcherController.findAll(text, query);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ indexes: result.indexes });
});

export default router;
