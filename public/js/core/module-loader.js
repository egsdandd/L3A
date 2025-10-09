// Module loader - Handles dynamic importing of UI modules

export const methods = {};

export async function loadModules() {
  try {
    const analyzerModule = await import('../analyzerUI.js');
    methods.TextAnalyzer = analyzerModule.analyzerMethods;

    const searcherModule = await import('../searcherUI.js');
    methods.TextSearcher = searcherModule.searcherMethods;

    const formatterModule = await import('../formatterUI.js');
    methods.TextFormatter = formatterModule.formatterMethods;

    const transformerModule = await import('../transformerUI.js');
    methods.TextTransformer = transformerModule.transformerMethods;

    const reverserModule = await import('../reverserUI.js');
    methods.TextReverser = reverserModule.reverserMethods;

    const wordOptimizerModule = await import('../wordOptimizerUI.js');
    methods.WordOptimizer = wordOptimizerModule.wordOptimizerMethods;

    const textGamingModule = await import('../textGamingUI.js');
    methods.TextGaming = textGamingModule.textGamingMethods;

    const textForensicsModule = await import('../textForensicsUI.js');
    methods.TextForensics = textForensicsModule.textForensicsMethods;

    const moodEngineModule = await import('../moodEngineUI.js');
    methods.MoodEngine = moodEngineModule.moodEngineMethods;
  } catch (error) {
    console.error('Error loading modules:', error);
  }
}

// Ladda enskild modul vid behov
export async function loadSingleModule(category) {
  try {
    let moduleFile = '';
    let methodsProperty = '';
    
    switch(category) {
      case 'TextAnalyzer':
        moduleFile = '../analyzerUI.js';
        methodsProperty = 'analyzerMethods';
        break;
      case 'TextSearcher':
        moduleFile = '../searcherUI.js';
        methodsProperty = 'searcherMethods';
        break;
      case 'TextFormatter':
        moduleFile = '../formatterUI.js';
        methodsProperty = 'formatterMethods';
        break;
      case 'TextTransformer':
        moduleFile = '../transformerUI.js';
        methodsProperty = 'transformerMethods';
        break;
      case 'TextReverser':
        moduleFile = '../reverserUI.js';
        methodsProperty = 'reverserMethods';
        break;
      case 'WordOptimizer':
        moduleFile = '../wordOptimizerUI.js';
        methodsProperty = 'wordOptimizerMethods';
        break;
      case 'TextGaming':
        moduleFile = '../textGamingUI.js';
        methodsProperty = 'textGamingMethods';
        break;
      case 'TextForensics':
        moduleFile = '../textForensicsUI.js';
        methodsProperty = 'textForensicsMethods';
        break;
      case 'MoodEngine':
        moduleFile = '../moodEngineUI.js';
        methodsProperty = 'moodEngineMethods';
        break;
      default:
        throw new Error(`Unknown category: ${category}`);
    }
    
    const module = await import(moduleFile);
    methods[category] = module[methodsProperty];
    
  } catch (error) {
    console.error(`Error loading ${category}:`, error);
    throw error;
  }
}