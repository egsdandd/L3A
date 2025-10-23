# Reflektion Clean Code

Denna reflektion beskriver hur varje kapitel i "Clean Code" har påverkat min kodbas. Till varje kapitel ges en kort reflektion och ett konkret kodexempel.

---

## Kapitel 2: Meaningful Names

Jag har lagt stor vikt vid att använda beskrivande och konsekventa namn på klasser, metoder och variabler. Det gör koden självdokumenterande och lätt att förstå. Exempel:

```js
// TextAnalyserModule.js
countWords(inputText) {
  // ...
}
```

---

## Kapitel 3: Functions

Alla funktioner är små, gör bara en sak och har tydliga namn. Jag undviker sid-effekter och duplicerad logik. Exempel:

```js
// TextFormatterModule.js
toUpperCase(inputText) {
  if (!isValidInput(inputText)) return ''
  return new TextFormatter(inputText).toUpperCase()
}
```

---

## Kapitel 4: Comments

Jag har tagit bort överflödiga kommentarer och istället gjort koden självdokumenterande. Endast nödvändiga JSDoc-kommentarer för publika API:er finns kvar.
Jag har med avsikt försökt ha så små och korta jsdoc kommentarer då många egentligen är onödiga enligt mitt tycke
Exempel:

```js
/**
 * Finds the first occurrence of searchQuery in inputText.
 */
findFirst(inputText, searchQuery) { ... }
```

---

## Kapitel 5: Formatting

Koden är konsekvent indragen, har luft mellan logiska block och är lätt att överblicka. Det gör det enkelt att hitta och förstå kodens struktur. Exempel:

```js
// TextTransformerModule.js
reverseWords(inputText) {
  if (!isValidInput(inputText)) return ''
  return new TextTransformer(inputText).reverseWordOrder()
}
```

---

## Kapitel 6: Objects and Data Structures

Alla moduler är implementerade som klasser med tydliga publika metoder och inkapslad data. Ingen onödig exponering sker. Exempel:

```js
export class TextAnalyserModule {
  countWords(inputText) { ... }
}
```

---

## Kapitel 7: Error Handling

Fel hanteras robust genom att returnera säkra standardvärden och logga fel där det är motiverat. Ingen tyst felhantering förekommer. Exempel:

```js
if (!isValidInputPair(inputText, searchQuery)) {
  console.error('findFirst: inputText eller searchQuery är inte en sträng eller är tom:', inputText, searchQuery)
  return ''
}
```

---

## Kapitel 8: Boundaries

Alla beroenden till externa bibliotek (texttoolkit) är inkapslade i egna moduler. Min kod är skriven mot mina egna API:er, vilket gör det lätt att byta implementation. Exempel:

```js
import { TextFormatter } from 'texttoolkit'
// ...
return new TextFormatter(inputText).toUpperCase()
```

---

## Kapitel 9: Unit Tests

Testerna är tydliga, täcker både normalfall och edge cases, och är oberoende av varandra. Alla tester går igenom. Exempel:

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
