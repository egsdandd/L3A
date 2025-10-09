// src/controllers/TextGamingController.js
import texttoolkit from 'texttoolkit'

/**
 *
 */
class TextGamingController {
  /**
   *
   */
  constructor() {
    // Private attribut
    this.#textDocumentCache = new Map()
    this.#lastText = ''
    this.#swedishWords = [
      'hej', 'katt', 'hund', 'bok', 'bil', 'hus', 'träd', 'sol', 'måne', 'stjärna',
      'kärlek', 'vänskap', 'lycka', 'glädje', 'sorg', 'rädsla', 'mod', 'hopp',
      'vatten', 'eld', 'luft', 'jord', 'sten', 'blomma', 'gräs', 'blad',
      'tid', 'år', 'dag', 'natt', 'timme', 'minut', 'sekund',
      'röd', 'blå', 'grön', 'gul', 'svart', 'vit', 'rosa', 'orange', 'lila',
      'stor', 'liten', 'snabb', 'långsam', 'stark', 'svag', 'varm', 'kall'
    ]
    this.#wordAssociations = {
      'katt': ['hund', 'djur', 'mjuk', 'mys', 'viska'],
      'hund': ['katt', 'vovve', 'lojal', 'vän', 'skäll'],
      'bil': ['väg', 'fart', 'resa', 'motor', 'hjul'],
      'bok': ['läsa', 'sida', 'ord', 'kunskap', 'berättelse'],
      'sol': ['ljus', 'värme', 'dag', 'gul', 'himmel'],
      'vatten': ['blå', 'hav', 'dricka', 'flyta', 'våt'],
      'träd': ['grön', 'blad', 'skog', 'växer', 'rot'],
      'kärlek': ['hjärta', 'rosa', 'kram', 'värme', 'lycka'],
      'musik': ['låt', 'dansa', 'hör', 'rytm', 'glädje'],
      'mat': ['gott', 'äta', 'hungrig', 'kök', 'smak']
    }
  }

  // Private attribut
  #textDocumentCache
  #lastText
  #swedishWords
  #wordAssociations

  // Private metoder
  /**
   *
   * @param text
   */
  #validateText(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided')
    }
    return text.trim()
  }

  /**
   *
   * @param text
   */
  #getTextDocument(text) {
    const cleanText = this.#validateText(text)
    
    // Använd cache om samma text
    if (cleanText === this.#lastText && this.#textDocumentCache.has('current')) {
      return this.#textDocumentCache.get('current')
    }
    
    const textDoc = new texttoolkit(cleanText)
    this.#textDocumentCache.set('current', textDoc)
    this.#lastText = cleanText
    
    return textDoc
  }

  /**
   *
   * @param error
   * @param operation
   */
  #handleError(error, operation) {
    console.error(`TextGamingController.${operation} error:`, error)
    return {
      success: false,
      error: error.message || `Failed to ${operation}`
    }
  }

  /**
   *
   * @param array
   */
  #shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  /**
   *
   * @param word
   * @param availableLetters
   */
  #canFormWord(word, availableLetters) {
    const wordLetters = word.split('')
    const lettersCopy = [...availableLetters]
    
    for (let letter of wordLetters) {
      const index = lettersCopy.indexOf(letter)
      if (index === -1) {
        return false
      }
      lettersCopy.splice(index, 1)
    }
    return true
  }

  /**
   *
   * @param wpm
   */
  #getPerformanceRating(wpm) {
    if (wpm >= 80) return '🔥 Fantastisk!'
    if (wpm >= 60) return '🚀 Utmärkt!'
    if (wpm >= 40) return '👍 Bra jobbat!'
    if (wpm >= 20) return '📝 Fortsätt öva!'
    return '🐌 Börja långsamt!'
  }

  // Publika metoder för textspel

  // Anagram Solver - hitta ord från bokstäver
  /**
   *
   * @param letters
   */
  async solveAnagram(letters) {
    try {
      if (!letters) {
        throw new Error('Letters are required')
      }

      const availableLetters = letters.toLowerCase().split('')
      const possibleWords = this.#swedishWords.filter(word => 
        this.#canFormWord(word, availableLetters)
      )

      return {
        success: true,
        letters,
        foundWords: possibleWords.sort((a, b) => b.length - a.length),
        count: possibleWords.length
      }
    } catch (error) {
      return this.#handleError(error, 'solve anagram')
    }
  }

  // Word Scramble - blanda ord
  /**
   *
   * @param text
   * @param difficulty
   */
  async scrambleWord(text, difficulty = 'medium') {
    try {
      const cleanText = this.#validateText(text)
      const words = cleanText.split(/\s+/).filter(word => word.length > 2)
      
      if (words.length === 0) {
        throw new Error('No suitable words found for scrambling')
      }

      // Välj ord baserat på svårighetsgrad
      let targetWords
      switch(difficulty) {
        case 'easy':
          targetWords = words.filter(word => word.length >= 3 && word.length <= 5)
          break
        case 'hard':
          targetWords = words.filter(word => word.length >= 7)
          break
        default: // medium
          targetWords = words.filter(word => word.length >= 4 && word.length <= 8)
      }

      if (targetWords.length === 0) targetWords = words

      // Välj slumpmässigt ord
      const selectedWord = targetWords[Math.floor(Math.random() * targetWords.length)]
      
      // Blanda bokstäverna
      const scrambledLetters = this.#shuffleArray(selectedWord.split('')).join('')

      return {
        success: true,
        scrambledWord: scrambledLetters,
        originalWord: selectedWord,
        wordLength: selectedWord.length,
        difficulty,
        hint: `Ordet har ${selectedWord.length} bokstäver och börjar med "${selectedWord[0]}"`
      }
    } catch (error) {
      return this.#handleError(error, 'scramble word')
    }
  }

  // Text Guesser - gissa text från ledtrådar
  /**
   *
   * @param text
   */
  async createTextGuess(text) {
    try {
      const cleanText = this.#validateText(text)
      const textDoc = this.#getTextDocument(cleanText)
      const words = cleanText.toLowerCase().split(/\s+/).filter(word => word.length > 3)

      // Räkna ordfrekvens
      const frequency = {}
      words.forEach(word => {
        const clean = word.replace(/[^\w]/g, '')
        if (clean.length > 3) {
          frequency[clean] = (frequency[clean] || 0) + 1
        }
      })

      // Hitta vanligaste orden
      const sortedWords = Object.entries(frequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)

      // Skapa ledtrådar
      const clues = sortedWords.map(([word, count]) => ({
        wordLength: word.length,
        frequency: count,
        firstLetter: word[0],
        lastLetter: word[word.length - 1],
        maskedWord: word[0] + '*'.repeat(word.length - 2) + word[word.length - 1]
      }))

      return {
        success: true,
        textLength: cleanText.length,
        wordCount: words.length,
        clues,
        hint: 'Gissa vad texten handlar om baserat på de vanligaste orden!'
      }
    } catch (error) {
      return this.#handleError(error, 'create text guess')
    }
  }

  // Speed Writing Challenge
  /**
   *
   * @param writtenText
   * @param timeInSeconds
   */
  async calculateSpeed(writtenText, timeInSeconds) {
    try {
      if (!writtenText || !timeInSeconds) {
        throw new Error('Written text and time are required')
      }

      const wordCount = writtenText.split(/\s+/).filter(word => word.length > 0).length
      const wordsPerMinute = Math.round((wordCount / timeInSeconds) * 60)
      const charactersPerMinute = Math.round((writtenText.length / timeInSeconds) * 60)

      // Beräkna noggrannhet (enkel approximation)
      const extraSpaces = (writtenText.match(/\s{2,}/g) || []).length
      const accuracy = Math.round((wordCount / (wordCount + extraSpaces)) * 100)

      return {
        success: true,
        wordCount,
        timeInSeconds,
        wordsPerMinute,
        charactersPerMinute,
        performance: this.#getPerformanceRating(wordsPerMinute),
        accuracy
      }
    } catch (error) {
      return this.#handleError(error, 'calculate speed')
    }
  }

  // Word Association Chain
  /**
   *
   * @param startWord
   * @param chainLength
   */
  async buildWordChain(startWord, chainLength = 5) {
    try {
      if (!startWord) {
        throw new Error('Start word is required')
      }

      const chain = [startWord.toLowerCase()]
      let currentWord = startWord.toLowerCase()

      for (let i = 0; i < chainLength - 1; i++) {
        const possibleWords = this.#wordAssociations[currentWord] || ['slumpmässigt', 'ord', 'här']
        const nextWord = possibleWords[Math.floor(Math.random() * possibleWords.length)]
        chain.push(nextWord)
        currentWord = nextWord
      }

      return {
        success: true,
        startWord,
        chain,
        explanation: 'Varje ord associeras med nästa baserat på semantisk likhet',
        challenge: `Kan du bygga en längre kedja från "${startWord}"?`
      }
    } catch (error) {
      return this.#handleError(error, 'build word chain')
    }
  }

  // Wordle-liknande spel
  /**
   *
   * @param targetWord
   * @param guess
   */
  async createWordleChallenge(targetWord, guess) {
    try {
      if (!targetWord) {
        throw new Error('Target word is required')
      }

      if (!guess) {
        // Skapa bara utmaningen utan gissning
        return {
          success: true,
          wordLength: targetWord.length,
          hint: `Gissa ordet (${targetWord.length} bokstäver)`,
          attempts: 0,
          maxAttempts: 6
        }
      }

      const target = targetWord.toLowerCase()
      const guessWord = guess.toLowerCase()

      if (target.length !== guessWord.length) {
        throw new Error(`Guess must be ${target.length} letters long`)
      }

      const result = []
      const targetLetters = target.split('')
      const guessLetters = guessWord.split('')

      // Kontrollera varje bokstav
      for (let i = 0; i < guessLetters.length; i++) {
        if (guessLetters[i] === targetLetters[i]) {
          result.push({ letter: guessLetters[i], status: 'correct' })
        } else if (targetLetters.includes(guessLetters[i])) {
          result.push({ letter: guessLetters[i], status: 'present' })
        } else {
          result.push({ letter: guessLetters[i], status: 'absent' })
        }
      }

      const isCorrect = guessWord === target

      return {
        success: true,
        guess: guessWord,
        result,
        isCorrect,
        targetWord: isCorrect ? target : undefined
      }
    } catch (error) {
      return this.#handleError(error, 'create wordle challenge')
    }
  }
}

export default TextGamingController