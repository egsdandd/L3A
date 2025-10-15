/**
 * Smoke tests: verifierar att kritiska funktioner kan köras utan fel.
 * Körs efter build/deploy innan djupare tester.
 */

// Importera globalt eller mocka environment
import { JSDOM } from 'jsdom'

// Mocka global DOM innan helpers används
beforeAll(() => {
  const dom = new JSDOM(`<!DOCTYPE html><div id="container"><div id="content"></div></div>`)
  global.document = dom.window.document
  global.window = dom.window
})

import { showResults } from '../public/js/utilities/display-helpers.js'
import { formatResult } from '../public/js/global-functions.js'

// Huvudtest – kontrollerar bara att det inte kraschar
describe('Smoke Test: Core helpers', () => {
  test('showResults runs without throwing', () => {
    expect(() =>
      showResults({
        containerId: 'container',
        contentId: 'content',
        content: '<b>SmokeTest</b>'
      })
    ).not.toThrow()
  })

  test('formatResult handles different input types', () => {
    expect(formatResult('text')).toBe('text')
    expect(formatResult(['a', 'b'])).toContain('a')
    expect(formatResult({ key: 'val' })).toContain('key')
  })
})
