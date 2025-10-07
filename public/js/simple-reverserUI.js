// Simple version of reverserUI.js
console.log('Loading simple reverserUI...');

export const reverserMethods = {
  'Text Reverser': () => createSimpleReverserInterface()
};

function createSimpleReverserInterface() {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="module-container reverser">
      <h1>🔁 Text Reverser (Simple Version)</h1>
      <p>Specialiserade verktyg för att vända text åt olika håll</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="reverseText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔄 Vänd Text
        </button>
        <button onclick="reverseWords()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔀 Vänd Ordordning
        </button>
        <button onclick="reverseLines()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          📝 Vänd Rader
        </button>
        <button onclick="mirrorText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🪞 Spegelvänd
        </button>
        <button onclick="findPalindromes()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔍 Hitta Palindromer
        </button>
        <button onclick="compareReverse()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          ⚖️ Jämför Original/Vänd
        </button>
      </div>
      
      <div id="simpleReverserResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Resultat:</h3>
        <div id="reverserResultsContent"></div>
      </div>
    </div>
  `;
  
  return container;
}

// Global reverser functions
window.reverseText = function() {
  const text = getReverserText();
  if (!text) return;
  
  const reversed = text.split('').reverse().join('');
  showReverserResult('Omvänd Text', reversed);
};

window.reverseWords = function() {
  const text = getReverserText();
  if (!text) return;
  
  const reversedWords = text.split(' ').reverse().join(' ');
  showReverserResult('Omvänd Ordordning', reversedWords);
};

window.reverseLines = function() {
  const text = getReverserText();
  if (!text) return;
  
  const reversedLines = text.split('\n').reverse().join('\n');
  showReverserResult('Omvända Rader', reversedLines);
};

window.mirrorText = function() {
  const text = getReverserText();
  if (!text) return;
  
  const mirrored = text + ' | ' + text.split('').reverse().join('');
  showReverserResult('Spegelvänd Text', mirrored);
};

window.findPalindromes = function() {
  const text = getReverserText();
  if (!text) return;
  
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const palindromes = words.filter(word => 
    word.length > 2 && word === word.split('').reverse().join('')
  );
  
  const result = palindromes.length > 0 
    ? `Hittade ${palindromes.length} palindromer: ${palindromes.join(', ')}`
    : 'Inga palindromer hittades i texten';
    
  showReverserResult('Palindrom-sökning', result);
};

window.compareReverse = function() {
  const text = getReverserText();
  if (!text) return;
  
  const reversed = text.split('').reverse().join('');
  const comparison = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div>
        <h4>Original:</h4>
        <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-family: monospace; max-height: 200px; overflow-y: auto;">${text}</div>
      </div>
      <div>
        <h4>Omvänd:</h4>
        <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-family: monospace; max-height: 200px; overflow-y: auto;">${reversed}</div>
      </div>
    </div>
  `;
  
  showReverserResult('Jämförelse Original vs Omvänd', comparison);
};

function showReverserResult(title, content) {
  const resultsDiv = document.getElementById('simpleReverserResults');
  const contentDiv = document.getElementById('reverserResultsContent');
  
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = `<h4>${title}</h4>${content}`;
    resultsDiv.style.display = 'block';
  }
}

function getReverserText() {
  const textArea = document.querySelector('#fileContent textarea, .scrollbox');
  if (!textArea || !textArea.value.trim()) {
    alert('Skriv eller ladda text först!');
    return null;
  }
  return textArea.value;
}

// Make function available globally for showFile.js
window.showSimpleReverser = () => createSimpleReverserInterface();

console.log('Simple reverserUI loaded successfully');