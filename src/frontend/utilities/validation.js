// src/frontend/utilities/validation.js

/**
 * Kontrollera om input är en icke-tom sträng
 * @param {string} inputText - Texten som ska valideras
 * @returns {boolean}
 */
export function isValidInput(inputText) {
    return typeof inputText === 'string' && inputText.trim().length > 0
}

/**
 * Kontrollera om två inputs är icke-tomma strängar
 * @param {string} inputText - Den första texten som ska valideras
 * @param {string} searchQuery - Den andra texten som ska valideras
 * @returns {boolean}
 */
export function isValidInputPair(inputText, searchQuery) {
    return (
        typeof inputText === 'string' &&
        typeof searchQuery === 'string' &&
        inputText.trim().length > 0 &&
        searchQuery.trim().length > 0
    )
}
