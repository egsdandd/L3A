export const transformerMethods = {
  'Text Transformer': () => createTransformerInterface()
}

/**
 * Creates the UI for the text transformer module
 * @returns {HTMLElement}
 */
function createTransformerInterface() {
  const container = document.createElement('div')
  container.innerHTML = `
    <div class="module-container transformer">
      <h1>🔄 Text Transformer (texttoolkit)</h1>
      <p>Använder texttoolkit npm-modul</p>
      <div class="btn-grid">
        <button onclick="callTransformer('reversewordorder')" class="btn-module">↩️ Vänd Ordordning</button>
        <button onclick="callTransformer('sortwords')" class="btn-module">📝 Sortera Ord</button>
        <button onclick="callTransformer('shufflewords')" class="btn-module">🔀 Blanda Ord</button>
      </div>
      <div id="transformerResults" class="results-container">
        <h3>Resultat:</h3>
        <div id="transformerResultsContent" class="results-content"></div>
      </div>
    </div>
  `
  return container
}
