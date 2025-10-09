// Memory Game & Helpers - Memory testing and utility functions
// Contains memory games and helper functions for all games

// Memory Test Game
window.startTextMemory = function() {
  const text = getEditorText()
  if (!text) return
  
  const words = text.split(/\s+/).filter(w => w.length > 2).slice(0, 8)
  
  if (words.length < 3) {
    alert('Texten behöver fler ord för minnestestet!')
    return
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
  `
  
  showGamingResult(gameHtml)
  window.memoryWords = words
}

window.hideWordsAndTest = function() {
  const startBtn = document.getElementById('startTestBtn')
  const memoryWords = document.getElementById('memoryWords')
  const memoryTest = document.getElementById('memoryTest')
  
  if (startBtn) {
    startBtn.innerHTML = '⏰ Timer startar...'
    startBtn.disabled = true
    
    let countdown = 10
    const timer = setInterval(() => {
      countdown--
      startBtn.innerHTML = `⏰ ${countdown} sekunder kvar...`
      
      if (countdown <= 0) {
        clearInterval(timer)
        memoryWords.style.display = 'none'
        memoryTest.style.display = 'block'
        startBtn.style.display = 'none'
      }
    }, 1000)
  }
}

window.checkMemory = function() {
  const remembered = document.getElementById('memoryInput').value
    .split(',')
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 0)
  
  const correct = remembered.filter(w => 
    window.memoryWords.some(orig => orig.toLowerCase() === w)
  )
  
  const result = document.getElementById('memoryResult')
  const score = window.memoryWords.length > 0 ? Math.round((correct.length / window.memoryWords.length) * 100) : 0
  
  let message = `🧠 <strong>Minnesresultat:</strong> ${correct.length}/${window.memoryWords.length} ord rätt (${score}%)<br>`
  
  if (correct.length > 0) {
    message += `✅ <strong>Rätta ord:</strong> ${correct.join(', ')}<br>`
  }
  
  const missed = window.memoryWords.filter(orig => 
    !remembered.some(w => w === orig.toLowerCase())
  )
  
  if (missed.length > 0) {
    message += `❌ <strong>Missade ord:</strong> ${missed.join(', ')}<br>`
  }
  
  const wrong = remembered.filter(w => 
    !window.memoryWords.some(orig => orig.toLowerCase() === w)
  )
  
  if (wrong.length > 0) {
    message += `⚠️ <strong>Felaktiga ord:</strong> ${wrong.join(', ')}<br>`
  }
  
  if (score >= 80) {
    message += '🏆 <strong>Fantastiskt minne!</strong>'
  } else if (score >= 60) {
    message += '👍 <strong>Bra jobbat!</strong>'
  } else if (score >= 40) {
    message += '🤔 <strong>Inte illa, försök igen!</strong>'
  } else {
    message += '💪 <strong>Träna mer så blir det bättre!</strong>'
  }
  
  result.innerHTML = message
  result.className = score >= 60 ? 'result-success' : 'result-error'
  result.style.display = 'block'
  result.style.padding = '15px'
  result.style.marginTop = '15px'
  result.style.borderRadius = '8px'
}

window.showAnswers = function() {
  const result = document.getElementById('memoryResult')
  result.innerHTML = `
    📝 <strong>Alla rätta ord var:</strong><br>
    <div style="font-size: 1.2em; font-weight: bold; color: #2196f3; margin: 10px 0;">
      ${window.memoryWords.join(' • ')}
    </div>
  `
  result.className = 'result-success'
  result.style.display = 'block'
  result.style.padding = '15px'
  result.style.marginTop = '15px'
  result.style.borderRadius = '8px'
}

// Helper Functions for Word Games
window.showFirstLetter = function(word) {
  const result = document.getElementById('guessResult')
  result.innerHTML = `💡 <strong>Ledtråd:</strong> Ordet börjar med "${word[0].toUpperCase()}"`
  result.className = 'result-success'
  result.style.padding = '10px'
  result.style.borderRadius = '5px'
  result.style.marginTop = '10px'
}

window.showFirstAndLast = function(word) {
  const result = document.getElementById('guessResult')
  result.innerHTML = `🔤 <strong>Ledtråd:</strong> Ordet börjar med "${word[0].toUpperCase()}" och slutar med "${word[word.length-1].toUpperCase()}"`
  result.className = 'result-success'
  result.style.padding = '10px'
  result.style.borderRadius = '5px'
  result.style.marginTop = '10px'
}

window.showAnswer = function(word) {
  const result = document.getElementById('guessResult')
  result.innerHTML = `👁️ <strong>Svaret är:</strong> ${word.toUpperCase()}`
  result.className = 'result-success'
  result.style.padding = '10px'
  result.style.borderRadius = '5px'
  result.style.marginTop = '10px'
  result.style.background = '#ffeb3b'
  result.style.color = '#333'
}

window.showWordHint = function(word) {
  const hints = {
    'katt': 'Ett mysigt husdjur som spinnare',
    'hund': 'Människans bästa vän som skäller',
    'bok': 'Något man läser med många sidor',
    'bil': 'Fordon med fyra hjul',
    'hus': 'Byggnad där man bor',
    'träd': 'Växer högt och har löv',
    'sol': 'Lyser på himlen på dagen',
    'måne': 'Syns på himlen på natten'
  }
  
  const hint = hints[word.toLowerCase()] || `Ett ord som börjar med "${word[0]}" och har ${word.length} bokstäver`
  
  alert(`💡 Ledtråd för "${word}": ${hint}`)
}

window.showWordInfo = function(word) {
  const info = `
📝 Information om ordet "${word}":
• Längd: ${word.length} bokstäver
• Första bokstav: ${word[0].toUpperCase()}
• Sista bokstav: ${word[word.length-1].toUpperCase()}
• Vokaler: ${word.toLowerCase().match(/[aeiouyåäö]/g)?.join(', ') || 'Inga'}
• Konsonanter: ${word.toLowerCase().match(/[bcdfghjklmnpqrstvwxz]/g)?.join(', ') || 'Inga'}
  `
  
  alert(info)
}