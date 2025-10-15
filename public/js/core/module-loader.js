// Module loader - Handles dynamic importing of UI modules

export const methods = {}

/**
 *
 */
export async function loadModules() {
  try {
    const analyzerModule = await import('../analyzerUI.js')
    methods.TextAnalyzer = analyzerModule.analyzerMethods

    const searcherModule = await import('../searcherUI.js')
    methods.TextSearcher = searcherModule.searcherMethods

    const formatterModule = await import('../formatterUI.js')
    methods.TextFormatter = formatterModule.formatterMethods

    const transformerModule = await import('../transformerUI.js')
    methods.TextTransformer = transformerModule.transformerMethods
  } catch (error) {
    console.error('Error loading modules:', error)
  }
}

// Ladda enskild modul vid behov
/**
 *
 * @param category
 */
export async function loadSingleModule(category) {
  try {
    let moduleFile = ''
    let methodsProperty = ''
    
    switch(category) {
      case 'TextAnalyzer':
        moduleFile = '../analyzerUI.js'
        methodsProperty = 'analyzerMethods'
        break
      case 'TextSearcher':
        moduleFile = '../searcherUI.js'
        methodsProperty = 'searcherMethods'
        break
      case 'TextFormatter':
        moduleFile = '../formatterUI.js'
        methodsProperty = 'formatterMethods'
        break
      case 'TextTransformer':
        moduleFile = '../transformerUI.js'
        methodsProperty = 'transformerMethods'
        break
      default:
        throw new Error(`Unknown category: ${category}`)
    }
    
    const module = await import(moduleFile)
    methods[category] = module[methodsProperty]
    
  } catch (error) {
    console.error(`Error loading ${category}:`, error)
    throw error
  }
}