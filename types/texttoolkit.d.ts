declare module 'texttoolkit' {
    export class TextAnalyzer {
        constructor(text: string);
        countWords(): number;
        countSentences(): number;
        countCharacters(): number;
        letterFrequency(): object;
        findPalindromes(): string[];
    }

    export class TextFormatter {
        constructor(text: string);
        toUpperCase(): string;
        toLowerCase(): string;
        capitalizeWords(): string;
        toCamelCase(): string;
        toSnakeCase(): string;
        toPascalCase(): string;
        toKebabCase(): string;
        trimWhitespace(): string;
        replaceWord(oldWord: string, newWord: string): string;
    }

    export class TextTransformer {
        constructor(text: string);
        reverseWordOrder(): string;
        replaceWord(oldWord: string, newWord: string): string;
        removeWords(wordsToRemove: string[]): string;
        filterWords(predicate: (word: string) => boolean): string;
        sortWords(): string;
        shuffleWords(): string;
    }

    export class TextSearcher {
        constructor(text: string);
        findFirst(searchTerm: string): number;
        findAll(searchTerm: string): number[];
        exists(searchTerm: string): boolean;
        count(searchTerm: string): number;
        matchPattern(pattern: string): string[];
        searchRegexp(regexp: RegExp): string[];
    }
}