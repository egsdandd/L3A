// Forensics analysis methods

// Forensics analysis functions - Using utility functions
window.analyzeFingerprint = function() {
  const text = getEditorText();
  if (!text) return;
  
  const totalChars = text.length;
  const uniqueChars = new Set(text).size;
  const words = text.split(/\s+/);
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  const complexity = ((uniqueChars / totalChars) * 100).toFixed(2);
  
  const fingerprint = `
    <h4>📋 Text Fingerprint:</h4>
    <ul>
      <li><strong>Total tecken:</strong> ${totalChars}</li>
      <li><strong>Unika tecken:</strong> ${uniqueChars}</li>
      <li><strong>Genomsnittlig ordlängd:</strong> ${avgWordLength.toFixed(2)} tecken</li>
      <li><strong>Textens komplexitet:</strong> ${complexity}%</li>
      <li><strong>Fingerprint ID:</strong> ${Math.abs(text.split('').reduce((a, b) => a + b.charCodeAt(0), 0)).toString(16).toUpperCase()}</li>
    </ul>
  `;
  showResults('forensicsResults', 'forensicsContent', fingerprint);
};

window.detectPatterns = function() {
  const text = getEditorText();
  if (!text) return;
  
  const repeatedWords = {};
  const words = text.toLowerCase().split(/\s+/);
  
  words.forEach(word => {
    word = word.replace(/[^\w]/g, '');
    if (word.length > 3) {
      repeatedWords[word] = (repeatedWords[word] || 0) + 1;
    }
  });
  
  const patterns = Object.entries(repeatedWords)
    .filter(([word, count]) => count > 2)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
    
  const patternHtml = `
    <h4>🔍 Upptäckta Mönster:</h4>
    <ul>
      ${patterns.map(([word, count]) => `<li><strong>${word}:</strong> upprepas ${count} gånger</li>`).join('')}
    </ul>
    <p><strong>Analys:</strong> ${patterns.length > 0 ? 'Återkommande ord kan indikera författarens fokusområden' : 'Inga tydliga mönster upptäckta'}</p>
  `;
  showResults('forensicsResults', 'forensicsContent', patternHtml);
};

window.analyzeStyle = function() {
  const text = getEditorText();
  if (!text) return;
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.reduce((sum, sentence) => sum + sentence.split(/\s+/).length, 0) / sentences.length;
  const complexSentences = sentences.filter(s => s.split(/\s+/).length > 20).length;
  const exclamations = (text.match(/!/g) || []).length;
  const questions = (text.match(/\?/g) || []).length;
  
  let style = 'Neutral';
  if (avgSentenceLength > 20) style = 'Komplicerad/Akademisk';
  else if (avgSentenceLength < 10) style = 'Enkel/Direkt';
  else if (exclamations > sentences.length * 0.2) style = 'Entusiastisk/Emotionell';
  
  const styleHtml = `
    <h4>📝 Skrivsätt Analys:</h4>
    <ul>
      <li><strong>Genomsnittlig meningslängd:</strong> ${avgSentenceLength.toFixed(1)} ord</li>
      <li><strong>Komplexa meningar (>20 ord):</strong> ${complexSentences}</li>
      <li><strong>Utropstecken:</strong> ${exclamations}</li>
      <li><strong>Frågetecken:</strong> ${questions}</li>
      <li><strong>Bedömd stil:</strong> ${style}</li>
    </ul>
  `;
  showResults('forensicsResults', 'forensicsContent', styleHtml);
};

