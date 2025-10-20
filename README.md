# L3A - Text Analysis Application

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![Clean Code](https://img.shields.io/badge/Clean%20Code-Compliant-brightgreen.svg)](https://github.com/ryanmcdermott/clean-code-javascript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

En streamlinad, modulär textanalysapplikation byggd med Clean Code-principer och ES modules. L3A fokuserar på kärnfunktionalitet för textbearbetning genom en intuitiv webbgränssnitt med moderna JavaScript-arkitektur.

[Till min examinator - läs detta förs](./MD-Files/examination.md)

## 👤 Projektinformation

| Metadata | Värde |
| :--- | :--- |
| **Utvecklare** | [ Dan-Håkan Davall ] |
| **Revision (Version)** | 1.0.0 |
| **Kontakt** | [dd22mk@student.lnu.se] |

---

## 🚀 Huvudfunktioner

### 📊 **Text Analyzer**

- **Räkna Ord** - Exakt antal ord i texten
- **Räkna Meningar** - Antal meningar i texten
- **Räkna Tecken** - Bokstäver, siffror och totalt antal tecken
- **Bokstavsfrekvens** - Fördelning av bokstäver i texten
- **Hitta Palindrom** - Hitta ord som stavas likadant fram och bakåt

### 🎨 **Text Formatter**

- **Versaler/gemener** - Konvertera till stora eller små bokstäver
- **Första bokstaven Stor** - Första bokstaven stor i varje ord
- **CamelCase** - Formatering för programmeringssyfte

### 🔄 **Text Transformer**

- **Vänd Ordning** - Vänd ordning på ord i texten
- **Sortea Ord** - Alfabetisk sortering av ord
- **Blanda Ord** - Slumpmässig blandning av ord

### 🔍 **Text Searcher**

- **Hitta Första** - Hitta första förekomsten
- **Hitta Alla** - Hitta alla förekomster
- **Räkna** - Antal träffar för sökterm
- **Finns/Existenskontroll** - Kontrollera om text innehåller specifik term, true eller false

## 🏗️ Arkitektur

Applikationen använder **ES Modules** och **Clean Code-principer** med en streamlinad modulär arkitektur:

### Backend (Node.js + Express)

```text
src/
├── app.js                   # Huvudserver med ES modules
├── routes/                  # API-endpoints med texttoolkit
│   ├── analyzer.js          # Text Analyzer API (använder TextAnalysisService)
│   ├── formatter.js         # Text Formatter API  
│   ├── transformer.js       # Text Transformer API
│   ├── searcher.js          # Text Searcher API
│   └── upload.js            # Filuppladdning och rendering
└── services/                # Business logic (OOP-tjänster)
    └── TextAnalysisService.js # Analyzer service-klass
```

### Frontend (Modulär JavaScript)

```text
public/js/
├── showFile.js              # Huvudkontroller (ES module)
├── global-functions.js      # Globala DOM-funktioner
├── constants.js             # Konstanter (ANALYZER_ACTIONS etc.)
├── core/                    # Kärnsystem
│   ├── module-loader.js     # Dynamisk modulladdning
│   └── ui-renderer.js       # UI-rendering och felhantering
├── utilities/               # Delade hjälpfunktioner
│   ├── dom-helpers.js       # DOM-manipulation
│   ├── display-helpers.js   # Visningshjälp
│   ├── interaction-helpers.js # Interaktionslogik
│   └── server-utils.js      # Server-relaterade hjälpfunktioner
└── UI-moduler/              # Funktionsspecifika gränssnitt
    ├── analyzerUI.js        # Text Analyzer UI
    ├── formatterUI.js       # Text Formatter UI
    ├── transformerUI.js     # Text Transformer UI
    └── searcherUI.js        # Text Searcher UI
```

### Teknisk Stack & Designprinciper

**Moderna JavaScript:**

- **ES Modules** (`"type": "module"` i package.json)
- **Dynamic imports** för lazy loading
- **Async/await** för API-anrop
- **Modulariserad kodstruktur**

**Clean Code Implementation:**

- **Single Responsibility** - Varje modul och funktion har ett tydligt ansvar
- **DRY Principle** - Återanvändbar kod i utilities/ och core/
- **Meaningful Names** - Självdokumenterande funktions- och variabelnamn
- **Small Functions** - Fokuserade funktioner med begränsad komplexitet
- **Error Handling** - Robust felhantering med try-catch och user feedback

## 🛠️ Installation

### Förutsättningar

- Node.js 18+
- npm (medföljande med Node.js)

### Steg-för-steg installation för en lokal PC

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

4.**Öppna lokalt i webbläsare**

```HTML
http://localhost:3000
```

### Driftsatt App

1.**Kör direkt i webbläsare**

```HTML
http://storemyr14.ddns.net
```

Denna version av min app går som en docker container på en Raspberry PI. Det finns en port-forward regel i FW som jag måste öppna när någon vill testa. Låt mig veta när det är dags.

## 📖 Användning

1. **Ladda upp textfil** → Välj .txt/.md fil och klicka "Ladda upp"
2. **Välj verktyg** → Klicka på önskad modul (Analyzer, Formatter, Transformer, Searcher)
3. **Utför analys** → Använd knapparna, resultat visas direkt

## 🧪 Testning

```bash
npm test    # Kör 22 Jest tester (backend API, struktur, utilities)
npm run lint    # ESLint kodkvalitetskontroll
```

**[Detaljerad testrapport](./MD-Files/TEST_REPORT.MD)**

## 📚 Dokumentation

- **[reflection.md](.MD-Files/reflection.md)** - Clean Code-reflektion och implementering
- **[TEST_REPORT.MD](./MD-Files/TEST_REPORT.MD)** - Komplett testrapport

## 🎯 Clean Code & Kvalitet

✅ **Hybrid arkitektur** - Clean Code funktioner + OOP service-lager  
✅ **ES Modules** - Modern JavaScript genom hela appen  
✅ **22 automatiserade tester** - Backend API och strukturvalidering  
✅ **Separation of concerns** - Routes, services, utilities, UI-moduler

## 📄 Licens

Detta projekt är licensierat under MIT License - se [LICENSE](LICENSE) filen för detaljer.

## 👥 Författare

- **Dan-Håkan Davall** - Initial implementation och Clean Code refactoring

## 🙏 Erkännanden

- **Robert C. Martin** - Clean Code principles och inspiration
- **Express.js** - Modern webb-framework med ES modules support
- **EJS** - Flexibel templating engine
- **texttoolkit** - Core text processing library (egen npm-modul)

## 📞 Support

För frågor eller support:

- Öppna en issue på GitHub
- Konsultera dokumentationen i `/MD-Files`
- Följ testplanen i [testplan](`./MD-Files/TESTPLAN.md`)
- API referens [API](./MD-Files/API_REFERENCE.md)

---

**L3A - Där textanalys möter Clean Code** 🚀📝✨
