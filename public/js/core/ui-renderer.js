// UI Renderer - Handles rendering of UI components and error messages
import { methods } from './module-loader.js';

// Visa felmeddelande om modul inte kan laddas
export function showErrorMessage(category) {
  const container = document.getElementById('methodList');
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
    `;
  }
}

// Funktion för att rendera metodknappar
export function renderMethods(moduleType) {
  const container = document.getElementById('methodList');
  if (!container) return;

  container.innerHTML = '';
  
  if (methods[moduleType]) {
    // Alla moderniserade moduler använder UI-komponent struktur
    if (moduleType === 'TextAnalyzer' || moduleType === 'TextSearcher' || 
        moduleType === 'TextFormatter' || moduleType === 'TextTransformer' || 
        moduleType === 'TextReverser' || moduleType === 'WordOptimizer' || 
        moduleType === 'TextGaming' || moduleType === 'TextForensics' || 
        moduleType === 'MoodEngine') {
      
      let uiComponent;
      
      if (moduleType === 'TextAnalyzer') {
        uiComponent = methods[moduleType]['Text Analyzer']();
      } else if (moduleType === 'TextSearcher') {
        uiComponent = methods[moduleType]['Text Searcher']();
      } else if (moduleType === 'TextFormatter') {
        uiComponent = methods[moduleType]['Text Formatter']();
      } else if (moduleType === 'TextTransformer') {
        uiComponent = methods[moduleType]['Text Transformer']();
      } else if (moduleType === 'TextReverser') {
        uiComponent = methods[moduleType]['Text Reverser']();
      } else if (moduleType === 'WordOptimizer') {
        uiComponent = methods[moduleType]['Word Choice Optimizer']();
      } else if (moduleType === 'TextGaming') {
        uiComponent = methods[moduleType]['Text Gaming Hub']();
      } else if (moduleType === 'TextForensics') {
        uiComponent = methods[moduleType]['Text Forensics Detective']();
      } else if (moduleType === 'MoodEngine') {
        uiComponent = methods[moduleType]['Mood & Emotion Engine']();
      }
      
      if (uiComponent) {
        container.appendChild(uiComponent);
      }
    } else {
      // Fallback för moduler som inte är konverterade än
      container.innerHTML = `
        <div style="padding: 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 15px; color: #495057;">
          <h2>🚧 Modul under uppgradering</h2>
          <p>Denna modul håller på att konverteras till den nya designen.</p>
          <p>Använd de andra modulerna som redan är klara!</p>
        </div>
      `;
    }
  }
}

// Funktion för att aktivera Writing Assistant
export function activateWritingAssistant() {
  renderMethods('WordOptimizer');
}

// Backup-funktion för moduler som inte konverterats än
export function showBackupModule(category) {
  const colors = {
    TextForensics: '#17a2b8',
    MoodEngine: '#667eea'
  };
  
  const color = colors[category] || '#6c757d';
  
  const container = document.getElementById('methodList');
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
    `;
  }
}