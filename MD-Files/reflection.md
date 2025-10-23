# Reflektion Clean Code

Denna reflektion beskriver hur varje kapitel i "Clean Code" har påverkat min kodbas. Till varje kapitel ges en kort reflektion och ett konkret kodexempel.

---

## Kapitel 2: Meaningful Names

Jag har lagt stor vikt vid att använda beskrivande och konsekventa namn på klasser, metoder och variabler. Det gör koden självdokumenterande och lätt att förstå. Jag har försökt att tillämpa "Meningsfulla namn ska avslöja funktionalitet" och "Namnet ska vara uttalbart och sökbart".  Exempel:

```js
// TextAnalyserModule.js
countWords(inputText) {
  // ...
}
```

---

## Kapitel 3: Functions

Alla funktioner är små, har brutit ut så mycket det går, gör bara en sak och har tydliga namn. Jag undviker sid-effekter och duplicerad logik. Har tillämpat "En abstraktionsnivå per funktion", "Få argument" men baserat på typ av applikation genereras inga exceptions utan felmeddelande. Exempel:

```js
// TextFormatterModule.js
toUpperCase(inputText) {
  if (!isValidInput(inputText)) return ''
  return new TextFormatter(inputText).toUpperCase()
}
```

---

## Kapitel 4: Comments

Jag har tagit bort överflödiga kommentarer och istället gjort koden självdokumenterande. Endast nödvändiga JSDoc-kommentarer för publika metoder finns kvar.
Jag har med avsikt försökt ha så små och korta jsdoc kommentarer som möjligt då många egentligen är onödiga enligt mitt tycke men ESLint och jag är inte alltid överens...
Exempel:

```js
/**
 * Finds the first occurrence of searchQuery in inputText.
 */
findFirst(inputText, searchQuery) { ... }
```

---

## Kapitel 5: Formatting

Koden är konsekvent indragen, har luft mellan logiska block och är lätt att överblicka. Det gör det enkelt att hitta och förstå kodens struktur.
Indrag är konsekvent (2 blanksteg).
Tomrader används för att separera metoder och logiska block.
Relaterade metoder är grupperade.
Inga onödiga tomrader eller trånga kodblock.
Kod är lättläst och följer modern JS-stil.
Exempel:

```js
// TextTransformerModule.js
reverseWords(inputText) {
  if (!isValidInput(inputText)) return ''
  return new TextTransformer(inputText).reverseWordOrder()
}
```

---

## Kapitel 6: Objects and Data Structures

Varje modul är en klass med endast publika metoder för att utföra textoperationer.
All data är inkapslad – det finns inga publika fält, bara metoder.
Valideringslogik var från början privat (#isValidInput), vilket följer principen om inkapsling. Men refacoriserades sedan till en util metod (validation.js)
Inga onödiga getters/setters eller dataläckage.
Gränssnittet är tydligt: varje klass erbjuder bara de operationer som är relevanta för dess syfte.
Ingen blandning av data och logik – klasserna är renodlade serviceklasser.
Exempel:

```js
export class TextAnalyserModule {
  countWords(inputText) { ... }
}
```

---

## Kapitel 7: Error Handling

Fel hanteras robust genom att returnera säkra standardvärden och logga fel där det är motiverat. Ingen användning av try/catch – rimligt, eftersom all logik är enkel och bygger på validerad input. Ingen tyst felhantering förekommer. Exempel:

```js
if (!isValidInputPair(inputText, searchQuery)) {
  console.error('findFirst: inputText eller searchQuery är inte en sträng eller är tom:', inputText, searchQuery)
  return ''
}
```

---

## Kapitel 8: Boundaries

Alla externa beroenden (texttoolkit) är helt inkapslade i mina egna moduler. Min applikation är skriven mot mina egna gränssnitt, vilket gör det lätt att byta ut eller mocka externa bibliotek. Detta är exakt enligt Clean Code kapitel 8. Exempel:

```js
import { TextFormatter } from 'texttoolkit'
// ...
return new TextFormatter(inputText).toUpperCase()
```

---

## Kapitel 9: Unit Tests

Testerna är tydliga och har beskrivande namn, täcker både normalfall och edge cases, och är oberoende av varandra. Alla tester går igenom och är lätta att felsöka. Exempel:

```js
it('toUpperCase returnerar versaler', () => {
  expect(formatter.toUpperCase('hej')).toBe('HEJ')
})
```

---

## Kapitel 10: Classes

Klasserna är små, fokuserade och har ett tydligt ansvar. Inga onödiga publika fält eller metoder finns. Exempel:

```js
export class TextFormatterModule {
  toUpperCase(inputText) { ... }
}
```

---

## Kapitel 11: Systems

Systemet är löst kopplat, har tydlig ansvarsfördelning och är lätt att testa och vidareutveckla. Exempel:

```js
const formatter = new TextFormatterModule()
resultDisplay.textContent = formatter.toUpperCase(userInputTextArea.value)
```

---

## Kapitel 12: Emergent Design

Jag har undvikit duplicering, gjort koden uttrycksfull och minimerat antalet klasser och metoder. Alla tester går igenom. Exempel:

```js
// utilities/validation.js
export function isValidInput(inputText) { ... }
```

---
