
import { Router } from 'express';
import TextDocument from 'texttoolkit';

const router = Router();

// Exists
router.post('/exists', (req, res) => {
  const { text, query } = req.body;
  if (!text || !query) return res.status(400).json({ error: 'Text or query missing' });
  const doc = new TextDocument(text);
  const exists = doc.exists(query);
  res.json({ exists });
});

// Count occurrences
router.post('/count', (req, res) => {
  const { text, query } = req.body;
  if (!text || !query) return res.status(400).json({ error: 'Text or query missing' });
  const doc = new TextDocument(text);
  const count = doc.count(query);
  res.json({ count });
});

// Match pattern (RegExp)
router.post('/matchpattern', (req, res) => {
  const { text, pattern } = req.body;
  if (!text || !pattern) return res.status(400).json({ error: 'Text or pattern missing' });
  const doc = new TextDocument(text);
  let matches = [];
  try {
    matches = doc.matchPattern(new RegExp(pattern, 'g'));
  } catch (e) {
    return res.status(400).json({ error: 'Invalid RegExp pattern' });
  }
  res.json({ matches });
});

// Search RegExp index
router.post('/searchregexp', (req, res) => {
  const { text, pattern } = req.body;
  if (!text || !pattern) return res.status(400).json({ error: 'Text or pattern missing' });
  const doc = new TextDocument(text);
  let index = -1;
  try {
    index = doc.searchRegexp(new RegExp(pattern));
  } catch (e) {
    return res.status(400).json({ error: 'Invalid RegExp pattern' });
  }
  res.json({ index });
});

// Test RegExp pattern
router.post('/testpattern', (req, res) => {
  const { text, pattern } = req.body;
  if (!text || !pattern) return res.status(400).json({ error: 'Text or pattern missing' });
  const doc = new TextDocument(text);
  let matches = false;
  try {
    matches = doc.testPattern(new RegExp(pattern));
  } catch (e) {
    return res.status(400).json({ error: 'Invalid RegExp pattern' });
  }
  res.json({ matches });
});


// Find first occurrence
router.post('/findfirst', (req, res) => {
  const { text, query } = req.body;
  if (!text || !query) return res.status(400).json({ error: 'Text or query missing' });
  const doc = new TextDocument(text);
  const index = doc.findFirst(query);
  res.json({ index });
});

// Find all occurrences
router.post('/findall', (req, res) => {
  const { text, query } = req.body;
  if (!text || !query) return res.status(400).json({ error: 'Text or query missing' });
  const doc = new TextDocument(text);
  const indexes = doc.findAll(query);
  res.json({ indexes });
});

export default router;
