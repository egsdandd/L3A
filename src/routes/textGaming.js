// src/routes/textGaming.js
import express from 'express';
import TextDocument from 'texttoolkit';

const router = express.Router();

// Anagram Solver - hitta alla möjliga ord från givna bokstäver
router.post('/anagram-solver', (req, res) => {
  try {
    const { letters } = req.body;
    if (!letters) return res.status(400).json({ error: "Letters are required" });
    
    // Enkel ordlista för svenska ord (kan utökas)
    const swedishWords = [
      'hej', 'katt', 'hund', 'bok', 'bil', 'hus', 'träd', 'sol', 'måne', 'stjärna',
      'kärlek', 'vänskap', 'lycka', 'glädje', 'sorg', 'rädsla', 'mod', 'hopp',
      'vatten', 'eld', 'luft', 'jord', 'sten', 'blomma', 'gräs', 'blad',
      'tid', 'år', 'dag', 'natt', 'timme', 'minut', 'sekund',
      'röd', 'blå', 'grön', 'gul', 'svart', 'vit', 'rosa', 'orange', 'lila',
      'stor', 'liten', 'snabb', 'långsam', 'stark', 'svag', 'varm', 'kall'
    ];
    
    const availableLetters = letters.toLowerCase().split('');
    const possibleWords = [];
    
    swedishWords.forEach(word => {
      const wordLetters = word.split('');
      const lettersCopy = [...availableLetters];
      let canForm = true;
      
      for (let letter of wordLetters) {
        const index = lettersCopy.indexOf(letter);
        if (index === -1) {
          canForm = false;
          break;
        }
        lettersCopy.splice(index, 1);
      }
      
      if (canForm) {
        possibleWords.push(word);
      }
    });
    
    res.json({ 
      letters: letters,
      foundWords: possibleWords.sort((a, b) => b.length - a.length),
      count: possibleWords.length 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Word Scramble - blanda om ord
router.post('/word-scramble', (req, res) => {
  try {
    const { text, difficulty = 'medium' } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const doc = new TextDocument(text);
    const words = text.split(/\s+/).filter(word => word.length > 2);
    
    if (words.length === 0) {
      return res.json({ error: "No suitable words found for scrambling" });
    }
    
    // Välj ord baserat på svårighetsgrad
    let targetWords;
    switch(difficulty) {
      case 'easy':
        targetWords = words.filter(word => word.length >= 3 && word.length <= 5);
        break;
      case 'hard':
        targetWords = words.filter(word => word.length >= 7);
        break;
      default: // medium
        targetWords = words.filter(word => word.length >= 4 && word.length <= 8);
    }
    
    if (targetWords.length === 0) targetWords = words;
    
    // Välj slumpmässigt ord att blanda
    const selectedWord = targetWords[Math.floor(Math.random() * targetWords.length)];
    
    // Blanda bokstäverna
    const scrambledLetters = selectedWord.split('').sort(() => Math.random() - 0.5).join('');
    
    res.json({
      scrambledWord: scrambledLetters,
      originalWord: selectedWord,
      wordLength: selectedWord.length,
      difficulty: difficulty,
      hint: `Ordet har ${selectedWord.length} bokstäver och börjar med "${selectedWord[0]}"`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Text Guesser - gissa text från ordfrekvens-ledtrådar
router.post('/text-guesser', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const doc = new TextDocument(text);
    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    
    // Räkna ordfrekvens
    const frequency = {};
    words.forEach(word => {
      const clean = word.replace(/[^\w]/g, '');
      if (clean.length > 3) {
        frequency[clean] = (frequency[clean] || 0) + 1;
      }
    });
    
    // Hitta de vanligaste orden
    const sortedWords = Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    // Skapa ledtrådar
    const clues = sortedWords.map(([word, count]) => ({
      wordLength: word.length,
      frequency: count,
      firstLetter: word[0],
      lastLetter: word[word.length - 1],
      maskedWord: word[0] + '*'.repeat(word.length - 2) + word[word.length - 1]
    }));
    
    res.json({
      textLength: text.length,
      wordCount: words.length,
      clues: clues,
      hint: "Gissa vad texten handlar om baserat på de vanligaste orden!"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Speed Writing Challenge - räkna ord per minut
router.post('/speed-challenge', (req, res) => {
  try {
    const { writtenText, timeInSeconds } = req.body;
    if (!writtenText || !timeInSeconds) {
      return res.status(400).json({ error: "Written text and time are required" });
    }
    
    const doc = new TextDocument(writtenText);
    const wordCount = writtenText.split(/\s+/).filter(word => word.length > 0).length;
    const wordsPerMinute = Math.round((wordCount / timeInSeconds) * 60);
    const charactersPerMinute = Math.round((writtenText.length / timeInSeconds) * 60);
    
    // Prestationsbedömning
    let performance = '';
    if (wordsPerMinute >= 80) performance = '🔥 Fantastisk!';
    else if (wordsPerMinute >= 60) performance = '🚀 Utmärkt!';
    else if (wordsPerMinute >= 40) performance = '👍 Bra jobbat!';
    else if (wordsPerMinute >= 20) performance = '📝 Fortsätt öva!';
    else performance = '🐌 Börja långsamt!';
    
    res.json({
      wordCount: wordCount,
      timeInSeconds: timeInSeconds,
      wordsPerMinute: wordsPerMinute,
      charactersPerMinute: charactersPerMinute,
      performance: performance,
      accuracy: Math.round((wordCount / (wordCount + (writtenText.match(/\s{2,}/g) || []).length)) * 100)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Word Association Chain - bygg ordkedjor
router.post('/word-association', (req, res) => {
  try {
    const { startWord, chainLength = 5 } = req.body;
    if (!startWord) return res.status(400).json({ error: "Start word is required" });
    
    // Enkel associationslogik (kan förbättras med AI/ML)
    const associations = {
      'katt': ['hund', 'djur', 'mjuk', 'mys', 'viska'],
      'hund': ['katt', 'vovve', 'lojal', 'vän', 'skäll'],
      'bil': ['väg', 'fart', 'resa', 'motor', 'hjul'],
      'bok': ['läsa', 'sida', 'ord', 'kunskap', 'berättelse'],
      'sol': ['ljus', 'värme', 'dag', 'gul', 'himmel'],
      'vatten': ['blå', 'hav', 'dricka', 'flyta', 'våt'],
      'träd': ['grön', 'blad', 'skog', 'växer', 'rot'],
      'kärlek': ['hjärta', 'rosa', 'kram', 'värme', 'lycka'],
      'musik': ['låt', 'dansa', 'hör', 'rytm', 'glädje'],
      'mat': ['gott', 'äta', 'hungrig', 'kök', 'smak']
    };
    
    const chain = [startWord.toLowerCase()];
    let currentWord = startWord.toLowerCase();
    
    for (let i = 0; i < chainLength - 1; i++) {
      const possibleWords = associations[currentWord] || ['slumpmässigt', 'ord', 'här'];
      const nextWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
      chain.push(nextWord);
      currentWord = nextWord;
    }
    
    res.json({
      startWord: startWord,
      chain: chain,
      explanation: "Varje ord associeras med nästa baserat på semantisk likhet",
      challenge: `Kan du bygga en längre kedja från "${startWord}"?`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;