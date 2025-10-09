// Simple test version of analyzerUI.js without dependencies

export const analyzerMethods = {
  'Text Analyzer': () => createSimpleAnalyzerInterface()
};

// HTML Helper Functions
function generateAnalyzerInterfaceHTML() {
  return `
    <div class="module-container analyzer">
      <h1>📊 Text Analyzer (Simple Version)</h1>
      <p>Enkel version av Text Analyzer som fungerar utan externa dependencies</p>
      
      ${generateAnalyzerButtonsHTML()}
      
      <div id="simpleAnalyzerResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Resultat:</h3>
        <div id="resultsContent"></div>
      </div>
    </div>
  `;
}

function generateAnalyzerButtonsHTML() {
  return `
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
  `;
}

function createSimpleAnalyzerInterface() {
  const container = document.createElement('div');
  container.innerHTML = generateAnalyzerInterfaceHTML();
  return container;
}

// Enkla analysfunktioner - Using utility functions
window.simpleWordCount = function() {
  const text = getEditorText();
  if (!text) return;
  
  const words = text.split(/\s+/).length;
  showResults('simpleAnalyzerResults', 'resultsContent', `Antal ord: ${words}`);
};

window.simpleCharCount = function() {
  const text = getEditorText();
  if (!text) return;
  
  const chars = text.length;
  showResults('simpleAnalyzerResults', 'resultsContent', `Antal tecken: ${chars}`);
};

window.simpleSentenceCount = function() {
  const text = getEditorText();
  if (!text) return;
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  showResults('simpleAnalyzerResults', 'resultsContent', `Antal meningar: ${sentences}`);
};

