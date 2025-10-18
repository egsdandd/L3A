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
      <p>Använder texttoolkit npm-modul för textanalys</p>

      ${generateAnalyzerButtonsHTML()}

      <div id="analyzerResults" class="results-container">
        <h3>Resultat:</h3>
        <div id="analyzerResultsContent" class="results-content"></div>
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
    <div class="btn-grid">
      ${buttons.map(
        btn =>
          `<button onclick="callAnalyzer('${btn.key}')" class="btn-module">
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

