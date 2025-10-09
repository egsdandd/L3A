// src/services/ComplexReverser.js
import ReverserValidator from './ReverserValidator.js'
import TextReverser from './TextReverser.js'
import AdvancedReverser from './AdvancedReverser.js'

/**
 * Complex reversal operations combining multiple reversal types
 * Orchestrates multiple operations in sequence
 */
class ComplexReverser {
  /**
   * Applies multiple reversal operations in sequence
   * @param {string} text - The text to process
   * @param {Array} operations - Array of operations to apply
   * @returns {object} - Result with applied operations and final result
   */
  static async complexReverse(text, operations) {
    try {
      let result = ReverserValidator.validateText(text)
      const appliedOperations = []
      
      for (const operation of operations) {
        const { type } = operation
        let operationResult = null
        
        switch (type) {
          case 'text':
            operationResult = await TextReverser.reverseText(result)
            if (operationResult.success) {
              result = operationResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
            
          case 'words':
            operationResult = await TextReverser.reverseWords(result)
            if (operationResult.success) {
              result = operationResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
            
          case 'wordOrder':
            operationResult = await TextReverser.reverseWordOrder(result)
            if (operationResult.success) {
              result = operationResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
            
          case 'sentences':
            operationResult = await AdvancedReverser.reverseSentences(result)
            if (operationResult.success) {
              result = operationResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
            
          case 'lines':
            operationResult = await TextReverser.reverseLines(result)
            if (operationResult.success) {
              result = operationResult.reversed
              appliedOperations.push({ type, applied: true })
            }
            break
            
          case 'rot13':
            operationResult = await AdvancedReverser.rot13(result)
            if (operationResult.success) {
              result = operationResult.rot13
              appliedOperations.push({ type, applied: true })
            }
            break
            
          default:
            appliedOperations.push({ 
              type, 
              applied: false, 
              error: `Unknown operation: ${type}` 
            })
        }
      }
      
      return ReverserValidator.createSuccessResponse({
        original: text,
        result,
        operations: appliedOperations
      })
    } catch (error) {
      return ReverserValidator.handleError(error, 'complex reverse')
    }
  }
}

export default ComplexReverser