// src/routes/wordOptimizer.js
import express from 'express';
import TextDocument from 'texttoolkit';

const router = express.Router();

// Hitta överanvända ord (exklusive vanliga ord)
router.post('/repetitions', (req, res) => {
  try {
    const { text } = req.body;
    const doc = new TextDocument(text);
    
    // Vanliga ord som vi ignorerar
    const commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
    ]);
    
    // Räkna alla ord
    const words = text.toLowerCase().match(/\b[a-zA-ZåäöÅÄÖ]+\b/g) || [];
    const wordCount = {};
    
    words.forEach(word => {
      if (!commonWords.has(word) && word.length > 2) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    // Hitta ord som används mer än 3 gånger
    const repetitions = Object.entries(wordCount)
      .filter(([word, count]) => count > 3)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => ({ word, count }));
    
    res.json({ repetitions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hitta svaga/fyllnadsord
router.post('/weakwords', (req, res) => {
  try {
    const { text } = req.body;
    
    const weakWords = [
      'very', 'really', 'quite', 'rather', 'somewhat', 'fairly', 'pretty',
      'just', 'actually', 'basically', 'literally', 'totally', 'completely',
      'absolutely', 'extremely', 'incredibly', 'amazingly', 'definitely',
      'probably', 'maybe', 'perhaps', 'possibly', 'apparently', 'obviously'
    ];
    
    const foundWeakWords = [];
    const words = text.toLowerCase().match(/\b[a-zA-ZåäöÅÄÖ]+\b/g) || [];
    
    words.forEach((word, index) => {
      if (weakWords.includes(word)) {
        // Hitta position i originaltext
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
          foundWeakWords.push({
            word: match[0],
            position: match.index,
            suggestion: getWeakWordSuggestion(word)
          });
        }
      }
    });
    
    res.json({ weakWords: foundWeakWords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hitta "is/was + adjektiv" mönster och föreslå kraftfullare verb
router.post('/powerwords', (req, res) => {
  try {
    const { text } = req.body;
    
    // Regex för "is/was/are/were + adjektiv"
    const weakPatterns = [
      /\b(is|was|are|were)\s+(very\s+)?(big|large|huge|small|tiny|good|bad|nice|great|amazing|awful|terrible|beautiful|ugly|fast|slow|strong|weak|happy|sad|angry|excited|tired|bored)\b/gi
    ];
    
    const suggestions = [];
    
    weakPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const fullMatch = match[0];
        const verb = match[1];
        const intensifier = match[2] || '';
        const adjective = match[3];
        
        const powerVerb = getPowerVerb(adjective, intensifier);
        if (powerVerb) {
          suggestions.push({
            original: fullMatch,
            position: match.index,
            suggestion: powerVerb,
            reason: `Replace weak "${verb} ${intensifier}${adjective}" with stronger verb`
          });
        }
      }
    });
    
    res.json({ powerWords: suggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hjälpfunktioner
function getWeakWordSuggestion(word) {
  const suggestions = {
    'very': 'Consider removing or use a stronger adjective',
    'really': 'Consider removing or be more specific',
    'quite': 'Consider removing or use a stronger adjective',
    'just': 'Often unnecessary - consider removing',
    'actually': 'Usually unnecessary - consider removing',
    'basically': 'Consider being more specific',
    'literally': 'Often misused - consider removing',
    'totally': 'Consider "completely" or remove',
    'definitely': 'Consider being more specific about certainty',
    'probably': 'Consider "likely" or be more specific'
  };
  
  return suggestions[word] || 'Consider using a more specific word';
}

function getPowerVerb(adjective, intensifier) {
  const powerVerbs = {
    'big': intensifier ? 'dominates' : 'towers',
    'large': intensifier ? 'dominates' : 'looms',
    'huge': 'dwarfs',
    'small': 'nestles',
    'tiny': 'huddles',
    'good': intensifier ? 'excels' : 'succeeds',
    'bad': intensifier ? 'devastates' : 'fails',
    'great': intensifier ? 'triumphs' : 'shines',
    'amazing': 'dazzles',
    'beautiful': 'mesmerizes',
    'ugly': 'repulses',
    'fast': intensifier ? 'races' : 'speeds',
    'slow': 'crawls',
    'strong': intensifier ? 'dominates' : 'overpowers',
    'weak': 'falters',
    'happy': intensifier ? 'radiates joy' : 'beams',
    'sad': intensifier ? 'grieves' : 'mourns',
    'angry': intensifier ? 'rages' : 'seethes',
    'excited': 'buzzes with energy',
    'tired': intensifier ? 'collapses' : 'droops',
    'bored': 'yawns'
  };
  
  return powerVerbs[adjective];
}

export default router;