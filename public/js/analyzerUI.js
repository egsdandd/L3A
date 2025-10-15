// Text Analyzer UI - Using texttoolkit backend

export const analyzerMethods = {
  'Text Analyzer': () => createTexttoolkitAnalyzerInterface()
}

/**
 * Generates the HTML for the text analyzer interface.
 * @returns {string}
 */
function generateAnalyzerInterfaceHTML() {
  return `
    <div class="module-container analyzer">
      <h1>📊 Text Analyzer (texttoolkit)</h1>
      <p>Använder din texttoolkit npm-modul för textanalys</p>

      ${generateAnalyzerButtonsHTML()}

      <div id="analyzerResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Resultat:</h3>
        <div id="analyzerResultsContent"></div>
      </div>
    </div>
  `
}

/**
 * Creates the buttons for the text analyzer module.
 * @returns {string}
 */
function generateAnalyzerButtonsHTML() {
  const buttons = [
    { key: 'countwords', icon: '📝', label: 'Räkna Ord' },
    { key: 'countsentences', icon: '📄', label: 'Räkna Meningar' },
    { key: 'countcharacters', icon: '🔤', label: 'Räkna Tecken' },
    { key: 'letterfrequency', icon: '📊', label: 'Bokstavsfrekvens' },
    { key: 'findpalindromes', icon: '🔄', label: 'Hitta Palindrom' }
  ]
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
      ${buttons.map(
        btn =>
          `<button onclick="callAnalyzer('${btn.key}')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
            ${btn.icon} ${btn.label}
          </button>`
      ).join('')}
    </div>
  `
}

/**
 * Creates the UI for the text analyzer module.
 * @returns {HTMLElement}
 */
function createTexttoolkitAnalyzerInterface() {
  const container = document.createElement('div')
  container.innerHTML = generateAnalyzerInterfaceHTML()
  return container
}

