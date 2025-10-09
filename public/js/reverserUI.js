// Simple version of reverserUI.js

export const reverserMethods = {
  'Text Reverser': () => createSimpleReverserInterface()
}

// HTML Helper Functions
/**
 *
 */
function generateReverserInterfaceHTML() {
  return `
    <div class="module-container reverser">
      <h1>🔁 Text Reverser (Simple Version)</h1>
      <p>Specialiserade verktyg för att vända text åt olika håll</p>
      
      ${generateReverserButtonsHTML()}
      ${generateReverserResultsHTML()}
    </div>
  `
}

/**
 *
 */
function generateReverserButtonsHTML() {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
      <button onclick="reverseText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🔄 Vänd Text
      </button>
      <button onclick="reverseWords()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🔀 Vänd Ordordning
      </button>
      <button onclick="reverseLines()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        📝 Vänd Rader
      </button>
      <button onclick="mirrorText()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🪞 Spegelvänd
      </button>
      <button onclick="findPalindromes()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        🔍 Hitta Palindromer
      </button>
      <button onclick="compareReverse()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
        ⚖️ Jämför Original/Vänd
      </button>
    </div>
  `
}

/**
 *
 */
function generateReverserResultsHTML() {
  return `
    <div id="simpleReverserResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
      <h3>Resultat:</h3>
      <div id="reverserResultsContent"></div>
    </div>
  `
}

/**
 *
 */
function createSimpleReverserInterface() {
  const container = document.createElement('div')
  container.innerHTML = generateReverserInterfaceHTML()
  return container
  
  return container
}

// Global reverser functions
window.reverseText = function() {
  const text = getEditorText()
  if (!text) return
  
  const reversed = text.split('').reverse().join('')
  showResults('simpleReverserResults', 'reverserResultsContent', `<h4>Omvänd Text:</h4><div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-family: monospace; max-height: 200px; overflow-y: auto;">${reversed}</div>`)
}

window.reverseWords = function() {
  const text = getEditorText()
  if (!text) return
  
  const reversedWords = text.split(' ').reverse().join(' ')
  showResults('simpleReverserResults', 'reverserResultsContent', `<h4>Omvänd Ordordning:</h4><div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-family: monospace; max-height: 200px; overflow-y: auto;">${reversedWords}</div>`)
}

window.reverseLines = function() {
  const text = getEditorText()
  if (!text) return
  
  const reversedLines = text.split('\n').reverse().join('\n')
  showResults('simpleReverserResults', 'reverserResultsContent', `<h4>Omvända Rader:</h4><div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-family: monospace; max-height: 200px; overflow-y: auto;">${reversedLines}</div>`)
}

window.mirrorText = function() {
  const text = getEditorText()
  if (!text) return
  
  const mirrored = text + ' | ' + text.split('').reverse().join('')
  showResults('simpleReverserResults', 'reverserResultsContent', `<h4>Spegelvänd Text:</h4><div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-family: monospace; max-height: 200px; overflow-y: auto;">${mirrored}</div>`)
}

window.findPalindromes = function() {
  const text = getEditorText()
  if (!text) return
  
  const words = text.toLowerCase().match(/\b\w+\b/g) || []
  const palindromes = words.filter(word => 
    word.length > 2 && word === word.split('').reverse().join('')
  )
  
  const result = palindromes.length > 0 
    ? `Hittade ${palindromes.length} palindromer: ${palindromes.join(', ')}`
    : 'Inga palindromer hittades i texten'
    
  showResults('simpleReverserResults', 'reverserResultsContent', `<h4>Palindrom-sökning:</h4><div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">${result}</div>`)
}

window.compareReverse = function() {
  const text = getEditorText()
  if (!text) return
  
  const reversed = text.split('').reverse().join('')
  const comparison = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div>
        <h4>Original:</h4>
        <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-family: monospace; max-height: 200px; overflow-y: auto;">${text}</div>
      </div>
      <div>
        <h4>Omvänd:</h4>
        <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; font-family: monospace; max-height: 200px; overflow-y: auto;">${reversed}</div>
      </div>
    </div>
  `
  
  showResults('simpleReverserResults', 'reverserResultsContent', `<h4>Jämförelse Original vs Omvänd:</h4>${comparison}`)
}

// Make function available globally for showFile.js
window.showSimpleReverser = () => createSimpleReverserInterface()

