// src/frontend/utilities/validation.js

/**
 * Kontrollera om input är en icke-tom sträng
 * @param {string} inputText - Texten som ska valideras
 * @returns {boolean}
 */
export function isValidInput(inputText) {
    if (typeof inputText !== 'string' || inputText.trim().length === 0) {
    throw new Error('inputText måste vara en icke-tom sträng')
    }
}

/**
 * Kontrollera om två inputs är icke-tomma strängar
 * @param {string} inputText - Den första texten som ska valideras
 * @param {string} searchQuery - Den andra texten som ska valideras
 * @returns {boolean}
 */
export function isValidInputPair(inputText, searchQuery) {
    if (typeof inputText !== 'string' || inputText.trim().length === 0) {
    throw new Error('inputText måste vara en icke-tom sträng')
    }
    if (typeof searchQuery !== 'string' || searchQuery.trim().length === 0) {
    throw new Error('searchQuery måste vara en icke-tom sträng')
    }
}
