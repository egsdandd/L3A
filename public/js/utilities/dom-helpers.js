// DOM Helpers - DOM manipulation utilities
// Handles getting and setting content in DOM elements

/**
 * Gets text from the main text editor (.scrollbox).
 * @param {boolean} [allowEmpty=false] - Whether to allow empty text.
 * @returns {string|null} - The text content or null if not valid.
 */
function getEditorText(allowEmpty = false) {
  const textBox = document.querySelector('.scrollbox')

  if (!textBox) {
    console.error('[DOMHelpers] Text editor (.scrollbox) not found')
    return null
  }

  const text = textBox.innerText.trim()

  if (!allowEmpty && !text) {
    alert('Skriv lite text först!')
    return null
  }

  return text
}

/**
 * Sets inner HTML content for any element by ID.
 * @param {string} elementId - ID of the target element.
 * @param {string} content - HTML content to set.
 */
function setElementContent(elementId, content) {
  const element = document.getElementById(elementId)

  if (!element) {
    console.error(`[DOMHelpers] Element not found: ${elementId}`)
    return
  }

  element.innerHTML = content
}

// Gör funktionerna globalt tillgängliga
window.getEditorText = getEditorText
window.setElementContent = setElementContent
