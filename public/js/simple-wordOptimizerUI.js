// Simple test version of wordOptimizerUI.js
export const wordOptimizerMethods = {
  'Word Choice Optimizer': () => createSimpleOptimizerInterface()
};

// HTML Helper Functions  
function generateOptimizerInterfaceHTML() {
  return `
    <div class="module-container optimizer">
      <h1>✨ Writing Assistant (Simple Version)</h1>
      <p>Förbättra din text med AI-liknande funktioner</p>
      
      ${generateOptimizerButtonsHTML()}
      ${generateOptimizerResultsHTML()}
    </div>
  `;
}

function generateOptimizerButtonsHTML() {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
      <button onclick="improveText()" style="background: rgba(0,0,0,0.1); color: #333; border: 1px solid #333; padding: 15px; border-radius: 8px; cursor: pointer;">
        ✨ Förbättra Text
      </button>
      <button onclick="makeFormal()" style="background: rgba(0,0,0,0.1); color: #333; border: 1px solid #333; padding: 15px; border-radius: 8px; cursor: pointer;">
        🎩 Gör Formell
      </button>
      <button onclick="makeCasual()" style="background: rgba(0,0,0,0.1); color: #333; border: 1px solid #333; padding: 15px; border-radius: 8px; cursor: pointer;">
        😊 Gör Vardaglig
      </button>
      <button onclick="fixGrammar()" style="background: rgba(0,0,0,0.1); color: #333; border: 1px solid #333; padding: 15px; border-radius: 8px; cursor: pointer;">
        📝 Rätta Grammatik
      </button>
      <button onclick="expandText()" style="background: rgba(0,0,0,0.1); color: #333; border: 1px solid #333; padding: 15px; border-radius: 8px; cursor: pointer;">
        📈 Utvidga Text
      </button>
      <button onclick="summarizeText()" style="background: rgba(0,0,0,0.1); color: #333; border: 1px solid #333; padding: 15px; border-radius: 8px; cursor: pointer;">
        📊 Sammanfatta
      </button>
    </div>
  `;
}

function generateOptimizerResultsHTML() {
  return `
    <div id="optimizerResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
      <h3>Optimerat resultat:</h3>
      <div id="optimizerContent" style="background: white; border: 1px solid #ccc; padding: 15px; border-radius: 5px; max-height: 300px; overflow-y: auto;"></div>
      <button onclick="copyOptimizedText()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
        📋 Kopiera
      </button>
    </div>
  `;
}

function createSimpleOptimizerInterface() {
  const container = document.createElement('div');
  container.innerHTML = generateOptimizerInterfaceHTML();
  return container;
  return container;
}

let optimizedCache = '';

window.improveText = function() {
  const text = document.querySelector('.scrollbox').innerText;
  // Enkel förbättring: rätta enkla stavfel och förbättra flyt
  const result = text
    .replace(/\s+/g, ' ')
    .replace(/([.!?])\s*([a-zåäö])/g, '$1 $2')
    .trim();
  showOptimizerResults('Förbättrad text', result + '\n\n[Simulerad AI-förbättring: Lagt till bättre interpunktion och raderat extra mellanslag]');
};

window.makeFormal = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const result = text
    .replace(/\bdu\b/gi, 'ni')
    .replace(/\bhej\b/gi, 'God dag')
    .replace(/\bokej\b/gi, 'mycket bra');
  showOptimizerResults('Formell ton', result + '\n\n[Simulerad formalisering: Bytt ut vardagliga uttryck mot mer formella]');
};

window.makeCasual = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const result = text
    .replace(/\bni\b/gi, 'du')
    .replace(/\bGod dag\b/gi, 'Hej')
    .replace(/\bmycket bra\b/gi, 'okej');
  showOptimizerResults('Vardaglig ton', result + '\n\n[Simulerad avformalisering: Gjort språket mer vardagligt och personligt]');
};

window.fixGrammar = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const result = text
    .replace(/\s+/g, ' ')
    .replace(/([.!?])\s*([a-zåäö])/g, '$1 $2')
    .trim();
  showOptimizerResults('Grammatikrättning', result + '\n\n[Simulerad grammatikrättning: Korrigerat interpunktion och meningsbyggnad]');
};

window.expandText = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const expanded = sentences.map(sentence => {
    return sentence.trim() + ', vilket är intressant att notera';
  }).join('. ') + '.';
  showOptimizerResults('Utvidgad text', expanded + '\n\n[Simulerad utvidgning: Lagt till fördjupande kommentarer]');
};

window.summarizeText = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const summary = sentences.slice(0, Math.max(1, Math.floor(sentences.length / 3))).join('. ') + '.';
  showOptimizerResults('Sammanfattning', summary + '\n\n[Simulerad sammanfattning: Behållit de viktigaste meningarna]');
};

function showOptimizerResults(title, content) {
  optimizedCache = content;
  const resultsDiv = document.getElementById('optimizerResults');
  const contentDiv = document.getElementById('optimizerContent');
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = `<h4>${title}:</h4><p style="white-space: pre-wrap;">${content}</p>`;
    resultsDiv.style.display = 'block';
  }
}

window.copyOptimizedText = async function() {
  try {
    await navigator.clipboard.writeText(optimizedCache);
    alert('Optimerad text kopierad!');
  } catch (err) {
    alert('Kunde inte kopiera text');
  }
};