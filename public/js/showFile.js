// showFile.js - Main controller for all UI modules
import { loadModules, loadSingleModule, methods } from './core/module-loader.js';
import { renderMethods, showErrorMessage, activateWritingAssistant } from './core/ui-renderer.js';

// Gör showMethods tillgängligt globalt OMEDELBART när filen laddas
window.showMethods = function(category) {
  // Om modulerna inte är laddade än, försök ladda dem dynamiskt
  if (!methods[category]) {
    loadSingleModule(category).then(() => {
      renderMethods(category);
    }).catch(error => {
      console.error('Failed to load module', category, ':', error);
      showErrorMessage(category);
    });
    return;
  }
  
  renderMethods(category);
};

// Eventlisteners när sidan laddas
document.addEventListener('DOMContentLoaded', async function() {
  await loadModules();
});

// Exportera för användning i andra moduler
export { renderMethods, activateWritingAssistant };
