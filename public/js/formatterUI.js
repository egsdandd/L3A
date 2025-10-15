export const formatterMethods = {
  'Text Formatter': () => createFormatterInterface()
}

/**
 *
 */
function createFormatterInterface() {
  const container = document.createElement('div')
  container.innerHTML = `
    <div class="module-container formatter">
      <h1>🎨 Text Formatter (texttoolkit)</h1>
      <p>Använder texttoolkit npm-modul</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="callFormatter('touppercase')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">⬆️ Till Versaler</button>
        <button onclick="callFormatter('tolowercase')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">⬇️ Till Gemener</button>
        <button onclick="callFormatter('capitalizewords')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">🔤 Första Bokstav Stor</button>
        <button onclick="callFormatter('tocamelcase')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">🐪 camelCase</button>
      </div>
      <div id="formatterResults" style="background: rgba(255,255,255,0.9) !important; color: #333 !important; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3 style="color: #333 !important;">Resultat:</h3>
        <div id="formatterResultsContent" style="color: #333 !important;"></div>
      </div>
    </div>
  `
  return container
}
