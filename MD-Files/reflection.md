# Reflektion Clean Code

Denna reflektion beskriver hur varje kapitel i "Clean Code" har påverkat min kodbas. Till varje kapitel ges en kort reflektion och ett konkret kodexempel.

Det var inte så enkelt att ta screen shots till varje kapitel men det finns till en del.

Reflektioner på Kap 11 var inte så enkelt att få till (jag hade nog inga...) så där bad jag min AI om hjälp och det var kanske inte meningen men jag lärde mig iallafall lite på det men det är ju inte min reflektion.

---

## Kapitel 2: Meaningful Names

Jag har lagt stor vikt vid att använda beskrivande och konsekventa namn på klasser, metoder och variabler. Det gör koden självdokumenterande och lätt att förstå. Jag har försökt att tillämpa "Meningsfulla namn ska avslöja funktionalitet" och "Namnet ska vara uttalbart och sökbart". Jag hade en metod som jag döpt till letter som räknar hur många ggr varje bokstav finns i texen, dvs hur många a och hur många b osv men döpte om den till letterFrequency för att göra det solklart vad den gör. Exempel innan:

```js
// TextAnalyserModule.js
letter(inputText) {
  // ...
}
```

Screenshot av hur det blev:

![LetterF](./img/letterF.png)

---

## Kapitel 3: Functions

Alla funktioner är små, har brutit ut så mycket det går, gör bara en sak och har tydliga namn. Jag undviker sid-effekter och duplicerad logik. Har tillämpat "En abstraktionsnivå per funktion", "Få argument" och "Tydlig felhantering" med exceptions. Innan innhöll varje metod en validering kod per metod men jag bröt ut den först som en privat function per modul fil men la den till slut i en egen fil (utilities/validation.js). Koden såg ut så här när jag startade:

```js
// TextFormatterModule.js
toUpperCase(inputText) {
  if (typeof inputText !== 'string' || inputText.trim().length === 0) {
    return ''
  }
  return new TextFormatter(inputText).toUpperCase()
}
```

Screenshot av ändringen blev det så här:

![toUpperCase](./img/toUpperCase.png)

---

## Kapitel 4: Comments

Jag har tagit bort överflödiga kommentarer och istället gjort koden självdokumenterande. Endast nödvändiga JSDoc-kommentarer för publika metoder finns kvar.
Jag har med avsikt försökt ha så små och korta jsdoc kommentarer som möjligt då många egentligen är onödiga enligt mitt tycke men ESLint och jag är inte alltid överens där. Jag hade från början till exempel:

```js
/**
 * Finds the first occurrence of searchQuery in inputText.
 */
findFirst(inputText, searchQuery) { ... }
```

Men efter att ha kört lint blev det följande screenshot:

![findFirst](./img/findFirst.png)

Personligen tyckte jag nog det var bättre innan...

Try/catch saknas i denna fil eftersom felen här hanteras i gränssnittet

---

## Kapitel 5: Formatting

Koden är konsekvent indragen, har luft mellan logiska block och är lätt att överblicka. Det gör det enkelt att hitta och förstå kodens struktur. Mycket av formatteringen sköter ju VSC med automatik så detta är egentligen inget problem år 2025 men kanske var ett större problem när boken skrevs i början av 2000-talet så i denna regel är det nog punkt 3 i listan som man bör fundera över. I min lilla app var det knappast någon stor grej.

- Indrag är konsekvent (2 blanksteg).
- Tomrader används för att separera metoder och logiska block.
- Relaterade metoder är grupperade.
- Inga onödiga tomrader eller trånga kodblock.
- Kod är lättläst och följer modern JS-stil.

Exempel:

```js
// TextTransformerModule.js
reverseWords(inputText) {
  if (!isValidInput(inputText)) return ''
  return new TextTransformer(inputText).reverseWordOrder()
}
```

Screen shot på en 60 raders modul (TextFormatterModul.js)

![textFormatter](./img/textFormatter.png)

---

## Kapitel 6: Objects and Data Structures

