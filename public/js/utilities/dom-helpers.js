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
 * Gets value from an input element by ID
 * @param {string} elementId - ID of the input element
 * @param {string} defaultValue - Default value if element not found (default: '')
 * @returns {string} - The input value or default value
 */
function getInputValue(elementId, defaultValue = '') {
  const element = document.getElementById(elementId)
  
  if (!element) {
    console.error(`Input element not found: ${elementId}`)
    return defaultValue
  }
  
  return element.value || defaultValue
}

/**
 * Sets value for an input element by ID
 * @param {string} elementId - ID of the input element
 * @param {string} value - Value to set
 */
function setInputValue(elementId, value) {
  const element = document.getElementById(elementId)
  
  if (!element) {
    console.error(`Input element not found: ${elementId}`)
    return
  }
  
  element.value = value
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