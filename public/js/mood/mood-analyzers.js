// Mood analysis functions that call the API endpoints
import { generateSentimentTimelineHTML, generateEmotionHeatmapHTML, generateComprehensiveMoodHTML } from './mood-renderers.js';

// Global mood analysis functions
window.analyzeSentiment = async function() {
  const text = getEditorText();
  if (!text) return;
  
  try {
    showResults('simpleMoodResults', 'moodResultsContent', '<div class="loading">🔄 Analyserar sentiment...</div>');
    
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
      showResults('simpleMoodResults', 'moodResultsContent', result);
    } else {
      showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

window.detectEmotions = async function() {
  const text = getEditorText();
  if (!text) return;
  
  try {
    showResults('simpleMoodResults', 'moodResultsContent', '<div class="loading">🔄 Analyserar känslor...</div>');
    
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
      showResults('simpleMoodResults', 'moodResultsContent', result);
    } else {
      showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

window.analyzeMood = async function() {
  const text = getEditorText();
  if (!text) return;
  
  try {
    showResults('simpleMoodResults', 'moodResultsContent', '<div class="loading">🔄 Analyserar stämning...</div>');
    
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
      showResults('simpleMoodResults', 'moodResultsContent', result);
    } else {
      showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Fel: ${data.error}</div>`);
    }
  } catch (error) {
    showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Nätverksfel: ${error.message}</div>`);
  }
};

// Placeholder functions for the missing analysis methods
window.detectStress = async function() {
  const text = getEditorText();
  if (!text) return;
  
  try {
    showResults('simpleMoodResults', 'moodResultsContent', '<div class="loading">🔄 Analyserar stress...</div>');
    
    // Simplified stress detection based on text analysis
    const stressIndicators = ['stress', 'ångest', 'oro', 'press', 'deadline', 'panik', 'överbelastad'];
    const words = text.toLowerCase().split(/\s+/);
    const stressWords = words.filter(word => stressIndicators.some(indicator => word.includes(indicator)));
    const stressLevel = Math.min(100, (stressWords.length / words.length) * 100 * 10);
    
    const result = `
      <h4>😰 Stress Analys:</h4>
      <div class="mood-result">
        <p><strong>Stressnivå:</strong> ${stressLevel.toFixed(1)}%</p>
        <p><strong>Stressord hittade:</strong> ${stressWords.length}</p>
        <p><strong>Rekommendation:</strong> ${stressLevel > 30 ? 'Överväg avslappningsövningar' : 'Låg stressnivå detekterad'}</p>
        ${stressWords.length > 0 ? `<p><strong>Stressord:</strong> ${stressWords.slice(0, 5).join(', ')}</p>` : ''}
      </div>
    `;
    
    showResults('simpleMoodResults', 'moodResultsContent', result);
  } catch (error) {
    showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Fel: ${error.message}</div>`);
  }
};

window.analyzeEnergy = async function() {
  const text = getEditorText();
  if (!text) return;
  
  try {
    showResults('simpleMoodResults', 'moodResultsContent', '<div class="loading">🔄 Analyserar energinivå...</div>');
    
    // Simple energy analysis based on word patterns
    const highEnergyWords = ['snabb', 'kraftfull', 'energisk', 'entusiastisk', 'livlig', 'aktiv', 'dynamisk'];
    const lowEnergyWords = ['trött', 'utmattad', 'slö', 'passiv', 'stillsam', 'lugn', 'dämpad'];
    
    const words = text.toLowerCase().split(/\s+/);
    const highEnergy = words.filter(word => highEnergyWords.some(indicator => word.includes(indicator))).length;
    const lowEnergy = words.filter(word => lowEnergyWords.some(indicator => word.includes(indicator))).length;
    
    const energyLevel = 50 + ((highEnergy - lowEnergy) / words.length) * 100 * 10;
    const normalizedEnergy = Math.max(0, Math.min(100, energyLevel));
    
    const result = `
      <h4>⚡ Energi Analys:</h4>
      <div class="mood-result">
        <p><strong>Energinivå:</strong> ${normalizedEnergy.toFixed(1)}%</p>
        <p><strong>Högenergiska ord:</strong> ${highEnergy}</p>
        <p><strong>Lågenergiska ord:</strong> ${lowEnergy}</p>
        <p><strong>Energistatus:</strong> ${normalizedEnergy > 70 ? 'Hög energi' : normalizedEnergy > 30 ? 'Medel energi' : 'Låg energi'}</p>
      </div>
    `;
    
    showResults('simpleMoodResults', 'moodResultsContent', result);
  } catch (error) {
    showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Fel: ${error.message}</div>`);
  }
};

window.createMoodMap = async function() {
  const text = getEditorText();
  if (!text) return;
  
  try {
    showResults('simpleMoodResults', 'moodResultsContent', '<div class="loading">🔄 Skapar stämningskarta...</div>');
    
    // Simple mood mapping based on sentence analysis
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const moodMap = sentences.map((sentence, index) => {
      const positiveWords = ['bra', 'fantastisk', 'underbar', 'glad', 'lycklig', 'nöjd'];
      const negativeWords = ['dålig', 'hemsk', 'förskräcklig', 'ledsen', 'arg', 'besviken'];
      
      const words = sentence.toLowerCase().split(/\s+/);
      const positive = words.filter(word => positiveWords.some(pos => word.includes(pos))).length;
      const negative = words.filter(word => negativeWords.some(neg => word.includes(neg))).length;
      
      let mood = 'Neutral';
      if (positive > negative) mood = 'Positiv';
      else if (negative > positive) mood = 'Negativ';
      
      return {
        index: index + 1,
        sentence: sentence.trim().substring(0, 80) + '...',
        mood: mood,
        score: positive - negative
      };
    });
    
    const result = `
      <h4>🗺️ Stämnings Karta:</h4>
      <div class="mood-result">
        <p><strong>Antal meningar analyserade:</strong> ${sentences.length}</p>
        ${moodMap.map(item => 
          `<div class="mood-map-item" style="margin: 5px 0; padding: 5px; border-left: 3px solid ${item.mood === 'Positiv' ? 'green' : item.mood === 'Negativ' ? 'red' : 'gray'};">
            <strong>Mening ${item.index}:</strong> ${item.mood} (${item.score > 0 ? '+' : ''}${item.score})
            <br><em>"${item.sentence}"</em>
          </div>`
        ).join('')}
      </div>
    `;
    
    showResults('simpleMoodResults', 'moodResultsContent', result);
  } catch (error) {
    showResults('simpleMoodResults', 'moodResultsContent', `<div class="error">❌ Fel: ${error.message}</div>`);
  }
};