// Simple test version of transformerUI.js
export const transformerMethods = {
  'Text Transformer': () => createSimpleTransformerInterface()
};

function createSimpleTransformerInterface() {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="module-container transformer">
      <h1>🔄 Text Transformer (Simple Version)</h1>
      <p>Transformera och manipulera text på olika sätt</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="reverseText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔁 Vänd Text
        </button>
        <button onclick="shuffleWords()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔀 Blanda Ord
        </button>
        <button onclick="alternateCase()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔤 AlTeRnErA
        </button>
        <button onclick="repeatText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔂 Upprepa Text
        </button>
        <button onclick="removeVowels()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🚫 Ta Bort Vokaler
        </button>
        <button onclick="encodeText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔗 URL Encode
        </button>
      </div>
      
      <div id="transformerResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Transformerat resultat:</h3>
        <div id="transformerContent" style="background: white; border: 1px solid #ccc; padding: 15px; border-radius: 5px; font-family: monospace; white-space: pre-wrap; max-height: 300px; overflow-y: auto;"></div>
        <button onclick="copyTransformedText()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
          📋 Kopiera
        </button>
      </div>
    </div>
  `;
  return container;
}

let transformedCache = '';

window.reverseText = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const result = text.split('').reverse().join('');
  showTransformerResults(result);
};

window.shuffleWords = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const words = text.split(' ');
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  showTransformerResults(words.join(' '));
};

window.alternateCase = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const result = text.split('').map((char, index) => 
    index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
  ).join('');
  showTransformerResults(result);
};

window.repeatText = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const result = (text + '\n').repeat(3);
  showTransformerResults(result);
};

window.removeVowels = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const result = text.replace(/[aeiouåäöAEIOUÅÄÖ]/g, '');
  showTransformerResults(result);
};

window.encodeText = function() {
  const text = document.querySelector('.scrollbox').innerText;
  const result = encodeURIComponent(text);
  showTransformerResults(result);
};

function showTransformerResults(result) {
  transformedCache = result;
  const resultsDiv = document.getElementById('transformerResults');
  const contentDiv = document.getElementById('transformerContent');
  if (resultsDiv && contentDiv) {
    contentDiv.textContent = result;
    resultsDiv.style.display = 'block';
  }
}

window.copyTransformedText = async function() {
  try {
    await navigator.clipboard.writeText(transformedCache);
    alert('Transformerad text kopierad!');
  } catch (err) {
    alert('Kunde inte kopiera text');
  }
};