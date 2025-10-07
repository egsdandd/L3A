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
  
  const words = text.split(/\s+/).filter(w => w.length > 3 && w.length < 10);
  
  if (words.length === 0) {
    alert('Texten behöver ord mellan 4-9 bokstäver för ordpusslet!');
    return;
  }
  
  const word = words[Math.floor(Math.random() * words.length)];
  const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
  
  // Kontrollera att ordet verkligen är blandat
  if (scrambled.toLowerCase() === word.toLowerCase()) {
    // Om ordet inte blev blandat, blanda om
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    const newScrambled = letters.join('');
    window.currentScrambleWord = word.toLowerCase();
    showScrambleGame(newScrambled, word);
  } else {
    window.currentScrambleWord = word.toLowerCase();
    showScrambleGame(scrambled, word);
  }
};

function showScrambleGame(scrambledWord, originalWord) {
  const gameHtml = `
    <h4>🔀 Ordpussel!</h4>
    <p>Ordna bokstäverna till ett riktigt ord:</p>
    <div style="font-size: 2em; font-weight: bold; color: #ff5722; text-align: center; margin: 20px 0; padding: 15px; background: #fff3e0; border-radius: 10px; letter-spacing: 4px;">
      ${scrambledWord.toUpperCase()}
    </div>
    <p><strong>Ledtråd:</strong> Ordet har ${originalWord.length} bokstäver och finns i texten</p>
    <input type="text" id="scrambleInput" placeholder="Skriv det rätta ordet..." style="width: 300px; padding: 10px; font-size: 1.1em; border: 2px solid #ccc; border-radius: 5px; margin: 10px;">
    <br>
    <button onclick="checkScramble()" style="background: #4caf50; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 1.1em; margin: 5px;">
      ✅ Kontrollera svar
    </button>
    <button onclick="giveHint()" style="background: #ff9800; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 1.1em; margin: 5px;">
      💡 Ge ledtråd
    </button>
    <button onclick="showScrambleAnswer()" style="background: #f44336; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 1.1em; margin: 5px;">
      👁️ Visa svar
    </button>
    <div id="scrambleResult"></div>
  `;
  
  showGamingResult(gameHtml);
};

window.checkScramble = function() {
  const answer = document.getElementById('scrambleInput').value.trim().toLowerCase();
  const result = document.getElementById('scrambleResult');
  
  if (!answer) {
    result.innerHTML = '❌ Skriv in ett ord först!';
    result.className = 'result-error';
    return;
  }
  
  if (answer === window.currentScrambleWord) {
    result.innerHTML = `🎉 Perfekt! Du löste pusslet! Ordet var: <strong>${window.currentScrambleWord.toUpperCase()}</strong>`;
    result.className = 'result-success';
    result.style.padding = '15px';
    result.style.borderRadius = '8px';
    result.style.marginTop = '15px';
    
    // Möjlighet att spela igen
    setTimeout(() => {
      if (confirm('Bra jobbat! Vill du prova ett nytt ordpussel?')) {
        window.startWordScramble();
      }
    }, 2000);
    
  } else {
    result.innerHTML = `❌ Tyvärr fel! "${answer}" är inte rätt ord. Försök igen!`;
    result.className = 'result-error';
    result.style.padding = '15px';
    result.style.borderRadius = '8px';
    result.style.marginTop = '15px';
  }
};

window.giveHint = function() {
  const result = document.getElementById('scrambleResult');
  const word = window.currentScrambleWord;
  const firstLetter = word.charAt(0).toUpperCase();
  const lastLetter = word.charAt(word.length - 1).toUpperCase();
  
  result.innerHTML = `💡 <strong>Ledtråd:</strong> Ordet börjar med "${firstLetter}" och slutar med "${lastLetter}"`;
  result.className = 'result-success';
  result.style.padding = '15px';
  result.style.borderRadius = '8px';
  result.style.marginTop = '15px';
};

window.showScrambleAnswer = function() {
  const result = document.getElementById('scrambleResult');
  const word = window.currentScrambleWord;
  
  result.innerHTML = `👁️ <strong>Svaret var:</strong> ${word.toUpperCase()}<br><em>Testa ett nytt ordpussel för att öva mer!</em>`;
  result.className = 'result-success';
  result.style.padding = '15px';
  result.style.borderRadius = '8px';
  result.style.marginTop = '15px';
  
  // Automatiskt fylla i rätt svar
  document.getElementById('scrambleInput').value = word;
};

