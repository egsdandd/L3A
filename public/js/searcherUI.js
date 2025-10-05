// searcherUI.js
import { getText, renderForm, genericFetchAndResult } from './uiHelpers.js';
// UI-funktioner för TextSearcher

export const searcherMethods = [
  { label: "Find first occurrence", action: showFindFirstForm },
  { label: "Find all occurrences", action: showFindAllForm },
  { label: "Exists?", action: showExistsForm },
  { label: "Count occurrences", action: showCountForm },
  { label: "Match pattern (RegExp)", action: showMatchPatternForm },
  { label: "Search RegExp index", action: showSearchRegexpForm },
  { label: "Test RegExp pattern", action: showTestPatternForm }
];

// --- Find first occurrence ---
function showFindFirstForm() {
  renderForm({
    id: 'findFirstForm',
    label: 'Find first occurrence of:',
    inputId: 'findFirstQuery',
    button: 'Find',
    resultId: 'findFirstResult',
    onSubmit: findFirst
  });
}
function findFirst() {
  const query = document.getElementById('findFirstQuery').value;
  genericFetchAndResult('/searcher/findfirst', { query }, res => `First occurrence of "<b>${query}</b>": <b>${res.index}</b>`, 'findFirstResult');
}

// --- Find all occurrences ---
function showFindAllForm() {
  renderForm({
    id: 'findAllForm',
    label: 'Find all occurrences of:',
    inputId: 'findAllQuery',
    button: 'Find All',
    resultId: 'findAllResult',
    onSubmit: findAll
  });
}
function findAll() {
  const query = document.getElementById('findAllQuery').value;
  genericFetchAndResult('/searcher/findall', { query }, res => `All occurrences of "<b>${query}</b>": <b>${res.indexes.join(', ')}</b>`, 'findAllResult');
}

// --- Exists ---
function showExistsForm() {
  renderForm({
    id: 'existsForm',
    label: 'Check if exists:',
    inputId: 'existsQuery',
    button: 'Check',
    resultId: 'existsResult',
    onSubmit: findExists
  });
}
function findExists() {
  const query = document.getElementById('existsQuery').value;
  genericFetchAndResult('/searcher/exists', { query }, res => `Exists: <b>${res.exists ? 'Yes' : 'No'}</b>`, 'existsResult');
}

// --- Count ---
function showCountForm() {
  renderForm({
    id: 'countForm',
    label: 'Count occurrences of:',
    inputId: 'countQuery',
    button: 'Count',
    resultId: 'countResult',
    onSubmit: findCount
  });
}
function findCount() {
  const query = document.getElementById('countQuery').value;
  genericFetchAndResult('/searcher/count', { query }, res => `Count: <b>${res.count}</b>`, 'countResult');
}

// --- Match Pattern ---
function showMatchPatternForm() {
  renderForm({
    id: 'matchPatternForm',
    label: 'RegExp pattern:',
    inputId: 'patternQuery',
    button: 'Match',
    resultId: 'matchPatternResult',
    onSubmit: findMatchPattern
  });
}
function findMatchPattern() {
  const pattern = document.getElementById('patternQuery').value;
  genericFetchAndResult('/searcher/matchpattern', { pattern }, res => `Matches: <b>${res.matches.join(', ')}</b>`, 'matchPatternResult');
}

// --- Search RegExp ---
function showSearchRegexpForm() {
  renderForm({
    id: 'searchRegexpForm',
    label: 'RegExp pattern:',
    inputId: 'searchRegexpQuery',
    button: 'Search',
    resultId: 'searchRegexpResult',
    onSubmit: findSearchRegexp
  });
}
function findSearchRegexp() {
  const pattern = document.getElementById('searchRegexpQuery').value;
  genericFetchAndResult('/searcher/searchregexp', { pattern }, res => `First RegExp match index: <b>${res.index}</b>`, 'searchRegexpResult');
}

// --- Test Pattern ---
function showTestPatternForm() {
  renderForm({
    id: 'testPatternForm',
    label: 'RegExp pattern:',
    inputId: 'testPatternQuery',
    button: 'Test',
    resultId: 'testPatternResult',
    onSubmit: findTestPattern
  });
}
function findTestPattern() {
  const pattern = document.getElementById('testPatternQuery').value;
  genericFetchAndResult('/searcher/testpattern', { pattern }, res => `Pattern matches: <b>${res.matches ? 'Yes' : 'No'}</b>`, 'testPatternResult');
}
