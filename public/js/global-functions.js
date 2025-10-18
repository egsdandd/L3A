// Global functions - Available to all onclick handlers
// These functions need to be available globally for HTML onclick attributes

/**
 * Formats API result for display.
 * @param {string|object} result - The result to display (string or object)
 * @returns {string} Formatted result string
 */
function formatResult(result) {
  if (typeof result === 'object' && result !== null) {
    if (Array.isArray(result)) {
      return result.length > 0 ? result.join(', ') : 'Inga resultat'
    }
    return JSON.stringify(result, null, 2)
  }
  return result
}

/**
 * Fetches API data and displays it in the specified container.
 * @param {object} options - Options for the function
 * @param {string} options.url - API endpoint URL
 * @param {object} options.body - Payload to send to API
 * @param {string} options.resultsId - ID of the results container
 * @param {string} options.contentId - ID of the content div inside the container
 * @param {Function} [options.formatFn] - Optional function to format the result
 * @returns {Promise<void>}
 */
async function fetchAndShowResult({
  url,
  body,
  resultsId,
  contentId,
  formatFn
}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await response.json()

    const resultText = response.ok
      ? (formatFn ? formatFn(data) : formatResult(data.result))
      : `[Global] Fel: ${data && data.error ? data.error : 'Oväntat fel.'} (status ${response.status})`

    showResults({
      containerId: resultsId,
      contentId: contentId,
      content: resultText
    })
  } catch (error) {
    showResults({
      containerId: resultsId,
      contentId: contentId,
      content: `[Global] Fel: ${error.message}`
    })
  }
}

// Globala funktioner för onclick-funktioner i UI

window.callAnalyzer = async function(endpoint) {
  const text = getEditorText()
  if (!text) {
    showResults({
      containerId: 'analyzerResults',
      contentId: 'analyzerResultsContent',
      content: 'Ingen text att analysera'
    })
    return
  }
  await fetchAndShowResult({
    url: `/analyzer/${endpoint}`,
    body: { text },
    resultsId: 'analyzerResults',
    contentId: 'analyzerResultsContent',
    formatFn: data => `${data.method}: ${formatResult(data.result)}`
  })
}

window.callFormatter = async function(endpoint) {
  const text = getEditorText()
  if (!text) return
  await fetchAndShowResult({
    url: `/formatter/${endpoint}`,
    body: { text },
    resultsId: 'formatterResults',
    contentId: 'formatterResultsContent'
  })
}

window.callTransformer = async function(endpoint) {
  const text = getEditorText()
  if (!text) return
  await fetchAndShowResult({
    url: `/transformer/${endpoint}`,
    body: { text },
    resultsId: 'transformerResults',
    contentId: 'transformerResultsContent'
  })
}

window.callSearcher = async function(endpoint) {
  const text = getEditorText()
  const searchTermElement = document.getElementById('searchTerm')
  const searchTerm = searchTermElement ? searchTermElement.value : ''
  if (!text || !searchTerm) return
  await fetchAndShowResult({
    url: `/searcher/${endpoint}`,
    body: { text, searchTerm },
    resultsId: 'searcherResults',
    contentId: 'searcherResultsContent',
    formatFn: data => JSON.stringify(data.result)
  })
}

