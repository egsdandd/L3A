// Interaction Helpers - User interaction utilities
// Handles validation, clipboard operations, and user feedback

/**
 * Validates text length and shows appropriate feedback.
 * @param {string} text - Text to validate.
 * @param {number} [minLength=1] - Minimum required length.
 * @param {string} [errorMessage='Text är för kort'] - Custom error message.
 * @returns {boolean} - Whether text is valid.
 */
function validateTextLength(text, minLength = 1, errorMessage = 'Text är för kort') {
  if (!text || text.length < minLength) {
    alert(errorMessage)
    return false
  }
  return true
}

/**
 * Copies text to clipboard with modern API and fallback.
 * @param {string} text - Text to copy.
 * @param {string} [successMessage='Text kopierad till urklipp!'] - Message to show on success.
 */
function copyToClipboard(text, successMessage = 'Text kopierad till urklipp!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      alert(successMessage)
    }).catch(err => {
      console.error('[InteractionHelpers] Kunde inte kopiera text:', err)
      fallbackCopyToClipboard(text, successMessage)
    })
  } else {
    fallbackCopyToClipboard(text, successMessage)
  }
}

/**
 * Fallback copy method for older browsers.
 * @param {string} text - Text to copy.
 * @param {string} successMessage - Message to show on success.
 */
function fallbackCopyToClipboard(text, successMessage) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
    alert(successMessage)
  } catch (err) {
    console.error('[InteractionHelpers] Fallback copy failed:', err)
    alert('Kunde inte kopiera text. Markera och kopiera manuellt.')
  }

  document.body.removeChild(textArea)
}

// Gör funktionerna globalt tillgängliga
window.validateTextLength = validateTextLength
window.copyToClipboard = copyToClipboard
window.fallbackCopyToClipboard = fallbackCopyToClipboard
