// Forensics core interface and shared utilities

/**
 *
 */
export function createSimpleForensicsInterface() {
  const container = document.createElement('div')
  container.innerHTML = generateForensicsInterfaceHTML()
  return container
}

// HTML Helper Functions
/**
 *
 */
function generateForensicsInterfaceHTML() {
  return `
    <div class="module-container forensics">
      <h1>🕵️ Text Forensics Detective (Simple Version)</h1>
      <p>Forensisk textanalys för att upptäcka mönster och hemligheter</p>
      
      ${generateForensicsButtonsHTML()}
      
      ${generateForensicsResultsHTML()}
    </div>
  `
}

/**
 *
 */
function generateForensicsButtonsHTML() {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
      <button onclick="analyzeFingerprint()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🔍 Text Fingerprint
      </button>
      <button onclick="detectPatterns()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🎯 Pattern Detektion
      </button>
      <button onclick="analyzeStyle()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        📝 Stil Analys
      </button>
      <button onclick="findHiddenText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🕵️ Dold Text
      </button>
      <button onclick="compareTexts()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        ⚖️ Text Jämförelse
      </button>
      <button onclick="detectLanguage()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🌍 Språk Detektion
      </button>
    </div>
  `
}

/**
 *
 */
function generateForensicsResultsHTML() {
  return `
    <div id="forensicsResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
      <h3>Forensisk Analys:</h3>
      <div id="forensicsContent"></div>
    </div>
  `
}

// Utility function for showing results
/**
 *
 * @param content
 */
export function showForensicsResults(content) {
  const resultsDiv = document.getElementById('forensicsResults')
  const contentDiv = document.getElementById('forensicsContent')
  
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = content
    resultsDiv.style.display = 'block'
  }
}

// Make function globally available
window.showForensicsResults = showForensicsResults