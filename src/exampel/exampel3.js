import TextDocument from 'texttoolkit'
                            //01234567890123456789012345678901234567890
const doc = new TextDocument('Anna swims quickly, Otto laughs loudly.')

// Analysis
console.log('Analysis: ')
console.log(doc.countWords()) // 6
console.log(doc.countSentences()) // 1
console.log(doc.letterFrequency()) // { a:3, n:2, ... }
console.log(doc.findPalindromes()) // ['anna', 'otto']
console.log(doc.getStats()) // { words: 6, sentences: 1, characters: 39, ... }

// Formatting
console.log('\nFormatting: ')
console.log(doc.toUpperCase()) // "ANNA SWIMS QUICKLY, OTTO LAUGHS LOUDLY."
console.log(doc.toCamelCase()) // "annaSwimsQuicklyOttoLaughsLoudly"
console.log(doc.toPascalCase()) // "AnnaSwimsQuicklyOttoLaughsLoudly"
console.log(doc.toKebabCase()) // "anna-swims-quickly-otto-laughs-loudly"

// Transformation
console.log('\nTransformation: ')
console.log(doc.reverseWordOrder()) // "loudly. laughs Otto quickly, swims Anna"
console.log(doc.replaceWord('Anna', 'Eva')) // "Eva swims quickly, Otto laughs loudly."
console.log(doc.removeWords(['quickly', 'loudly'])) // "Anna swims, Otto laughs."
console.log(doc.sortWords()) // "Anna Otto laughs loudly quickly swims"
console.log(doc.shuffleWords()) // Random word order

// Reversal
console.log('\nReversal: ')
console.log(doc.reverse()) // ".ylduol shgual otO ,ylkciuq smiws annA"
console.log(doc.reverseWordsIndividually()) // "annA smiws ylkciuq, ottO shgual .ylduol"
console.log(doc.isPalindrome()) // false

// Searching
console.log('\nSearching: ')
console.log(doc.findFirst('Otto')) // 20
console.log(doc.findAll('ly', false)) // Case-insensitive search
console.log(doc.count('ly')) // 2
console.log(doc.exists('quickly')) // true
console.log(doc.matchPattern(/[A-Z][a-z]+/g)) // ['Anna', 'Otto']
