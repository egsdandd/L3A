// OBS! Denna fil är flyttad till js/uiHelpers.js. Använd INTE denna fil.
// Gemensamma hjälpfunktioner för UI-moduler

/**
 * Hämtar texten från .scrollbox
 * @returns {string}
 */
export function getText() {
  return document.querySelector('.scrollbox').innerText;
}

/**
 * Renderar ett formulär och kopplar submit till en callback
 * @param {Object} options
 * @param {string} options.id
 * @param {string} options.label
 * @param {string} options.inputId
 * @param {string} options.button
 * @param {string} options.resultId
 * @param {Function} options.onSubmit
 */
export function renderForm({ id, label, inputId, button, resultId, onSubmit }) {
  const methodList = document.getElementById('methodList');
  methodList.innerHTML += `
    <form id="${id}" style="margin-top:16px;">
      <label for="${inputId}">${label}</label>
      <input type="text" id="${inputId}" name="word" required>
      <button type="submit">${button}</button>
    </form>
    <div id="${resultId}"></div>
  `;
  document.getElementById(id).onsubmit = function(e) {
    e.preventDefault();
    onSubmit();
  };
}

/**
 * Skickar POST-request och visar resultat eller fel
 * @param {string} endpoint
 * @param {Object} extraData
 * @param {Function} resultFn
 * @param {string} resultId
 */
export function genericFetchAndResult(endpoint, extraData, resultFn, resultId) {
  const text = getText();
  const body = JSON.stringify({ text, ...extraData });
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  })
    .then(response => response.json())
    .then(res => {
      document.getElementById(resultId).innerHTML = resultFn(res);
    })
    .catch(() => {
      document.getElementById(resultId).innerHTML = '<span style="color:red;">Error.</span>';
    });
}
