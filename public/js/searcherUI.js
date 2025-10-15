export const searcherMethods = {
  'Text Searcher': () => createSearcherInterface()
}

function createSearcherInterface() {
  const container = document.createElement('div')
  container.innerHTML = `
    <div class="module-container searcher">
      <h1>🔍 Text Searcher (texttoolkit)</h1>
      <p>Använder texttoolkit npm-modul</p>
      <div style="margin: 20px 0;">
        <input type="text" id="searchTerm" placeholder="Sökterm..." style="padding: 10px; width: 200px; border-radius: 4px; border: 1px solid #ccc;">
        <button onclick="callSearcher('findfirst')" style="background: #20c997; color: white; border: none; padding: 10px 15px; margin: 5px; border-radius: 4px; cursor: pointer;">🎯 Hitta Första</button>
        <button onclick="callSearcher('findall')" style="background: #20c997; color: white; border: none; padding: 10px 15px; margin: 5px; border-radius: 4px; cursor: pointer;">📋 Hitta Alla</button>
        <button onclick="callSearcher('count')" style="background: #20c997; color: white; border: none; padding: 10px 15px; margin: 5px; border-radius: 4px; cursor: pointer;">🔢 Räkna</button>
        <button onclick="callSearcher('exists')" style="background: #20c997; color: white; border: none; padding: 10px 15px; margin: 5px; border-radius: 4px; cursor: pointer;">❓ Finns?</button>
      </div>
      <div id="searcherResults" style="background: rgba(255,255,255,0.9) !important; color: #333 !important; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3 style="color: #333 !important;">Resultat:</h3>
        <div id="searcherResultsContent" style="color: #333 !important;"></div>
      </div>
    </div>
  `
  return container
}
