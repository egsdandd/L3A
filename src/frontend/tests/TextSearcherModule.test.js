import { describe, it, expect, beforeEach } from 'vitest'
import { TextSearcherModule } from '../TextSearcherModule.js'

describe('TextSearcherModule', () => {
    let searcher
    beforeEach(() => {
        searcher = new TextSearcherModule()
    })

    it('findFirst hittar första förekomst', () => {
        expect(searcher.findFirst('hej på dig hej', 'hej')).toBe(0)
        expect(searcher.findFirst('hej på dig', 'test')).toBe(-1)
        expect(() => searcher.findFirst('   ', 'hej')).toThrow()
        expect(() => searcher.findFirst('hej på dig', '   ')).toThrow()
    })

    it('findFirst hanterar felaktig input', () => {
        expect(() => searcher.findFirst(123, 'hej')).toThrow()
        expect(() => searcher.findFirst('hej', 123)).toThrow()
        expect(() => searcher.findFirst(null, 'hej')).toThrow()
        expect(() => searcher.findFirst('hej', null)).toThrow()
    })

    it('findAll hittar alla förekomster', () => {
        expect(searcher.findAll('hej på dig hej', 'hej')).toEqual([0, 11])
        expect(searcher.findAll('hej på dig', 'test')).toEqual([])
        expect(() => searcher.findAll('   ', 'hej')).toThrow()
        expect(() => searcher.findAll('hej på dig', '   ')).toThrow()
    })

    it('findAll hanterar felaktig input', () => {
        expect(() => searcher.findAll(123, 'hej')).toThrow()
        expect(() => searcher.findAll('hej', 123)).toThrow()
        expect(() => searcher.findAll(null, 'hej')).toThrow()
        expect(() => searcher.findAll('hej', null)).toThrow()
    })

    it('findAll hanterar överlappande träffar', () => {
        expect(searcher.findAll('banan', 'ana')).toEqual([1])
        expect(searcher.findAll('bananana', 'ana')).toEqual([1, 3, 5])
    })

    it('count räknar antal förekomster', () => {
        expect(searcher.count('hej på dig hej', 'hej')).toBe(2)
        expect(searcher.count('hej på dig', 'test')).toBe(0)
        expect(() => searcher.count('   ', 'hej')).toThrow()
        expect(() => searcher.count('hej på dig', '   ')).toThrow()
    })

    it('count hanterar felaktig input', () => {
        expect(() => searcher.count(123, 'hej')).toThrow()
        expect(() => searcher.count('hej', 123)).toThrow()
        expect(() => searcher.count(null, 'hej')).toThrow()
        expect(() => searcher.count('hej', null)).toThrow()
    })

    it('exists returnerar true om query finns', () => {
        expect(searcher.exists('hej på dig', 'hej')).toBe(true)
        expect(searcher.exists('hej på dig', 'test')).toBe(false)
        expect(() => searcher.exists('   ', 'hej')).toThrow()
        expect(() => searcher.exists('hej på dig', '   ')).toThrow()
    })

    it('exists hanterar felaktig input', () => {
        expect(() => searcher.exists(123, 'hej')).toThrow()
        expect(() => searcher.exists('hej', 123)).toThrow()
        expect(() => searcher.exists(null, 'hej')).toThrow()
        expect(() => searcher.exists('hej', null)).toThrow()
    })

    it('findFirst och findAll med unicode, åäö och emojis', () => {
        expect(searcher.findFirst('åäö åäö', 'ä')).toBe(1)
        expect(searcher.findAll('åäö åäö', 'ä')).toEqual([1, 5])
        expect(searcher.findFirst('hej 👋 på dig', '👋')).toBe(4)
        expect(searcher.findAll('hej 👋 på dig', '👋')).toEqual([4])
    })

    it('findFirst och findAll med specialtecken och blandade case', () => {
        expect(searcher.findFirst('Test! test.', 'Test!')).toBe(0)
        expect(searcher.findAll('Test! test.', 'test')).toEqual([6])
        expect(searcher.findFirst('abc', 'ABC')).toBe(-1)
        expect(searcher.findAll('abc', 'ABC')).toEqual([])
    })

    it('findFirst och findAll där query är längre än text', () => {
        expect(searcher.findFirst('hej', 'hejsan')).toBe(-1)
        expect(searcher.findAll('hej', 'hejsan')).toEqual([])
    })

    it('findFirst och findAll med query som bara är mellanslag eller specialtecken', () => {
        expect(() => searcher.findFirst('hej på dig', ' ')).toThrow()
        expect(() => searcher.findAll('hej på dig', ' ')).toThrow()
        expect(searcher.findFirst('hej! på dig!', '!')).toBe(3)
        expect(searcher.findAll('hej! på dig!', '!')).toEqual([3, 11])
    })
})
