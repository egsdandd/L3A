// src/controllers/MoodEngineController.js
import texttoolkit from 'texttoolkit';

export default class MoodEngineController {
  #textDocumentCache = new Map();
  #lastText = null;
  #sentimentWords = null;
  
  constructor() {
    // Privat cache för TextDocument instanser för bättre prestanda
    this.#initializeSentimentWords();
  }

  /**
   * Initierar sentiment ordlistor för svenska
   */
  #initializeSentimentWords() {
    this.#sentimentWords = {
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
  }

  /**
   * Privat metod för att validera inkommande text
   * @param {string} text - Texten som ska valideras
   * @returns {boolean} - True om texten är giltig
   */
  #validateText(text) {
    return typeof text === 'string' && text.trim().length > 0;
  }

  /**
   * Privat metod för att få TextDocument instans med caching
   * @param {string} text - Texten som ska analyseras
   * @returns {Object} - TextDocument instans
   */
  #getTextDocument(text) {
    if (this.#lastText === text && this.#textDocumentCache.has(text)) {
      return this.#textDocumentCache.get(text);
    }
    
    const textDoc = new texttoolkit(text);
    this.#textDocumentCache.set(text, textDoc);
    this.#lastText = text;
    
    // Begränsa cache-storlek
    if (this.#textDocumentCache.size > 10) {
      const firstKey = this.#textDocumentCache.keys().next().value;
      this.#textDocumentCache.delete(firstKey);
    }
    
    return textDoc;
  }

  /**
   * Privat metod för felhantering
   * @param {Error} error - Felet som uppstod
   * @returns {Object} - Standardiserat felmeddelande
   */
  #handleError(error) {
    console.error('MoodEngineController error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred during mood analysis'
    };
  }

  /**
   * Analyserar sentiment-tidslinje för text
   * @param {string} text - Text som ska analyseras
   * @returns {Object} - Sentiment timeline och trend
   */
  async analyzeSentimentTimeline(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      // Dela upp text i segment (meningar)
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const timeline = [];
      
      sentences.forEach((sentence, index) => {
        const sentiment = this.#analyzeSentiment(sentence);
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
      const trend = this.#calculateTrend(timeline.map(item => item.sentiment));
      
      return {
        success: true,
        timeline: timeline,
        summary: {
          averageSentiment: avgSentiment,
          trend: trend,
          totalSegments: timeline.length,
          emotionalRange: Math.max(...timeline.map(t => t.sentiment)) - Math.min(...timeline.map(t => t.sentiment))
        }
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Skapar emotionell heatmap för text
   * @param {string} text - Text som ska analyseras
   * @returns {Object} - Heatmap med emotionella zoner
   */
  async createEmotionHeatmap(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const words = text.split(/\s+/);
      const heatmap = [];
      
      // Analysera varje ord för emotionell intensitet
      words.forEach((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        const emotion = this.#detectWordEmotion(cleanWord);
        
        heatmap.push({
          word: word,
          position: index,
          emotion: emotion.type,
          intensity: emotion.intensity,
          color: this.#getEmotionColor(emotion.type, emotion.intensity)
        });
      });
      
      // Skapa emotionella zoner
      const zones = this.#createEmotionalZones(heatmap);
      
      return {
        success: true,
        heatmap: heatmap,
        zones: zones,
        emotionDistribution: this.#calculateEmotionDistribution(heatmap),
        hotspots: this.#findEmotionalHotspots(heatmap)
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Detekterar stress-nivå i text
   * @param {string} text - Text som ska analyseras
   * @returns {Object} - Stress-analys med rekommendationer
   */
  async detectStress(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const stressAnalysis = this.#analyzeStressLevel(text);
      const linguisticStress = this.#analyzeLinguisticStress(text);
      const temporalStress = this.#analyzeTemporalStress(text);
      
      const overallStress = (stressAnalysis.level + linguisticStress.level + temporalStress.level) / 3;
      
      return {
        success: true,
        overallStressLevel: overallStress,
        stressCategory: this.#categorizeStress(overallStress),
        analysis: {
          vocabulary: stressAnalysis,
          linguistic: linguisticStress,
          temporal: temporalStress
        },
        recommendations: this.#generateStressRecommendations(overallStress),
        stressIndicators: this.#findStressIndicators(text)
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Förutsäger humör baserat på text
   * @param {string} text - Text som ska analyseras
   * @returns {Object} - Humör-förutsägelse med faktorer
   */
  async predictHappiness(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const happinessMetrics = this.#analyzeHappiness(text);
      const positivityScore = this.#calculatePositivity(text);
      const optimismLevel = this.#detectOptimism(text);
      
      const predictedMood = this.#predictMood(happinessMetrics, positivityScore, optimismLevel);
      
      return {
        success: true,
        happinessScore: happinessMetrics.score,
        positivityScore: positivityScore,
        optimismLevel: optimismLevel,
        predictedMood: predictedMood,
        moodFactors: {
          positiveWords: happinessMetrics.positiveWords,
          negativeWords: happinessMetrics.negativeWords,
          neutralWords: happinessMetrics.neutralWords
        },
        recommendations: this.#generateMoodRecommendations(predictedMood),
        emotionalBalance: this.#calculateEmotionalBalance(text)
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Färgkodar text efter känslor
   * @param {string} text - Text som ska färgkodas
   * @returns {Object} - Färgkodad text med legend
   */
  async colorCodeEmotions(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const coloredText = this.#colorCodeText(text);
      const emotionLegend = this.#getEmotionLegend();
      
      return {
        success: true,
        originalText: text,
        coloredText: coloredText,
        legend: emotionLegend,
        statistics: this.#calculateColorStatistics(coloredText),
        dominantEmotion: this.#findDominantEmotion(coloredText)
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  /**
   * Utför djupgående humör-analys
   * @param {string} text - Text som ska analyseras
   * @returns {Object} - Omfattande humör-analys
   */
  async analyzeMoodComprehensive(text) {
    try {
      if (!this.#validateText(text)) {
        return { success: false, error: 'Valid text is required' };
      }

      const comprehensiveAnalysis = {
        sentiment: this.#analyzeSentiment(text),
        emotions: this.#analyzeAllEmotions(text),
        mood: this.#analyzeMoodPatterns(text),
        psychological: this.#analyzePsychologicalMarkers(text),
        stress: this.#analyzeStressLevel(text),
        happiness: this.#analyzeHappiness(text),
        energy: this.#analyzeEnergyLevel(text),
        stability: this.#analyzeEmotionalStability(text)
      };
      
      return {
        success: true,
        analysis: comprehensiveAnalysis,
        summary: this.#generateMoodSummary(comprehensiveAnalysis),
        insights: this.#generateMoodInsights(comprehensiveAnalysis),
        recommendations: this.#generateComprehensiveRecommendations(comprehensiveAnalysis)
      };
    } catch (error) {
      return this.#handleError(error);
    }
  }

  // Privata hjälpmetoder för sentiment-analys

  /**
   * Analyserar sentiment för en text
   * @param {string} text - Text att analysera
   * @returns {Object} - Sentiment-resultat
   */
  #analyzeSentiment(text) {
    const words = text.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    let emotions = {};
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      
      // Kolla positiva ord
      if (this.#sentimentWords.positive.high.includes(cleanWord)) positiveScore += 3;
      else if (this.#sentimentWords.positive.medium.includes(cleanWord)) positiveScore += 2;
      else if (this.#sentimentWords.positive.low.includes(cleanWord)) positiveScore += 1;
      
      // Kolla negativa ord
      if (this.#sentimentWords.negative.high.includes(cleanWord)) negativeScore += 3;
      else if (this.#sentimentWords.negative.medium.includes(cleanWord)) negativeScore += 2;
      else if (this.#sentimentWords.negative.low.includes(cleanWord)) negativeScore += 1;
      
      // Kolla emotioner
      Object.keys(this.#sentimentWords.emotions).forEach(emotion => {
        if (this.#sentimentWords.emotions[emotion].includes(cleanWord)) {
          emotions[emotion] = (emotions[emotion] || 0) + 1;
        }
      });
    });
    
    const totalScore = positiveScore - negativeScore;
    const normalizedScore = Math.max(-1, Math.min(1, totalScore / Math.max(words.length * 0.1, 1)));
    
    const dominantEmotion = Object.keys(emotions).reduce((a, b) => 
      emotions[a] > emotions[b] ? a : b, 'neutral');
    
    return {
      score: normalizedScore,
      positiveScore,
      negativeScore,
      dominantEmotion,
      emotions,
      intensity: Math.abs(normalizedScore)
    };
  }

  /**
   * Beräknar trend i sentiment-data
   * @param {Array} sentiments - Array av sentiment-värden
   * @returns {string} - Trend-beskrivning
   */
  #calculateTrend(sentiments) {
    if (sentiments.length < 2) return 'neutral';
    
    const first = sentiments.slice(0, Math.floor(sentiments.length / 2));
    const last = sentiments.slice(Math.floor(sentiments.length / 2));
    
    const firstAvg = first.reduce((a, b) => a + b, 0) / first.length;
    const lastAvg = last.reduce((a, b) => a + b, 0) / last.length;
    
    const diff = lastAvg - firstAvg;
    
    if (diff > 0.1) return 'förbättras';
    if (diff < -0.1) return 'försämras';
    return 'stabil';
  }

  /**
   * Detekterar emotion för enskilt ord
   * @param {string} word - Ord att analysera
   * @returns {Object} - Emotion-data
   */
  #detectWordEmotion(word) {
    for (const [emotion, words] of Object.entries(this.#sentimentWords.emotions)) {
      if (words.includes(word)) {
        return { type: emotion, intensity: 0.8 };
      }
    }
    
    // Kolla positiva/negativa
    if (this.#sentimentWords.positive.high.includes(word)) {
      return { type: 'joy', intensity: 0.9 };
    }
    if (this.#sentimentWords.negative.high.includes(word)) {
      return { type: 'sadness', intensity: 0.9 };
    }
    
    return { type: 'neutral', intensity: 0.1 };
  }

  /**
   * Får färg för emotion baserat på typ och intensitet
   * @param {string} emotionType - Typ av emotion
   * @param {number} intensity - Intensitet (0-1)
   * @returns {string} - Färgkod
   */
  #getEmotionColor(emotionType, intensity) {
    const colors = {
      joy: `rgba(255, 193, 7, ${intensity})`,      // Gul
      sadness: `rgba(108, 117, 125, ${intensity})`, // Grå
      anger: `rgba(220, 53, 69, ${intensity})`,     // Röd
      fear: `rgba(111, 66, 193, ${intensity})`,     // Lila
      surprise: `rgba(255, 193, 7, ${intensity})`,  // Orange
      disgust: `rgba(40, 167, 69, ${intensity})`,   // Grön
      neutral: `rgba(173, 181, 189, ${intensity})`  // Ljusgrå
    };
    
    return colors[emotionType] || colors.neutral;
  }

  /**
   * Skapar emotionella zoner i text
   * @param {Array} heatmap - Heatmap-data
   * @returns {Array} - Emotionella zoner
   */
  #createEmotionalZones(heatmap) {
    const zones = [];
    let currentZone = null;
    
    heatmap.forEach((item, index) => {
      if (item.intensity > 0.5) {
        if (!currentZone || currentZone.emotion !== item.emotion) {
          if (currentZone) zones.push(currentZone);
          currentZone = {
            emotion: item.emotion,
            start: index,
            end: index,
            intensity: item.intensity,
            words: [item.word]
          };
        } else {
          currentZone.end = index;
          currentZone.words.push(item.word);
          currentZone.intensity = Math.max(currentZone.intensity, item.intensity);
        }
      } else if (currentZone) {
        zones.push(currentZone);
        currentZone = null;
      }
    });
    
    if (currentZone) zones.push(currentZone);
    return zones;
  }

  /**
   * Beräknar emotionsfördelning
   * @param {Array} heatmap - Heatmap-data
   * @returns {Object} - Emotionsfördelning
   */
  #calculateEmotionDistribution(heatmap) {
    const distribution = {};
    let totalIntensity = 0;
    
    // Summera intensiteter för varje känsla
    heatmap.forEach(item => {
      distribution[item.emotion] = (distribution[item.emotion] || 0) + item.intensity;
      totalIntensity += item.intensity;
    });
    
    // Normalisera till procent (värden mellan 0 och 1)
    if (totalIntensity > 0) {
      Object.keys(distribution).forEach(emotion => {
        distribution[emotion] = distribution[emotion] / totalIntensity;
      });
    }
    
    return distribution;
  }

  /**
   * Hittar emotionella hotspots
   * @param {Array} heatmap - Heatmap-data
   * @returns {Array} - Lista med hotspots
   */
  #findEmotionalHotspots(heatmap) {
    return heatmap
      .filter(item => item.intensity > 0.7)
      .sort((a, b) => b.intensity - a.intensity)
      .slice(0, 5);
  }

  /**
   * Analyserar stress-nivå i text
   * @param {string} text - Text att analysera
   * @returns {Object} - Stress-analys
   */
  #analyzeStressLevel(text) {
    const words = text.toLowerCase().split(/\s+/);
    let stressScore = 0;
    const foundIndicators = [];
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      
      if (this.#sentimentWords.stress.high.includes(cleanWord)) {
        stressScore += 3;
        foundIndicators.push({ word: cleanWord, level: 'high' });
      } else if (this.#sentimentWords.stress.medium.includes(cleanWord)) {
        stressScore += 2;
        foundIndicators.push({ word: cleanWord, level: 'medium' });
      } else if (this.#sentimentWords.stress.indicators.includes(cleanWord)) {
        stressScore += 1;
        foundIndicators.push({ word: cleanWord, level: 'indicator' });
      }
    });
    
    const normalizedLevel = Math.min(1, stressScore / (words.length * 0.1));
    
    return {
      level: normalizedLevel,
      indicators: foundIndicators,
      score: stressScore
    };
  }

  /**
   * Analyserar lingvistisk stress
   * @param {string} text - Text att analysera
   * @returns {Object} - Lingvistisk stress-analys
   */
  #analyzeLinguisticStress(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
    
    // Längre meningar kan indikera stress
    const lengthStress = Math.min(1, (avgSentenceLength - 10) / 20);
    
    // Många utropstecken kan indikera stress
    const exclamationCount = (text.match(/!/g) || []).length;
    const exclamationStress = Math.min(1, exclamationCount / 10);
    
    return {
      level: Math.max(lengthStress, exclamationStress),
      avgSentenceLength,
      exclamationCount
    };
  }

  /**
   * Analyserar temporal stress (tidsmässig stress)
   * @param {string} text - Text att analysera
   * @returns {Object} - Temporal stress-analys
   */
  #analyzeTemporalStress(text) {
    const timeWords = ['idag', 'imorgon', 'igår', 'snabbt', 'nu', 'direkt', 'genast'];
    const urgencyWords = ['måste', 'borde', 'ska', 'deadline', 'tid'];
    
    const timeCount = timeWords.filter(word => text.toLowerCase().includes(word)).length;
    const urgencyCount = urgencyWords.filter(word => text.toLowerCase().includes(word)).length;
    
    const temporalStress = Math.min(1, (timeCount + urgencyCount * 2) / 10);
    
    return {
      level: temporalStress,
      timeWords: timeCount,
      urgencyWords: urgencyCount
    };
  }

  /**
   * Kategoriserar stress-nivå
   * @param {number} stressLevel - Stress-nivå (0-1)
   * @returns {string} - Stress-kategori
   */
  #categorizeStress(stressLevel) {
    if (stressLevel > 0.8) return 'Mycket hög stress';
    if (stressLevel > 0.6) return 'Hög stress';
    if (stressLevel > 0.4) return 'Måttlig stress';
    if (stressLevel > 0.2) return 'Låg stress';
    return 'Minimal stress';
  }

  /**
   * Genererar stress-rekommendationer
   * @param {number} stressLevel - Stress-nivå
   * @returns {Array} - Lista med rekommendationer
   */
  #generateStressRecommendations(stressLevel) {
    if (stressLevel > 0.6) {
      return [
        'Överväg att ta pauser under skrivandet',
        'Försök att förenkla meningsstrukturen',
        'Undvik för många deadline-ord',
        'Fokusera på en sak i taget'
      ];
    } else if (stressLevel > 0.3) {
      return [
        'Behåll en lugn skrivstil',
        'Strukturera texten med korta stycken'
      ];
    }
    return ['Din skrivstil verkar lugn och balanserad'];
  }

  /**
   * Hittar stress-indikatorer i text
   * @param {string} text - Text att analysera
   * @returns {Array} - Lista med stress-indikatorer
   */
  #findStressIndicators(text) {
    const indicators = [];
    const words = text.toLowerCase().split(/\s+/);
    
    [...this.#sentimentWords.stress.high, ...this.#sentimentWords.stress.medium, ...this.#sentimentWords.stress.indicators]
      .forEach(stressWord => {
        words.forEach((word, index) => {
          if (word.includes(stressWord)) {
            indicators.push({
              word: word,
              position: index,
              type: stressWord,
              context: words.slice(Math.max(0, index - 2), index + 3).join(' ')
            });
          }
        });
      });
    
    return indicators;
  }

  /**
   * Analyserar lycka i text
   * @param {string} text - Text att analysera
   * @returns {Object} - Lycka-analys
   */
  #analyzeHappiness(text) {
    const words = text.toLowerCase().split(/\s+/);
    let positiveWords = 0;
    let negativeWords = 0;
    let neutralWords = 0;
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      
      if ([...this.#sentimentWords.positive.high, ...this.#sentimentWords.positive.medium].includes(cleanWord)) {
        positiveWords++;
      } else if ([...this.#sentimentWords.negative.high, ...this.#sentimentWords.negative.medium].includes(cleanWord)) {
        negativeWords++;
      } else {
        neutralWords++;
      }
    });
    
    const totalWords = words.length;
    const score = (positiveWords - negativeWords) / totalWords;
    
    return {
      score: Math.max(-1, Math.min(1, score)),
      positiveWords,
      negativeWords,
      neutralWords
    };
  }

  /**
   * Beräknar positivitet
   * @param {string} text - Text att analysera
   * @returns {number} - Positivitets-score
   */
  #calculatePositivity(text) {
    const sentiment = this.#analyzeSentiment(text);
    return Math.max(0, sentiment.score);
  }

  /**
   * Detekterar optimism
   * @param {string} text - Text att analysera
   * @returns {number} - Optimism-nivå
   */
  #detectOptimism(text) {
    const optimisticWords = ['kommer', 'kan', 'kommer att', 'möjligt', 'framtid', 'hoppas', 'tror'];
    const pessimisticWords = ['aldrig', 'omöjligt', 'hopplös', 'ingen', 'inget'];
    
    let optimisticCount = 0;
    let pessimisticCount = 0;
    
    optimisticWords.forEach(word => {
      if (text.toLowerCase().includes(word)) optimisticCount++;
    });
    
    pessimisticWords.forEach(word => {
      if (text.toLowerCase().includes(word)) pessimisticCount++;
    });
    
    return Math.max(0, Math.min(1, (optimisticCount - pessimisticCount) / 10 + 0.5));
  }

  /**
   * Förutsäger humör
   * @param {Object} happinessMetrics - Lycka-metriker
   * @param {number} positivityScore - Positivitets-score
   * @param {number} optimismLevel - Optimism-nivå
   * @returns {Object} - Humör-förutsägelse
   */
  #predictMood(happinessMetrics, positivityScore, optimismLevel) {
    const combinedScore = (happinessMetrics.score + positivityScore + optimismLevel) / 3;
    
    if (combinedScore > 0.8) return { mood: 'Mycket lycklig', confidence: 'Hög' };
    if (combinedScore > 0.6) return { mood: 'Glad', confidence: 'Hög' };
    if (combinedScore > 0.4) return { mood: 'Neutral', confidence: 'Medium' };
    if (combinedScore > 0.2) return { mood: 'Något ledsen', confidence: 'Medium' };
    return { mood: 'Ledsen', confidence: 'Hög' };
  }

  /**
   * Genererar humör-rekommendationer
   * @param {Object} predictedMood - Förutsagt humör
   * @returns {Array} - Lista med rekommendationer
   */
  #generateMoodRecommendations(predictedMood) {
    switch (predictedMood.mood) {
      case 'Mycket lycklig':
        return ['Fortsätt med den positiva energin!', 'Dela din glädje med andra'];
      case 'Glad':
        return ['Behåll det positiva mindset', 'Fokusera på det som fungerar bra'];
      case 'Neutral':
        return ['Försök hitta något positivt att fokusera på', 'Små förändringar kan göra stor skillnad'];
      case 'Något ledsen':
        return ['Ta pauser och vila', 'Prata med någon du litar på', 'Fokusera på små positiva saker'];
      case 'Ledsen':
        return ['Sök stöd från vänner eller familj', 'Överväg professionell hjälp', 'Var snäll mot dig själv'];
      default:
        return ['Fortsätt skriva och uttrycka dina känslor'];
    }
  }

  /**
   * Beräknar emotionell balans
   * @param {string} text - Text att analysera
   * @returns {Object} - Emotionell balans
   */
  #calculateEmotionalBalance(text) {
    const sentiment = this.#analyzeSentiment(text);
    const balance = Math.abs(sentiment.positiveScore - sentiment.negativeScore);
    
    return {
      balanced: balance < 2,
      score: 1 - (balance / Math.max(sentiment.positiveScore + sentiment.negativeScore, 1)),
      description: balance < 2 ? 'Balanserad' : 'Obalanserad'
    };
  }

  /**
   * Färgkodar text baserat på känslor
   * @param {string} text - Text att färgkoda
   * @returns {Array} - Färgkodad text
   */
  #colorCodeText(text) {
    const words = text.split(/\s+/);
    
    return words.map(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      const emotion = this.#detectWordEmotion(cleanWord);
      
      return {
        word: word,
        emotion: emotion.type,
        intensity: emotion.intensity,
        color: this.#getEmotionColor(emotion.type, emotion.intensity)
      };
    });
  }

  /**
   * Får emotions-legend
   * @returns {Object} - Legend för emotioner
   */
  #getEmotionLegend() {
    return {
      joy: { color: 'rgba(255, 193, 7, 1)', description: 'Glädje' },
      sadness: { color: 'rgba(108, 117, 125, 1)', description: 'Sorg' },
      anger: { color: 'rgba(220, 53, 69, 1)', description: 'Ilska' },
      fear: { color: 'rgba(111, 66, 193, 1)', description: 'Rädsla' },
      surprise: { color: 'rgba(255, 193, 7, 1)', description: 'Överraskning' },
      disgust: { color: 'rgba(40, 167, 69, 1)', description: 'Avsky' },
      neutral: { color: 'rgba(173, 181, 189, 1)', description: 'Neutral' }
    };
  }

  /**
   * Beräknar färg-statistik
   * @param {Array} coloredText - Färgkodad text
   * @returns {Object} - Färg-statistik
   */
  #calculateColorStatistics(coloredText) {
    const stats = {};
    
    coloredText.forEach(item => {
      stats[item.emotion] = (stats[item.emotion] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Hittar dominant emotion
   * @param {Array} coloredText - Färgkodad text
   * @returns {string} - Dominant emotion
   */
  #findDominantEmotion(coloredText) {
    const stats = this.#calculateColorStatistics(coloredText);
    return Object.keys(stats).reduce((a, b) => stats[a] > stats[b] ? a : b);
  }

  /**
   * Analyserar alla emotioner
   * @param {string} text - Text att analysera
   * @returns {Object} - Alla emotioner
   */
  #analyzeAllEmotions(text) {
    const sentiment = this.#analyzeSentiment(text);
    return sentiment.emotions;
  }

  /**
   * Analyserar humör-mönster
   * @param {string} text - Text att analysera
   * @returns {Object} - Humör-mönster
   */
  #analyzeMoodPatterns(text) {
    const sentiment = this.#analyzeSentiment(text);
    return {
      pattern: sentiment.score > 0 ? 'positiv' : sentiment.score < 0 ? 'negativ' : 'neutral',
      stability: sentiment.intensity < 0.3 ? 'stabil' : 'instabil',
      intensity: sentiment.intensity
    };
  }

  /**
   * Analyserar psykologiska markörer
   * @param {string} text - Text att analysera
   * @returns {Object} - Psykologiska markörer
   */
  #analyzePsychologicalMarkers(text) {
    const selfReferences = (text.match(/\b(jag|mig|min|mitt|mina)\b/gi) || []).length;
    const futureReferences = (text.match(/\b(kommer|ska|planerar|hoppas)\b/gi) || []).length;
    const pastReferences = (text.match(/\b(var|hade|gjorde|sa)\b/gi) || []).length;
    
    return {
      selfFocus: selfReferences > text.split(/\s+/).length * 0.05,
      futureOriented: futureReferences > pastReferences,
      timeOrientation: futureReferences > pastReferences ? 'framtid' : 'dåtid'
    };
  }

  /**
   * Analyserar energi-nivå
   * @param {string} text - Text att analysera
   * @returns {Object} - Energi-analys
   */
  #analyzeEnergyLevel(text) {
    const energyWords = ['energi', 'kraft', 'stark', 'aktiv', 'livlig', 'pigg'];
    const tiredWords = ['trött', 'utmattad', 'slö', 'orkeslös', 'svag'];
    
    let energyCount = 0;
    let tiredCount = 0;
    
    energyWords.forEach(word => {
      if (text.toLowerCase().includes(word)) energyCount++;
    });
    
    tiredWords.forEach(word => {
      if (text.toLowerCase().includes(word)) tiredCount++;
    });
    
    const energyLevel = (energyCount - tiredCount + 1) / 2;
    
    return {
      level: Math.max(0, Math.min(1, energyLevel)),
      energyWords: energyCount,
      tiredWords: tiredCount
    };
  }

  /**
   * Analyserar emotionell stabilitet
   * @param {string} text - Text att analysera
   * @returns {Object} - Stabilitet-analys
   */
  #analyzeEmotionalStability(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentiments = sentences.map(s => this.#analyzeSentiment(s).score);
    
    if (sentiments.length < 2) {
      return { stable: true, variance: 0 };
    }
    
    const mean = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    const variance = sentiments.reduce((sum, sentiment) => sum + Math.pow(sentiment - mean, 2), 0) / sentiments.length;
    
    return {
      stable: variance < 0.3,
      variance: variance,
      consistency: 1 - variance
    };
  }

  /**
   * Genererar humör-sammanfattning
   * @param {Object} analysis - Omfattande analys
   * @returns {Object} - Sammanfattning
   */
  #generateMoodSummary(analysis) {
    return {
      overallMood: analysis.sentiment.dominantEmotion,
      sentimentScore: analysis.sentiment.score,
      stressLevel: analysis.stress.level,
      energyLevel: analysis.energy.level,
      emotionalStability: analysis.stability.stable ? 'Stabil' : 'Instabil'
    };
  }

  /**
   * Genererar humör-insikter
   * @param {Object} analysis - Omfattande analys
   * @returns {Array} - Lista med insikter
   */
  #generateMoodInsights(analysis) {
    const insights = [];
    
    if (analysis.sentiment.score > 0.5) {
      insights.push('Din text visar en generellt positiv inställning');
    }
    
    if (analysis.stress.level > 0.6) {
      insights.push('Det finns tecken på stress i din skrivstil');
    }
    
    if (analysis.energy.level > 0.7) {
      insights.push('Du uttrycker hög energi och vitalitet');
    }
    
    if (analysis.stability.stable) {
      insights.push('Din emotionella ton är konsekvent genom texten');
    }
    
    return insights.length > 0 ? insights : ['Din text visar en balanserad emotionell profil'];
  }

  /**
   * Genererar omfattande rekommendationer
   * @param {Object} analysis - Omfattande analys
   * @returns {Array} - Lista med rekommendationer
   */
  #generateComprehensiveRecommendations(analysis) {
    const recommendations = [];
    
    if (analysis.stress.level > 0.5) {
      recommendations.push('Överväg att inkludera mer positiva ord för att minska stress-intryck');
    }
    
    if (analysis.sentiment.score < -0.3) {
      recommendations.push('Försök balansera negativa uttryck med positiva perspektiv');
    }
    
    if (analysis.energy.level < 0.3) {
      recommendations.push('Lägg till mer energiska och aktiva ord för att höja tonläget');
    }
    
    if (!analysis.stability.stable) {
      recommendations.push('Försök hålla en mer konsekvent emotionell ton genom texten');
    }
    
    return recommendations.length > 0 ? recommendations : ['Din text har en bra emotionell balans'];
  }
}