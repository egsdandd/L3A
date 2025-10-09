// Simple version of moodEngineUI.js
console.log('Loading simple moodEngineUI...');

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
      const timeline = data.timeline;
      const summary = data.summary;
      
      const result = `
        <h4>😊 Sentiment Timeline Analys:</h4>
        <div class="mood-result">
          <h3>Genomsnittlig Sentiment: ${summary.averageSentiment.toFixed(2)}</h3>
          <p>Trend: ${summary.trend}</p>
          <p>Antal segment: ${summary.totalSegments}</p>
          <p>Känslomässig räckvidd: ${summary.emotionalRange}</p>
        </div>
        <h5>Timeline detaljer:</h5>
        ${timeline.map(segment => `
          <div style="margin: 10px 0; padding: 10px; border-left: 4px solid ${
            segment.sentiment > 0 ? 'green' : segment.sentiment < 0 ? 'red' : 'gray'
          }; background: #f9f9f9;">
            <strong>Segment ${segment.segment} (${segment.timestamp}):</strong><br>
            <em>"${segment.text}"</em><br>
            Sentiment: ${segment.sentiment}, Känsla: ${segment.emotion}, Intensitet: ${segment.intensity}
          </div>
        `).join('')}
      `;
      
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
      console.log('API data:', data); // Debug
      console.log('EmotionDistribution:', data.emotionDistribution); // Extra debug
      
      // Använd emotionDistribution direkt från API-svaret
      const distributionToShow = data.emotionDistribution || {};
      console.log('DistributionToShow:', distributionToShow); // Debug
      console.log('Keys:', Object.keys(distributionToShow)); // Debug
      
      const result = `
        <h4>💭 Emotion Heatmap:</h4>
        <div class="mood-result">
          <h3>Känslomässig fördelning:</h3>
          ${Object.keys(distributionToShow).length > 0 ? 
            Object.entries(distributionToShow).map(([emotion, value]) => `
              <div style="margin: 5px 0; padding: 8px; background: #f0f0f0; border-radius: 4px; color: #333;">
                <strong style="color: #000;">${emotion}:</strong> ${typeof value === 'number' ? (value * 100).toFixed(1) + '%' : value}
              </div>
            `).join('') : 
            '<p style="color: #333;">Ingen känslomässig data tillgänglig</p>'
          }
        </div>
        <h5>Känslomässiga zoner:</h5>
        ${(data.zones || []).map(zone => `
          <div style="margin: 10px 0; padding: 10px; border-left: 4px solid gold; background: #fffbf0; border-radius: 4px;">
            <strong>Zone:</strong> ${zone.emotion}<br>
            <strong>Intensitet:</strong> ${zone.intensity.toFixed(2)}<br>
            <strong>Ord:</strong> ${zone.words.join(', ')}
          </div>
        `).join('')}
        <h5>Ord-analys (första 10 ord):</h5>
        ${(data.heatmap || []).slice(0, 10).map(item => `
          <div style="margin: 10px 0; padding: 10px; border-left: 4px solid ${item.color}; background: ${item.color}; border-radius: 4px;">
            <strong>"${item.word}"</strong> (${item.emotion})<br>
            Intensitet: ${item.intensity.toFixed(2)}<br>
            Position: ${item.position}
          </div>
        `).join('')}
        <h5>Känslomässiga hotspots:</h5>
        ${(data.hotspots || []).map(hotspot => `
          <div style="margin: 5px 0; padding: 8px; background: ${hotspot.color}; border-radius: 4px; color: white;">
            <strong>"${hotspot.word}"</strong> - ${hotspot.emotion} (${hotspot.intensity.toFixed(2)})
          </div>
        `).join('')}
      `;
      
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
      const analysis = data.analysis;
      const summary = data.summary;
      
      const result = `
        <h4>🌈 Comprehensive Mood Analytics:</h4>
        <div class="mood-result">
          <h3>Övergripande stämning: ${summary.overallMood}</h3>
          <p>Sentiment score: ${summary.sentimentScore}</p>
          <p>Stress-nivå: ${summary.stressLevel}</p>
          <p>Energi-nivå: ${summary.energyLevel}</p>
          <p>Emotionell stabilitet: ${summary.emotionalStability}</p>
        </div>
        <h5>Sentiment analys:</h5>
        <div style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 4px;">
          <strong>Dominerande känsla:</strong> ${analysis.sentiment.dominantEmotion}<br>
          <strong>Positiva ord:</strong> ${analysis.sentiment.positiveScore}<br>
          <strong>Negativa ord:</strong> ${analysis.sentiment.negativeScore}
        </div>
        <h5>Psykologisk profil:</h5>
        <div style="margin: 10px 0; padding: 10px; background: #e8f4fd; border-radius: 4px;">
          <strong>Själv-fokus:</strong> ${analysis.psychological.selfFocus ? 'Ja' : 'Nej'}<br>
          <strong>Framtidsorienterad:</strong> ${analysis.psychological.futureOriented ? 'Ja' : 'Nej'}<br>
          <strong>Tidsorientering:</strong> ${analysis.psychological.timeOrientation}
        </div>
        <h5>Insikter:</h5>
        ${(data.insights || []).map(insight => `
          <div style="margin: 5px 0; padding: 8px; background: #f0f8e8; border-radius: 4px;">
            � ${insight}
          </div>
        `).join('')}
        <h5>Rekommendationer:</h5>
        ${(data.recommendations || []).map(rec => `
          <div style="margin: 5px 0; padding: 8px; background: #fff4e6; border-radius: 4px;">
            � ${rec}
          </div>
        `).join('')}
      `;
      
      showMoodResult(result);
    } else {
      showMoodResult(`<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showMoodResult(`<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

window.detectStress = async function() {
  const text = getMoodText();
  if (!text) return;
  
  try {
    showMoodResult('<div class="loading">🔄 Analyserar stress...</div>');
    
    const response = await fetch('/moodengine/stress-detector', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const result = `
        <h4>😰 Stress Detector Analys:</h4>
        <div class="mood-result">
          <h3>Stressnivå: ${data.overallStressLevel.toFixed(2)} (${data.stressCategory})</h3>
        </div>
        <h5>Detaljerad analys:</h5>
        <div style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 4px;">
          <strong>Vokabulär stress:</strong> Nivå ${data.analysis.vocabulary.level}, Score: ${data.analysis.vocabulary.score}<br>
          <strong>Språklig stress:</strong> Nivå ${data.analysis.linguistic.level}<br>
          <strong>Temporal stress:</strong> Nivå ${data.analysis.temporal.level}
        </div>
        <h5>Identifierade stressindikatorer:</h5>
        ${data.stressIndicators.slice(0, 5).map(indicator => `
          <div style="margin: 5px 0; padding: 8px; background: #ffe6e6; border-radius: 4px;">
            <strong>${indicator.word}</strong> (${indicator.type}) - Position: ${indicator.position}<br>
            <em>Kontext: "${indicator.context}"</em>
          </div>
        `).join('')}
        <h5>Rekommendationer:</h5>
        ${data.recommendations.map(rec => `
          <div style="margin: 5px 0; padding: 8px; background: #e8f4fd; border-radius: 4px;">
            💡 ${rec}
          </div>
        `).join('')}
      `;
      
      showMoodResult(result);
    } else {
      showMoodResult(`<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showMoodResult(`<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

window.analyzeEnergy = async function() {
  const text = getMoodText();
  if (!text) return;
  
  try {
    showMoodResult('<div class="loading">🔄 Analyserar lycklighetsförutsägelse...</div>');
    
    const response = await fetch('/moodengine/happiness-predictor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const result = `
        <h4>⚡ Happiness Predictor:</h4>
        <div class="mood-result">
          <h3>Lycklighetspoäng: ${data.happinessScore.toFixed(2)}</h3>
          <p>Positivitetspoäng: ${data.positivityScore}</p>
          <p>Optimismnivå: ${data.optimismLevel}</p>
          <p>Förutsagd stämning: ${data.predictedMood.mood} (${data.predictedMood.confidence} konfidenskänsla)</p>
        </div>
        <h5>Stämningsfaktorer:</h5>
        <div style="margin: 10px 0; padding: 10px; background: #f0f8e8; border-radius: 4px;">
          <strong>Positiva ord:</strong> ${data.moodFactors.positiveWords}<br>
          <strong>Negativa ord:</strong> ${data.moodFactors.negativeWords}<br>
          <strong>Neutrala ord:</strong> ${data.moodFactors.neutralWords}
        </div>
        <h5>Emotionell balans:</h5>
        <div style="margin: 10px 0; padding: 10px; background: #e8f4fd; border-radius: 4px;">
          <strong>Balanserad:</strong> ${data.emotionalBalance.balanced ? 'Ja' : 'Nej'}<br>
          <strong>Poäng:</strong> ${data.emotionalBalance.score}<br>
          <strong>Beskrivning:</strong> ${data.emotionalBalance.description}
        </div>
        <h5>Rekommendationer:</h5>
        ${data.recommendations.map(rec => `
          <div style="margin: 5px 0; padding: 8px; background: #fff4e6; border-radius: 4px;">
            💡 ${rec}
          </div>
        `).join('')}
      `;
      
      showMoodResult(result);
    } else {
      showMoodResult(`<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showMoodResult(`<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

window.createMoodMap = async function() {
  const text = getMoodText();
  if (!text) return;
  
  try {
    showMoodResult('<div class="loading">🔄 Skapar färgkodad känslokarta...</div>');
    
    const response = await fetch('/moodengine/emotion-coloring', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const result = `
        <h4>🗺️ Emotion Color Coding:</h4>
        <div class="mood-result">
          <h3>Dominerande känsla: ${data.dominantEmotion}</h3>
          <p>Original text: "${data.originalText}"</p>
        </div>
        <h5>Färgkodade ord:</h5>
        ${data.coloredText.map(item => `
          <div style="margin: 10px 0; padding: 10px; border-left: 8px solid ${item.color}; background: ${item.color}; border-radius: 4px;">
            <strong>"${item.word}"</strong> (${item.emotion})<br>
            <small>Intensitet: ${item.intensity.toFixed(2)} | Färg: ${item.color}</small>
          </div>
        `).join('')}
        <h5>Känslomässig statistik:</h5>
        ${Object.entries(data.statistics).map(([emotion, count]) => `
          <div style="margin: 5px 0; padding: 8px; background: #f0f0f0; border-radius: 4px;">
            <strong>${emotion}:</strong> ${count} ord
          </div>
        `).join('')}
        <h5>Färglegend:</h5>
        ${Object.entries(data.legend).map(([emotion, info]) => `
          <div style="margin: 5px 0; padding: 8px; background: ${info.color}20; border-left: 4px solid ${info.color}; border-radius: 4px;">
            <strong style="color: ${info.color};">${emotion}:</strong> ${info.description}
          </div>
        `).join('')}
      `;
      
      showMoodResult(result);
    } else {
      showMoodResult(`<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showMoodResult(`<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

function showMoodResult(content) {
  const resultsDiv = document.getElementById('simpleMoodResults');
  const contentDiv = document.getElementById('moodResultsContent');
  
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = content;
    resultsDiv.style.display = 'block';
    
    // Scrolla till resultatet
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
  }
}

function getMoodText() {
  // Försök hitta textinnehåll på samma sätt som andra moduler
  let text = '';
  
  // Försök först .scrollbox (som andra moduler använder)
  const scrollBox = document.querySelector('.scrollbox');
  if (scrollBox && scrollBox.innerText.trim()) {
    text = scrollBox.innerText.trim();
  } else {
    // Försök textarea som backup
    const textArea = document.querySelector('#fileContent textarea, textarea');
    if (textArea && textArea.value && textArea.value.trim()) {
      text = textArea.value.trim();
    }
  }
  
  if (!text) {
    alert('Skriv eller ladda text först för känslomässig analys!\n\nTips: Ladda upp en textfil eller skriv text i textområdet.');
    return null;
  }
  
  return text;
}

// Make function available globally for showFile.js
window.showSimpleMoodEngine = () => createSimpleMoodInterface();

console.log('Simple moodEngineUI loaded successfully');