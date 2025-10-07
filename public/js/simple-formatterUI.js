// Simple version of formatterUI.js
console.log('Loading simple formatterUI...');

export const formatterMethods = {
  'Text Formatter': () => createSimpleFormatterInterface()
};

function createSimpleFormatterInterface() {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="module-container formatter">
      <h1>✏️ Text Formatter (Simple Version)</h1>
      <p>Formatera och transformera text</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="toUpperCase()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔤 VERSALER
        </button>
        <button onclick="toLowerCase()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔡 gemener
        </button>
        <button onclick="toTitleCase()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          📝 Första Bokstaven
        </button>
        <button onclick="trimWhitespace()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          ✂️ Trim Mellanslag
        </button>
        <button onclick="removeLineBreaks()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          📄 Ta Bort Radbrytningar
        </button>
        <button onclick="addLineNumbers()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔢 Lägg Till Radnummer
        </button>
      </div>
      
      <div id="simpleFormatterResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Formaterat resultat:</h3>
        <div id="formatterResultsContent" style="background: white; border: 1px solid #ccc; padding: 15px; border-radius: 5px; font-family: monospace; white-space: pre-wrap; max-height: 300px; overflow-y: auto;"></div>
        <button onclick="copyFormattedText()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
          📋 Kopiera Text
        </button>
      </div>
    </div>
  `;
  
  return container;
}

// Global functions for formatting
window.toUpperCase = function() {
  const text = getInputText();
  if (!text) return;
  
  showFormattedResult('Versaler', text.toUpperCase());
};

window.toLowerCase = function() {
  const text = getInputText();
  if (!text) return;
  
  showFormattedResult('Gemener', text.toLowerCase());
};

window.toTitleCase = function() {
  const text = getInputText();
  if (!text) return;
  
  const titleCase = text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
  showFormattedResult('Första Bokstaven', titleCase);
};

window.trimWhitespace = function() {
  const text = getInputText();
  if (!text) return;
  
  const trimmed = text.split('\n').map(line => line.trim()).join('\n');
  showFormattedResult('Trimmat', trimmed);
};

window.removeLineBreaks = function() {
  const text = getInputText();
  if (!text) return;
  
  const noBreaks = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  showFormattedResult('Utan Radbrytningar', noBreaks);
};

window.addLineNumbers = function() {
  const text = getInputText();
  if (!text) return;
  
  const lines = text.split('\n');
  const result = lines.map((line, index) => `${index + 1}: ${line}`).join('\n');
  showFormattedResult('Med Radnummer', result);
};

window.copyFormattedText = function() {
  const content = document.getElementById('formatterResultsContent');
  if (content) {
    navigator.clipboard.writeText(content.textContent).then(() => {
      alert('Text kopierad till urklipp!');
    });
  }
};

function showFormattedResult(title, content) {
  const resultsDiv = document.getElementById('simpleFormatterResults');
  const contentDiv = document.getElementById('formatterResultsContent');
  
  if (resultsDiv && contentDiv) {
    contentDiv.textContent = content;
    resultsDiv.style.display = 'block';
  }
}

function getInputText() {
  const textArea = document.querySelector('#fileContent textarea, .scrollbox');
  if (!textArea || !textArea.value.trim()) {
    alert('Skriv eller ladda text först!');
    return null;
  }
  return textArea.value;
}

// Make function available globally for showFile.js
window.showSimpleFormatter = () => createSimpleFormatterInterface();

console.log('Simple formatterUI loaded successfully');