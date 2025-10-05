// OBS! Denna fil är flyttad till js/showFile.js. Använd INTE denna fil.

import { analyzerMethods } from './analyzerUI.js';
import { searcherMethods } from './searcherUI.js';

const methods = {
  TextAnalyzer: analyzerMethods,
  TextSearcher: searcherMethods
};

// Gör showMethods och handleMethod globala så de funkar med EJS-knappar
window.showMethods = function(category) {
  const methodList = methods[category] || [];
  document.getElementById('methodList').innerHTML =
    '<strong>Välj metod:</strong><br>' +
    methodList.map((m, i) =>
      `<button onclick="window.handleMethod('${category}', ${i})">${m.label}</button>`
    ).join(' ');
};

window.handleMethod = function(category, methodIndex) {
  const method = methods[category][methodIndex];
  if (method && typeof method.action === 'function') {
    method.action();
  } else {
    alert(`No action defined for ${category}.${method ? method.label : ''}`);
  }
};

// --- TextSearcher: Exists ---
function showExistsForm() {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="existsForm" style="margin-top:16px;">
      <label for="existsQuery">Check if exists:</label>
      <input type="text" id="existsQuery" name="query" required>
      <button type="submit">Check</button>
    </form>
    <div id="existsResult"></div>
  `;
  document.getElementById('existsForm').onsubmit = function(e) {
    e.preventDefault();
    findExists();
  };
}
function findExists() {
  const text = getText();
  const query = document.getElementById('existsQuery').value;
  fetch('/searcher/exists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, query })
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById('existsResult').innerHTML =
        `Exists: <b>${res.exists ? 'Yes' : 'No'}</b>`;
    })
    .catch(() => {
      document.getElementById('existsResult').innerHTML =
        '<span style="color:red;">Could not check existence.</span>';
    });
}

// --- TextSearcher: Count ---
function showCountForm() {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="countForm" style="margin-top:16px;">
      <label for="countQuery">Count occurrences of:</label>
      <input type="text" id="countQuery" name="query" required>
      <button type="submit">Count</button>
    </form>
    <div id="countResult"></div>
  `;
  document.getElementById('countForm').onsubmit = function(e) {
    e.preventDefault();
    findCount();
  };
}
function findCount() {
  const text = getText();
  const query = document.getElementById('countQuery').value;
  fetch('/searcher/count', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, query })
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById('countResult').innerHTML =
        `Count: <b>${res.count}</b>`;
    })
    .catch(() => {
      document.getElementById('countResult').innerHTML =
        '<span style="color:red;">Could not count occurrences.</span>';
    });
}

// --- TextSearcher: Match Pattern ---
function showMatchPatternForm() {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="matchPatternForm" style="margin-top:16px;">
      <label for="patternQuery">RegExp pattern:</label>
      <input type="text" id="patternQuery" name="pattern" required>
      <button type="submit">Match</button>
    </form>
    <div id="matchPatternResult"></div>
  `;
  document.getElementById('matchPatternForm').onsubmit = function(e) {
    e.preventDefault();
    findMatchPattern();
  };
}
function findMatchPattern() {
  const text = getText();
  const pattern = document.getElementById('patternQuery').value;
  fetch('/searcher/matchpattern', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, pattern })
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById('matchPatternResult').innerHTML =
        `Matches: <b>${res.matches.join(', ')}</b>`;
    })
    .catch(() => {
      document.getElementById('matchPatternResult').innerHTML =
        '<span style="color:red;">Could not match pattern.</span>';
    });
}

// --- TextSearcher: Search RegExp ---
function showSearchRegexpForm() {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="searchRegexpForm" style="margin-top:16px;">
      <label for="searchRegexpQuery">RegExp pattern:</label>
      <input type="text" id="searchRegexpQuery" name="pattern" required>
      <button type="submit">Search</button>
    </form>
    <div id="searchRegexpResult"></div>
  `;
  document.getElementById('searchRegexpForm').onsubmit = function(e) {
    e.preventDefault();
    findSearchRegexp();
  };
}
function findSearchRegexp() {
  const text = getText();
  const pattern = document.getElementById('searchRegexpQuery').value;
  fetch('/searcher/searchregexp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, pattern })
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById('searchRegexpResult').innerHTML =
        `First RegExp match index: <b>${res.index}</b>`;
    })
    .catch(() => {
      document.getElementById('searchRegexpResult').innerHTML =
        '<span style="color:red;">Could not search RegExp.</span>';
    });
}

// --- TextSearcher: Test Pattern ---
function showTestPatternForm() {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="testPatternForm" style="margin-top:16px;">
      <label for="testPatternQuery">RegExp pattern:</label>
      <input type="text" id="testPatternQuery" name="pattern" required>
      <button type="submit">Test</button>
    </form>
    <div id="testPatternResult"></div>
  `;
  document.getElementById('testPatternForm').onsubmit = function(e) {
    e.preventDefault();
    findTestPattern();
  };
}
function findTestPattern() {
  const text = getText();
  const pattern = document.getElementById('testPatternQuery').value;
  fetch('/searcher/testpattern', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, pattern })
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById('testPatternResult').innerHTML =
        `Pattern matches: <b>${res.matches ? 'Yes' : 'No'}</b>`;
    })
    .catch(() => {
      document.getElementById('testPatternResult').innerHTML =
        '<span style="color:red;">Could not test pattern.</span>';
    });
}

// --- TextSearcher-funktioner ---
function showFindFirstForm() {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="findFirstForm" style="margin-top:16px;">
      <label for="findFirstQuery">Find first occurrence of:</label>
      <input type="text" id="findFirstQuery" name="query" required>
      <button type="submit">Find</button>
    </form>
    <div id="findFirstResult"></div>
  `;
  document.getElementById('findFirstForm').onsubmit = function(e) {
    e.preventDefault();
    findFirst();
  };
}

