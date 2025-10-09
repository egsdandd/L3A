// Creative Games - Word building, rhyme games, and word chains
// Contains creative word-based games

// Word Builder Game
window.startWordBuilder = function() {
  const text = getEditorText();
  if (!text) return;
  
  // Ge spelaren en begränsad uppsättning bokstäver att arbeta med
  const availableLetters = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'];
  const words = text.split(/\s+/).filter(w => w.length >= 3);
  
  const gameHtml = `
    <h4>🏗️ Ordbyggare!</h4>
    <p>Använd dessa bokstäver för att bygga ord: <strong>${availableLetters.join(', ')}</strong></p>
    <p>Bygg så många riktiga ord som möjligt! (minst 3 bokstäver)</p>
    <input type="text" id="builderInput" placeholder="Skriv ett ord..." maxlength="10">
    <button onclick="addWord()">Lägg till ord</button>
    <button onclick="checkBuiltWords()">Kontrollera alla ord</button>
    <button onclick="resetWordBuilder()">Börja om</button>
    <div id="builtWords" style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;">Dina ord: <em>inga än</em></div>
    <div id="builderResult"></div>
  `;
  
  showGamingResult(gameHtml);
  window.builtWordsList = [];
  window.availableLetters = availableLetters;
};

window.addWord = function() {
  const word = document.getElementById('builderInput').value.trim().toLowerCase();
  const display = document.getElementById('builtWords');
  const result = document.getElementById('builderResult');
  
  if (!word) return;
  
  // Kontrollera att ordet är minst 3 bokstäver
  if (word.length < 3) {
    result.innerHTML = '❌ Ordet måste vara minst 3 bokstäver långt!';
    result.className = 'result-error';
    return;
  }
  
  // Kontrollera att endast tillåtna bokstäver används
  const wordLetters = word.toUpperCase().split('');
  const canBuild = wordLetters.every(letter => 
    window.availableLetters.includes(letter)
  );
  
  if (!canBuild) {
    result.innerHTML = '❌ Ordet innehåller bokstäver som inte finns tillgängliga!';
    result.className = 'result-error';
    return;
  }
  
  // Kontrollera att ordet inte redan finns
  if (window.builtWordsList.includes(word)) {
    result.innerHTML = '❌ Du har redan lagt till det ordet!';
    result.className = 'result-error';
    return;
  }
  
  // Lägg till ordet
  window.builtWordsList.push(word);
  display.innerHTML = window.builtWordsList.length > 0 
    ? 'Dina ord: ' + window.builtWordsList.join(', ')
    : 'Dina ord: <em>inga än</em>';
  document.getElementById('builderInput').value = '';
  result.innerHTML = '✅ Ordet "' + word + '" tillagt!';
  result.className = 'result-success';
};

window.checkBuiltWords = function() {
  const result = document.getElementById('builderResult');
  const wordCount = window.builtWordsList.length;
  
  if (wordCount === 0) {
    result.innerHTML = '❌ Du har inte byggt några ord än!';
    result.className = 'result-error';
    return;
  }
  
  // Lista över vanliga svenska ord som kan byggas med de tillgängliga bokstäverna
  const validWords = ['sol', 'rot', 'lot', 'not', 'son', 'ton', 'rus', 'sur', 'tur', 'nur', 
                     'ans', 'sen', 'ten', 'ren', 'len', 'neo', 'ore', 'ose', 'one', 'ole',
                     'salt', 'last', 'lost', 'lust', 'rust', 'turn', 'torn', 'snor', 'soul',
                     'sole', 'role', 'note', 'nose', 'rose', 'lose', 'tone', 'tune', 'sure',
                     'true', 'rest', 'nest', 'test', 'lent', 'sent', 'rent', 'sunt'];
  
  const correctWords = window.builtWordsList.filter(word => 
    validWords.includes(word.toLowerCase())
  );
  
  let message = `🎯 Resultat: Du byggde ${wordCount} ord!\n`;
  
  if (correctWords.length > 0) {
    message += `✅ Giltiga ord (${correctWords.length}): ${correctWords.join(', ')}\n`;
  }
  
  const invalidWords = window.builtWordsList.filter(word => 
    !validWords.includes(word.toLowerCase())
  );
  
  if (invalidWords.length > 0) {
    message += `❓ Okända ord: ${invalidWords.join(', ')}`;
  }
  
  if (correctWords.length >= 5) {
    message += '\n🏆 Fantastiskt! Du är en riktig ordbyggare!';
  } else if (correctWords.length >= 3) {
    message += '\n👍 Bra jobbat!';
  }
  
  result.innerHTML = message.replace(/\n/g, '<br>');
  result.className = correctWords.length > 0 ? 'result-success' : 'result-error';
};

window.resetWordBuilder = function() {
  window.builtWordsList = [];
  document.getElementById('builtWords').innerHTML = 'Dina ord: <em>inga än</em>';
  document.getElementById('builderResult').innerHTML = '';
  document.getElementById('builderInput').value = '';
};

// Rhyme Game
window.startRhymeGame = function() {
  const gameHtml = `
    <h4>🎵 Rimspel!</h4>
    <p>Hitta ord som rimmar med: <strong>KATT</strong></p>
    <input type="text" id="rhymeInput" placeholder="Skriv ett rim...">
    <button onclick="checkRhyme()">Kontrollera rim!</button>
    <div id="rhymeResult"></div>
  `;
  
  showGamingResult(gameHtml);
};

window.checkRhyme = function() {
  const rhyme = document.getElementById('rhymeInput').value.toLowerCase();
  const result = document.getElementById('rhymeResult');
  const rhymes = ['matt', 'hatt', 'fatt', 'satt', 'vatt'];
  
  if (rhymes.includes(rhyme)) {
    result.innerHTML = '🎉 Perfekt rim! ' + rhyme + ' rimmar på katt!';
    result.className = 'result-success';
  } else {
    result.innerHTML = '❌ Försök med ett annat ord som rimmar på katt...';
    result.className = 'result-error';
  }
};

// Word Chain Game
window.startWordChain = function() {
  const gameHtml = `
    <h4>🔗 Ordkedja!</h4>
    <p>Skapa en kedja där varje ord börjar med sista bokstaven i föregående ord</p>
    <p>Startord: <strong>HUND</strong></p>
    <input type="text" id="chainInput" placeholder="Nästa ord (börjar med D)...">
    <button onclick="addToChain()">Lägg till i kedja</button>
    <div id="chainDisplay">Kedja: HUND → </div>
    <div id="chainResult"></div>
  `;
  
  showGamingResult(gameHtml);
  window.currentChain = ['HUND'];
  window.lastLetter = 'd';
};

window.addToChain = function() {
  const word = document.getElementById('chainInput').value.trim().toUpperCase();
  const result = document.getElementById('chainResult');
  const display = document.getElementById('chainDisplay');
  
  if (word.charAt(0).toLowerCase() === window.lastLetter) {
    window.currentChain.push(word);
    window.lastLetter = word.charAt(word.length - 1).toLowerCase();
    display.innerHTML = 'Kedja: ' + window.currentChain.join(' → ') + ' → ';
    document.getElementById('chainInput').value = '';
    document.getElementById('chainInput').placeholder = `Nästa ord (börjar med ${window.lastLetter.toUpperCase()})...`;
    result.innerHTML = `✅ Bra! Nästa ord ska börja med "${window.lastLetter.toUpperCase()}"`;
    result.className = 'result-success';
  } else {
    result.innerHTML = `❌ Ordet måste börja med "${window.lastLetter.toUpperCase()}"`;
    result.className = 'result-error';
  }
};