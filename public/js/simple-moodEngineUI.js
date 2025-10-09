// Simple version of moodEngineUI.js

export const moodEngineMethods = {
  'Mood & Emotion Engine': () => createSimpleMoodInterface()
};

function createSimpleMoodInterface() {
  const container = document.createElement('div');
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
  `;
  
  return container;
}

// HTML generation helper functions
function generateEmotionDistributionHTML(distributionToShow) {
  if (Object.keys(distributionToShow).length === 0) {
    return '<p style="color: #333;">Ingen känslomässig data tillgänglig</p>';
  }
  
  return Object.entries(distributionToShow).map(([emotion, value]) => `
    <div style="margin: 5px 0; padding: 8px; background: #f0f0f0; border-radius: 4px; color: #333;">
      <strong style="color: #000;">${emotion}:</strong> ${typeof value === 'number' ? (value * 100).toFixed(1) + '%' : value}
    </div>
  `).join('');
}

function generateEmotionZonesHTML(zones) {
  return (zones || []).map(zone => `
    <div style="margin: 10px 0; padding: 10px; border-left: 4px solid gold; background: #fffbf0; border-radius: 4px;">
      <strong>Zone:</strong> ${zone.emotion}<br>
      <strong>Intensitet:</strong> ${zone.intensity.toFixed(2)}<br>
      <strong>Ord:</strong> ${zone.words.join(', ')}
    </div>
  `).join('');
}

function generateHeatmapAnalysisHTML(heatmap) {
  return (heatmap || []).slice(0, 10).map(item => `
    <div style="margin: 10px 0; padding: 10px; border-left: 4px solid ${item.color}; background: ${item.color}; border-radius: 4px;">
      <strong>"${item.word}"</strong> (${item.emotion})<br>
      Intensitet: ${item.intensity.toFixed(2)}<br>
      Position: ${item.position}
    </div>
  `).join('');
}

function generateHotspotsHTML(hotspots) {
  return (hotspots || []).map(hotspot => `
    <div style="margin: 5px 0; padding: 8px; background: ${hotspot.color}; border-radius: 4px; color: white;">
      <strong>"${hotspot.word}"</strong> - ${hotspot.emotion} (${hotspot.intensity.toFixed(2)})
    </div>
  `).join('');
}

function generateEmotionHeatmapHTML(data) {
  const distributionToShow = data.emotionDistribution || {};
  
  return `
    <h4>💭 Emotion Heatmap:</h4>
    <div class="mood-result">
      <h3>Känslomässig fördelning:</h3>
      ${generateEmotionDistributionHTML(distributionToShow)}
    </div>
    <h5>Känslomässiga zoner:</h5>
    ${generateEmotionZonesHTML(data.zones)}
    <h5>Ord-analys (första 10 ord):</h5>
    ${generateHeatmapAnalysisHTML(data.heatmap)}
    <h5>Känslomässiga hotspots:</h5>
    ${generateHotspotsHTML(data.hotspots)}
  `;
}

function generateMoodSummaryHTML(summary) {
  return `
    <div class="mood-result">
      <h3>Övergripande stämning: ${summary.overallMood}</h3>
      <p>Sentiment score: ${summary.sentimentScore}</p>
      <p>Stress-nivå: ${summary.stressLevel}</p>
      <p>Energi-nivå: ${summary.energyLevel}</p>
      <p>Emotionell stabilitet: ${summary.emotionalStability}</p>
    </div>
  `;
}

function generateSentimentAnalysisHTML(analysis) {
  return `
    <div style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 4px;">
      <strong>Dominerande känsla:</strong> ${analysis.sentiment.dominantEmotion}<br>
      <strong>Positiva ord:</strong> ${analysis.sentiment.positiveScore}<br>
      <strong>Negativa ord:</strong> ${analysis.sentiment.negativeScore}
    </div>
  `;
}

function generatePsychologicalProfileHTML(analysis) {
  return `
    <div style="margin: 10px 0; padding: 10px; background: #e8f4fd; border-radius: 4px;">
      <strong>Själv-fokus:</strong> ${analysis.psychological.selfFocus ? 'Ja' : 'Nej'}<br>
      <strong>Framtidsorienterad:</strong> ${analysis.psychological.futureOriented ? 'Ja' : 'Nej'}<br>
      <strong>Tidsorientering:</strong> ${analysis.psychological.timeOrientation}
    </div>
  `;
}

function generateInsightsHTML(insights) {
  return (insights || []).map(insight => `
    <div style="margin: 5px 0; padding: 8px; background: #f0f8e8; border-radius: 4px;">
      💡 ${insight}
    </div>
  `).join('');
}

function generateRecommendationsHTML(recommendations) {
  return (recommendations || []).map(rec => `
    <div style="margin: 5px 0; padding: 8px; background: #fff4e6; border-radius: 4px;">
      📋 ${rec}
    </div>
  `).join('');
}

function generateTimelineSummaryHTML(summary) {
  return `
    <div class="mood-result">
      <h3>Genomsnittlig Sentiment: ${summary.averageSentiment.toFixed(2)}</h3>
      <p>Trend: ${summary.trend}</p>
      <p>Stabilitet: ${summary.stability}</p>
    </div>
  `;
}

function generateTimelineSegmentsHTML(timeline) {
  return timeline.map((segment, index) => `
    <div style="margin: 10px 0; padding: 10px; border-left: 4px solid ${segment.sentiment > 0 ? 'green' : segment.sentiment < 0 ? 'red' : 'gray'}; background: #f9f9f9;">
      <strong>Segment ${segment.segment} (${segment.timestamp}):</strong><br>
      <em>"${segment.text}"</em><br>
      Sentiment: ${segment.sentiment}, Känsla: ${segment.emotion}, Intensitet: ${segment.intensity}
    </div>
  `).join('');
}

function generateSentimentTimelineHTML(data) {
  const { timeline, summary } = data;
  
  return `
    <h4>😊 Sentiment Timeline Analys:</h4>
    ${generateTimelineSummaryHTML(summary)}
    <h5>Sentiment över tid:</h5>
    ${generateTimelineSegmentsHTML(timeline)}
  `;
}

function generateComprehensiveMoodHTML(data) {
  const { analysis, summary } = data;
  
  return `
    <h4>🌈 Comprehensive Mood Analytics:</h4>
    ${generateMoodSummaryHTML(summary)}
    <h5>Sentiment analys:</h5>
    ${generateSentimentAnalysisHTML(analysis)}
    <h5>Psykologisk profil:</h5>
    ${generatePsychologicalProfileHTML(analysis)}
    <h5>Insikter:</h5>
    ${generateInsightsHTML(data.insights)}
    <h5>Rekommendationer:</h5>
    ${generateRecommendationsHTML(data.recommendations)}
  `;
}

// Global mood analysis functions
window.analyzeSentiment = async function() {
  const text = getMoodText();
  if (!text) return;
  
  try {
    showMoodResult('<div class="loading">🔄 Analyserar sentiment...</div>');
    
    const response = await fetch('/moodengine/sentiment-timeline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const result = generateSentimentTimelineHTML(data);
      showMoodResult(result);
    } else {
      showMoodResult(`<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showMoodResult(`<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

window.detectEmotions = async function() {
  const text = getMoodText();
  if (!text) return;
  
  try {
    showMoodResult('<div class="loading">🔄 Analyserar känslor...</div>');
    
    const response = await fetch('/moodengine/emotion-heatmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const result = generateEmotionHeatmapHTML(data);
      showMoodResult(result);
    } else {
      showMoodResult(`<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showMoodResult(`<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

window.analyzeMood = async function() {
  const text = getMoodText();
  if (!text) return;
  
  try {
    showMoodResult('<div class="loading">🔄 Analyserar stämning...</div>');
    
    const response = await fetch('/moodengine/mood-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const result = generateComprehensiveMoodHTML(data);
      showMoodResult(result);
    } else {
      showMoodResult(`<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showMoodResult(`<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

// Helper functions
function getMoodText() {
  const textBox = document.querySelector('.scrollbox');
  if (!textBox || !textBox.innerText.trim()) {
    alert('Skriv lite text först!');
    return null;
  }
  return textBox.innerText.trim();
}

function showMoodResult(html) {
  const resultDiv = document.getElementById('simpleMoodResults');
  if (resultDiv) {
    const contentDiv = document.getElementById('moodResultsContent');
    if (contentDiv) {
      contentDiv.innerHTML = html;
    }
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }
}