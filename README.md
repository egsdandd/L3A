
# L3A - Text Analysis Application

En modern, modulär textanalysapplikation byggd med Clean Code-principer och ES modules. L3A fokuserar på kärnfunktionalitet för textbearbetning genom ett intuitivt webbgränssnitt och modern JavaScript-arkitektur.

Detta är revision 2.0.0 av min app och är helt omskriven från 1.0.0. Backend och serverdel är borttaget – allt körs som en ren frontend-applikation med Vite och Vitest. Appen är modulär, testbar och följer Clean Code-principer. All logik ligger i ES-moduler och UI:t är separerat från kärnlogik.

[Till min examinator - läs detta först - UPPDATERAD](./MD-Files/examination.md)
---

### Projektinformation

| Metadata | Värde |
| :--- | :--- |
| **Utvecklare** | Dan-Håkan Davall |
| **Version** | 2.0.0 |
| **Kontakt** | <dd22mk@student.lnu.se> |

---

### Huvudfunktioner

#### 📊 Text Analyzer

- Räkna ord, meningar och tecken
- Bokstavsfrekvens
- Hitta palindrom

#### 🎨 Text Formatter

- Versaler/gemener
- Första bokstaven stor i varje ord
- camelCase

#### 🔄 Text Transformer

- Vänd ordning på ord
- Sortera ord alfabetiskt
- Blanda ord slumpmässigt

### � Text Searcher

- Hitta första/all förekomst av sökterm
- Räkna antal träffar
- Finns/Existenskontroll

---

### Arkitektur

**Frontend:** Vanilla JS med ES Modules, byggs och servas med Vite.
**UI och logik:** UI:t (`index.html`) ligger i projektroten och är helt separerat från logikmodulerna i `src/`.
**Modulstruktur:** Funktionalitet som analys, formattering, transformation och sökning ligger i egna moduler under `src/frontend/`.
**Validering:** Inputvalidering sker via `src/frontend/utilities/validation.js`.
**Testning:** All kärnlogik testas med Vitest, testfiler ligger i `src/frontend/tests/`.
**Ingen backend/server:** All kod körs i webbläsaren, ingen Node/Express eller databas används.
**Ren Clean Code:** Små, fokuserade moduler, tydliga gränssnitt, robust felhantering och hög testbarhet.

**Exempel på struktur:**

```text
src/
  frontend/
    app.js
    TextAnalyserModule.js
    TextFormatterModule.js
    TextTransformerModule.js
    TextSearcherModule.js
    utilities/
      validation.js
    tests/
      TextAnalyserModule.test.js
      TextFormatterModule.test.js
      TextSearcherModule.test.js
      TextTransformerModule.test.js
public/
  favicon.ico
  vite.svg
dist/ (skapas vid build)
```

---

### Installation

#### Förutsättningar

- Node.js 18+
- npm

#### Steg-för-steg

1. Klona repositoryt

    ```bash
    git clone [github.com/egsdandd/L3A]
    cd L3A
    ```

2. Installera dependencies

    ```bash
    npm install
    ```

3. Starta utvecklingsserver

    ```bash
    npm run dev
    ```

    Öppna sedan <http://localhost:3000> i webbläsaren.

4. Bygg för produktion

    ```bash
    npm run build
    ```

---

## 🚢 Deployment med Docker

Du kan köra projektet som en Docker-container med nginx som statisk server. Detta gör det enkelt att köra appen på valfri plattform med Docker installerat.

### Bygg och kör med Docker

1. Bygg Docker-image:

   ```bash
   docker build -t textanalyser-app .
   ```

2. Starta containern:

   ```bash
   docker run -p 8080:80 textanalyser-app
   ```

