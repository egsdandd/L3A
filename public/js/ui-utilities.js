// UI Utilities - Common functions used across all Simple UI modules
// Extracts repeated logic to follow DRY (Don't Repeat Yourself) principle

/**
 * Gets text from the main text editor (.scrollbox)
 * @param {boolean} allowEmpty - Whether to allow empty text (default: false)
 * @returns {string|null} - The text content or null if validation fails
 */
function getEditorText(allowEmpty = false) {
  const textBox = document.querySelector('.scrollbox');
  
  if (!textBox) {
    console.error('Text editor (.scrollbox) not found');
    return null;
  }
  
  const text = textBox.innerText.trim();
  
  if (!allowEmpty && !text) {
    alert('Skriv lite text först!');
    return null;
  }
  
  return text;
}

/**
 * Shows results in a specific container by setting content and making it visible
 * @param {string} containerId - ID of the results container
 * @param {string} contentId - ID of the content div inside the container
 * @param {string} content - HTML content to display
 * @param {boolean} scrollIntoView - Whether to scroll to the results (default: true)
 */
function showResults(containerId, contentId, content, scrollIntoView = true) {
  const container = document.getElementById(containerId);
  const contentDiv = document.getElementById(contentId);
  
  if (!container || !contentDiv) {
    console.error(`Results containers not found: ${containerId}, ${contentId}`);
    return;
  }
  
  contentDiv.innerHTML = content;
  container.style.display = 'block';
  
  if (scrollIntoView) {
    container.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Gets value from an input element
 * @param {string} inputId - ID of the input element
 * @param {boolean} toLowerCase - Whether to convert to lowercase (default: false)
 * @param {boolean} trim - Whether to trim whitespace (default: true)
 * @returns {string|null} - The input value or null if element not found
 */
function getInputValue(inputId, toLowerCase = false, trim = true) {
  const input = document.getElementById(inputId);
  
  if (!input) {
    console.error(`Input element not found: ${inputId}`);
    return null;
  }
  
  let value = input.value;
  
  if (trim) {
    value = value.trim();
  }
  
  if (toLowerCase) {
    value = value.toLowerCase();
  }
  
  return value;
}

/**
 * Sets value of an input element
 * @param {string} inputId - ID of the input element
 * @param {string} value - Value to set
 */
function setInputValue(inputId, value) {
  const input = document.getElementById(inputId);
  
  if (!input) {
    console.error(`Input element not found: ${inputId}`);
    return;
  }
  
  input.value = value;
}

/**
 * Sets innerHTML of an element
 * @param {string} elementId - ID of the element
 * @param {string} content - HTML content to set
 */
function setElementContent(elementId, content) {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element not found: ${elementId}`);
    return;
  }
  
  element.innerHTML = content;
}

/**
 * Common button styling for UI consistency
 * @param {string} backgroundColor - Background color
 * @param {string} textColor - Text color
 * @param {string} borderColor - Border color (optional)
 * @returns {string} - CSS style string
 */
function getButtonStyle(backgroundColor, textColor, borderColor = null) {
  const border = borderColor ? `1px solid ${borderColor}` : 'none';
  return `background: ${backgroundColor}; color: ${textColor}; border: ${border}; padding: 15px; border-radius: 8px; cursor: pointer;`;
}

/**
 * Creates a grid container for buttons
 * @param {string} minWidth - Minimum width for grid items (default: '200px')
 * @param {string} gap - Gap between grid items (default: '15px')
 * @returns {string} - CSS style string for grid container
 */
function getGridContainerStyle(minWidth = '200px', gap = '15px') {
  return `display: grid; grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr)); gap: ${gap}; margin: 20px 0;`;
}

/**
 * Validates text length and shows appropriate feedback
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum required length (default: 1)
 * @param {string} errorMessage - Custom error message
 * @returns {boolean} - Whether text is valid
 */
function validateTextLength(text, minLength = 1, errorMessage = 'Text är för kort') {
  if (!text || text.length < minLength) {
    alert(errorMessage);
    return false;
  }
  return true;
}

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @param {string} successMessage - Message to show on success
 */
function copyToClipboard(text, successMessage = 'Text kopierad till urklipp!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      alert(successMessage);
    }).catch(err => {
      console.error('Kunde inte kopiera text:', err);
      fallbackCopyToClipboard(text, successMessage);
    });
  } else {
    fallbackCopyToClipboard(text, successMessage);
  }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 * @param {string} successMessage - Message to show on success
 */
function fallbackCopyToClipboard(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    alert(successMessage);
  } catch (err) {
    console.error('Fallback copy failed:', err);
    alert('Kunde inte kopiera text. Markera och kopiera manuellt.');
  }
  
  document.body.removeChild(textArea);
}

// Export functions for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getEditorText,
    showResults,
    getInputValue,
    setInputValue,
    setElementContent,
    getButtonStyle,
    getGridContainerStyle,
    validateTextLength,
    copyToClipboard,
    fallbackCopyToClipboard
  };
}