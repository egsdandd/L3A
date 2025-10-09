// Main forensics interface - aggregates all forensics functionality
import { createSimpleForensicsInterface } from './forensics/forensics-core.js'
import './forensics/forensics-analyzers.js'

export const textForensicsMethods = {
  'Text Forensics Detective': () => createSimpleForensicsInterface()
}
