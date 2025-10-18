export const formatterMethods = {
  'Text Formatter': () => createFormatterInterface()
}

/**
 * Creates the UI for the text formatter module.
 * @returns {HTMLElement}
 */
function createFormatterInterface() {
  const buttons = [
    { key: 'touppercase', icon: '⬆️', label: 'Till Versaler' },
    { key: 'tolowercase', icon: '⬇️', label: 'Till Gemener' },
    { key: 'capitalizewords', icon: '🔤', label: 'Första Bokstav Stor' },
    { key: 'tocamelcase', icon: '🐪', label: 'camelCase' }
  ]

  const buttonsHTML = buttons.map(
    btn => `<button onclick="callFormatter('${btn.key}')" class="btn-module">
      ${btn.icon} ${btn.label}
    </button>`
  ).join('')

  const container = document.createElement('div')
  container.innerHTML = `
    <div class="module-container formatter">
      <h1>🎨 Text Formatter (texttoolkit)</h1>
      <p>Använder texttoolkit npm-modul</p>
      <div class="btn-grid">
        ${buttonsHTML}
      </div>
      <div id="formatterResults" class="results-container">
        <h3>Resultat:</h3>
        <div id="formatterResultsContent" class="results-content"></div>
      </div>
    </div>
  `
  return container
}
