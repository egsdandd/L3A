// Text Analyzer UI - Using texttoolkit backend

export const analyzerMethods = {
  'Text Analyzer': () => createTexttoolkitAnalyzerInterface()
}

/**
 * Generates the HTML for the text analyzer interface
 * @returns {string}
 */
function generateAnalyzerInterfaceHTML() {
  return `
    <div class="module-container analyzer">
      <h1>📊 Text Analyzer (texttoolkit)</h1>
      <p>Använder din texttoolkit npm-modul för textanalys</p>
      
      ${generateAnalyzerButtonsHTML()}
      
      <div id="analyzerResults" style="background: rgba(255,255,255,0.9) !important; color: #333 !important; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3 style="color: #333 !important;">Resultat:</h3>
        <div id="analyzerResultsContent" style="color: #333 !important;"></div>
      </div>
    </div>
  `
}

/**
 * Creates the buttons for the text analyzer module 
 * @returns {string}
 */
function generateAnalyzerButtonsHTML() {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
      <button onclick="callAnalyzer('countwords')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        📝 Räkna Ord
      </button>
      <button onclick="callAnalyzer('countsentences')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        📄 Räkna Meningar
      </button>
      <button onclick="callAnalyzer('countcharacters')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🔤 Räkna Tecken
      </button>
      <button onclick="callAnalyzer('letterfrequency')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        📊 Bokstavsfrekvens
      </button>
      <button onclick="callAnalyzer('findpalindromes')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🔄 Hitta Palindrom
      </button>
    </div>
  `
}

/**
 * Creates the UI for the text analyzer module
 * @returns {HTMLElement}
 */
function createTexttoolkitAnalyzerInterface() {
  const container = document.createElement('div')
  container.innerHTML = generateAnalyzerInterfaceHTML()
  return container
}

