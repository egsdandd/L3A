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
window.analyzeSentiment = function() {
  const text = getMoodText();
  if (!text) return;
  
  // Simple sentiment analysis
  const positiveWords = ['bra', 'bäst', 'glad', 'lycklig', 'fantastisk', 'underbar', 'perfekt', 'älskar', 'positiv', 'härlig'];
  const negativeWords = ['dålig', 'hemsk', 'ledsen', 'arg', 'förfärlig', 'hemskt', 'hatar', 'negativ', 'elak', 'tråkig'];
  
  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
  
  let sentiment, score;
  if (positiveCount > negativeCount) {
    sentiment = 'Positiv';
    score = Math.min(100, (positiveCount / (positiveCount + negativeCount)) * 100);
  } else if (negativeCount > positiveCount) {
    sentiment = 'Negativ';
    score = Math.min(100, (negativeCount / (positiveCount + negativeCount)) * 100);
  } else {
    sentiment = 'Neutral';
    score = 50;
  }
  
  const result = `
    <h4>😊 Sentiment Analys:</h4>
    <div class="mood-result">
      <h3>Sentiment: ${sentiment}</h3>
      <p>Sentiment Score: ${score.toFixed(1)}%</p>
      <p>Positiva ord: ${positiveCount} | Negativa ord: ${negativeCount}</p>
    </div>
  `;
  
  showMoodResult(result);
};

window.detectEmotions = function() {
  const text = getMoodText();
  if (!text) return;
  
  // Emotion detection based on keywords
  const emotions = {
    'Glädje': ['glad', 'lycklig', 'skratta', 'le', 'nöjd', 'euforisk'],
    'Sorg': ['ledsen', 'gråta', 'deprimerad', 'melankolisk', 'sörja'],
    'Ilska': ['arg', 'förbannad', 'irriterad', 'rasande', 'vänd'],
    'Rädsla': ['rädd', 'skrämd', 'orolig', 'nervös', 'ängslig'],
    'Överraskning': ['överraskad', 'chockad', 'förvånad', 'häpen'],
    'Avsky': ['äcklad', 'avskyr', 'motbjudande', 'vidrigt']
  };
  
  const lowerText = text.toLowerCase();
  const detectedEmotions = [];
  
  for (const [emotion, keywords] of Object.entries(emotions)) {
    const found = keywords.filter(keyword => lowerText.includes(keyword));
    if (found.length > 0) {
      detectedEmotions.push({
        emotion: emotion,
        intensity: found.length,
        keywords: found
      });
    }
  }
  
  const result = `
    <h4>💭 Detekterade Känslor:</h4>
    ${detectedEmotions.length > 0 
      ? detectedEmotions.map(e => `
        <div class="mood-result">
          <h3>${e.emotion}</h3>
          <p>Intensitet: ${e.intensity}/6</p>
          <p>Nyckelord: ${e.keywords.join(', ')}</p>
        </div>
      `).join('')
      : '<p>Inga tydliga känslor detekterades i texten.</p>'
    }
  `;
  
  showMoodResult(result);
};

window.analyzeMood = function() {
  const text = getMoodText();
  if (!text) return;
  
  // Mood analysis based on text characteristics
  const exclamations = (text.match(/!/g) || []).length;
  const questions = (text.match(/\?/g) || []).length;
  const avgWordLength = text.split(/\s+/).reduce((sum, word) => sum + word.length, 0) / text.split(/\s+/).length;
  
  let mood, description;
  
  if (exclamations > 3) {
    mood = 'Energisk/Upphetsad';
    description = 'Texten innehåller många utropstecken vilket tyder på hög energi och känslointensitet.';
  } else if (questions > 2) {
    mood = 'Reflekterande/Undrande';
    description = 'Många frågetecken indikerar reflektion och nyfikenhet.';
  } else if (avgWordLength > 6) {
    mood = 'Formell/Analytisk';
    description = 'Långa ord tyder på en mer formell och genomtänkt ton.';
  } else if (avgWordLength < 4) {
    mood = 'Avslappnad/Informell';
    description = 'Korta ord indikerar en mer avslappnad och informell stil.';
  } else {
    mood = 'Balanserad/Neutral';
    description = 'Texten har en balanserad och neutral ton.';
  }
  
  const result = `
    <h4>🌈 Stämnings Analys:</h4>
    <div class="mood-result">
      <h3>Identifierad Stämning: ${mood}</h3>
      <p>${description}</p>
    </div>
    <ul>
      <li><strong>Utropstecken:</strong> ${exclamations} (energi-indikator)</li>
      <li><strong>Frågetecken:</strong> ${questions} (reflektion-indikator)</li>
      <li><strong>Genomsnittlig ordlängd:</strong> ${avgWordLength.toFixed(1)} tecken</li>
    </ul>
  `;
  
  showMoodResult(result);
};

