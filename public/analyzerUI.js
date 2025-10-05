// OBS! Denna fil är flyttad till js/analyzerUI.js. Använd INTE denna fil.

import { getText, renderForm, genericFetchAndResult } from './uiHelpers.js';

export const analyzerMethods = [
  { label: "Total word count", action: countWordsTotal },
  { label: "Count specific word", action: showWordCountForm },
  { label: "Count sentences", action: countSentences },
  { label: "Count characters (include spaces)", action: countCharacters },
  { label: "Letter frequency", action: letterFrequency },
  { label: "Find palindromes", action: findPalindromes }
];

function countWordsTotal() {
  genericFetchAndResult('/analyzer/counttotalwords', {}, res => `Total word count in the text: <strong>${res.count}</strong>`, 'methodList');
}

function showWordCountForm() {
  renderForm({
    id: 'countWordForm',
    label: 'Which word do you want to count?',
    inputId: 'wordToCount',
    button: 'Count',
    resultId: 'wordCountResult',
    onSubmit: countSpecificWord
  });
}

function countSpecificWord() {
  const word = document.getElementById('wordToCount').value;
  genericFetchAndResult('/analyzer/countwords', { word }, res => `The word "<b>${word}</b>" appears <b>${res.count}</b> times in the text.`, 'wordCountResult');
}

function countSentences() {
  genericFetchAndResult('/analyzer/countsentences', {}, res => `Number of sentences in the text: <strong>${res.count}</strong>`, 'methodList');
}

function countCharacters() {
  genericFetchAndResult('/analyzer/countcharacters', {}, res => `Number of characters (including spaces): <strong>${res.count}</strong>`, 'methodList');
}

function letterFrequency() {
  genericFetchAndResult('/analyzer/letterfrequency', {}, res => `Letter frequency: <pre>${JSON.stringify(res.frequency, null, 2)}</pre>`, 'methodList');
}

function findPalindromes() {
  genericFetchAndResult('/analyzer/findpalindromes', {}, res => `Palindromes found: <strong>${res.palindromes.join(', ')}</strong>`, 'methodList');
}