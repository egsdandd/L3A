// Word Games - Word guessing and scramble games
// Contains word-based games like guessing and unscrambling

function generateWordGuessGameHTML(randomWord, hiddenWord) {
  const actions = [
    { onclick: `showFirstLetter('${randomWord}')`, color: '#2196F3', text: '💡 Första bokstaven' },
    { onclick: `showFirstAndLast('${randomWord}')`, color: '#FF9800', text: '🔤 Första och sista' },
    { onclick: `showAnswer('${randomWord}')`, color: '#f44336', text: '👁️ Visa svar' },
    { onclick: 'startWordGuess()', color: '#9C27B0', text: '🔄 Nytt ord' }
  ];

  return `
    <h4>🎯 Gissa Ordet!</h4>
    <p>Ordet har ${randomWord.length} bokstäver: <strong>${hiddenWord}</strong></p>
    <div style="margin: 15px 0;">
      ${generateGameButtonsHTML(actions)}
    </div>
    <input type="text" id="guessInput" placeholder="Skriv din gissning...">
    <button onclick="checkGuess('${randomWord}')">Gissa!</button>
    <div id="guessResult"></div>
  `;
}

// Word Guessing Game
window.startWordGuess = function() {
  const text = getEditorText();
  if (!text) return;
  
  const words = text.split(/\s+/).filter(w => w.length > 3);
  if (words.length === 0) {
    alert('Texten innehåller inga ord som är längre än 3 tecken!');
    return;
  }
  
  const randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  const hiddenWord = randomWord.replace(/./g, '_');
  
  const gameHtml = generateWordGuessGameHTML(randomWord, hiddenWord);
  
  showGamingResult(gameHtml);
};

window.checkGuess = function(correctWord) {
  const guess = document.getElementById('guessInput').value.toLowerCase();
  const result = document.getElementById('guessResult');
  
  if (guess === correctWord) {
    result.innerHTML = `
      <div style="margin: 15px 0;">
        🎉 Rätt! Du gissade ordet: <strong>${correctWord}</strong>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
        <button onclick="startWordGuess()" style="background: #4CAF50; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
          🎯 Gissa nytt ord
        </button>
        <button onclick="showWordHint('${correctWord}')" style="background: #2196F3; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
          💡 Visa ledtråd
        </button>
        <button onclick="showWordInfo('${correctWord}')" style="background: #FF9800; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
          📝 Visa info
        </button>
        <button onclick="startWordScramble()" style="background: #9C27B0; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
          🔀 Ordpussel
        </button>
      </div>
    `;
    result.className = 'result-success';
  } else {
    result.innerHTML = '❌ Fel! Försök igen...';
    result.className = 'result-error';
  }
};

// Word Scramble Game
window.startWordScramble = function() {
  const text = getEditorText();
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
    <button onclick="startWordScramble()" style="background: #9C27B0; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 1.1em; margin: 5px;">
      🔀 Nytt ordpussel
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
    result.innerHTML = `
      <div style="margin: 15px 0;">
        🎉 Perfekt! Du löste pusslet! Ordet var: <strong>${window.currentScrambleWord.toUpperCase()}</strong>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
        <button onclick="startWordScramble()" style="background: #4CAF50; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
          🔀 Nytt ordpussel
        </button>
        <button onclick="showWordHint('${window.currentScrambleWord}')" style="background: #2196F3; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
          💡 Visa ledtråd
        </button>
        <button onclick="showWordInfo('${window.currentScrambleWord}')" style="background: #FF9800; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
          📝 Visa info
        </button>
        <button onclick="startWordGuess()" style="background: #9C27B0; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
          🎯 Gissa ord
        </button>
      </div>
    `;
    result.className = 'result-success';
    result.style.padding = '15px';
    result.style.borderRadius = '8px';
    result.style.marginTop = '15px';
    
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