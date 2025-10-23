import { describe, it, expect, beforeEach } from 'vitest'
import { TextFormatterModule } from '../TextFormatterModule.js'

describe('TextFormatterModule', () => {
    let formatter
    beforeEach(() => {
        formatter = new TextFormatterModule()
    })

    it('toUpperCase returnerar versaler', () => {
    expect(formatter.toUpperCase('hej')).toBe('HEJ')
    expect(formatter.toUpperCase('HeJ 123')).toBe('HEJ 123')
    expect(formatter.toUpperCase('   ')).toBe('Ogiltig input')
    })

    it('toUpperCase hanterar felaktig input', () => {
    expect(formatter.toUpperCase(123)).toBe('Ogiltig input')
    expect(formatter.toUpperCase(null)).toBe('Ogiltig input')
    expect(formatter.toUpperCase(undefined)).toBe('Ogiltig input')
    })

    it('toLowerCase returnerar gemener', () => {
    expect(formatter.toLowerCase('HEJ')).toBe('hej')
    expect(formatter.toLowerCase('HeJ 123')).toBe('hej 123')
    expect(formatter.toLowerCase('   ')).toBe('Ogiltig input')
    })

    it('toLowerCase hanterar felaktig input', () => {
    expect(formatter.toLowerCase(123)).toBe('Ogiltig input')
    expect(formatter.toLowerCase(null)).toBe('Ogiltig input')
    expect(formatter.toLowerCase(undefined)).toBe('Ogiltig input')
    })

    it('capitalize returnerar text med stor bokstav i varje ord', () => {
    expect(formatter.capitalize('hej på dig')).toBe('Hej På Dig')
    expect(formatter.capitalize('   ')).toBe('Ogiltig input')
    })

    it('capitalize hanterar felaktig input', () => {
    expect(formatter.capitalize(123)).toBe('Ogiltig input')
    expect(formatter.capitalize(null)).toBe('Ogiltig input')
    expect(formatter.capitalize(undefined)).toBe('Ogiltig input')
    })

    it('capitalize hanterar redan formaterad text', () => {
        expect(formatter.capitalize('Redan Formaterad')).toBe('Redan Formaterad')
        expect(formatter.capitalize('REDAN FORMATERAD')).toBe('Redan Formaterad')
    })

    it('camelCase returnerar text i camelCase', () => {
    expect(formatter.camelCase('hej på dig')).toBe('hejPåDig')
    expect(formatter.camelCase('   ')).toBe('Ogiltig input')
    })

    it('camelCase hanterar felaktig input', () => {
    expect(formatter.camelCase(123)).toBe('Ogiltig input')
    expect(formatter.camelCase(null)).toBe('Ogiltig input')
    expect(formatter.camelCase(undefined)).toBe('Ogiltig input')
    })

    it('camelCase hanterar svenska tecken och emojis', () => {
        expect(formatter.camelCase('å ä ö')).toBe('åÄÖ')
        expect(formatter.camelCase('hej 👋 på dig')).toBe('hejPåDig')
    })

    it('toUpperCase och toLowerCase med åäö och unicode', () => {
        expect(formatter.toUpperCase('åäö')).toBe('ÅÄÖ')
        expect(formatter.toLowerCase('ÅÄÖ')).toBe('åäö')
        expect(formatter.toUpperCase('café')).toBe('CAFÉ')
        expect(formatter.toLowerCase('CAFÉ')).toBe('café')
    })

    it('capitalize med blandade versaler/gemener och specialtecken', () => {
        expect(formatter.capitalize('hEj på dIG!')).toBe('Hej På Dig!')
        expect(formatter.capitalize('123abc')).toBe('123Abc')
        expect(formatter.capitalize('!test text')).toBe('!Test Text')
    })

    it('camelCase med siffror och blandade tecken', () => {
        expect(formatter.camelCase('hej 123 på dig')).toBe('hejPåDig')
        expect(formatter.camelCase('test! case')).toBe('testCase')
        expect(formatter.camelCase('a b c')).toBe('aBC')
    })
})
