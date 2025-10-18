// showFile.js - Main controller for all UI modules
import { loadModules, loadSingleModule } from './core/module-loader.js'
import { renderMethods, showErrorMessage, activateWritingAssistant } from './core/ui-renderer.js'

// Gör showMethods tillgängligt globalt OMEDELBART när filen laddas
window.showMethods = async function(category) {
  try {
    // Ladda modulen dynamiskt
    await loadSingleModule(category)
    renderMethods(category)
  } catch (error) {
    console.error('Failed to load module', category, ':', error)
    showErrorMessage(category)
  }
}

// Eventlisteners när sidan laddas
document.addEventListener('DOMContentLoaded', async function() {
  await loadModules()
})

// Exportera för användning i andra moduler
export { renderMethods, activateWritingAssistant }
