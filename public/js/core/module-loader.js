// Module loader – Dynamically imports UI feature modules
export const methods = {}

const moduleMap = {
  TextAnalyzer: { file: '../analyzerUI.js', property: 'analyzerMethods' },
  TextSearcher: { file: '../searcherUI.js', property: 'searcherMethods' },
  TextFormatter: { file: '../formatterUI.js', property: 'formatterMethods' },
  TextTransformer: { file: '../transformerUI.js', property: 'transformerMethods' }
}

/**
 * Loads all modules dynamically and stores their methods.
 * @async
 * @returns {Promise<void>}
 */
export async function loadModules() {
  try {
    for (const [category, { file, property }] of Object.entries(moduleMap)) {
      const module = await import(file)
      methods[category] = module[property]
    }
  } catch (error) {
    console.error('[ModuleLoader] Failed loading modules:', error)
  }
}

/**
 * Loads a single module dynamically by category.
 * @async
 * @param {string} category - The module category (e.g. 'TextAnalyzer').
 * @returns {Promise<object>} The loaded module’s methods
 * @throws {Error} If category is unknown or module loading fails.
 */
export async function loadSingleModule(category) {
  try {
    const moduleInfo = moduleMap[category]
    if (!moduleInfo) throw new Error(`Unknown category: ${category}`)

    const module = await import(moduleInfo.file)
    methods[category] = module[moduleInfo.property]
    return methods[category]
  } catch (error) {
    console.error(`[ModuleLoader] Error loading ${category}:`, error)
    throw error
  }
}
