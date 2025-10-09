// HTML rendering functions for mood analysis results

/**
 *
 * @param distributionToShow
 */
export function generateEmotionDistributionHTML(distributionToShow) {
  if (Object.keys(distributionToShow).length === 0) {
    return '<p style="color: #333;">Ingen känslomässig data tillgänglig</p>'
  }
  
  return Object.keys(distributionToShow).map(emotion => 
    `<div class="emotion-item"><strong>${emotion}:</strong> ${distributionToShow[emotion]}%</div>`
  ).join('')
}

/**
 *
 * @param zones
 */
export function generateEmotionZonesHTML(zones) {
  return `
    <div class="mood-result">
      <h4>🎯 Känslo-zoner:</h4>
      ${zones.map(zone => `<div class="zone-item"><strong>${zone.name}:</strong> ${zone.description}</div>`).join('')}
    </div>
  `
}

/**
 *
 * @param heatmap
 */
export function generateHeatmapAnalysisHTML(heatmap) {
  return `
    <div class="mood-result">
      <h4>🔥 Heatmap Analys:</h4>
      <p><strong>Intensitet:</strong> ${heatmap.intensity}%</p>
      <p><strong>Dominerande känsla:</strong> ${heatmap.dominantEmotion}</p>
    </div>
  `
}

/**
 *
 * @param hotspots
 */
export function generateHotspotsHTML(hotspots) {
  return `
    <div class="mood-result">
      <h4>🌶️ Emotionella Hotspots:</h4>
      ${hotspots.map(spot => `<div class="hotspot-item">${spot.text} (${spot.emotion}: ${spot.intensity}%)</div>`).join('')}
    </div>
  `
}

/**
 *
 * @param data
 */
export function generateEmotionHeatmapHTML(data) {
  return `
    <div class="mood-result">
      <h4>💭 Emotion Heatmap Analys:</h4>
      ${generateEmotionDistributionHTML(data.emotionDistribution)}
      ${generateEmotionZonesHTML(data.zones)}
      ${generateHeatmapAnalysisHTML(data.heatmapAnalysis)}
      ${generateHotspotsHTML(data.hotspots)}
    </div>
  `
}

/**
 *
 * @param summary
 */
export function generateMoodSummaryHTML(summary) {
  return `
    <div class="mood-result">
      <h3>Övergripande stämning: ${summary.overallMood}</h3>
      <p><strong>Konfidensgrad:</strong> ${summary.confidence}%</p>
      <p><strong>Sentiment:</strong> ${summary.sentiment}</p>
      <p><strong>Energinivå:</strong> ${summary.energy}</p>
    </div>
  `
}

/**
 *
 * @param analysis
 */
export function generateSentimentAnalysisHTML(analysis) {
  return `
    <div class="mood-result">
      <p><strong>Positiv:</strong> ${analysis.positive}%</p>
      <p><strong>Neutral:</strong> ${analysis.neutral}%</p>
      <p><strong>Negativ:</strong> ${analysis.negative}%</p>
    </div>
  `
}

/**
 *
 * @param analysis
 */
export function generatePsychologicalProfileHTML(analysis) {
  return `
    <div class="mood-result">
      <p><strong>Emotionell stabilitet:</strong> ${analysis.emotionalStability}</p>
      <p><strong>Uttrycksfullhet:</strong> ${analysis.expressiveness}</p>
    </div>
  `
}

/**
 *
 * @param insights
 */
export function generateInsightsHTML(insights) {
  return `
    <div class="mood-result">
      ${insights.map(insight => `<p>💡 ${insight}</p>`).join('')}
    </div>
  `
}

/**
 *
 * @param recommendations
 */
export function generateRecommendationsHTML(recommendations) {
  return `
    <div class="mood-result">
      ${recommendations.map(rec => `<p>🎯 ${rec}</p>`).join('')}
    </div>
  `
}

/**
 *
 * @param summary
 */
export function generateTimelineSummaryHTML(summary) {
  return `
    <div class="mood-result">
      <h4>📊 Timeline Sammanfattning:</h4>
      <p><strong>Övergripande trend:</strong> ${summary.overallTrend}</p>
      <p><strong>Starkaste sentiment:</strong> ${summary.strongestSentiment}</p>
    </div>
  `
}

/**
 *
 * @param timeline
 */
export function generateTimelineSegmentsHTML(timeline) {
  return `
    <div class="mood-result">
      ${timeline.map(segment => 
        `<div class="timeline-segment">
          <strong>Segment ${segment.index}:</strong> ${segment.sentiment} (${segment.confidence}%)
          <div class="segment-text">"${segment.text.substring(0, 100)}..."</div>
        </div>`
      ).join('')}
    </div>
  `
}

/**
 *
 * @param data
 */
export function generateSentimentTimelineHTML(data) {
  const { timeline, summary } = data
  
  return `
    <h4>😊 Sentiment Timeline Analys:</h4>
    ${generateTimelineSummaryHTML(summary)}
    <h5>Sentiment över tid:</h5>
    ${generateTimelineSegmentsHTML(timeline)}
  `
}

/**
 *
 * @param data
 */
export function generateComprehensiveMoodHTML(data) {
  const { analysis, summary } = data
  
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
  `
}