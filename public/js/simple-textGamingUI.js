// Simple version of textGamingUI.js
console.log('Loading simple textGamingUI...');

export const textGamingMethods = {
  'Text Gaming Hub': () => createSimpleGamingInterface()
};

function createSimpleGamingInterface() {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="module-container gaming">
      <h1>🎮 Text Gaming Hub (Simple Version)</h1>
      <p>Interaktiva textspel och utmaningar</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
        <button onclick="startWordGuess()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🎯 Gissa Ordet
        </button>
        <button onclick="startWordScramble()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔀 Ordpussel
        </button>
        <button onclick="startWordBuilder()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🏗️ Ordbyggare
        </button>
        <button onclick="startRhymeGame()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🎵 Rimspel
        </button>
        <button onclick="startWordChain()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🔗 Ordkedja
        </button>
        <button onclick="startTextMemory()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px; border-radius: 8px; cursor: pointer;">
          🧠 Minnestest
        </button>
      </div>
      
      <div id="simpleGamingResults" style="background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 8px; margin-top: 20px; display: none;">
        <h3>Spelresultat:</h3>
        <div id="gamingResultsContent"></div>
      </div>
    </div>
  `;
  
  return container;
}

// Global gaming functions
window.startWordGuess = function() {
  const text = getGamingText();
  if (!text) return;
  
  const words = text.split(/\s+/).filter(w => w.length > 3);
  if (words.length === 0) {
    alert('Texten innehåller inga ord som är längre än 3 tecken!');
    return;
  }
  
  const randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  const hiddenWord = randomWord.replace(/./g, '_');
  
  const gameHtml = `
    <h4>🎯 Gissa Ordet!</h4>
    <p>Ordet har ${randomWord.length} bokstäver: <strong>${hiddenWord}</strong></p>
    <p>Ledtråd: Ordet finns i texten du laddade upp</p>
    <input type="text" id="guessInput" placeholder="Skriv din gissning...">
    <button onclick="checkGuess('${randomWord}')">Gissa!</button>
    <div id="guessResult"></div>
  `;
  
  showGamingResult(gameHtml);
};

window.checkGuess = function(correctWord) {
  const guess = document.getElementById('guessInput').value.toLowerCase();
  const result = document.getElementById('guessResult');
  
  if (guess === correctWord) {
    result.innerHTML = '🎉 Rätt! Du gissade ordet: ' + correctWord;
    result.className = 'result-success';
  } else {
    result.innerHTML = '❌ Fel! Försök igen...';
    result.className = 'result-error';
  }
};

window.startWordScramble = function() {
  const text = getGamingText();
  if (!text) return;
  
  const words = text.split(/\s+/).filter(w => w.length > 4);
  const word = words[Math.floor(Math.random() * words.length)];
  const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
  
  const gameHtml = `
    <h4>🔀 Ordpussel!</h4>
    <p>Ordna bokstäverna: <strong>${scrambled}</strong></p>
    <input type="text" id="scrambleInput" placeholder="Skriv det rätta ordet...">
    <button onclick="checkScramble('${word.toLowerCase()}')">Kontrollera!</button>
    <div id="scrambleResult"></div>
  `;
  
  showGamingResult(gameHtml);
};

window.checkScramble = function(correctWord) {
  const answer = document.getElementById('scrambleInput').value.toLowerCase();
  const result = document.getElementById('scrambleResult');
  
  if (answer === correctWord) {
    result.innerHTML = '🎉 Rätt! Ordet var: ' + correctWord;
    result.className = 'result-success';
  } else {
    result.innerHTML = '❌ Fel! Försök igen...';
    result.className = 'result-error';
  }
};

window.startWordBuilder = function() {
  const text = getGamingText();
  if (!text) return;
  
  const words = text.split(/\s+/);
  const letters = [...new Set(text.toLowerCase().replace(/[^a-zåäö]/g, ''))];
  
  const gameHtml = `
    <h4>🏗️ Ordbyggare!</h4>
    <p>Använd dessa bokstäver: <strong>${letters.join(', ')}</strong></p>
    <p>Skapa så många ord som möjligt!</p>
    <input type="text" id="builderInput" placeholder="Skriv ett ord...">
    <button onclick="addWord()">Lägg till ord</button>
    <button onclick="checkBuiltWords('${JSON.stringify(words)}')">Kontrollera alla ord</button>
    <div id="builtWords">Dina ord: </div>
    <div id="builderResult"></div>
  `;
  
  showGamingResult(gameHtml);
  window.builtWordsList = [];
};

window.addWord = function() {
  const word = document.getElementById('builderInput').value.trim();
  const display = document.getElementById('builtWords');
  
  if (word && !window.builtWordsList.includes(word)) {
    window.builtWordsList.push(word);
    display.innerHTML = 'Dina ord: ' + window.builtWordsList.join(', ');
    document.getElementById('builderInput').value = '';
  }
};

window.checkBuiltWords = function(originalWords) {
  const words = JSON.parse(originalWords);
  const result = document.getElementById('builderResult');
  const validWords = window.builtWordsList.filter(w => 
    words.some(orig => orig.toLowerCase() === w.toLowerCase())
  );
  
  if (validWords.length > 0) {
    result.innerHTML = `🎉 Du hittade ${validWords.length} giltiga ord: ${validWords.join(', ')}`;
    result.className = 'result-success';
  } else {
    result.innerHTML = '❌ Inga ord matchade originaltexten. Försök igen!';
    result.className = 'result-error';
  }
};

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

window.startTextMemory = function() {
  const text = getGamingText();
  if (!text) return;
  
  const words = text.split(/\s+/).slice(0, 10);
  const gameHtml = `
    <h4>🧠 Minnestest!</h4>
    <p>Memorera dessa ord i 10 sekunder:</p>
    <div id="memoryWords" style="font-size: 1.2em; padding: 20px; background: #f0f0f0; margin: 10px 0;">
      ${words.join(' • ')}
    </div>
    <button onclick="hideWordsAndTest('${JSON.stringify(words)}')">Starta test!</button>
    <div id="memoryTest" style="display: none;">
      <p>Skriv alla ord du kommer ihåg (separera med komma):</p>
      <textarea id="memoryInput" placeholder="ord1, ord2, ord3..."></textarea>
      <button onclick="checkMemory('${JSON.stringify(words)}')">Kontrollera minne</button>
    </div>
    <div id="memoryResult"></div>
  `;
  
  showGamingResult(gameHtml);
};

window.hideWordsAndTest = function(wordsJson) {
  setTimeout(() => {
    document.getElementById('memoryWords').style.display = 'none';
    document.getElementById('memoryTest').style.display = 'block';
  }, 10000);
};

window.checkMemory = function(originalWordsJson) {
  const originalWords = JSON.parse(originalWordsJson);
  const remembered = document.getElementById('memoryInput').value
    .split(',')
    .map(w => w.trim().toLowerCase());
  
  const correct = remembered.filter(w => 
    originalWords.some(orig => orig.toLowerCase() === w)
  );
  
  const result = document.getElementById('memoryResult');
  const score = Math.round((correct.length / originalWords.length) * 100);
  
  result.innerHTML = `
    🧠 Minnesresultat: ${correct.length}/${originalWords.length} ord rätt (${score}%)
    <br>Rätta ord: ${correct.join(', ')}
  `;
  result.className = score >= 70 ? 'result-success' : 'result-error';
};

function showGamingResult(content) {
  const resultsDiv = document.getElementById('simpleGamingResults');
  const contentDiv = document.getElementById('gamingResultsContent');
  
  if (resultsDiv && contentDiv) {
    contentDiv.innerHTML = content;
    resultsDiv.style.display = 'block';
  }
}

function getGamingText() {
  const textArea = document.querySelector('#fileContent textarea, .scrollbox');
  if (!textArea || !textArea.value.trim()) {
    alert('Ladda upp en text först för att spela!');
    return null;
  }
  return textArea.value;
}

// Make function available globally for showFile.js
window.showSimpleTextGaming = () => createSimpleGamingInterface();

console.log('Simple textGamingUI loaded successfully');