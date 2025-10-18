// src/services/TextAnalysisService.js
import { TextAnalyzer } from 'texttoolkit'
import { ANALYZER_ACTIONS } from '../../public/js/constants.js'

/**
 * Service class för textanalys som kapslar in all business logic.
 * Denna klass hanterar method mapping och kommunikation med texttoolkit.
 */
export class TextAnalysisService {
  /**
   * Creates an instance of TextAnalysisService and initializes the method map.
   */
  constructor() {
    this.methodMap = this.buildMethodMap()
  }

  /**
   * Genererar en mappning från lowercase endpoint-strängar till CamelCase metodnamn
   * utifrån de definierade ANALYZER_ACTIONS.
   * Detta säkerställer konsistens mellan konstanter och API-mappning.
   *
   * Ex: { 'countwords': 'countWords', 'countsentences': 'countSentences', ... }
   * @returns {object} En mappning från lowercase metodnamn till CamelCase metodnamn.
   */
  buildMethodMap() {
    const map = {}
    for (const key in ANALYZER_ACTIONS) {
      if (Object.prototype.hasOwnProperty.call(ANALYZER_ACTIONS, key)) {
        const methodName = ANALYZER_ACTIONS[key] // t.ex. 'countWords'
        // Anta att klienten skickar lowercase versionen av metodnamnet
        map[methodName.toLowerCase()] = methodName
      }
    }
    return map
  }

  /**
   * Validerar text innan analys.
   * @param {string} text - Texten som ska valideras.
   * @throws {Error} Om texten är tom eller ogiltig.
   */
  validateText(text) {
    if (!text || typeof text !== 'string' || text.trim() === '') {
      throw new Error('No text provided or text is empty.')
    }
  }

  /**
   * Central metod för att hantera textanalysförfrågningar.
   * Denna metod kapslar in logiken för att instansiera TextAnalyzer
   * och anropa rätt metod baserat på en given analysåtgärd.
   *
   * @param {string} text - Texten som ska analyseras.
   * @param {string} action - Namnet på analysåtgärden (lowercase från frontend, t.ex. 'countwords').
   * @returns {any} Resultatet från analysen.
   * @throws {Error} Om en ogiltig analysåtgärd anges eller metod saknas.
   */
  async performAnalysis(text, action) {
    // Validera input
    this.validateText(text)

    let analyzer
    try {
      analyzer = new TextAnalyzer(text)
    } catch (e) {
      // Fånga eventuella fel som kan uppstå under konstruktorn (t.ex. ogiltig text, minnesproblem)
      throw new Error(`Kunde inte förbereda textanalys: ${e.message}`)
    }

    // Använd den byggda methodMap
    const methodName = this.methodMap[action]
    if (!methodName) {
      throw new Error(`Okänd analysmetod: ${action}. Tillåtna metoder: ${Object.keys(this.methodMap).join(', ')}`)
    }

    // Kontrollera om metoden finns på analyzer-objektet
    if (typeof analyzer[methodName] === 'function') {
      return await analyzer[methodName]()
    } else {
      throw new Error(`Internfel: Metoden '${methodName}' finns inte på TextAnalyzer-instansen.`)
    }
  }

  /**
   * Returnerar alla tillgängliga analysmetoder.
   * @returns {string[]} Lista över tillgängliga metoder.
   */
  getAvailableMethods() {
    return Object.keys(this.methodMap)
  }
}