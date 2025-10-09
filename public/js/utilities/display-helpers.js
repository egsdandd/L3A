// Display Helpers - Result display and UI styling utilities
// Handles showing results and styling UI components

/**
 * Shows results in a specific container by setting content and making it visible
 * @param {string} containerId - ID of the results container
 * @param {string} contentId - ID of the content div inside the container
 * @param {string} content - HTML content to display
 * @param {boolean} scrollIntoView - Whether to scroll to the results (default: true)
 */
function showResults(containerId, contentId, content, scrollIntoView = true) {
  const container = document.getElementById(containerId)
  const contentDiv = document.getElementById(contentId)
  
  if (!container || !contentDiv) {
    console.error(`Results containers not found: ${containerId}, ${contentId}`)
    return
  }
  
  contentDiv.innerHTML = content
  container.style.display = 'block'
  
  if (scrollIntoView) {
    container.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Common button styling for UI consistency
 * @param {string} backgroundColor - Background color
 * @param {string} textColor - Text color
 * @param {string} borderColor - Border color (optional)
 * @returns {string} - CSS style string
 */
function getButtonStyle(backgroundColor, textColor, borderColor = null) {
  const border = borderColor ? `1px solid ${borderColor}` : 'none'
  return `background: ${backgroundColor}; color: ${textColor}; border: ${border}; padding: 15px; border-radius: 8px; cursor: pointer;`
}

/**
 * Creates a grid container for buttons
 * @param {string} minWidth - Minimum width for grid items (default: '200px')
 * @param {string} gap - Gap between grid items (default: '15px')
 * @returns {string} - CSS style string for grid container
 */
function getGridContainerStyle(minWidth = '200px', gap = '15px') {
  return `display: grid; grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr)); gap: ${gap}; margin: 20px 0;`
}