function findFirst() {
  const text = getText();
  const query = document.getElementById('findFirstQuery').value;
  fetch('/searcher/findfirst', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, query })
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById('findFirstResult').innerHTML =
        `First occurrence of "<b>${query}</b>": <b>${res.index}</b>`;
    })
    .catch(() => {
      document.getElementById('findFirstResult').innerHTML =
        '<span style="color:red;">Could not find first occurrence.</span>';
    });
}

function showFindAllForm() {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="findAllForm" style="margin-top:16px;">
      <label for="findAllQuery">Find all occurrences of:</label>
      <input type="text" id="findAllQuery" name="query" required>
      <button type="submit">Find All</button>
    </form>
    <div id="findAllResult"></div>
  `;
  document.getElementById('findAllForm').onsubmit = function(e) {
    e.preventDefault();
    findAll();
  };
}

function findAll() {
  const text = getText();
  const query = document.getElementById('findAllQuery').value;
  fetch('/searcher/findall', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, query })
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById('findAllResult').innerHTML =
        `All occurrences of "<b>${query}</b>": <b>${res.indexes.join(', ')}</b>`;
    })
    .catch(() => {
      document.getElementById('findAllResult').innerHTML =
        '<span style="color:red;">Could not find all occurrences.</span>';
    });
}

// Nedan är stubbar för de nya metoderna. Implementera dem efter behov.

function countCharacters() {
  const text = getText();
  fetch('/analyzer/countcharacters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(res => {
      appendResult(`Number of characters (including spaces): <strong>${res.count}</strong>`);
    })
    .catch(() => {
      appendResult('<span style="color:red;">Could not count characters.</span>');
    });
}

function letterFrequency() {
  const text = getText();
  fetch('/analyzer/letterfrequency', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(res => {
      appendResult(`Letter frequency: <pre>${JSON.stringify(res.frequency, null, 2)}</pre>`);
    })
    .catch(() => {
      appendResult('<span style="color:red;">Could not get letter frequency.</span>');
    });
}

function findPalindromes() {
  const text = getText();
  fetch('/analyzer/findpalindromes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(res => {
      appendResult(`Palindromes found: <strong>${res.palindromes.join(', ')}</strong>`);
    })
    .catch(() => {
      appendResult('<span style="color:red;">Could not find palindromes.</span>');
    });
}




function showMethods(category) {
  const methodList = methods[category] || [];
  document.getElementById('methodList').innerHTML =
    '<strong>Välj metod:</strong><br>' +
    methodList.map((m, i) =>
      `<button onclick="window.handleMethod('${category}', ${i})">${m.label}</button>`
    ).join(' ');
}



window.handleMethod = function(category, methodIndex) {
  const method = methods[category][methodIndex];
  if (method && typeof method.action === 'function') {
    method.action();
  } else {
    alert(`No action defined for ${category}.${method ? method.label : ''}`);
  }
}



function countWordsTotal() {
  const text = getText();
  fetch('/analyzer/counttotalwords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(res => {
      appendResult(`Total word count in the text: <strong>${res.count}</strong>`);
    })
    .catch(() => {
      appendResult('<span style="color:red;">Could not count words.</span>');
    });
}


function showWordCountForm() {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="countWordForm" style="margin-top:16px;">
      <label for="wordToCount">Which word do you want to count?</label>
      <input type="text" id="wordToCount" name="word" required>
      <button type="submit">Count</button>
    </form>
    <div id="wordCountResult"></div>
  `;
  document.getElementById('countWordForm').onsubmit = function(e) {
    e.preventDefault();
    countSpecificWord();
  };
}


function countSpecificWord() {
  const text = getText();
  const word = document.getElementById('wordToCount').value;
  fetch('/analyzer/countwords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, word })
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById('wordCountResult').innerHTML =
        `The word "<b>${word}</b>" appears <b>${res.count}</b> times in the text.`;
    })
    .catch(() => {
      document.getElementById('wordCountResult').innerHTML =
        '<span style="color:red;">Could not count the word.</span>';
    });
}


function countSentences() {
  const text = getText();
  fetch('/analyzer/countsentences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(res => {
      appendResult(`Number of sentences in the text: <strong>${res.count}</strong>`);
    })
    .catch(() => {
      appendResult('<span style="color:red;">Could not count sentences.</span>');
    });
}

// Hjälpfunktioner
function getText() {
  return document.querySelector('.scrollbox').innerText;
}

function appendResult(html) {
  document.getElementById('methodList').innerHTML += `<div style="margin-top:10px;">${html}</div>`;
}
