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
    btn => `<button onclick="callFormatter('${btn.key}')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
      ${btn.icon} ${btn.label}
    </button>`
  ).join('')

  const container = document.createElement('div')
  container.innerHTML = `
    <div class="module-container formatter">
      <h1>🎨 Text Formatter (texttoolkit)</h1>
      <p>Använder texttoolkit npm-modul</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
        ${buttonsHTML}
      </div>
      <div id="formatterResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Resultat:</h3>
        <div id="formatterResultsContent"></div>
      </div>
    </div>
  `
  return container
}
