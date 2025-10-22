import { TextAnalyzerModule } from './TextAnalyserModule.js'
import { TextFormatterModule } from './TextFormatterModule.js'
import { TextTransformerModule } from './TextTransformerModule.js'
import { TextSearcherModule } from './TextSearcherModule.js'

const analyzer = new TextAnalyzerModule()
const formatter = new TextFormatterModule()
const transformer = new TextTransformerModule()
const searcher = new TextSearcherModule()

const functionPanel = document.getElementById('function-panel')
const resultBox = document.getElementById('result')
const inputText = document.getElementById('input-text')

// Hjälpfunktion för att skapa knapp
/**
 *
 * @param text
 * @param onClick
 */
function createButton(text, onClick) {
  const btn = document.createElement('button')
  btn.textContent = text
  btn.addEventListener('click', onClick)
  return btn
}

// Analyzer
/**
 *
 */
function showAnalyzerFunctions() {
  functionPanel.innerHTML = ''
  functionPanel.append(
    createButton('Räkna ord', () => {
      resultBox.textContent = 'Antal ord: ' + analyzer.countWords(inputText.value)
    }),
    createButton('Räkna meningar', () => {
      resultBox.textContent = 'Antal meningar: ' + analyzer.countSentences(inputText.value)
    }),
    createButton('Räkna tecken', () => {
      resultBox.textContent = 'Antal tecken: ' + analyzer.countCharacters(inputText.value)
    }),
    createButton('Bokstavsfrekvens', () => {
      const freq = analyzer.letterFrequency(inputText.value)
      resultBox.textContent = JSON.stringify(freq)
    }),
    createButton('Hitta palindrom', () => {
      const palindromes = analyzer.findPalindromes(inputText.value)
      resultBox.textContent = 'Palindrom: ' + palindromes.join(', ')
    })
  )
}

// Formatter
/**
 *
 */
function showFormatterFunctions() {
  functionPanel.innerHTML = ''
  functionPanel.append(
    createButton('Till versaler', () => {
      resultBox.textContent = formatter.toUpperCase(inputText.value)
    }),
    createButton('Till gemener', () => {
      resultBox.textContent = formatter.toLowerCase(inputText.value)
    }),
    createButton('Första bokstaven stor', () => {
      resultBox.textContent = formatter.capitalize(inputText.value)
    }),
    createButton('camelCase', () => {
      resultBox.textContent = formatter.camelCase(inputText.value)
    })
  )
}

// Transformer
/**
 *
 */
function showTransformerFunctions() {
  functionPanel.innerHTML = ''
  functionPanel.append(
    createButton('Vänd ordning', () => {
      resultBox.textContent = transformer.reverseWords(inputText.value)
    }),
    createButton('Sortera ord', () => {
      resultBox.textContent = transformer.sortWords(inputText.value)
    }),
    createButton('Blanda ord', () => {
      resultBox.textContent = transformer.shuffleWords(inputText.value)
    })
  )
}

// Searcher
/**
 *
 */
function showSearcherFunctions() {
  functionPanel.innerHTML = ''
  // Söksträng input
  const queryInput = document.createElement('input')
  queryInput.type = 'text'
  queryInput.placeholder = 'Sökord...'
  queryInput.id = 'search-query'
  functionPanel.appendChild(queryInput)
  functionPanel.append(
    createButton('Hitta första', () => {
      resultBox.textContent = 'Första: ' + searcher.findFirst(inputText.value, queryInput.value)
    }),
    createButton('Hitta alla', () => {
      resultBox.textContent = 'Alla: ' + searcher.findAll(inputText.value, queryInput.value)
    }),
    createButton('Räkna', () => {
      resultBox.textContent = 'Antal: ' + searcher.count(inputText.value, queryInput.value)
    }),
    createButton('Finns?', () => {
      resultBox.textContent = searcher.exists(inputText.value, queryInput.value) ? 'Ja' : 'Nej'
    })
  )
}

// Koppla modulknappar

document.getElementById('analyzer-btn').addEventListener('click', showAnalyzerFunctions)
document.getElementById('formatter-btn').addEventListener('click', showFormatterFunctions)
document.getElementById('transformer-btn').addEventListener('click', showTransformerFunctions)
document.getElementById('searcher-btn').addEventListener('click', showSearcherFunctions)

// Läs in textfil och sätt i textarea
const fileInput = document.getElementById('file-input');
if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        inputText.value = evt.target.result;
      };
      reader.readAsText(file, 'utf-8');
    }
  });
}