window.findHiddenText = function() {
  const text = getEditorText();
  if (!text) return;
  
  const hiddenPatterns = [];
  
  // Check for unusual whitespace patterns
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    if (line.match(/\s{3,}/)) {
      hiddenPatterns.push(`Rad ${index + 1}: Onormal mellanslag`);
    }
    if (line.match(/\t/)) {
      hiddenPatterns.push(`Rad ${index + 1}: Dolda tabbar`);
    }
  });
  
  // Check for steganography indicators
  if (text.match(/[A-Z]{2,}/g)) {
    const capitals = text.match(/[A-Z]{2,}/g);
    hiddenPatterns.push(`Möjlig akronym steganografi: ${capitals.slice(0, 3).join(', ')}`);
  }
  
  const hiddenHtml = `
    <h4>🔍 Dold Text Analys:</h4>
    ${hiddenPatterns.length > 0 ? 
      `<ul>${hiddenPatterns.map(pattern => `<li>${pattern}</li>`).join('')}</ul>` :
      '<p>Inga misstänkta dolda element upptäckta</p>'
    }
    <p><strong>Säkerhetsgrad:</strong> ${hiddenPatterns.length === 0 ? 'Hög' : 'Misstänkt aktivitet'}</p>
  `;
  showResults('forensicsResults', 'forensicsContent', hiddenHtml);
};

window.compareTexts = function() {
  const text = getEditorText();
  if (!text) return;
  
  // Simple similarity analysis with a hypothetical reference text
  const referenceWords = ['the', 'and', 'to', 'of', 'a', 'in', 'for', 'is', 'on', 'that'];
  const textWords = text.toLowerCase().split(/\s+/);
  const commonWords = textWords.filter(word => referenceWords.includes(word));
  const similarity = ((commonWords.length / textWords.length) * 100).toFixed(2);
  
  const uniqueness = (100 - similarity).toFixed(2);
  
  const compareHtml = `
    <h4>⚖️ Text Jämförelse:</h4>
    <ul>
      <li><strong>Likhet med standardtext:</strong> ${similarity}%</li>
      <li><strong>Unikhet:</strong> ${uniqueness}%</li>
      <li><strong>Gemensamma ord:</strong> ${commonWords.length} av ${textWords.length}</li>
      <li><strong>Bedömning:</strong> ${uniqueness > 70 ? 'Mycket unik text' : uniqueness > 40 ? 'Måttligt unik' : 'Standardtext'}</li>
    </ul>
    <p><strong>Forensisk slutsats:</strong> ${uniqueness > 80 ? 'Sannolikt originaltext' : 'Möjlig plagiat eller standardtext'}</p>
  `;
  showResults('forensicsResults', 'forensicsContent', compareHtml);
};

window.detectLanguage = function() {
  const text = getEditorText();
  if (!text) return;
  
  const swedishWords = ['och', 'att', 'det', 'en', 'är', 'för', 'av', 'på', 'med', 'som', 'till', 'inte', 'om', 'kan', 'har'];
  const englishWords = ['the', 'and', 'to', 'of', 'a', 'in', 'for', 'is', 'on', 'that', 'by', 'this', 'with', 'from', 'they'];
  
  const words = text.toLowerCase().split(/\s+/);
  const swedishMatches = words.filter(word => swedishWords.includes(word)).length;
  const englishMatches = words.filter(word => englishWords.includes(word)).length;
  
  let detectedLanguage = 'Okänt';
  let confidence = 0;
  
  if (swedishMatches > englishMatches) {
    detectedLanguage = 'Svenska';
    confidence = ((swedishMatches / words.length) * 100).toFixed(2);
  } else if (englishMatches > swedishMatches) {
    detectedLanguage = 'Engelska';
    confidence = ((englishMatches / words.length) * 100).toFixed(2);
  }
  
  const languageHtml = `
    <h4>🌍 Språk Detektion:</h4>
    <ul>
      <li><strong>Detekterat språk:</strong> ${detectedLanguage}</li>
      <li><strong>Konfidensgrad:</strong> ${confidence}%</li>
      <li><strong>Svenska indikatorer:</strong> ${swedishMatches}</li>
      <li><strong>Engelska indikatorer:</strong> ${englishMatches}</li>
      <li><strong>Totalt analyserade ord:</strong> ${words.length}</li>
    </ul>
    <p><strong>Analys:</strong> ${confidence > 20 ? 'Tillförlitlig språkdetektion' : 'Låg tillförlitlighet, behöver mer text'}</p>
  `;
  showResults('forensicsResults', 'forensicsContent', languageHtml);
};