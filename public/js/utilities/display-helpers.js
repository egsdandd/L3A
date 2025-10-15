// Display Helpers - Result display and UI styling utilities
// Handles showing results and styling UI components

/**
 * Visar resultat i container med objektargument för flexibilitet & läsbarhet.
 * @param {object} options
 * @param {string} options.containerId - ID på resultatcontainer
 * @param {string} options.contentId - ID på content-div i containern
 * @param {string} options.content - HTML att visa
 * @param {boolean} [options.scrollIntoView=true] - Om result ska scrollas in i vy
 */
function showResults({ containerId, contentId, content, scrollIntoView = true }) {
  const container = document.getElementById(containerId)
  const contentDiv = document.getElementById(contentId)

  if (!container || !contentDiv) {
    console.error(`[DisplayHelpers] Results containers not found: ${containerId}, ${contentId}`)
    return
  }

  contentDiv.innerHTML = content
  container.style.display = 'block'

  if (scrollIntoView) {
    container.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Gemensam knappstil, nu med objektarguments för direkt intention.
 * @param {object} options 
 * @param {string} options.backgroundColor
 * @param {string} options.textColor
 * @param {string} [options.borderColor]
 * @returns {string} CSS style string
 */
function getButtonStyle({ backgroundColor, textColor, borderColor = null }) {
  const border = borderColor ? `1px solid ${borderColor}` : 'none'
  return `background: ${backgroundColor}; color: ${textColor}; border: ${border}; padding: 15px; border-radius: 8px; cursor: pointer;`
}

/**
 * Skapa grid-container-stil – objekt för maximal expansion.
 * @param {object} options
 * @param {string} [options.minWidth='200px']
 * @param {string} [options.gap='15px']
 * @returns {string} CSS style string
 */
function getGridContainerStyle({ minWidth = '200px', gap = '15px' } = {}) {
  return `display: grid; grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr)); gap: ${gap}; margin: 20px 0;`
}

// Gör funktionerna globalt tillgängliga
window.showResults = showResults
window.getButtonStyle = getButtonStyle
window.getGridContainerStyle = getGridContainerStyle

// export { showResults }
