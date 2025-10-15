export const transformerMethods = {
  'Text Transformer': () => createTransformerInterface()
}

function createTransformerInterface() {
  const container = document.createElement('div')
  container.innerHTML = `
    <div class="module-container transformer">
      <h1>🔄 Text Transformer (texttoolkit)</h1>
      <p>Använder texttoolkit npm-modul</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="callTransformer('reversewordorder')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">↩️ Vänd Ordordning</button>
        <button onclick="callTransformer('sortwords')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">📝 Sortera Ord</button>
        <button onclick="callTransformer('shufflewords')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">🔀 Blanda Ord</button>
      </div>
      <div id="transformerResults" style="background: rgba(255,255,255,0.9) !important; color: #333 !important; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3 style="color: #333 !important;">Resultat:</h3>
        <div id="transformerResultsContent" style="color: #333 !important;"></div>
      </div>
    </div>
  `
  return container
}
