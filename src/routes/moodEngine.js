// src/routes/moodEngine.js
import express from 'express';
import TextDocument from 'texttoolkit';

const router = express.Router();

// Sentiment ordlistor för svenska
const sentimentWords = {
  positive: {
    high: ['fantastisk', 'underbar', 'älskar', 'perfekt', 'brilliant', 'magisk', 'otrolig', 'enastående'],
    medium: ['bra', 'fin', 'trevlig', 'glad', 'nöjd', 'positiv', 'lycklig', 'kul', 'rolig'],
    low: ['okej', 'hyfsad', 'duglig', 'acceptabel', 'rimlig']
  },
  negative: {
    high: ['förfärlig', 'hemsk', 'fruktansvärd', 'vidrig', 'avskyvärd', 'katastrof', 'mardröm'],
    medium: ['dålig', 'tråkig', 'ledsen', 'arg', 'irriterad', 'besviken', 'sur', 'taskig'],
    low: ['mindre', 'svag', 'inte', 'knappast', 'bara']
  },
  emotions: {
    joy: ['glädje', 'lycka', 'skratt', 'leende', 'kul', 'roligt', 'festlig', 'glad'],
    sadness: ['sorg', 'ledsen', 'gråt', 'deprimerad', 'melankolisk', 'trist', 'sorglig'],
    anger: ['arg', 'ilska', 'raseri', 'förbannad', 'irriterad', 'wretad', 'upprörd'],
    fear: ['rädd', 'skräck', 'oro', 'ångest', 'nervös', 'panisk', 'förskräckt'],
    surprise: ['förvånad', 'chockad', 'häpen', 'överraskad', 'förstummad'],
    disgust: ['äcklad', 'motbjudande', 'vidrigt', 'avskyvärd', 'motvilja']
  },
  stress: {
    high: ['stress', 'ångest', 'panik', 'pressure', 'deadline', 'kris', 'kaos', 'kollaps'],
    medium: ['oro', 'bekymmer', 'tension', 'nervös', 'orolig', 'ängslig'],
    indicators: ['måste', 'borde', 'ska', 'deadline', 'snabbt', 'bråttom', 'tid', 'hinner']
  }
};

