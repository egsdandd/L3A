// Display Helpers - Result display and UI styling utilities
// Handles showing results and styling UI components

/**
 * Visar resultat i container med objektargument för flexibilitet & läsbarhet.
 * @param {object} options - Configuration object for showing results
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

// Gör funktionen globalt tillgänglig
window.showResults = showResults
