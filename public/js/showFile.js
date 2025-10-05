// public/showFile.js

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