Varje modul är en klass med endast publika metoder för att utföra textoperationer.
All data är inkapslad – det finns inga publika fält, bara metoder.
Valideringslogik var från början privat (#isValidInput), vilket följer principen om inkapsling. Men refacoriserades sedan till en util metod (validation.js)

- Inga onödiga getters/setters eller dataläckage.
- Gränssnittet är tydligt: varje klass erbjuder bara de operationer som är relevanta för dess syfte.
- Ingen blandning av data och logik – klasserna är renodlade serviceklasser.

Exempel:

```js
export class TextAnalyserModule {
  countWords(inputText) { ... }
}
```

Screenshoot>

![textAnalys](./img/textAnalys.png)

---

## Kapitel 7: Error Handling

Innan jag gick igenom kapitel 7 använde jag inte try/catch, men det införde jag i vissa moduler. Felhanteringen är nu blandad:

- I t.ex. TextFormatterModule används try/catch och returneras en tydlig felsträng ("Ogiltig input") vid ogiltig indata.
- I t.ex. TextSearcherModule kastas undantag direkt vid felaktig input, och UI:t (app.js) fångar och visar felmeddelande.

Detta gör att fel upptäcks tidigt och hanteras explicit, men på olika sätt beroende på modul. Ingen tyst felhantering förekommer längre, och all felhantering är synlig och testbar. Exempel:

```js
// TextFormatterModule.js
toUpperCase(inputText) {
  try {
    isValidInput(inputText)
  } catch {
    return 'Ogiltig input'
  }
  return new TextFormatter(inputText).toUpperCase()
}

// TextSearcherModule.js
isValidInputPair(inputText, searchQuery) // kastar undantag vid fel
return new TextSearcher(inputText).findFirst(searchQuery)

// app.js (UI)
try {
  resultDisplay.textContent = 'Första: ' + searcher.findFirst(userInputTextArea.value, searchQueryInput.value)
} catch (err) {
  resultDisplay.textContent = 'Fel: ' + err.message
}
```

---

## Kapitel 8: Boundaries

Alla externa beroenden (texttoolkit) är helt inkapslade i mina egna moduler. Min applikation är skriven mot mina egna gränssnitt, vilket gör det lätt att byta ut eller mocka externa bibliotek. Detta är exakt enligt Clean Code kapitel 8. Detta gör att jag inte hade några problem med denna regel

Exempel:

```js
import { TextFormatter } from 'texttoolkit'
// ...
return new TextFormatter(inputText).toUpperCase()
```

---

## Kapitel 9: Unit Tests

Testerna är en central del av min kodbas och har utvecklats parallellt med implementationen. Jag har lagt stor vikt vid att:

- Skriva tester med beskrivande namn som tydligt anger vad som testas och vilket resultat som förväntas.
- Täckning av både normalfall och edge cases, t.ex. tomma strängar, null, ogiltig input och specialtecken.
- Testa felhantering: att metoder returnerar rätt felvärde eller kastar undantag vid ogiltig input.
- Säkerställa att testerna är oberoende av varandra och kan köras i valfri ordning.
- Använda Vitest som testverktyg för snabb feedback och tydliga felrapporter.

Jag har även refaktorerat testerna när implementationen ändrats, t.ex. när felhantering gick från undantag till felsträng eller tvärtom. Detta har gjort att testerna alltid speglar aktuell kodlogik och snabbt visar om något bryter mot förväntat beteende.

Exempel på test för normalfall:

```js
it('toUpperCase returnerar versaler', () => {
  expect(formatter.toUpperCase('hej')).toBe('HEJ')
})
```

Exempel på test för edge case/felhantering:

```js
it('toUpperCase hanterar felaktig input', () => {
  expect(formatter.toUpperCase('   ')).toBe('Ogiltig input')
  expect(formatter.toUpperCase(null)).toBe('Ogiltig input')
})
```

Jag har även testat att undantag kastas och hanteras korrekt i moduler där det är relevant, t.ex. TextSearcherModule. Alla tester går igenom och är lätta att felsöka tack vare tydliga felmeddelanden och isolerade testfall. Dokumentation av automatisk testkörning finns i [Test_Report](TEST_REPORT.md)

---

## Kapitel 10: Classes

Klasserna i min kodbas är designade för att vara små, fokuserade och ha ett tydligt ansvar. Varje klass representerar en logisk enhet, t.ex. analys, formattering, transformation eller sökning av text. Jag har undvikit att blanda olika ansvarsområden i samma klass, vilket gör koden lätt att förstå, testa och vidareutveckla.

- Alla fält är privata eller helt inkapslade – det finns inga publika fält, bara publika metoder.
- Varje klass har bara de metoder som är relevanta för dess syfte, t.ex. TextFormatterModule har bara formatteringsmetoder.
- Klasserna är lätta att testa isolerat tack vare tydliga gränssnitt och frånvaro av beroenden mellan moduler.
- Jag har refaktorerat klasserna för att undvika duplicering och för att följa Single Responsibility Principle.
- Valideringslogik är utbruten till en separat util-fil, vilket gör klasserna renare och mer fokuserade.

Exempel på en typisk klass:

```js
export class TextFormatterModule {
  toUpperCase(inputText) {
    // validering och formattering
  }
  toLowerCase(inputText) {
    // validering och formattering
  }
  // ... fler formatteringsmetoder
}
```

Jag har även dokumenterat klasserna med JSDoc för att tydliggöra syfte och användning. Denna struktur gör det enkelt att lägga till nya funktioner eller ändra befintliga utan att påverka andra delar av systemet.

---

## Kapitel 11: Systems

Systemet är designat för att vara löst kopplat och modulärt. Varje del har ett tydligt ansvar och kommunicerar via väldefinierade gränssnitt. Det innebär att:

- Moduler kan bytas ut, testas eller vidareutvecklas utan att påverka resten av systemet.
- UI:t är separerat från logik – all textbehandling sker i moduler, och gränssnittet anropar bara publika metoder.
- Felhantering är centraliserad i UI:t för vissa moduler, vilket gör det enkelt att ge användaren tydlig feedback.
- Systemet är lätt att bygga ut med nya funktioner, t.ex. genom att lägga till nya moduler eller metoder.
- Testbarheten är hög eftersom varje modul kan testas isolerat och systemet är fritt från hårda beroenden.

En viktig princip jag har använt är dependency injection för att underlätta testning och utbyte av implementationer. Istället för att hårdkoda beroenden, skickas t.ex. valideringsfunktioner eller externa tjänster in som parametrar till moduler eller metoder. Detta gör det enkelt att mocka eller byta ut implementationer vid testning, till exempel genom att ersätta en riktig valideringsfunktion med en teststub, eller byta ut en textbehandlingsmodul mot en alternativ version. I tester kan jag därmed kontrollera exakt vilka beroenden som används, vilket ger isolerade och pålitliga tester. Samma princip gör det enkelt att vidareutveckla systemet – om en ny implementation behövs kan den injiceras utan att resten av koden behöver ändras. Detta följer Clean Code-principen om att undvika hårda beroenden och främjar både testbarhet och flexibilitet.

Systemet är robust mot förändringar och kan enkelt anpassas till nya krav.

Nedan följer några kodexempel som visar hur dessa principer tillämpas:

**Exempel på systemets struktur från app.js:**

```js
const formatter = new TextFormatterModule()
const searcher = new TextSearcherModule()
// ... fler moduler
resultDisplay.textContent = formatter.toUpperCase(userInputTextArea.value)
```

**Exempel på dependency injection och testbarhet:**

```js
// TextFormatterModule.js
export class TextFormatterModule {
  constructor(validationFn) {
    this.validate = validationFn
  }
  toUpperCase(inputText) {
    if (!this.validate(inputText)) return 'Ogiltig input'
    return new TextFormatter(inputText).toUpperCase()
  }
}

// Vid testning:
const alwaysValid = () => true
const formatterTest = new TextFormatterModule(alwaysValid)
expect(formatterTest.toUpperCase('test')).toBe('TEST')

// Vid produktion:
import { isValidInput } from '../utilities/validation.js'
const formatterProd = new TextFormatterModule(isValidInput)
```

*Förklaring:* I exemplet ovan skickas en funktion (validationFn) in till klassen TextFormatterModule. Istället för att klassen själv bestämmer hur validering ska göras, får den en funktion som parameter. Det kallas dependency injection och gör att man enkelt kan byta ut valideringen – till exempel använda en riktig valideringsfunktion i produktion, och en förenklad (alltid godkänd) i tester. På så sätt kan man testa klassen utan att vara beroende av riktig validering, vilket gör testerna enklare och mer pålitliga.

I testet används en "alwaysValid"-funktion som alltid returnerar true, så att testet fokuserar på formatteringen och inte på valideringen. I produktion används istället den riktiga valideringsfunktionen från utilities/validation.js. Detta gör koden flexibel och lätt att testa!

**Exempel på att byta ut implementation:**

```js
// Byt ut TextFormatter mot en mock i test:
class MockTextFormatter {
  toUpperCase() { return 'MOCK' }
}
const formatter = new TextFormatterModule(isValidInput)
formatter.TextFormatter = MockTextFormatter
expect(formatter.toUpperCase('hej')).toBe('MOCK')
```

*Förklaring:* I detta exempel skapas en "MockTextFormatter"-klass som bara returnerar "MOCK" istället för att göra riktig formattering. I testet byter man ut den riktiga TextFormatter mot mocken, så att man kan kontrollera att resten av koden fungerar som den ska – utan att vara beroende av den riktiga formatteringen. Detta är ett vanligt sätt att testa systemets olika delar var för sig och är möjligt tack vare att systemet är löst kopplat och använder dependency injection.

Denna struktur gör att systemet är lätt att förstå, underhålla och vidareutveckla – precis enligt Clean Code-principerna.

---
