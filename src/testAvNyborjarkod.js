// src/formatters/TextFormatter.js

class TF {
  constructor(tekst) {
    this.t = tekst
  }

  // Versaler
  upp() {
    return this.t.toUpperCase() 
  }

  // Gemener
  low() {
    if (this.t && this.t.length > 0) {
      return this.t.toLowerCase()
    }
  }
  // Versal på varje ord
  capWords() {
    var arr = this.t.split(" ");
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > 0) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
      }
    }
    return arr.join(" ");
  }
  // camel Case 
  camel() {
    var parts = this.t.trim().split(/\s+/); // Split on any whitespace, remove leading/trailing spaces
    if (parts.length === 0) return '';
    var out = parts[0].toLowerCase();
    for (var j = 1; j < parts.length; j++) {
      if (parts[j].length > 0) {
        out += parts[j][0].toUpperCase() + parts[j].slice(1).toLowerCase();
      }
    }
    return out;
  }
  // inga mellanslag
  snake() {
    return this.t.replaceAll(' ', '_')
  }
  // ta bort onödiga mellanslag
  trim() {
    if (this.t) {
      return this.t.trim()
    }
  }
}

// Exempel på användning
var f = new TF("    hej världen och Otto, paddlar kajak!   ")
console.log(f.upp())
console.log(f.low())
console.log(f.capWords())
console.log(f.camel())
console.log(f.snake())
console.log(f.trim())

