// public/showFile.js
const methods = {
  TextAnalyzer: [
    "Total word count",       // New option
    "Count specific word",    // New option for individual word
    "countSentences()",
    "countCharacters(includeSpaces)",
    "letterFrequency()",
    "findPalindromes()"
  ],
  // Other categories...

  TextFormatter: [
    "toUpperCase()",
    "toLowerCase()",
    "capitalizeWords()",
    "toCamelCase()",
    "toSnakeCase()",
    "trimWhitespace()"
  ],
  TextTransformer: [
    "transformWords(transformFn)",
    "reverseWordOrder()",
    "replaceWord(oldWord, newWord)"
  ],
  TextSearcher: [
    "findFirst(substring, caseSensitive)",
    "findAll(substring, caseSensitive)",
    "exists(substring, caseSensitive)",
    "matchPattern(pattern)",
    "searchRegexp(regexp)"
  ],
  TextReverser: [
    "reverse()",
    "reverseWordsIndividually()",
    "reverseWordOrder()",
    "reverseLines()",
    "reverseLongWords(minLength)",
    "reverseEachSentence()",
    "isPalindrome(ignoreCase)",
    "reverseAndCapitalizeWords()"
  ]
};

function showMethods(category) {
  document.getElementById('methodList').innerHTML =
    "<strong>Välj metod:</strong><br>" +
    methods[category].map(m =>
      `<button onclick="chooseMethod('${category}','${m.replace(/'/g,"\\'")}')">${m}</button>`
    ).join(' ');
}

function chooseMethod(category, method) {
  if (category === "TextAnalyzer" && method.startsWith("countWords")) {
    countWordsAction();
  } else {
    alert(`Du valde ${category}.${method}`);
  }
}

function chooseMethod(category, method) {
  if (category === "TextAnalyzer" && method === "Total word count") {
    countWordsTotalAction();
  } else if (category === "TextAnalyzer" && method === "Count specific word") {
    showWordCountForm();
  } else {
    alert(`You selected ${category}.${method}`);
  }
}

// Count ALL words:
function countWordsTotalAction() {
  const text = document.querySelector('.scrollbox').innerText;
  fetch('/analyzer/counttotalwords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  .then(response => response.json())
  .then(res => {
    document.getElementById('methodList').innerHTML +=
      `<div style="margin-top:10px;">Total word count in the text: <strong>${res.count}</strong></div>`;
  })
  .catch(err => {
    document.getElementById('methodList').innerHTML +=
      `<span style="color:red;">Could not count words.</span>`;
  });
}

// Count a SPECIFIC word:
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
    countWordAction();
  };
}

function countWordAction() {
  const text = document.querySelector('.scrollbox').innerText;
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
  .catch(err => {
    document.getElementById('wordCountResult').innerHTML =
      `<span style="color:red;">Could not count the word.</span>`;
  });
}
