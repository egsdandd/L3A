// DOM Helpers - DOM manipulation utilities
// Handles getting and setting content in DOM elements

/**
 * Gets text from the main text editor (.scrollbox)
 * @param {boolean} allowEmpty - Whether to allow empty text (default: false)
 * @returns {string|null} - The text content or null if validation fails
 */
function getEditorText(allowEmpty = false) {
  const textBox = document.querySelector('.scrollbox')
  
  if (!textBox) {
    console.error('Text editor (.scrollbox) not found')
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
 * Sets content for any element by ID
 * @param {string} elementId - ID of the element
 * @param {string} content - HTML content to set
 */
function setElementContent(elementId, content) {
  const element = document.getElementById(elementId)
  
  if (!element) {
    console.error(`Element not found: ${elementId}`)
    return
  }
  
  element.innerHTML = content
}

// Gör funktionerna globalt tillgängliga för ES6-moduler
window.getEditorText = getEditorText
window.setElementContent = setElementContent