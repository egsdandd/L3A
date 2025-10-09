# L3A - Text Analysis Application

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![Clean Code](https://img.shields.io/badge/Clean%20Code-Compliant-brightgreen.svg)](https://github.com/ryanmcdermott/clean-code-javascript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

En moderna, modulär textanalysapplikation byggd med Clean Code-principer. L3A erbjuder omfattande textbearbetning, analys och interaktiva textspel genom en intuitiv webbgränssnitt.

## 🚀 Funktioner

### 📊 **Text Analyzer**

- Ordräkning och teckenanalys
- Meningslängd och komplexitetsanalys  
- Ordfrekvens och statistik
- Läsbarhetsbedömning

### 🎨 **Text Formatter**

- Versalisering och gemener
- Kapitalisering av ord/meningar
- Indragning och formatering
- Textnormalisering

### 🔄 **Text Transformer**

- ROT13 kryptering/dekryptering
- Base64 kodning/avkodning
- Morse kod transformation
- Textomvändning (reverse)

### 🔍 **Text Searcher**

- Enkel och avancerad sökning
- Regular expressions (RegEx)
- Case-sensitive/insensitive sökning
- Sök och ersätt funktionalitet

### ✨ **Writing Assistant**

- Ordförslag och synonymer
- Grammatikkontroll
- Stilförbättringar
- Skrivhjälp och optimering

### 🎮 **Text Gaming Hub**

- **Ordgissning** - Gissa dolda ord med ledtrådar
- **Ordkryptering** - Dekryptera krypterade ord
- **Ordbyggare** - Bygg ord från givna bokstäver  
- **Minnestest** - Memorera och återskapa texter
- **Rimspel** - Hitta rim till givna ord
- **Ordkedja** - Skapa kedjor av sammankopplade ord

### 🕵️ **Text Forensics Detective**

- Text fingerprinting och identifiering
- Mönster detection i texter
- Stilanalys och författarskap
- Dold textdetektion
- Textjämförelse och likhet
- Språkdetektion

### 🎭 **Mood & Emotion Engine**

- Sentimentanalys (positiv/negativ/neutral)
- Känslodetektering och kategorisering
- Stämningsanalys över tid
- Stressnivådetektering
- Energinivåanalys
- Interaktiv stämningskarta

### ↩️ **Text Reverser**

- Teckenvis textomvändning
- Radvis omvändning
- Ordvis omvändning
- Flexibel omkonfigurering

## 🏗️ Arkitektur

Applikationen är byggd enligt **Clean Code-principer** med modulär arkitektur:

```
public/js/
├── core/                    # Kärnsystem
│   ├── module-loader.js     # Dynamisk modulladdning
│   └── ui-renderer.js       # UI-rendering och felhantering
├── utilities/               # Delade hjälpfunktioner
│   ├── dom-helpers.js       # DOM-manipulation
│   ├── display-helpers.js   # Visningshjälp
│   └── interaction-helpers.js # Interaktionslogik
├── gaming/                  # Spelmoduler
│   ├── gaming-core.js       # Spelgränssnitt
│   ├── word-games.js        # Ordspel
│   ├── creative-games.js    # Kreativa spel
│   └── memory-helpers.js    # Minnesspel och hjälp
├── mood/                    # Stämningsanalys
│   ├── mood-core.js         # Känslougränssnitt
│   ├── mood-analyzers.js    # Analysmetoder
│   └── mood-renderers.js    # HTML-generering
├── forensics/               # Forensisk analys
│   ├── forensics-core.js    # Forensiskt gränssnitt
│   └── forensics-analyzers.js # Analysverktyg
└── [module]UI.js           # Huvudmoduler (< 150 rader var)
```

### Designprinciper

- **Single Responsibility Principle** - Varje modul har ett tydligt ansvar
- **DRY (Don't Repeat Yourself)** - Återanvändbar kod i utilities/
- **Separation of Concerns** - Tydlig separation mellan UI, logik och data
- **Clean Functions** - Små, fokuserade funktioner under 20 rader
- **Meaningful Names** - Självdokumenterande kod utan onödiga kommentarer

## 🛠️ Installation

### Förutsättningar

- Node.js 18+
- npm (medföljande med Node.js)

### Steg-för-steg installation

1. **Klona repositoryt**

```bash
git clone [repository-url]
cd L3A
```

2.**Installera dependencies**

```bash
npm install
```

3.**Starta applikationen**

```bash
npm start
```

4.**Öppna i webbläsare**

```
http://localhost:3000
```

## 📖 Användning

### Grundläggande användning

1. **Ladda upp textfil**
   - Navigera till startsidan
   - Välj en textfil (.txt) från din dator
   - Klicka "Ladda upp fil"

2. **Välj analysverktyg**
   - Klicka på önskad modulknapp (Text Analyzer, Gaming Hub, etc.)
   - Modulens gränssnitt laddas automatiskt

3. **Utför analys/aktivitet**
   - Följ instruktionerna för vald modul
   - Resultat visas direkt i gränssnittet

### Exempel: Text Gaming Hub

```javascript
// Starta ordgissningsspel
1. Klicka "🎮 Text Gaming Hub"
2. Välj "Ordgissning" 
3. Gissa dolda ord baserat på din uppladdat text
4. Använd ledtrådar för hjälp
5. Se dina resultat och poäng
```

### Exempel: Mood Engine

```javascript
// Analysera textens stämning
1. Klicka "🎭 Mood & Emotion Engine"
2. Välj "Sentiment Analys"
3. Se positiv/neutral/negativ fördelning
4. Utforska känslokarta och energinivåer
```

## 🧪 Testning

Applikationen inkluderar en omfattande testplan med 63 testfall:

```bash
# Visa testplan
cat TESTPLAN.md

# Testområden som täcks:
- Grundläggande funktionalitet (4 tester)
- Alla moduler (40+ tester)  
- Clean Code arkitektur (6 tester)
- Felhantering och gränser (5 tester)
```

### Manuell testning

1. Följ instruktionerna i `TESTPLAN.md`
2. Testa varje modul systematiskt
3. Verifiera error handling med edge cases
4. Dokumentera resultat enligt testplanen

## 📚 Dokumentation

- **TESTPLAN.md** - Omfattande testplan med 63 testfall
- **reflection.md** - Clean Code reflektion (kapitel 2-11)
- **UPPFATTNING.md** - Ärlig bedömning av kvalitetskonflikter
- **ARCHITECTURE_SUMMARY_CLEAN.md** - Arkitekturöversikt

## 🎯 Clean Code Implementation

Detta projekt demonstrerar praktisk tillämpning av Clean Code-principer:

### Kapitel 2-11 implementering

- ✅ **Meaningful Names** - Självförklarande variabel- och funktionsnamn
- ✅ **Functions** - Små, fokuserade funktioner med enstaka ansvar  
- ✅ **Comments** - Självdokumenterande kod, minimala kommentarer
- ✅ **Formatting** - Konsekvent kod-formatering och struktur
- ✅ **Objects and Data Structures** - Tydlig separation av data och beteende
- ✅ **Error Handling** - Robust felhantering utan return codes
- ✅ **Boundaries** - Wrapper för externa API:er och bibliotek
- ✅ **Unit Tests** - Systematisk testplan för kvalitetssäkring
- ✅ **Classes** - Single Responsibility och high cohesion
- ✅ **Systems** - Modulär arkitektur med separation of concerns

### Kvalitetsmått

- 🎯 **Alla filer under 150 rader** (ursprungligen 637 rader)
- 🎯 **9 moduler** med tydliga ansvarsområden
- 🎯 **63 testfall** för omfattande kvalitetssäkring
- 🎯 **Zero duplicated code** tack vare utilities-moduler

## 🤝 Bidrag

### Utvecklingsriktlinjer

1. Följ Clean Code-principerna
2. Håll funktioner under 20 rader
3. Använd meaningful names
4. Skriv testfall för nya funktioner
5. Dokumentera komplexa affärslogik

### Pull Request Process

1. Forka repositoryt
2. Skapa feature branch (`git checkout -b feature/amazing-feature`)
3. Commita ändringar (`git commit -m 'Add amazing feature'`)
4. Pusha till branch (`git push origin feature/amazing-feature`)
5. Öppna Pull Request

## 📄 Licens

Detta projekt är licensierat under MIT License - se [LICENSE](LICENSE) filen för detaljer.

## 👥 Författare

- Utvecklingsteam - Initial implementation och Clean Code refactoring

## 🙏 Erkännanden

- **Robert C. Martin** - Clean Code principles och inspiration
- **Express.js** - Webb-framework
- **EJS** - Templating engine
- **texttoolkit** - Core text processing library

## 📞 Support

För frågor eller support:

- Öppna en issue på GitHub
- Konsultera dokumentationen i `/docs`
- Följ testplanen i `TESTPLAN.md`

---

**L3A - Där textanalys möter Clean Code** 🚀📝✨
