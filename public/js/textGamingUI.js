// Text Gaming UI - Main gaming module (imports all game components)
// This file loads all gaming modules to maintain compatibility

// Import the core interface function
import { textGamingMethods as coreMethods } from './gaming/gaming-core.js'
import './gaming/word-games.js' 
import './gaming/creative-games.js'
import './gaming/memory-helpers.js'

// Re-export the main interface for compatibility  
export const textGamingMethods = coreMethods
