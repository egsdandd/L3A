// Main mood engine interface - aggregates all mood functionality
import { createSimpleMoodInterface } from './mood/mood-core.js'
import './mood/mood-renderers.js'
import './mood/mood-analyzers.js'

export const moodEngineMethods = {
  'Mood & Emotion Engine': () => createSimpleMoodInterface()
}