window.startWordBuilder = function() {
  const text = getGamingText();
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
  
  const words = text.split(/\s+/).filter(w => w.length > 2).slice(0, 8);
  
  if (words.length < 3) {
    alert('Texten behöver fler ord för minnestestet!');
    return;
  }
  
  const gameHtml = `
    <h4>🧠 Minnestest!</h4>
    <p>Memorera dessa ${words.length} ord i 10 sekunder:</p>
    <div id="memoryWords" style="font-size: 1.3em; font-weight: bold; padding: 20px; background: #e3f2fd; border-radius: 8px; margin: 10px 0; text-align: center;">
      ${words.join(' • ')}
    </div>
    <button id="startTestBtn" onclick="hideWordsAndTest()" style="background: #2196f3; color: white; padding: 15px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em;">
      🕒 Starta 10-sekunders timer!
    </button>
    <div id="memoryTest" style="display: none;">
      <p><strong>Tiden är ute!</strong> Skriv alla ord du kommer ihåg (separera med komma):</p>
      <textarea id="memoryInput" placeholder="ord1, ord2, ord3..." style="width: 100%; height: 80px; padding: 10px; border-radius: 5px; border: 1px solid #ccc; margin: 10px 0;"></textarea>
      <br>
      <button onclick="checkMemory()" style="background: #4caf50; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
        ✅ Kontrollera mitt minne
      </button>
      <button onclick="showAnswers()" style="background: #ff9800; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
        👁️ Visa rätta svaren
      </button>
    </div>
    <div id="memoryResult"></div>
  `;
  
  showGamingResult(gameHtml);
  window.memoryWords = words;
};

window.hideWordsAndTest = function() {
  const startBtn = document.getElementById('startTestBtn');
  const memoryWords = document.getElementById('memoryWords');
  const memoryTest = document.getElementById('memoryTest');
  
  if (startBtn) {
    startBtn.innerHTML = '⏰ Timer startar...';
    startBtn.disabled = true;
    
    let countdown = 10;
    const timer = setInterval(() => {
      countdown--;
      startBtn.innerHTML = `⏰ ${countdown} sekunder kvar...`;
      
      if (countdown <= 0) {
        clearInterval(timer);
        memoryWords.style.display = 'none';
        memoryTest.style.display = 'block';
        startBtn.style.display = 'none';
      }
    }, 1000);
  }
};

window.checkMemory = function() {
  const remembered = document.getElementById('memoryInput').value
    .split(',')
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 0);
  
  const correct = remembered.filter(w => 
    window.memoryWords.some(orig => orig.toLowerCase() === w)
  );
  
  const result = document.getElementById('memoryResult');
  const score = window.memoryWords.length > 0 ? Math.round((correct.length / window.memoryWords.length) * 100) : 0;
  
  let message = `🧠 <strong>Minnesresultat:</strong> ${correct.length}/${window.memoryWords.length} ord rätt (${score}%)<br>`;
  
  if (correct.length > 0) {
    message += `✅ <strong>Rätta ord:</strong> ${correct.join(', ')}<br>`;
  }
  
  const missed = window.memoryWords.filter(orig => 
    !remembered.some(w => w === orig.toLowerCase())
  );
  
  if (missed.length > 0) {
    message += `❌ <strong>Missade ord:</strong> ${missed.join(', ')}<br>`;
  }
  
  const wrong = remembered.filter(w => 
    !window.memoryWords.some(orig => orig.toLowerCase() === w)
  );
  
  if (wrong.length > 0) {
    message += `⚠️ <strong>Felaktiga ord:</strong> ${wrong.join(', ')}<br>`;
  }
  
  if (score >= 80) {
    message += '🏆 <strong>Fantastiskt minne!</strong>';
  } else if (score >= 60) {
    message += '👍 <strong>Bra jobbat!</strong>';
  } else if (score >= 40) {
    message += '🤔 <strong>Inte illa, försök igen!</strong>';
  } else {
    message += '💪 <strong>Träna mer så blir det bättre!</strong>';
  }
  
  result.innerHTML = message;
  result.className = score >= 60 ? 'result-success' : 'result-error';
  result.style.display = 'block';
  result.style.padding = '15px';
  result.style.marginTop = '15px';
  result.style.borderRadius = '8px';
};

window.showAnswers = function() {
  const result = document.getElementById('memoryResult');
  result.innerHTML = `
    📝 <strong>Alla rätta ord var:</strong><br>
    <div style="font-size: 1.2em; font-weight: bold; color: #2196f3; margin: 10px 0;">
      ${window.memoryWords.join(' • ')}
    </div>
  `;
  result.className = 'result-success';
  result.style.display = 'block';
  result.style.padding = '15px';
  result.style.marginTop = '15px';
  result.style.borderRadius = '8px';
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
  if (!textArea) {
    alert('Ladda upp en text först för att spela!');
    return null;
  }
  
  const text = textArea.value || textArea.textContent || textArea.innerText || '';
  if (!text.trim()) {
    alert('Ladda upp en text först för att spela!');
    return null;
  }
  return text;
}

// Make function available globally for showFile.js
window.showSimpleTextGaming = () => createSimpleGamingInterface();

console.log('Simple textGamingUI loaded successfully');