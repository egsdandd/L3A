// Global functions - Available to all onclick handlers
// These functions need to be available globally for HTML onclick attributes

function formatResult(result) {
  if (typeof result === 'object' && result !== null) {
    if (Array.isArray(result)) {
      return result.length > 0 ? result.join(', ') : 'Inga resultat'
    }
    return JSON.stringify(result, null, 2)
  }
  return result
}

window.callAnalyzer = async function(endpoint) {
  const text = getEditorText()
  if (!text) {
    showResults('analyzerResults', 'analyzerResultsContent', 'Ingen text att analysera')
    return
  }
  
  try {
    const response = await fetch(`/analyzer/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      let resultText = `${data.method}: ${formatResult(data.result)}`
      showResults('analyzerResults', 'analyzerResultsContent', resultText)
    } else {
      showResults('analyzerResults', 'analyzerResultsContent', `Fel: ${data.error}`)
    }
  } catch (error) {
    showResults('analyzerResults', 'analyzerResultsContent', `Fel: ${error.message}`)
  }
}

window.callFormatter = async function(endpoint) {
  const text = getEditorText()
  if (!text) return
  
  try {
    const response = await fetch(`/formatter/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const data = await response.json()
    if (response.ok) {
      showResults('formatterResults', 'formatterResultsContent', data.result)
    }
  } catch (error) {
    showResults('formatterResults', 'formatterResultsContent', `Fel: ${error.message}`)
  }
}

window.callTransformer = async function(endpoint) {
  const text = getEditorText()
  if (!text) return
  
  try {
    const response = await fetch(`/transformer/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const data = await response.json()
    if (response.ok) {
      showResults('transformerResults', 'transformerResultsContent', data.result)
    }
  } catch (error) {
    showResults('transformerResults', 'transformerResultsContent', `Fel: ${error.message}`)
  }
}

window.callSearcher = async function(endpoint) {
  const text = getEditorText()
  const searchTerm = document.getElementById('searchTerm').value
  if (!text || !searchTerm) return
  
  try {
    const response = await fetch(`/searcher/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, searchTerm })
    })
    const data = await response.json()
    if (response.ok) {
      showResults('searcherResults', 'searcherResultsContent', JSON.stringify(data.result))
    }
  } catch (error) {
    showResults('searcherResults', 'searcherResultsContent', `Fel: ${error.message}`)
  }
}