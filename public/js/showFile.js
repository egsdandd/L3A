// showFile.js
// Huvudkontroller för alla UI-moduler

// Definiera methods objekt globalt
const methods = {};

// Gör showMethods tillgängligt globalt OMEDELBART när filen laddas
window.showMethods = function(category) {
  console.log('showMethods called with category:', category);
  console.log('Available methods for', category, ':', methods[category]);
  console.log('All methods object:', methods);
  
  // Om modulerna inte är laddade än, försök ladda dem dynamiskt
  if (!methods[category]) {
    console.log('Methods not loaded for', category, ', attempting to load...');
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

// Säkerställ att showMethods finns även om något går fel
console.log('showMethods defined:', typeof window.showMethods);
async function loadModules() {
  try {
    const analyzerModule = await import('./simple-analyzerUI.js');
    methods.TextAnalyzer = analyzerModule.analyzerMethods;
    console.log('Loaded TextAnalyzer:', analyzerModule.analyzerMethods);

    const searcherModule = await import('./simple-searcherUI.js');
    methods.TextSearcher = searcherModule.searcherMethods;
    console.log('Loaded TextSearcher:', searcherModule.searcherMethods);

    const formatterModule = await import('./simple-formatterUI.js');
    methods.TextFormatter = formatterModule.formatterMethods;
    console.log('Loaded TextFormatter:', formatterModule.formatterMethods);

    const transformerModule = await import('./simple-transformerUI.js');
    methods.TextTransformer = transformerModule.transformerMethods;
    console.log('Loaded TextTransformer:', transformerModule.transformerMethods);

    const reverserModule = await import('./simple-reverserUI.js');
    methods.TextReverser = reverserModule.reverserMethods;
    console.log('Loaded TextReverser:', reverserModule.reverserMethods);

    const wordOptimizerModule = await import('./simple-wordOptimizerUI.js');
    methods.WordOptimizer = wordOptimizerModule.wordOptimizerMethods;
    console.log('Loaded WordOptimizer:', wordOptimizerModule.wordOptimizerMethods);

    const textGamingModule = await import('./simple-textGamingUI.js');
    methods.TextGaming = textGamingModule.textGamingMethods;
    console.log('Loaded TextGaming:', textGamingModule.textGamingMethods);

    const textForensicsModule = await import('./simple-textForensicsUI.js');
    methods.TextForensics = textForensicsModule.textForensicsMethods;
    console.log('Loaded TextForensics:', textForensicsModule.textForensicsMethods);

    const moodEngineModule = await import('./simple-moodEngineUI.js');
    methods.MoodEngine = moodEngineModule.moodEngineMethods;
    console.log('Loaded MoodEngine:', moodEngineModule.moodEngineMethods);

    console.log('All modules loaded successfully:', methods);
  } catch (error) {
    console.error('Error loading modules:', error);
  }
}

// Ladda enskild modul vid behov
async function loadSingleModule(category) {
  try {
    let moduleFile = '';
    let methodsProperty = '';
    
    switch(category) {
      case 'TextAnalyzer':
        moduleFile = './simple-analyzerUI.js';
        methodsProperty = 'analyzerMethods';
        break;
      case 'TextSearcher':
        moduleFile = './simple-searcherUI.js';
        methodsProperty = 'searcherMethods';
        break;
      case 'TextFormatter':
        moduleFile = './simple-formatterUI.js';
        methodsProperty = 'formatterMethods';
        break;
      case 'TextTransformer':
        moduleFile = './simple-transformerUI.js';
        methodsProperty = 'transformerMethods';
        break;
      case 'TextReverser':
        moduleFile = './simple-reverserUI.js';
        methodsProperty = 'reverserMethods';
        break;
      case 'WordOptimizer':
        moduleFile = './simple-wordOptimizerUI.js';
        methodsProperty = 'wordOptimizerMethods';
        break;
      case 'TextGaming':
        moduleFile = './simple-textGamingUI.js';
        methodsProperty = 'textGamingMethods';
        break;
      case 'TextForensics':
        moduleFile = './simple-textForensicsUI.js';
        methodsProperty = 'textForensicsMethods';
        break;
      case 'MoodEngine':
        moduleFile = './simple-moodEngineUI.js';
        methodsProperty = 'moodEngineMethods';
        break;
      default:
        throw new Error(`Unknown category: ${category}`);
    }
    
    console.log(`Loading ${category} from ${moduleFile}...`);
    const module = await import(moduleFile);
    console.log(`Module loaded:`, module);
    methods[category] = module[methodsProperty];
    console.log(`${category} methods assigned:`, methods[category]);
    
  } catch (error) {
    console.error(`Error loading ${category}:`, error);
    throw error;
  }
}

// Visa felmeddelande om modul inte kan laddas
function showErrorMessage(category) {
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
function renderMethods(moduleType) {
  console.log('renderMethods called with moduleType:', moduleType);
  const container = document.getElementById('methodList');
  console.log('Container found:', container);
  if (!container) return;

  container.innerHTML = '';
  console.log('methods object:', methods);
  console.log('methods[moduleType]:', methods[moduleType]);
  
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
function activateWritingAssistant() {
  renderMethods('WordOptimizer');
}

// Eventlisteners när sidan laddas
document.addEventListener('DOMContentLoaded', async function() {
  console.log('showFile.js loaded, loading modules...');
  await loadModules();
  console.log('All modules loaded, methods available:', Object.keys(methods));
  console.log('Full methods object after loading:', methods);
});

// Backup-funktion för moduler som inte konverterats än
function showBackupModule(category) {
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

// Exportera för användning i andra moduler
export { renderMethods, activateWritingAssistant };
