// Simple version of searcherUI.js

export const searcherMethods = {
  'Text Searcher': () => createSimpleSearcherInterface()
};

// HTML Helper Functions
function generateSearcherInterfaceHTML() {
  return `
    <div class="module-container searcher">
      <h1>🔍 Text Searcher (Simple Version)</h1>
      <p>Sök och hitta text i dokumentet</p>
      
      ${generateSearchInputHTML()}
      ${generateSearchButtonsHTML()}
      ${generateSearchResultsHTML()}
    </div>
  `;
}

function generateSearchInputHTML() {
  return `
    <div style="margin: 20px 0;">
      <input type="text" id="searchInput" placeholder="Ange sökterm..." 
             style="width: 300px; padding: 10px; border: none; border-radius: 5px; margin-right: 10px;">
      <button onclick="simpleSearch()" 
              style="background: white; color: #28a745; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
        🔍 Sök
      </button>
    </div>
  `;
}

function generateSearchButtonsHTML() {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
      <button onclick="findWords()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        📝 Hitta Ord
      </button>
      <button onclick="countOccurrences()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🔢 Räkna Förekomster
      </button>
      <button onclick="findLongestWord()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        📏 Längsta Ord
      </button>
    </div>
  `;
}

function generateSearchResultsHTML() {
  return `
    <div id="simpleSearchResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
      <h3>Sökresultat:</h3>
      <div id="searchResultsContent"></div>
    </div>
  `;
}

function createSimpleSearcherInterface() {
  const container = document.createElement('div');
  container.innerHTML = generateSearcherInterfaceHTML();
  return container;
  
  return container;
}

// Enkla sökfunktioner - Using utility functions  
window.simpleSearch = function() {
  const searchTerm = getInputValue('searchInput');
  const text = getEditorText();
  
  if (!searchTerm) {
    showResults('simpleSearchResults', 'searchResultsContent', 'Ange en sökterm först!');
    return;
  }
  
  if (!text) return;
  
  const regex = new RegExp(searchTerm, 'gi');
  const matches = text.match(regex);
  const count = matches ? matches.length : 0;
  
  showResults('simpleSearchResults', 'searchResultsContent', `Hittade "${searchTerm}" ${count} gånger i texten.`);
};

window.findWords = function() {
  const text = getEditorText();
  if (!text) return;
  
  const words = text.split(/\s+/);
  const uniqueWords = [...new Set(words.map(w => w.toLowerCase()))];
  
  showResults('simpleSearchResults', 'searchResultsContent', `Texten innehåller ${words.length} ord totalt och ${uniqueWords.length} unika ord.`);
};

window.countOccurrences = function() {
  const text = getEditorText();
  if (!text) return;
  
  const words = text.toLowerCase().split(/\s+/);
  const wordCount = {};
  
  words.forEach(word => {
    word = word.replace(/[^\w]/g, '');
    if (word) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });
  
  const sortedWords = Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
    
  const result = 'Top 5 mest frekventa ord:<br>' + 
    sortedWords.map(([word, count]) => `${word}: ${count} gånger`).join('<br>');
    
  showResults('simpleSearchResults', 'searchResultsContent', result);
};

window.findLongestWord = function() {
  const text = getEditorText();
  if (!text) return;
  
  const words = text.split(/\s+/).map(w => w.replace(/[^\w]/g, ''));
  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, '');
  
  showResults('simpleSearchResults', 'searchResultsContent', `Längsta ordet är: "${longestWord}" med ${longestWord.length} tecken.`);
};

