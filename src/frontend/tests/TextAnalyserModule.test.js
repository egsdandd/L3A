import { describe, it, expect, beforeEach } from 'vitest'
import { TextAnalyzerModule } from '../TextAnalyserModule.js'

describe('TextAnalyzerModule', () => {
    let analyzer
    beforeEach(() => {
        analyzer = new TextAnalyzerModule()
    })

    it('countWords returnerar korrekt antal ord', () => {
        expect(analyzer.countWords('hej på dig')).toBe(3)
        expect(analyzer.countWords('   ')).toBe(0)
        expect(analyzer.countWords('ett')).toBe(1)
        expect(analyzer.countWords('hej, på dig!')).toBe(3)
        expect(analyzer.countWords('åäö éü')).toBe(2)
        expect(analyzer.countWords('123 hej')).toBe(1)
    })

    it('countWords hanterar felaktig input', () => {
        expect(analyzer.countWords(123)).toBe(0)
        expect(analyzer.countWords(null)).toBe(0)
        expect(analyzer.countWords(undefined)).toBe(0)
        expect(analyzer.countWords({})).toBe(0)
        expect(analyzer.countWords([])).toBe(0)
    })

    it('countSentences returnerar korrekt antal meningar', () => {
        expect(analyzer.countSentences('Hej. Hej!')).toBe(2)
        expect(analyzer.countSentences('')).toBe(0)
        expect(analyzer.countSentences('Hej? Ja. Nej!')).toBe(3)
        expect(analyzer.countSentences('   ')).toBe(0)
    })

    it('countCharacters returnerar korrekt antal tecken', () => {
        expect(analyzer.countCharacters('abc')).toBe(3)
        expect(analyzer.countCharacters('')).toBe(0)
        expect(analyzer.countCharacters(' åäö!')).toBe(5)
        expect(analyzer.countCharacters('   ')).toBe(0)
    })

    it('letterFrequency returnerar korrekt objekt', () => {
        expect(analyzer.letterFrequency('aab')).toEqual({ a: 2, b: 1 })
        expect(analyzer.letterFrequency('')).toEqual({})
        expect(analyzer.letterFrequency('åäö')).toEqual({ 'å': 1, 'ä': 1, 'ö': 1 })
        expect(analyzer.letterFrequency('abc123')).toEqual({ a: 1, b: 1, c: 1 })
        expect(analyzer.letterFrequency('  ')).toEqual({})
    })

    it('findPalindromes hittar palindrom', () => {
        expect(analyzer.findPalindromes('anna otto test')).toEqual(['anna', 'otto'])
        expect(analyzer.findPalindromes('hej test')).toEqual([])
        expect(analyzer.findPalindromes('Ava Anna')).toEqual(['ava', 'anna'])
        expect(analyzer.findPalindromes('a')).toEqual([])
        expect(analyzer.findPalindromes('')).toEqual([])
        expect(analyzer.findPalindromes('  ')).toEqual([])
    })
})