// Sentiment Timeline - spåra känslor över tid
router.post('/sentiment-timeline', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    // Dela upp text i segment (meningar eller stycken)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const timeline = [];
    
    sentences.forEach((sentence, index) => {
      const sentiment = analyzeSentiment(sentence);
      timeline.push({
        segment: index + 1,
        text: sentence.trim().substring(0, 100) + (sentence.length > 100 ? '...' : ''),
        sentiment: sentiment.score,
        emotion: sentiment.dominantEmotion,
        intensity: sentiment.intensity,
        timestamp: `${index + 1}/${sentences.length}`
      });
    });
    
    // Beräkna trend
    const avgSentiment = timeline.reduce((sum, item) => sum + item.sentiment, 0) / timeline.length;
    const trend = calculateTrend(timeline.map(item => item.sentiment));
    
    res.json({
      timeline: timeline,
      summary: {
        averageSentiment: avgSentiment,
        trend: trend,
        totalSegments: timeline.length,
        emotionalRange: Math.max(...timeline.map(t => t.sentiment)) - Math.min(...timeline.map(t => t.sentiment))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Emotion Heatmap - visualisera känslointensitet
router.post('/emotion-heatmap', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const words = text.split(/\s+/);
    const heatmap = [];
    
    // Analysera varje ord för emotionell intensitet
    words.forEach((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      const emotion = detectWordEmotion(cleanWord);
      
      heatmap.push({
        word: word,
        position: index,
        emotion: emotion.type,
        intensity: emotion.intensity,
        color: getEmotionColor(emotion.type, emotion.intensity)
      });
    });
    
    // Skapa emotionella zoner
    const zones = createEmotionalZones(heatmap);
    
    res.json({
      heatmap: heatmap,
      zones: zones,
      emotionDistribution: calculateEmotionDistribution(heatmap),
      hotspots: findEmotionalHotspots(heatmap)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stress Detector - analysera skriv-stress
router.post('/stress-detector', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const stressAnalysis = analyzeStressLevel(text);
    const linguisticStress = analyzeLinguisticStress(text);
    const temporalStress = analyzeTemporalStress(text);
    
    const overallStress = (stressAnalysis.level + linguisticStress.level + temporalStress.level) / 3;
    
    res.json({
      overallStressLevel: overallStress,
      stressCategory: categorizeStress(overallStress),
      analysis: {
        vocabulary: stressAnalysis,
        linguistic: linguisticStress,
        temporal: temporalStress
      },
      recommendations: generateStressRecommendations(overallStress),
      stressIndicators: findStressIndicators(text)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Happiness Predictor - förutsäg text-mood
router.post('/happiness-predictor', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const happinessMetrics = analyzeHappiness(text);
    const positivityScore = calculatePositivity(text);
    const optimismLevel = detectOptimism(text);
    
    const predictedMood = predictMood(happinessMetrics, positivityScore, optimismLevel);
    
    res.json({
      happinessScore: happinessMetrics.score,
      positivityScore: positivityScore,
      optimismLevel: optimismLevel,
      predictedMood: predictedMood,
      moodFactors: {
        positiveWords: happinessMetrics.positiveWords,
        negativeWords: happinessMetrics.negativeWords,
        neutralWords: happinessMetrics.neutralWords
      },
      recommendations: generateMoodRecommendations(predictedMood),
      emotionalBalance: calculateEmotionalBalance(text)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Emotion Color Coding - färgkoda text efter känslor
router.post('/emotion-coloring', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const coloredText = colorCodeText(text);
    const emotionLegend = getEmotionLegend();
    
    res.json({
      originalText: text,
      coloredText: coloredText,
      legend: emotionLegend,
      statistics: calculateColorStatistics(coloredText),
      dominantEmotion: findDominantEmotion(coloredText)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mood Analytics - djupgående känslomässig analys
router.post('/mood-analytics', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    
    const comprehensiveAnalysis = {
      sentiment: analyzeSentiment(text),
      emotions: analyzeAllEmotions(text),
      mood: analyzeMoodPatterns(text),
      psychological: analyzePsychologicalMarkers(text),
      social: analyzeSocialEmotions(text)
    };
    
    const insights = generateInsights(comprehensiveAnalysis);
    const personality = inferPersonality(comprehensiveAnalysis);
    
    res.json({
      analysis: comprehensiveAnalysis,
      insights: insights,
      personality: personality,
      recommendations: generateComprehensiveRecommendations(comprehensiveAnalysis),
      riskFactors: identifyRiskFactors(comprehensiveAnalysis)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hjälpfunktioner
function analyzeSentiment(text) {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  let emotions = { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 };
  
  words.forEach(word => {
    // Positiva ord
    if (sentimentWords.positive.high.includes(word)) score += 3;
    else if (sentimentWords.positive.medium.includes(word)) score += 2;
    else if (sentimentWords.positive.low.includes(word)) score += 1;
    
    // Negativa ord
    if (sentimentWords.negative.high.includes(word)) score -= 3;
    else if (sentimentWords.negative.medium.includes(word)) score -= 2;
    else if (sentimentWords.negative.low.includes(word)) score -= 1;
    
    // Emotioner
    Object.keys(sentimentWords.emotions).forEach(emotion => {
      if (sentimentWords.emotions[emotion].includes(word)) {
        emotions[emotion]++;
      }
    });
  });
  
  const dominantEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
  
  return {
    score: score / words.length,
    dominantEmotion: dominantEmotion,
    intensity: Math.abs(score / words.length),
    emotions: emotions
  };
}

function calculateTrend(scores) {
  if (scores.length < 2) return 'stable';
  
  const first = scores.slice(0, Math.floor(scores.length / 3)).reduce((a, b) => a + b, 0);
  const last = scores.slice(-Math.floor(scores.length / 3)).reduce((a, b) => a + b, 0);
  
  const diff = last - first;
  if (diff > 0.1) return 'improving';
  if (diff < -0.1) return 'declining';
  return 'stable';
}

function detectWordEmotion(word) {
  for (const emotion in sentimentWords.emotions) {
    if (sentimentWords.emotions[emotion].includes(word)) {
      return { type: emotion, intensity: 0.8 };
    }
  }
  
  if (sentimentWords.positive.high.includes(word)) return { type: 'joy', intensity: 0.9 };
  if (sentimentWords.positive.medium.includes(word)) return { type: 'joy', intensity: 0.6 };
  if (sentimentWords.negative.high.includes(word)) return { type: 'anger', intensity: 0.9 };
  if (sentimentWords.negative.medium.includes(word)) return { type: 'sadness', intensity: 0.6 };
  
  return { type: 'neutral', intensity: 0.1 };
}

function getEmotionColor(emotion, intensity) {
  const colors = {
    joy: `rgba(255, 223, 0, ${intensity})`,      // Gul
    sadness: `rgba(70, 130, 255, ${intensity})`, // Blå
    anger: `rgba(255, 69, 58, ${intensity})`,    // Röd
    fear: `rgba(128, 0, 128, ${intensity})`,     // Lila
    surprise: `rgba(255, 165, 0, ${intensity})`, // Orange
    disgust: `rgba(0, 128, 0, ${intensity})`,    // Grön
    neutral: `rgba(128, 128, 128, ${intensity})` // Grå
  };
  
  return colors[emotion] || colors.neutral;
}

function createEmotionalZones(heatmap) {
  const zones = [];
  let currentZone = null;
  
  heatmap.forEach((item, index) => {
    if (item.intensity > 0.5) {
      if (!currentZone || currentZone.emotion !== item.emotion) {
        currentZone = {
          emotion: item.emotion,
          start: index,
          end: index,
          intensity: item.intensity,
          words: [item.word]
        };
        zones.push(currentZone);
      } else {
        currentZone.end = index;
        currentZone.words.push(item.word);
        currentZone.intensity = Math.max(currentZone.intensity, item.intensity);
      }
    }
  });
  
  return zones;
}

function calculateEmotionDistribution(heatmap) {
  const distribution = {};
  heatmap.forEach(item => {
    distribution[item.emotion] = (distribution[item.emotion] || 0) + item.intensity;
  });
  
  const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);
  Object.keys(distribution).forEach(emotion => {
    distribution[emotion] = Math.round((distribution[emotion] / total) * 100);
  });
  
  return distribution;
}

function findEmotionalHotspots(heatmap) {
  return heatmap
    .filter(item => item.intensity > 0.7)
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 10);
}

function analyzeStressLevel(text) {
  const words = text.toLowerCase().split(/\s+/);
  let stressScore = 0;
  const indicators = [];
  
  words.forEach(word => {
    if (sentimentWords.stress.high.includes(word)) {
      stressScore += 3;
      indicators.push({ word, level: 'high' });
    } else if (sentimentWords.stress.medium.includes(word)) {
      stressScore += 2;
      indicators.push({ word, level: 'medium' });
    } else if (sentimentWords.stress.indicators.includes(word)) {
      stressScore += 1;
      indicators.push({ word, level: 'indicator' });
    }
  });
  
  return {
    level: Math.min(stressScore / words.length * 10, 10),
    indicators: indicators,
    wordCount: words.length
  };
}

function analyzeLinguisticStress(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = text.split(/\s+/).length / sentences.length;
  const exclamationCount = (text.match(/!/g) || []).length;
  const capsCount = (text.match(/[A-Z]{2,}/g) || []).length;
  
  let linguisticStress = 0;
  
  // Korta meningar kan indikera stress
  if (avgSentenceLength < 8) linguisticStress += 2;
  
  // Många utropstecken
  linguisticStress += exclamationCount * 0.5;
  
  // Versaler (skriker)
  linguisticStress += capsCount * 1;
  
  return {
    level: Math.min(linguisticStress, 10),
    avgSentenceLength: avgSentenceLength,
    exclamationCount: exclamationCount,
    capsCount: capsCount
  };
}

function analyzeTemporalStress(text) {
  const timeWords = ['nu', 'snabbt', 'omedelbart', 'bråttom', 'deadline', 'idag', 'imorgon'];
  const urgencyWords = ['måste', 'borde', 'ska', 'behöver', 'krävs'];
  
  let temporalStress = 0;
  const words = text.toLowerCase().split(/\s+/);
  
  words.forEach(word => {
    if (timeWords.includes(word)) temporalStress += 1.5;
    if (urgencyWords.includes(word)) temporalStress += 1;
  });
  
  return {
    level: Math.min(temporalStress / words.length * 20, 10),
    timeIndicators: timeWords.filter(word => text.toLowerCase().includes(word)),
    urgencyIndicators: urgencyWords.filter(word => text.toLowerCase().includes(word))
  };
}

function categorizeStress(level) {
  if (level < 2) return { category: 'Låg', description: 'Avslappnad och lugn text' };
  if (level < 5) return { category: 'Måttlig', description: 'Viss stress men hanterbar' };
  if (level < 7) return { category: 'Hög', description: 'Tydliga tecken på stress' };
  return { category: 'Extremt hög', description: 'Mycket stressad skrivning' };
}

function generateStressRecommendations(stressLevel) {
  if (stressLevel < 2) return ['Fortsätt med din lugna skrivstil!'];
  if (stressLevel < 5) return ['Fundera på längre meningar', 'Minska användningen av stressord'];
  if (stressLevel < 7) return ['Ta pauser när du skriver', 'Använd lugnande ord', 'Strukturera dina tankar'];
  return ['Sök stöd om nödvändigt', 'Ta djupa andetag', 'Skriv kortare stycken', 'Fokusera på lösningar'];
}

function findStressIndicators(text) {
  const allStressWords = [
    ...sentimentWords.stress.high,
    ...sentimentWords.stress.medium,
    ...sentimentWords.stress.indicators
  ];
  
  return allStressWords.filter(word => text.toLowerCase().includes(word));
}

function analyzeHappiness(text) {
  const words = text.toLowerCase().split(/\s+/);
  let positiveWords = 0;
  let negativeWords = 0;
  let neutralWords = 0;
  
  words.forEach(word => {
    if (sentimentWords.positive.high.includes(word) || 
        sentimentWords.positive.medium.includes(word) ||
        sentimentWords.emotions.joy.includes(word)) {
      positiveWords++;
    } else if (sentimentWords.negative.high.includes(word) || 
               sentimentWords.negative.medium.includes(word) ||
               sentimentWords.emotions.sadness.includes(word)) {
      negativeWords++;
    } else {
      neutralWords++;
    }
  });
  
  const score = ((positiveWords - negativeWords) / words.length + 1) / 2; // Normalisera till 0-1
  
  return {
    score: score,
    positiveWords: positiveWords,
    negativeWords: negativeWords,
    neutralWords: neutralWords
  };
}

function calculatePositivity(text) {
  const positivePatterns = [
    /kan|kommer att|ska|möjlig/gi,
    /bra|bättre|bäst|fantastisk/gi,
    /lycka|glädje|kärlek|vänskap/gi
  ];
  
  let positivityScore = 0;
  positivePatterns.forEach(pattern => {
    const matches = text.match(pattern) || [];
    positivityScore += matches.length;
  });
  
  return Math.min(positivityScore / text.split(/\s+/).length * 10, 10);
}

function detectOptimism(text) {
  const optimisticWords = ['hopp', 'framtid', 'kommer', 'möjlighet', 'chans', 'potential'];
  const pessimisticWords = ['aldrig', 'omöjligt', 'hopplös', 'katastrof', 'fel'];
  
  let optimismScore = 0;
  optimisticWords.forEach(word => {
    if (text.toLowerCase().includes(word)) optimismScore += 1;
  });
  
  pessimisticWords.forEach(word => {
    if (text.toLowerCase().includes(word)) optimismScore -= 1;
  });
  
  return Math.max(0, Math.min(10, optimismScore + 5));
}

function predictMood(happinessMetrics, positivityScore, optimismLevel) {
  const combinedScore = (happinessMetrics.score * 0.4 + positivityScore * 0.3 + optimismLevel * 0.3) / 10;
  
  if (combinedScore > 0.8) return { mood: 'Mycket lycklig', confidence: 'Hög' };
  if (combinedScore > 0.6) return { mood: 'Glad', confidence: 'Hög' };
  if (combinedScore > 0.4) return { mood: 'Neutral', confidence: 'Medium' };
  if (combinedScore > 0.2) return { mood: 'Något ledsen', confidence: 'Medium' };
  return { mood: 'Ledsen', confidence: 'Hög' };
}

function generateMoodRecommendations(predictedMood) {
  if (predictedMood.mood.includes('lycklig')) {
    return ['Fortsätt sprida positivitet!', 'Dela din glädje med andra'];
  } else if (predictedMood.mood.includes('ledsen')) {
    return ['Försök fokusera på positiva aspekter', 'Sök stöd om behövs', 'Ta hand om dig själv'];
  }
  return ['Balansera dina känslor', 'Reflektera över dina tankar'];
}

function calculateEmotionalBalance(text) {
  const sentiment = analyzeSentiment(text);
  const emotions = Object.values(sentiment.emotions);
  const maxEmotion = Math.max(...emotions);
  const minEmotion = Math.min(...emotions);
  
  const balance = 1 - ((maxEmotion - minEmotion) / (maxEmotion + minEmotion || 1));
  
  return {
    score: balance,
    interpretation: balance > 0.7 ? 'Väl balanserat' : balance > 0.4 ? 'Måttligt balanserat' : 'Obalanserat'
  };
}

function colorCodeText(text) {
  const words = text.split(/(\s+)/); // Bevara mellanslag
  
  return words.map(word => {
    if (/^\s+$/.test(word)) return word; // Behåll mellanslag
    
    const emotion = detectWordEmotion(word.toLowerCase().replace(/[^\w]/g, ''));
    return {
      word: word,
      emotion: emotion.type,
      intensity: emotion.intensity,
      color: getEmotionColor(emotion.type, emotion.intensity)
    };
  });
}

function getEmotionLegend() {
  return {
    joy: { color: '#FFDF00', name: 'Glädje' },
    sadness: { color: '#4682FF', name: 'Sorg' },
    anger: { color: '#FF453A', name: 'Ilska' },
    fear: { color: '#800080', name: 'Rädsla' },
    surprise: { color: '#FFA500', name: 'Förvåning' },
    disgust: { color: '#008000', name: 'Avsky' },
    neutral: { color: '#808080', name: 'Neutral' }
  };
}

function calculateColorStatistics(coloredText) {
  const stats = {};
  coloredText.forEach(item => {
    if (item.emotion) {
      stats[item.emotion] = (stats[item.emotion] || 0) + 1;
    }
  });
  return stats;
}

function findDominantEmotion(coloredText) {
  const stats = calculateColorStatistics(coloredText);
  return Object.keys(stats).reduce((a, b) => stats[a] > stats[b] ? a : b);
}

function analyzeAllEmotions(text) {
  const sentiment = analyzeSentiment(text);
  return sentiment.emotions;
}

function analyzeMoodPatterns(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const moods = sentences.map(sentence => analyzeSentiment(sentence));
  
  return {
    volatility: calculateMoodVolatility(moods),
    consistency: calculateMoodConsistency(moods),
    progression: calculateMoodProgression(moods)
  };
}

function analyzePsychologicalMarkers(text) {
  const selfWords = (text.match(/\b(jag|mig|mitt|min|mina)\b/gi) || []).length;
  const otherWords = (text.match(/\b(du|dig|han|hon|de|dem)\b/gi) || []).length;
  const totalWords = text.split(/\s+/).length;
  
  return {
    selfFocus: selfWords / totalWords,
    otherFocus: otherWords / totalWords,
    introspection: selfWords > otherWords ? 'Hög' : 'Låg'
  };
}

function analyzeSocialEmotions(text) {
  const socialWords = ['vänskap', 'kärlek', 'familj', 'tillsammans', 'ensam', 'isolerad'];
  const socialScore = socialWords.reduce((score, word) => {
    return score + (text.toLowerCase().includes(word) ? 1 : 0);
  }, 0);
  
  return {
    socialConnection: socialScore,
    interpretation: socialScore > 2 ? 'Stark social koppling' : 'Svag social koppling'
  };
}

function generateInsights(analysis) {
  const insights = [];
  
  if (analysis.sentiment.score > 0.5) {
    insights.push('Texten har en övervägande positiv ton');
  }
  
  if (analysis.psychological.selfFocus > 0.1) {
    insights.push('Hög grad av självreflektion');
  }
  
  if (analysis.mood.volatility > 0.7) {
    insights.push('Känslorna varierar mycket genom texten');
  }
  
  return insights;
}

function inferPersonality(analysis) {
  const traits = {};
  
  // Extroversion vs Introversion
  traits.extroversion = analysis.social.socialConnection > 2 ? 'Extrovert' : 'Introvert';
  
  // Optimism vs Pessimism
  traits.outlook = analysis.sentiment.score > 0 ? 'Optimistisk' : 'Pessimistisk';
  
  // Emotional stability
  traits.stability = analysis.mood.volatility < 0.5 ? 'Stabil' : 'Känslosam';
  
  return traits;
}

function generateComprehensiveRecommendations(analysis) {
  const recommendations = [];
  
  if (analysis.sentiment.score < 0) {
    recommendations.push('Försök inkludera mer positiva ord och uttryck');
  }
  
  if (analysis.mood.volatility > 0.7) {
    recommendations.push('Sträva efter mer konsistenta känslotoner');
  }
  
  if (analysis.psychological.selfFocus > 0.15) {
    recommendations.push('Balansera självfokus med fokus på andra');
  }
  
  return recommendations;
}

function identifyRiskFactors(analysis) {
  const risks = [];
  
  if (analysis.sentiment.emotions.sadness > 5) {
    risks.push({ type: 'Hög sorgsenhet', severity: 'Medium' });
  }
  
  if (analysis.sentiment.emotions.anger > 3) {
    risks.push({ type: 'Förhöjd ilska', severity: 'Medium' });
  }
  
  if (analysis.psychological.selfFocus > 0.2) {
    risks.push({ type: 'Överdrivet självfokus', severity: 'Låg' });
  }
  
  return risks;
}

function calculateMoodVolatility(moods) {
  if (moods.length < 2) return 0;
  
  let volatility = 0;
  for (let i = 1; i < moods.length; i++) {
    volatility += Math.abs(moods[i].score - moods[i-1].score);
  }
  
  return volatility / (moods.length - 1);
}

function calculateMoodConsistency(moods) {
  const scores = moods.map(m => m.score);
  const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - avg, 2), 0) / scores.length;
  
  return 1 - Math.min(variance, 1); // Högre värde = mer konsistent
}

function calculateMoodProgression(moods) {
  if (moods.length < 3) return 'Insufficient data';
  
  const first = moods.slice(0, Math.floor(moods.length / 3)).reduce((sum, m) => sum + m.score, 0);
  const last = moods.slice(-Math.floor(moods.length / 3)).reduce((sum, m) => sum + m.score, 0);
  
  const diff = last - first;
  if (diff > 0.2) return 'Improving';
  if (diff < -0.2) return 'Declining';
  return 'Stable';
}

export default router;