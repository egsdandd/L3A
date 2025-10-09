// Simple test version of textForensicsUI.js
export const textForensicsMethods = {
  'Text Forensics Detective': () => createSimpleForensicsInterface()
};

// HTML Helper Functions
function generateForensicsInterfaceHTML() {
  return `
    <div class="module-container forensics">
      <h1>🕵️ Text Forensics Detective (Simple Version)</h1>
      <p>Forensisk textanalys för att upptäcka mönster och hemligheter</p>
      
      ${generateForensicsButtonsHTML()}
      
      ${generateForensicsResultsHTML()}
    </div>
  `;
}

function generateForensicsButtonsHTML() {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
      <button onclick="analyzeFingerprint()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🔍 Text Fingerprint
      </button>
      <button onclick="detectPatterns()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        📊 Mönster Detektor
      </button>
      <button onclick="analyzeStyle()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        ✍️ Skriv-stil Analys
      </button>
      <button onclick="findHiddenText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🕵️ Hitta Dold Text
      </button>
      <button onclick="compareTexts()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        ⚖️ Jämför Texter
      </button>
      <button onclick="detectLanguage()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🌍 Språk Detektor
      </button>
    </div>
  `;
}

function generateForensicsResultsHTML() {
  return `
    <div id="forensicsResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
      <h3>🔍 Forensisk Analys:</h3>
      <div id="forensicsContent"></div>
    </div>
  `;
}

function createSimpleForensicsInterface() {
  const container = document.createElement('div');
  container.innerHTML = generateForensicsInterfaceHTML();
  return container;
}

window.analyzeFingerprint = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const totalChars = text.length;
  const uniqueChars = new Set(text).size;
  const avgWordLength = text.split(/\s+/).reduce((sum, word) => sum + word.length, 0) / text.split(/\s+/).length;
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
  showForensicsResults(fingerprint);
};

window.detectPatterns = function() {
  const text = document.querySelector('.scrollbox').innerText;
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
  showForensicsResults(patternHtml);
};

window.analyzeStyle = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.reduce((sum, sentence) => sum + sentence.split(/\s+/).length, 0) / sentences.length;
  const complexSentences = sentences.filter(s => s.split(/\s+/).length > 20).length;
  const exclamations = (text.match(/!/g) || []).length;
  const questions = (text.match(/\?/g) || []).length;
  
  let style = '';
  if (avgSentenceLength > 20) style = 'Akademisk/Formell stil';
  else if (avgSentenceLength < 10) style = 'Vardaglig/Enkel stil';
  else style = 'Balanserad stil';
  
  const styleHtml = `
    <h4>✍️ Skriv-stil Analys:</h4>
    <ul>
      <li><strong>Genomsnittlig meningslängd:</strong> ${avgSentenceLength.toFixed(1)} ord</li>
      <li><strong>Komplexa meningar (>20 ord):</strong> ${complexSentences}</li>
      <li><strong>Utropstecken:</strong> ${exclamations}</li>
      <li><strong>Frågetecken:</strong> ${questions}</li>
      <li><strong>Bedömd stil:</strong> ${style}</li>
    </ul>
  `;
  showForensicsResults(styleHtml);
};

window.findHiddenText = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const hiddenPatterns = [];
  
  // Leta efter möjliga dolda meddelanden
  const firstLetters = text.split(/\s+/).map(word => word.charAt(0)).join('');
  const lastLetters = text.split(/\s+/).map(word => word.slice(-1)).join('');
  const numbers = text.match(/\d+/g) || [];
  const upperCase = text.match(/[A-ZÅÄÖ]/g) || [];
  
  const hiddenHtml = `
    <h4>🕵️ Sökning efter Dold Text:</h4>
    <ul>
      <li><strong>Första bokstäver i ord:</strong> ${firstLetters.substring(0, 50)}${firstLetters.length > 50 ? '...' : ''}</li>
      <li><strong>Sista bokstäver i ord:</strong> ${lastLetters.substring(0, 50)}${lastLetters.length > 50 ? '...' : ''}</li>
      <li><strong>Hittade siffror:</strong> ${numbers.join(', ')}</li>
      <li><strong>Versaler sekvens:</strong> ${upperCase.join('')}</li>
    </ul>
    <p><strong>Forensisk bedömning:</strong> ${numbers.length > 5 ? 'Många siffror kan indikera kodad information' : 'Inga uppenbara dolda meddelanden upptäckta'}</p>
  `;
  showForensicsResults(hiddenHtml);
};

window.compareTexts = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const words = text.split(/\s+/).length;
  const chars = text.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  
  const comparisonHtml = `
    <h4>⚖️ Text Jämförelse Statistik:</h4>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8f9fa;">
        <th style="border: 1px solid #ccc; padding: 8px;">Mätning</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Värde</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Bedömning</th>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;">Ord per mening</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${(words/sentences).toFixed(1)}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${words/sentences > 15 ? 'Komplicerad' : words/sentences < 8 ? 'Enkel' : 'Normal'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;">Tecken per ord</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${(chars/words).toFixed(1)}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${chars/words > 6 ? 'Avancerat ordförråd' : 'Enkelt ordförråd'}</td>
      </tr>
    </table>
  `;
  showForensicsResults(comparisonHtml);
};

window.detectLanguage = function() {
  const text = document.querySelector('.scrollbox').innerText.toLowerCase();
  
  // Enkel språkdetektion baserad på vanliga ord
  const swedishWords = ['och', 'att', 'det', 'är', 'som', 'för', 'på', 'av', 'med', 'till'];
  const englishWords = ['the', 'and', 'that', 'is', 'as', 'for', 'on', 'of', 'with', 'to'];
  
  const swedishMatches = swedishWords.filter(word => text.includes(word)).length;
  const englishMatches = englishWords.filter(word => text.includes(word)).length;
  
  let language = 'Okänt språk';
  if (swedishMatches > englishMatches) language = 'Svenska (troligt)';
  else if (englishMatches > swedishMatches) language = 'Engelska (troligt)';
  else language = 'Blandspråk eller okänt';
  
  const languageHtml = `
    <h4>🌍 Språk Detektor:</h4>
    <ul>
      <li><strong>Svenska indikatorer:</strong> ${swedishMatches}/10</li>
      <li><strong>Engelska indikatorer:</strong> ${englishMatches}/10</li>
      <li><strong>Bedömt språk:</strong> ${language}</li>
    </ul>
    <p><strong>Forensisk not:</strong> Språkanalys kan avslöja författarens bakgrund och målgrupp</p>
  `;
  showForensicsResults(languageHtml);
};

function showForensicsResults(content) {
  const resultsDiv = document.getElementById('forensicsResults');
  const contentDiv = document.getElementById('forensicsContent');
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = content;
    resultsDiv.style.display = 'block';
  }
}