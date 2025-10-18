// src/utilities/server-utils.js
/**
 * Escapar <, > och & i en sträng för säker HTML-rendering.
 * @param {string} str - Strängen att escapera
 * @returns {string} Escapad sträng
 */
export function escapeHtml(str) {
  return str.replace(/[<>&]/g, m => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]
  ))
}