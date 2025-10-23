import { TextAnalyzerModule } from './TextAnalyserModule.js'
import { TextFormatterModule } from './TextFormatterModule.js'
import { TextTransformerModule } from './TextTransformerModule.js'
import { TextSearcherModule } from './TextSearcherModule.js'

const analyzer = new TextAnalyzerModule()
const formatter = new TextFormatterModule()
const transformer = new TextTransformerModule()
const searcher = new TextSearcherModule()

const functionButtonPanel = document.getElementById('function-panel')
const resultDisplay = document.getElementById('result')
const userInputTextArea = document.getElementById('input-text')

// Hjälpfunktion för att skapa knapp
/**
 *
 * @param text
 * @param onClick
 */
function createButton(text, onClick) {
  const button = document.createElement('button')
  button.textContent = text
  button.addEventListener('click', onClick)
  return button
}

// Analyzer
/**
 *
 */
function showAnalyzerFunctions() {
  functionButtonPanel.innerHTML = ''
  functionButtonPanel.append(
    createButton('Räkna ord', () => {
      resultDisplay.textContent = 'Antal ord: ' + analyzer.countWords(userInputTextArea.value)
    }),
    createButton('Räkna meningar', () => {
      resultDisplay.textContent = 'Antal meningar: ' + analyzer.countSentences(userInputTextArea.value)
    }),
    createButton('Räkna tecken', () => {
      resultDisplay.textContent = 'Antal tecken: ' + analyzer.countCharacters(userInputTextArea.value)
    }),
    createButton('Bokstavsfrekvens', () => {
      const letterFrequency = analyzer.letterFrequency(userInputTextArea.value)
      resultDisplay.textContent = JSON.stringify(letterFrequency)
    }),
    createButton('Hitta palindrom', () => {
      const palindromes = analyzer.findPalindromes(userInputTextArea.value)
      resultDisplay.textContent = 'Palindrom: ' + palindromes.join(', ')
    })
  )
}

// Formatter
/**
 *
 */
function showFormatterFunctions() {
  functionButtonPanel.innerHTML = ''
  functionButtonPanel.append(
    createButton('Till versaler', () => {
      resultDisplay.textContent = formatter.toUpperCase(userInputTextArea.value)
    }),
    createButton('Till gemener', () => {
      resultDisplay.textContent = formatter.toLowerCase(userInputTextArea.value)
    }),
    createButton('Första bokstaven stor', () => {
      resultDisplay.textContent = formatter.capitalize(userInputTextArea.value)
    }),
    createButton('camelCase', () => {
      resultDisplay.textContent = formatter.camelCase(userInputTextArea.value)
    })
  )
}

// Transformer
/**
 *
 */
function showTransformerFunctions() {
  functionButtonPanel.innerHTML = ''
  functionButtonPanel.append(
    createButton('Vänd ordning', () => {
      resultDisplay.textContent = transformer.reverseWords(userInputTextArea.value)
    }),
    createButton('Sortera ord', () => {
      resultDisplay.textContent = transformer.sortWords(userInputTextArea.value)
    }),
    createButton('Blanda ord', () => {
      resultDisplay.textContent = transformer.shuffleWords(userInputTextArea.value)
    })
  )
}

// Searcher
/**
 *
 */
function showSearcherFunctions() {
  functionButtonPanel.innerHTML = ''
  // Söksträng input
  const searchQueryInput = document.createElement('input')
  searchQueryInput.type = 'text'
  searchQueryInput.placeholder = 'Sökord...'
  searchQueryInput.id = 'search-query'
  functionButtonPanel.appendChild(searchQueryInput)
  functionButtonPanel.append(
    createButton('Hitta första', () => {
      resultDisplay.textContent = 'Första: ' + searcher.findFirst(userInputTextArea.value, searchQueryInput.value)
    }),
    createButton('Hitta alla', () => {
      resultDisplay.textContent = 'Alla: ' + searcher.findAll(userInputTextArea.value, searchQueryInput.value)
    }),
    createButton('Räkna', () => {
      resultDisplay.textContent = 'Antal: ' + searcher.count(userInputTextArea.value, searchQueryInput.value)
    }),
    createButton('Finns?', () => {
      resultDisplay.textContent = searcher.exists(userInputTextArea.value, searchQueryInput.value) ? 'Ja' : 'Nej'
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
        userInputTextArea.value = evt.target.result;
      };
      reader.readAsText(file, 'utf-8');
    }
  });
}