// src/routes/textForensics.js
import express from 'express';
import TextDocument from 'texttoolkit';

const router = express.Router();

// Authorship Analysis - jämför skrivstilar
router.post('/authorship-analysis', (req, res) => {
  try {
    const { text1, text2 } = req.body;
    if (!text1 || !text2) {
      return res.status(400).json({ error: "Two texts are required for comparison" });
    }
    
    const doc1 = new TextDocument(text1);
    const doc2 = new TextDocument(text2);
    
    // Beräkna skrivstilsmetriker
    const metrics1 = calculateWritingMetrics(text1);
    const metrics2 = calculateWritingMetrics(text2);
    
    // Beräkna likhetsscore (0-100%)
    const similarity = calculateSimilarityScore(metrics1, metrics2);
    
    res.json({
      similarity: similarity,
      analysis: {
        text1_metrics: metrics1,
        text2_metrics: metrics2,
        verdict: similarity > 80 ? "Troligen samma författare" :
                similarity > 60 ? "Möjligen samma författare" :
                similarity > 40 ? "Osäker likhet" : "Troligen olika författare"
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Secret Message Detector - hitta dolda meddelanden
router.post('/secret-message', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const secrets = [];
    
    // Akronym-detektor (första bokstäverna i varje mening)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const acronym = sentences.map(s => s.trim()[0]).join('').toUpperCase();
    if (acronym.length > 2) {
      secrets.push({
        type: "Akronym från meningar",
        message: acronym,
        method: "Första bokstaven i varje mening"
      });
    }
    
    // Första bokstav i varje ord
    const words = text.split(/\s+/);
    const wordAcronym = words.map(w => w[0]).join('').toUpperCase();
    if (wordAcronym.length > 5 && wordAcronym.length < 50) {
      secrets.push({
        type: "Akronym från ord",
        message: wordAcronym,
        method: "Första bokstaven i varje ord"
      });
    }
    
    // Versaler-detektor
    const capitals = text.match(/[A-Z]/g);
    if (capitals && capitals.length > 2) {
      secrets.push({
        type: "Versaler",
        message: capitals.join(''),
        method: "Alla versaler i följd"
      });
    }
    
    // Siffror i text
    const numbers = text.match(/\d/g);
    if (numbers && numbers.length > 1) {
      secrets.push({
        type: "Numerisk kod",
        message: numbers.join(''),
        method: "Alla siffror i texten"
      });
    }
    
    res.json({
      secretsFound: secrets.length,
      secrets: secrets,
      analysis: secrets.length > 0 ? 
        "Potentiella dolda meddelanden hittade!" : 
        "Inga uppenbara dolda meddelanden funna."
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Code Breaking Tools - Caesar cipher, ROT13, etc.
router.post('/decode-cipher', (req, res) => {
  try {
    const { text, cipherType = 'caesar' } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const results = [];
    
    if (cipherType === 'caesar' || cipherType === 'all') {
      // Prova alla Caesar cipher shifts (1-25)
      for (let shift = 1; shift <= 25; shift++) {
        const decoded = caesarCipher(text, shift);
        results.push({
          type: `Caesar Cipher (shift ${shift})`,
          decoded: decoded,
          shift: shift
        });
      }
    }
    
    if (cipherType === 'rot13' || cipherType === 'all') {
      // ROT13
      const rot13 = caesarCipher(text, 13);
      results.push({
        type: "ROT13",
        decoded: rot13,
        shift: 13
      });
    }
    
    if (cipherType === 'atbash' || cipherType === 'all') {
      // Atbash cipher (A=Z, B=Y, etc.)
      const atbash = atbashCipher(text);
      results.push({
        type: "Atbash Cipher",
        decoded: atbash,
        shift: "reverse"
      });
    }
    
    res.json({
      originalText: text,
      cipherType: cipherType,
      results: results,
      hint: "Leta efter meningsfull text bland resultaten!"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Plagiarism Checker - jämför textlikhet
router.post('/plagiarism-check', (req, res) => {
  try {
    const { originalText, suspectText } = req.body;
    if (!originalText || !suspectText) {
      return res.status(400).json({ error: "Both original and suspect texts are required" });
    }
    
    // Enkel plagiatanalys baserad på ord-överlappning
    const originalWords = new Set(originalText.toLowerCase().split(/\s+/));
    const suspectWords = suspectText.toLowerCase().split(/\s+/);
    
    let matchingWords = 0;
    const matches = [];
    
    suspectWords.forEach(word => {
      if (originalWords.has(word) && word.length > 3) {
        matchingWords++;
        matches.push(word);
      }
    });
    
    const similarity = Math.round((matchingWords / suspectWords.length) * 100);
    
    // Hitta längsta gemensamma sekvenser
    const commonPhrases = findCommonPhrases(originalText, suspectText);
    
    res.json({
      similarity: similarity,
      matchingWords: matchingWords,
      totalWords: suspectWords.length,
      uniqueMatches: [...new Set(matches)],
      commonPhrases: commonPhrases,
      verdict: similarity > 70 ? "🚨 Hög risk för plagiat" :
               similarity > 40 ? "⚠️ Måttlig likhet" :
               similarity > 20 ? "💭 Låg likhet" : "✅ Minimal likhet",
      confidence: similarity > 50 ? "Hög" : similarity > 25 ? "Medium" : "Låg"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Writing Style Fingerprint - analysera skrivmönster
router.post('/style-fingerprint', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const metrics = calculateWritingMetrics(text);
    
    // Skapa en unik "fingerprint" baserad på skrivstil
    const fingerprint = {
      avgWordLength: metrics.avgWordLength,
      avgSentenceLength: metrics.avgSentenceLength,
      lexicalDiversity: metrics.lexicalDiversity,
      punctuationDensity: metrics.punctuationDensity,
      capitalizationPattern: metrics.capitalizationPattern
    };
    
    // Generera stilprofil
    const styleProfile = generateStyleProfile(metrics);
    
    res.json({
      fingerprint: fingerprint,
      metrics: metrics,
      styleProfile: styleProfile,
      uniquenessScore: calculateUniquenessScore(metrics)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Steganography Detector - hitta gömda mönster
router.post('/steganography-detect', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const patterns = [];
    
    // Analysera mellanslag-mönster
    const spacePatterns = analyzeSpacePatterns(text);
    if (spacePatterns.suspicious) {
      patterns.push({
        type: "Mellanslag-kodning",
        description: "Ovanliga mellanslag-mönster upptäckta",
        pattern: spacePatterns.pattern
      });
    }
    
    // Analysera radlängder
    const lines = text.split('\n');
    const lineLengths = lines.map(line => line.length);
    if (hasPatternInLengths(lineLengths)) {
      patterns.push({
        type: "Radlängd-kodning",
        description: "Mönster i radlängder",
        pattern: lineLengths.join(',')
      });
    }
    
    // Analysera interpunktion-mönster
    const punctuationPattern = analyzePunctuationPattern(text);
    if (punctuationPattern.suspicious) {
      patterns.push({
        type: "Interpunktion-kodning",
        description: "Ovanliga interpunktionsmönster",
        pattern: punctuationPattern.pattern
      });
    }
    
    res.json({
      patternsFound: patterns.length,
      patterns: patterns,
      analysis: patterns.length > 0 ? 
        "Misstänkta steganografi-mönster hittade!" : 
        "Inga uppenbara steganografi-mönster funna.",
      recommendation: patterns.length > 2 ? 
        "Text innehåller flera misstänkta mönster - djupare analys rekommenderas" :
        "Text verkar normal"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hjälpfunktioner
function calculateWritingMetrics(text) {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  
  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
    avgSentenceLength: words.length / sentences.length,
    lexicalDiversity: uniqueWords.size / words.length,
    punctuationDensity: (text.match(/[.!?,:;]/g) || []).length / text.length,
    capitalizationPattern: (text.match(/[A-Z]/g) || []).length / text.length
  };
}

function calculateSimilarityScore(metrics1, metrics2) {
  const weights = {
    avgWordLength: 0.2,
    avgSentenceLength: 0.25,
    lexicalDiversity: 0.3,
    punctuationDensity: 0.15,
    capitalizationPattern: 0.1
  };
  
  let totalSimilarity = 0;
  for (const metric in weights) {
    const diff = Math.abs(metrics1[metric] - metrics2[metric]);
    const maxVal = Math.max(metrics1[metric], metrics2[metric]);
    const similarity = maxVal > 0 ? (1 - diff / maxVal) : 1;
    totalSimilarity += similarity * weights[metric];
  }
  
  return Math.round(totalSimilarity * 100);
}

function caesarCipher(text, shift) {
  return text.replace(/[a-zA-Z]/g, char => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
}

function atbashCipher(text) {
  return text.replace(/[a-zA-Z]/g, char => {
    if (char <= 'Z') {
      return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
    } else {
      return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
    }
  });
}

function findCommonPhrases(text1, text2) {
  const phrases1 = extractPhrases(text1);
  const phrases2 = extractPhrases(text2);
  
  return phrases1.filter(phrase => 
    phrases2.some(p2 => p2.toLowerCase() === phrase.toLowerCase()) && 
    phrase.split(' ').length >= 3
  ).slice(0, 10);
}

function extractPhrases(text) {
  const words = text.split(/\s+/);
  const phrases = [];
  
  for (let i = 0; i < words.length - 2; i++) {
    phrases.push(words.slice(i, i + 3).join(' '));
    if (i < words.length - 3) {
      phrases.push(words.slice(i, i + 4).join(' '));
    }
  }
  
  return phrases;
}

function generateStyleProfile(metrics) {
  const profile = [];
  
  if (metrics.avgWordLength > 5.5) profile.push("Använder långa ord");
  if (metrics.avgWordLength < 4) profile.push("Använder korta ord");
  
  if (metrics.avgSentenceLength > 20) profile.push("Skriver långa meningar");
  if (metrics.avgSentenceLength < 10) profile.push("Skriver korta meningar");
  
  if (metrics.lexicalDiversity > 0.7) profile.push("Varierat ordförråd");
  if (metrics.lexicalDiversity < 0.4) profile.push("Begränsat ordförråd");
  
  if (metrics.punctuationDensity > 0.1) profile.push("Använder mycket interpunktion");
  if (metrics.punctuationDensity < 0.03) profile.push("Minimal interpunktion");
  
  return profile.length > 0 ? profile : ["Neutral skrivstil"];
}

function calculateUniquenessScore(metrics) {
  // Enkel beräkning av hur unik skrivstilen är
  const score = (metrics.lexicalDiversity * 0.4) + 
                (Math.min(metrics.avgWordLength / 10, 1) * 0.3) +
                (Math.min(metrics.punctuationDensity * 10, 1) * 0.3);
  return Math.round(score * 100);
}

function analyzeSpacePatterns(text) {
  const multiSpaces = text.match(/\s{2,}/g) || [];
  return {
    suspicious: multiSpaces.length > text.length * 0.02,
    pattern: multiSpaces.join('|')
  };
}

function hasPatternInLengths(lengths) {
  if (lengths.length < 5) return false;
  
  // Kolla efter upprepande mönster
  const pattern = lengths.slice(0, 3);
  let matches = 0;
  
  for (let i = 3; i < lengths.length - 2; i += 3) {
    if (lengths.slice(i, i + 3).join(',') === pattern.join(',')) {
      matches++;
    }
  }
  
  return matches > 2;
}

function analyzePunctuationPattern(text) {
  const punctuation = text.match(/[.!?,:;]/g) || [];
  const pattern = punctuation.join('');
  
  // Kolla efter ovanliga mönster
  const repeats = pattern.match(/(.)\1{2,}/g) || [];
  
  return {
    suspicious: repeats.length > 0,
    pattern: pattern
  };
}

export default router;