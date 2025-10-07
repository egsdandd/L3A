// Simple test version of analyzerUI.js without dependencies
console.log('Loading simple analyzerUI...');

export const analyzerMethods = {
  'Text Analyzer': () => createSimpleAnalyzerInterface()
};

function createSimpleAnalyzerInterface() {
  console.log('Creating simple analyzer interface...');
  
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="module-container analyzer">
      <h1>📊 Text Analyzer (Simple Version)</h1>
      <p>Enkel version av Text Analyzer som fungerar utan externa dependencies</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="simpleWordCount()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          📝 Räkna Ord
        </button>
        <button onclick="simpleCharCount()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔤 Räkna Tecken
        </button>
        <button onclick="simpleSentenceCount()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          📄 Räkna Meningar
        </button>
      </div>
      
      <div id="simpleAnalyzerResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Resultat:</h3>
        <div id="resultsContent"></div>
      </div>
    </div>
  `;
  
  return container;
}

// Enkla analysfunktioner
window.simpleWordCount = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const words = text.trim().split(/\s+/).length;
  showSimpleResults('Antal ord: ' + words);
};

window.simpleCharCount = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const chars = text.length;
  showSimpleResults('Antal tecken: ' + chars);
};

window.simpleSentenceCount = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  showSimpleResults('Antal meningar: ' + sentences);
};

function showSimpleResults(result) {
  const resultsDiv = document.getElementById('simpleAnalyzerResults');
  const contentDiv = document.getElementById('resultsContent');
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = result;
    resultsDiv.style.display = 'block';
  }
}

console.log('Simple analyzerUI loaded successfully');