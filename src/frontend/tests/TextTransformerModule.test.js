import { describe, it, expect, beforeEach } from 'vitest'
import { TextTransformerModule } from '../TextTransformerModule.js'

describe('TextTransformerModule', () => {
    let transformer
    beforeEach(() => {
        transformer = new TextTransformerModule()
    })

    it('reverseWords vänder ordningen på orden', () => {
        expect(transformer.reverseWords('hej på dig')).toBe('dig på hej')
        expect(transformer.reverseWords('   ')).toBe('')
    })

    it('reverseWords hanterar felaktig input', () => {
        expect(transformer.reverseWords(123)).toBe('')
        expect(transformer.reverseWords(null)).toBe('')
        expect(transformer.reverseWords(undefined)).toBe('')
    })

    it('sortWords sorterar orden alfabetiskt', () => {
        expect(transformer.sortWords('banan äpple citron')).toBe('äpple banan citron')
        expect(transformer.sortWords('   ')).toBe('')
    })

    it('sortWords hanterar felaktig input', () => {
        expect(transformer.sortWords(123)).toBe('')
        expect(transformer.sortWords(null)).toBe('')
        expect(transformer.sortWords(undefined)).toBe('')
    })

    it('shuffleWords returnerar en sträng med samma ord, men i annan ordning', () => {
        const input = 'ett två tre fyra'
        const result = transformer.shuffleWords(input)
        // Samma ord, men ordningen kan variera
        expect(result.split(' ').sort()).toEqual(input.split(' ').sort())
        expect(transformer.shuffleWords('   ')).toBe('')
    })

    it('shuffleWords hanterar felaktig input', () => {
        expect(transformer.shuffleWords(123)).toBe('')
        expect(transformer.shuffleWords(null)).toBe('')
        expect(transformer.shuffleWords(undefined)).toBe('')
    })

    it('shuffleWords ger olika resultat men samma ord', () => {
        const input = 'ett två tre fyra fem sex'
        const result1 = transformer.shuffleWords(input)
        const result2 = transformer.shuffleWords(input)
        expect(result1.split(' ').sort()).toEqual(input.split(' ').sort())
        expect(result2.split(' ').sort()).toEqual(input.split(' ').sort())
        // Det är möjligt att de blir lika, men ofta olika
        // Testa att minst ett resultat skiljer sig från input
        expect(result1 === input && result2 === input).toBe(false)
    })

    it('reverseWords, sortWords, shuffleWords med ett ord', () => {
        expect(transformer.reverseWords('hej')).toBe('hej')
        expect(transformer.sortWords('hej')).toBe('hej')
        expect(transformer.shuffleWords('hej')).toBe('hej')
    })

    it('reverseWords, sortWords, shuffleWords med flera mellanslag', () => {
        expect(transformer.reverseWords('hej   på   dig')).toBe('dig på hej')
        expect(transformer.sortWords('hej   på   dig')).toBe('dig hej på')
        const input = 'hej   på   dig'
        const result = transformer.shuffleWords(input)
        expect(result.split(' ').sort()).toEqual(['hej', 'på', 'dig'].sort())
    })

    it('reverseWords, sortWords, shuffleWords med specialtecken och siffror', () => {
        expect(transformer.reverseWords('hej! 123 på')).toBe('på hej')
        expect(transformer.sortWords('hej! 123 på')).toBe('hej på')
        const input = 'hej! 123 på'
        const result = transformer.shuffleWords(input)
        expect(result.split(' ').sort()).toEqual(['hej', 'på'].sort())
    })
})
