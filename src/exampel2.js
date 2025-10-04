// example2.js
import fs from 'fs'
import TextDocument from 'texttoolkit';

// Get filename from command line: node example2.js README.md
const filename = process.argv[2]

if (!filename) {
    console.error('Please provide a filename as the first argument, e.g.: node example2.js examplefile.md')
    process.exit(1)
}

try {
    const text = fs.readFileSync(filename, 'utf8')
    const doc = new TextDocument(text)

    console.log('File:', filename)
    console.log('Word count:', doc.countWords())
    console.log('Sentence count:', doc.countSentences())
    console.log('Character count (including spaces):', doc.countCharacters())
    console.log('Character count (excluding spaces):', doc.countCharacters(false))
    console.log('Letter frequency:', doc.letterFrequency())
    console.log('Palindromes in text:', doc.findPalindromes())
    console.log('Uppercase:', doc.toUpperCase().slice(0, 100) + '...')
    console.log('Lowercase:', doc.toLowerCase().slice(0, 100) + '...')
    console.log('Capitalize:', doc.capitalizeWords().slice(0, 100) + '...')
    console.log('camelCase:', doc.toCamelCase())
    console.log('snake_case:', doc.toSnakeCase())
    console.log('Trimmed:', doc.trimWhitespace().slice(0, 100) + '...')
    console.log('Reversed text:', doc.reverseText().slice(0, 100) + '...')
    console.log('Find first "README":', doc.findFirst('README'))
    console.log('All "markdown":', doc.findAll('markdown'))
    console.log('Contains "code"?', doc.exists('code'))
    console.log('Regex match (all words with at least 10 letters):', doc.matchPattern(/\b[a-zA-ZåäöÅÄÖ]{10,}\b/g))
    console.log('First index of "#":', doc.searchRegexp(/#/))
    console.log('Transformed text (reverse each word, max 100):', doc.transformText(word => word.split('').reverse().join('')).slice(0, 100) + '...')
    console.log('Reversed word order:', doc.reverseWordOrder().slice(0, 100) + '...')
    // Example of replaceWord: replace "markdown" with "MD"
    const oldWord = 'markdown'
    const newWord = 'MD'

    if (doc.exists(oldWord)) {
    console.log(`The word "${oldWord}" was found!`)
    const allIdx = doc.findAll(oldWord)
    // Visa raden i originaltext där första "markdown" finns
    const firstIdx = allIdx[0]
    // Dela upp texten i rader
    const lines = text.split('\n')
    // Hitta radnummer och rad
    let lineNumber = 0
    let charCount = 0
    for (let i = 0; i < lines.length; i++) {
        charCount += lines[i].length + 1  // +1 för radslut
        if (firstIdx < charCount) {
            lineNumber = i
            break
        }
    }
    console.log(`Original line:\n${lines[lineNumber]}`)

    // Ersätt ord och visa ny rad efter byte
    const replacedText = doc.replaceWord(oldWord, newWord)
    const replacedLines = replacedText.split('\n')
    console.log(`Line after replacing "${oldWord}" with "${newWord}":\n${replacedLines[lineNumber]}`)

    // Preview runt första replacement (kan behållas)
    const pos = replacedText.indexOf(newWord)
    const start = Math.max(0, pos - 50)
    const end = Math.min(replacedText.length, pos + newWord.length + 50)
    const clip = replacedText.slice(start, end)

    console.log('All positions:', allIdx)
    console.log(`Preview around first replacement:\n...${clip}...`)
}


    // Search and replace a word that does NOT exist
    const missingWord = 'surdegsgurka'
    if (doc.exists(missingWord)) {
        console.log(`The word "${missingWord}" was found – that was unexpected!`)
        console.log('Text after replacement:', doc.replaceWord(missingWord, 'BLIXT').slice(0, 200) + '...')
    } else {
        console.log(`The word "${missingWord}" was not found in the file!`)
    }

} catch (err) {
    console.error(`Error reading file ${filename}:`, err.message)
    process.exit(1)
}
