import { jest } from '@jest/globals'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

global.window = {}
global.document = {
  getElementById: jest.fn(() => ({
    style: {},
    innerHTML: '',
    scrollIntoView: jest.fn()
  }))
}
