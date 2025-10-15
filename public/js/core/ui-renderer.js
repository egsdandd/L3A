// UI Renderer - Handles rendering of UI components and error messages
import { methods } from './module-loader.js'

/**
 * Shows an error message when a module can't be loaded.
 * @param {string} category - The module/category that failed to load.
 */
export function showErrorMessage(category) {
  const container = document.getElementById('methodList')
  if (container) {
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); border-radius: 15px; color: white; margin: 20px 0;">
        <h2>❌ Kunde inte ladda ${category}</h2>
        <p>Det verkar som om modulen inte kunde laddas korrekt.</p>
        <p>Kontrollera konsolen för mer information.</p>
        <button onclick="location.reload()" style="background: white; color: #dc3545; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
          Ladda om sidan
        </button>
      </div>
    `
  }
}

// Definiera matchning mellan modulnamn och komponentfunktion
const uiComponentMap = {
  TextAnalyzer: 'Text Analyzer',
  TextSearcher: 'Text Searcher',
  TextFormatter: 'Text Formatter',
  TextTransformer: 'Text Transformer',
  TextReverser: 'Text Reverser',
  WordOptimizer: 'Word Choice Optimizer',
  TextGaming: 'Text Gaming Hub',
  TextForensics: 'Text Forensics Detective',
  MoodEngine: 'Mood & Emotion Engine',
}

/**
 * Renders buttons/methods for a given moduleType.
 * @param {string} moduleType - The type/category of the module.
 */
export function renderMethods(moduleType) {
  const container = document.getElementById('methodList')
  if (!container) return

  container.innerHTML = ''

  if (methods[moduleType]) {
    // Använd map istället för lång if/else
    const componentName = uiComponentMap[moduleType]
    let uiComponent = null

    if (componentName && typeof methods[moduleType][componentName] === 'function') {
      uiComponent = methods[moduleType][componentName]()
    }

    if (uiComponent) {
      container.appendChild(uiComponent)
    } else {
      // Fallback om modulen inte är konverterad eller komponent saknas
      container.innerHTML = `
        <div style="padding: 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 15px; color: #495057;">
          <h2>🚧 Modul under uppgradering</h2>
          <p>Denna modul håller på att konverteras till den nya designen.</p>
          <p>Använd de andra modulerna som redan är klara!</p>
        </div>
      `
    }
  }
}

/**
 * Activates the Writing Assistant by rendering WordOptimizer methods.
 */
export function activateWritingAssistant() {
  renderMethods('WordOptimizer')
}

/**
 * Shows a backup message for modules under development.
 * @param {string} category - The module/category name.
 */
export function showBackupModule(category) {
  const colors = {
    TextForensics: '#17a2b8',
    MoodEngine: '#667eea'
  }

  const color = colors[category] || '#6c757d'

  const container = document.getElementById('methodList')
  if (container) {
    container.innerHTML = `
      <div style="background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%); padding: 30px; border-radius: 15px; color: white; margin: 20px 0; text-align: center;">
        <h2>🚀 ${category}</h2>
        <p>Denna modul är under utveckling</p>
        <p>Använd de andra modulerna som redan är klara!</p>
        <button onclick="alert('${category} kommer snart med alla funktioner!')" 
                style="background: white; color: ${color}; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; margin: 10px;">
          Testa ${category} (Demo)
        </button>
      </div>
    `
  }
}