Appen är nu tillgänglig på [http://localhost:8080](http://localhost:8080)

### Vad händer i Dockerfile?

- Projektet byggs med Node.js (Vite)
- De färdiga statiska filerna kopieras till nginx-image
- nginx serverar filerna på port 80

Appen finns tillgänglig live som docker container på **storemyr14.ddns.net (portöppning kan krävas - säg till)**

---

---

### Testning

```bash
npm test    # Kör alla Vitest-tester
```

---

### Dokumentation

- [examination.md](./MD-Files/examination.md) - Redovisning och designval
- [reflection.md](./MD-Files/reflection.md) - Clean Code-reflektion
- [TESTPLAN.md](./MD-Files/TESTPLAN.md) - Testplan

---

### Clean Code & Kvalitet

- ✅ Modulär, ES Modules-baserad kod
- ✅ Clean Code-principer i hela kodbasen
- ✅ Automatiserade tester för all kärnlogik
- ✅ Separation av UI, logik och utilities

---

### Licens

MIT License - se [LICENSE](LICENSE) för detaljer.

---

---

## Målgruppsanpassad dokumentation

### För Slutanvändare

- **Vad är L3A?** En enkel webapp för textanalys, formattering, transformation och sökning.
- **Kom igång:**
  1. Installera Node.js och npm.
  2. Klona repo och kör `npm install`.
  3. Starta med `npm run dev` och öppna <http://localhost:3000>.
- **Exempel:**
  - Klistra in text i appen och analysera, formattera eller sök direkt i webbläsaren.

### För Apputvecklare

- **Arkitektur:**
  - All logik ligger i ES-moduler under `src/frontend/`.
  - UI och logik är separerade.
  - Testning med Vitest, testfiler i `src/frontend/tests/`.
- **Utöka appen:**
  - Lägg till nya moduler i `src/frontend/`.
  - Följ Clean Code-principer och använd befintlig valideringsmodul.

### För Modulanvändare

- **texttoolkit:**
  - Appen använder npm-modulen `texttoolkit` för textmanipulation.
- **Exempel på användning:**

    ```js
    import { TextFormatter } from 'texttoolkit';
    const formatter = new TextFormatter('text');
    formatter.toUpperCase();
    ```

### För Modulutvecklare

- **Bidra/utöka:**
  - Lägg till nya funktioner i egna moduler under `src/frontend/`.
  - Skriv tester i `src/frontend/tests/`.
- **Tips:**
  - Följ Clean Code och modulär struktur.
  - Dokumentera publika metoder med JSDoc.

### För Examinator

- **Översikt:**
  - README.md ger en snabb överblick av funktioner, struktur och teknikval.
  - Se även [examination.md](./MD-Files/examination.md) och [reflection.md](./MD-Files/reflection.md) för fördjupad reflektion och designval.

## 👤 Projektinformation

| Metadata | Värde |
| :--- | :--- |
| **Utvecklare** | Dan-Håkan Davall |
| **Version** | 2.0.0 |
| **Kontakt** | <dd22mk@student.lnu.se> |

---

## 🚀 Huvudfunktioner

### 📊 Text Analyzer (Analysfunktioner)

- Räkna ord, meningar och tecken
- Bokstavsfrekvens
- Hitta palindrom

### 🎨 Text Formatter (Formatteringsfunktioner)

- Versaler/gemener
- Första bokstaven stor i varje ord
- camelCase

### 🔄 Text Transformer (Funktioner)

- Vänd ordning på ord
- Sortera ord alfabetiskt
- Blanda ord slumpmässigt

### 🔍 Text Searcher

- Hitta första/all förekomst av sökterm
- Räkna antal träffar
- Finns/Existenskontroll

---

## 🏗️ Arkitektur

**Frontend:** Vanilla JS med ES Modules, byggs och servas med Vite.
**UI och logik:** UI:t (i `public/js/` och `public/index.html`) är helt separerat från logikmodulerna i `src/`.
**Modulstruktur:** Funktionalitet som analys, formattering, transformation och sökning ligger i egna moduler under `src/frontend/`.
**Validering:** Inputvalidering sker via `src/frontend/utilities/validation.js`.
**Routing:** Ingen routing/server – all kod körs i webbläsaren.
**Testning:** All kärnlogik testas med Vitest, testfiler ligger i `src/tests/`.
**Ingen backend/server:** All kod körs i webbläsaren, ingen Node/Express eller databas används.
**Ren Clean Code:** Små, fokuserade moduler, tydliga gränssnitt, robust felhantering och hög testbarhet.

**Exempel på struktur:**

```text
src/
    frontend/
        app.js
        TextAnalyserModule.js
        TextFormatterModule.js
        TextTransformerModule.js
        TextSearcherModule.js
        utilities/
            validation.js
        tests/
            TextAnalyserModule.test.js
            TextFormatterModule.test.js
            TextSearcherModule.test.js
            TextTransformerModule.test.js
public/
    favicon.ico
    vite.svg
dist/ (skapas vid build)
```

---

## 🛠️ Installation

### Systemkrav

- Node.js 18+
- npm

### Steg-för-steg (Installation)

1. Klona repositoryt

    ```bash
    git clone [github.com/egsdandd/L3A]
    cd L3A
    ```

2. Installera dependencies

    ```bash
    npm install
    ```

3. Starta utvecklingsserver

    ```bash
    npm run dev
    ```

    Öppna sedan <http://localhost:3000> i webbläsaren.

4. Bygg för produktion

    ```bash
    npm run build
    ```

    Ladda upp innehållet i `dist/` till din webbserver (t.ex. Raspberry Pi/nginx).

---

## 🧪 Testning

```bash
npm test    # Kör alla Vitest-tester
```

---

## 📚 Dokumentation

- [examination.md](./MD-Files/examination.md) - Redovisning och designval
- [reflection.md](./MD-Files/reflection.md) - Clean Code-reflektion
- [TESTPLAN.md](./MD-Files/TESTPLAN.md) - Testplan

---

## 🎯 Clean Code & Kvalitet

- ✅ Modulär, ES Modules-baserad kod
- ✅ Clean Code-principer i hela kodbasen
- ✅ Automatiserade tester för all kärnlogik
- ✅ Separation av UI, logik och utilities

---

## 📄 Licens

MIT License - se [LICENSE](LICENSE) för detaljer.

---

**L3A - Där textanalys möter Clean Code** 🚀📝✨
