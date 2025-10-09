// Core mood interface and shared utilities

/**
 *
 */
export function createSimpleMoodInterface() {
  const container = document.createElement('div')
  container.innerHTML = `
    <div class="module-container mood">
      <h1>🎭 Mood & Emotion Engine (Simple Version)</h1>
      <p>Analysera känslor och stämningar i text</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="analyzeSentiment()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          😊 Sentiment Analys
        </button>
        <button onclick="detectEmotions()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          💭 Känslo Detektion
        </button>
        <button onclick="analyzeMood()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🌈 Stämnings Analys
        </button>
        <button onclick="detectStress()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          😰 Stress Detektion
        </button>
        <button onclick="analyzeEnergy()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          ⚡ Energi Analys
        </button>
        <button onclick="createMoodMap()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🗺️ Stämnings Karta
        </button>
      </div>
      
      <div id="simpleMoodResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Känslomässig Analys:</h3>
        <div id="moodResultsContent"></div>
      </div>
    </div>
  `
  
  return container
}

// Utility function for showing results in mood interface
/**
 *
 * @param containerId
 * @param contentId
 * @param content
 */
export function showMoodResults(containerId, contentId, content) {
  const container = document.getElementById(containerId)
  const contentDiv = document.getElementById(contentId)
  
  if (container && contentDiv) {
    contentDiv.innerHTML = content
    container.style.display = 'block'
  }
}

// Make core function globally accessible
window.showMoodResults = showMoodResults