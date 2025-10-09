// Text Gaming Core - Main interface and shared utilities
// Contains the main gaming interface and common helper functions

export const textGamingMethods = {
  'Text Gaming Hub': () => createSimpleGamingInterface()
};

// Game HTML generation helper functions
function generateGameButtonsHTML(actions) {
  return actions.map(action => `
    <button onclick="${action.onclick}" style="background: ${action.color}; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; margin: 5px;">
      ${action.text}
    </button>
  `).join('');
}

// Make this function available globally for other gaming modules
window.generateGameButtonsHTML = generateGameButtonsHTML;

function createSimpleGamingInterface() {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="module-container gaming">
      <h1>🎮 Text Gaming Hub (Simple Version)</h1>
      <p>Interaktiva textspel och utmaningar</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="startWordGuess()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🎯 Gissa Ordet
        </button>
        <button onclick="startWordScramble()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔀 Ordpussel
        </button>
        <button onclick="startWordBuilder()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🏗️ Ordbyggare
        </button>
        <button onclick="startRhymeGame()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🎵 Rimspel
        </button>
        <button onclick="startWordChain()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔗 Ordkedja
        </button>
        <button onclick="startTextMemory()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🧠 Minnestest
        </button>
      </div>
      
      <div id="simpleGamingResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Spelresultat:</h3>
        <div id="gamingResultsContent"></div>
      </div>
    </div>
  `;
  
  return container;
}

function showGamingResult(content) {
  const resultsDiv = document.getElementById('simpleGamingResults');
  const contentDiv = document.getElementById('gamingResultsContent');
  
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = content;
    resultsDiv.style.display = 'block';
  }
}

// Make this function available globally for other gaming modules
window.showGamingResult = showGamingResult;

// Make function available globally for showFile.js
window.showSimpleTextGaming = () => createSimpleGamingInterface();

// Make createSimpleGamingInterface available globally 
window.createSimpleGamingInterface = createSimpleGamingInterface;