window.detectStress = function() {
  const text = getMoodText();
  if (!text) return;
  
  // Stress indicators
  const stressWords = ['stress', 'ångest', 'press', 'deadline', 'oro', 'panik', 'överbelastad', 'utmattad'];
  const urgencyWords = ['snabbt', 'omedelbart', 'akut', 'brådskande', 'nu', 'genast'];
  
  const lowerText = text.toLowerCase();
  const stressCount = stressWords.filter(word => lowerText.includes(word)).length;
  const urgencyCount = urgencyWords.filter(word => lowerText.includes(word)).length;
  
  let stressLevel, description;
  const totalIndicators = stressCount + urgencyCount;
  
  if (totalIndicators >= 4) {
    stressLevel = 'Hög stress';
    description = 'Texten innehåller många stressindikatorer. Kanske dags att ta en paus?';
  } else if (totalIndicators >= 2) {
    stressLevel = 'Måttlig stress';
    description = 'Vissa tecken på stress är närvarande i texten.';
  } else {
    stressLevel = 'Låg stress';
    description = 'Texten verkar relativt avslappnad och stressfri.';
  }
  
  const result = `
    <h4>😰 Stress Analys:</h4>
    <div class="mood-result">
      <h3>Stressnivå: ${stressLevel}</h3>
      <p>${description}</p>
      <p>Stressord: ${stressCount} | Brådskande ord: ${urgencyCount}</p>
    </div>
  `;
  
  showMoodResult(result);
};

window.analyzeEnergy = function() {
  const text = getMoodText();
  if (!text) return;
  
  // Energy level analysis
  const highEnergyWords = ['energisk', 'entusiastisk', 'aktiv', 'livlig', 'dynamisk', 'kraftfull'];
  const lowEnergyWords = ['trött', 'utmattad', 'lat', 'slö', 'passiv', 'svag'];
  
  const capsPercentage = (text.match(/[A-ZÅÄÖ]/g) || []).length / text.length * 100;
  const exclamations = (text.match(/!/g) || []).length;
  
  const lowerText = text.toLowerCase();
  const highEnergyCount = highEnergyWords.filter(word => lowerText.includes(word)).length;
  const lowEnergyCount = lowEnergyWords.filter(word => lowerText.includes(word)).length;
  
  let energyLevel;
  if (highEnergyCount > lowEnergyCount || capsPercentage > 10 || exclamations > 2) {
    energyLevel = 'Hög energi';
  } else if (lowEnergyCount > highEnergyCount) {
    energyLevel = 'Låg energi';
  } else {
    energyLevel = 'Måttlig energi';
  }
  
  const result = `
    <h4>⚡ Energi Analys:</h4>
    <div class="mood-result">
      <h3>Energinivå: ${energyLevel}</h3>
      <p>Versaler: ${capsPercentage.toFixed(1)}%</p>
      <p>Utropstecken: ${exclamations}</p>
      <p>Högenergiska ord: ${highEnergyCount}</p>
      <p>Lågenergiska ord: ${lowEnergyCount}</p>
    </div>
  `;
  
  showMoodResult(result);
};

window.createMoodMap = function() {
  const text = getMoodText();
  if (!text) return;
  
  // Create a comprehensive mood map
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const moodMap = sentences.slice(0, 5).map((sentence, index) => {
    const positiveWords = ['bra', 'glad', 'lycklig', 'fantastisk'].filter(word => 
      sentence.toLowerCase().includes(word)
    ).length;
    const negativeWords = ['dålig', 'ledsen', 'arg', 'förfärlig'].filter(word => 
      sentence.toLowerCase().includes(word)
    ).length;
    
    let mood = 'Neutral';
    if (positiveWords > negativeWords) mood = 'Positiv';
    else if (negativeWords > positiveWords) mood = 'Negativ';
    
    return { sentence: sentence.trim(), mood, index: index + 1 };
  });
  
  const result = `
    <h4>🗺️ Stämnings Karta:</h4>
    <p>Analys av stämning per mening (första 5 meningarna):</p>
    ${moodMap.map(item => `
      <div style="margin: 10px 0; padding: 10px; border-left: 4px solid ${
        item.mood === 'Positiv' ? 'green' : item.mood === 'Negativ' ? 'red' : 'gray'
      }; background: #f9f9f9;">
        <strong>Mening ${item.index}:</strong> ${item.mood}<br>
        <em>"${item.sentence.substring(0, 100)}${item.sentence.length > 100 ? '...' : ''}"</em>
      </div>
    `).join('')}
  `;
  
  showMoodResult(result);
};

function showMoodResult(content) {
  const resultsDiv = document.getElementById('simpleMoodResults');
  const contentDiv = document.getElementById('moodResultsContent');
  
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = content;
    resultsDiv.style.display = 'block';
  }
}

function getMoodText() {
  const textArea = document.querySelector('#fileContent textarea, .scrollbox');
  if (!textArea || !textArea.value.trim()) {
    alert('Skriv eller ladda text först för känslomässig analys!');
    return null;
  }
  return textArea.value;
}

// Make function available globally for showFile.js
window.showSimpleMoodEngine = () => createSimpleMoodInterface();

console.log('Simple moodEngineUI loaded successfully');