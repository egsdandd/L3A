
# L3A - Text Analysis Application

En modern, modulär textanalysapplikation byggd med Clean Code-principer och ES modules. L3A fokuserar på kärnfunktionalitet för textbearbetning genom ett intuitivt webbgränssnitt och modern JavaScript-arkitektur.

[Till min examinator - läs detta först](./MD-Files/examination.md)

## 👤 Projektinformation

| Metadata | Värde |
| :--- | :--- |
| **Utvecklare** | Dan-Håkan Davall |
| **Version** | 1.0.0 |
| **Kontakt** | <dd22mk@student.lnu.se> |

---

## 🚀 Huvudfunktioner

### 📊 Text Analyzer

- Räkna ord, meningar och tecken
- Bokstavsfrekvens
- Hitta palindrom

### 🎨 Text Formatter

- Versaler/gemener
- Första bokstaven stor i varje ord
- camelCase

### 🔄 Text Transformer

- Vänd ordning på ord
- Sortera ord alfabetiskt
- Blanda ord slumpmässigt

### 🔍 Text Searcher

- Hitta första/all förekomst av sökterm
- Räkna antal träffar
- Finns/Existenskontroll

---

## 🏗️ Arkitektur

- **Frontend:** Vanilla JS + Vite + ES Modules
- **Modulär struktur:** Varje textfunktion är en egen klass/modul
- **Clean Code:** Små, fokuserade klasser och funktioner, DRY, tydliga namn, robust felhantering
- **Gemensam valideringsmodul:** All inputvalidering sker via `utilities/validation.js`
- **Automatiserade tester:** Vitest används för att testa all kärnlogik

**Exempel på struktur:**

```text
src/
  frontend/
      TextAnalyserModule.js
      TextFormatterModule.js
      TextTransformerModule.js
      TextSearcherModule.js
      app.js
      utilities/
          validation.js
      tests/
          TextAnalyserModule.test.js
          ...
index.html
public/
  favicon.ico
  vite.svg
dist/ (skapas vid build)
```

---

## 🛠️ Installation

### Förutsättningar

- Node.js 18+
- npm

### Steg-för-steg

1. Klona repositoryt

    ```bash
    git clone [repository-url]
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
