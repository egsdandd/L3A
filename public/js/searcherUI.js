export const searcherMethods = {
  'Text Searcher': () => createSearcherInterface()
}

/**
 * Creates the UI for the text searcher module
 * @returns {HTMLElement}
 */
function createSearcherInterface() {
  const container = document.createElement('div')
  container.innerHTML = `
    <div class="module-container searcher">
      <h1>🔍 Text Searcher (texttoolkit)</h1>
      <p>Använder texttoolkit npm-modul</p>
      <div class="search-controls">
        <input type="text" id="searchTerm" placeholder="Sökterm..." class="search-input">
        <button onclick="callSearcher('findfirst')" class="btn-search">🎯 Hitta Första</button>
        <button onclick="callSearcher('findall')" class="btn-search">📋 Hitta Alla</button>
        <button onclick="callSearcher('count')" class="btn-search">🔢 Räkna</button>
        <button onclick="callSearcher('exists')" class="btn-search">❓ Finns?</button>
      </div>
      <div id="searcherResults" class="results-container">
        <h3>Resultat:</h3>
        <div id="searcherResultsContent" class="results-content"></div>
      </div>
    </div>
  `
  return container
}
