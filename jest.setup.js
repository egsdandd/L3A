import { TextEncoder, TextDecoder } from 'util'

// Polyfills för Node.js testmiljö
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
