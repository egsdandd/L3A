// src/formatters/TextFormatter.js

class TextFormatter {
  // Privat attribut
  #text;

  constructor(text) {
    this.#text = text;
  }

  // Privat hjälpmetod för validering
  #validateText() {
    if (!this.#text || typeof this.#text !== 'string') {
      throw new Error('Invalid text provided to TextFormatter');
    }
    return this.#text.trim().length > 0;
  }

  // Privat hjälpmetod för att säkerställa att text finns
  #ensureText() {
    if (!this.#validateText()) {
      throw new Error('No valid text to format');
    }
  }

  // Versaler
  toUpperCase() {
    this.#ensureText();
    return this.#text.toUpperCase();
  }

  // Gemener
  toLowerCase() {
    this.#ensureText();
    return this.#text.toLowerCase();
  }

  // Versal på varje ord
  capitalizeWords() {
    this.#ensureText();
    return this.#text.split(' ')
      .map(word => word.length > 0 
        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
        : word
      )
      .join(' ');
  }

  // camelCase
  toCamelCase() {
    this.#ensureText();
    const parts = this.#text.trim().split(/\s+/);
    if (parts.length === 0) return '';
    
    const first = parts[0].toLowerCase();
    const rest = parts.slice(1)
      .map(part => part.length > 0 
        ? part[0].toUpperCase() + part.slice(1).toLowerCase()
        : part
      );
    
    return first + rest.join('');
  }

  // snake_case
  toSnakeCase() {
    this.#ensureText();
    return this.#text.trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }

  // Ta bort onödiga mellanslag
  trimWhitespace() {
    if (!this.#text) return '';
    return this.#text.trim().replace(/\s+/g, ' ');
  }

  // Ny metod: getter för originaltext (read-only)
  get originalText() {
    return this.#text;
  }

  // Ny metod: sätt ny text
  setText(newText) {
    this.#text = newText;
    return this;
  }
}

// Exempel på användning med nya metoder
const formatter = new TextFormatter("    hej världen och Otto, paddlar kajak!   ");
console.log('Versaler:', formatter.toUpperCase());
console.log('Gemener:', formatter.toLowerCase());
console.log('Kapitaliserad:', formatter.capitalizeWords());
console.log('CamelCase:', formatter.toCamelCase());
console.log('Snake_case:', formatter.toSnakeCase());
console.log('Trimmed:', formatter.trimWhitespace());
console.log('Original:', formatter.originalText);

// Exempel med metodkedja
const chained = new TextFormatter("hello world")
  .setText("new text here")
  .capitalizeWords();
console.log('Chained result:', chained);

export default TextFormatter;

