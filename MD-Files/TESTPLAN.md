# Testplan för L3A Text Analysis Application

## Översikt

Denna testplan täcker alla funktionella krav för L3A applikationen efter Clean Code refactoring. Testerna är designade för manuell utförande via applikationens webbgränssnitt.

## Testmiljö

- **URL**: <http://localhost:3000> eller <http://storemyr14.ddns.net>
- **Browser**: Chrome/Firefox/Edge
- **Node.js Version**: 18+
- **Test Type**: Manuella funktionstester

---

## 📊 TESTFALL TABELL

| Test ID | Testnamn | Modul | Indata | Förväntat Utfall | Teststatus |
|---------|----------|--------|---------|------------------|------------|
| **GRUNDLÄGGANDE FUNKTIONALITET** | | | | | |
| T001 | Applikation startar korrekt | System | Navigera till localhost:3000 | Startsida visas med upload-funktionalitet | ⏳ |
| T002 | Filuppladdning fungerar | Upload | Textfil (.txt) med innehåll "Hej världen" | Filen laddas upp och innehållet visas | ⏳ |
| T003 | Textvisning från uppladdad fil | Display | Uppladdad fil med text | Text visas i scrollbar-område | ⏳ |
| T004 | Alla modulknappar visas | UI | Öppna showFile-sida | 4 modulknappar visas (Analyzer, Formatter, Transformer, Searcher) | ⏳ |
| **TEXT ANALYZER MODUL** | | | | | |
| T005 | Text Analyzer laddar | TextAnalyzer | Klicka "📊 Text Analyzer" | Text Analyzer gränssnitt visas | ⏳ |
| T006 | Räkna Ord | TextAnalyzer | Text: "Hej hej världen" | Antal ord: 3 | ⏳ |
| T007 | Räkna Meningar | TextAnalyzer | Text: "Hej. Hej världen!" | Antal meningar: 2 | ⏳ |
| T008 | Räkna Tecken | TextAnalyzer | Text: "Hej!" | Antal tecken: 4 | ⏳ |
| T009 | Bokstavsfrekvens | TextAnalyzer | Text: "aabbb" | Frekvens: a:2, b:3 | ⏳ |
| T010 | Hitta palindrom | TextAnalyzer | Text: "anna kajak bil" | Palindrom: anna, kajak | ⏳ |
| **TEXT FORMATTER MODUL** | | | | | |
| T011 | Text Formatter laddar | TextFormatter | Klicka "🎨 Text Formatter" | Text Formatter gränssnitt visas | ⏳ |
| T012 | Till Versaler | TextFormatter | Text: "hej världen" | "HEJ VÄRLDEN" | ⏳ |
| T013 | Till Gemener | TextFormatter | Text: "HEJ VÄRLDEN" | "hej världen" | ⏳ |
| T014 | Första Bokstaven Stor | TextFormatter | Text: "hej världen" | "Hej Världen" | ⏳ |
| T015 | camelCase | TextFormatter | Text: "hej världen" | "hejVärlden" | ⏳ |
| **TEXT TRANSFORMER MODUL** | | | | | |
| T016 | Text Transformer laddar | TextTransformer | Klicka "🔄 Text Transformer" | Text Transformer gränssnitt visas | ⏳ |
| T017 | Vänd ordning | TextTransformer | Text: "Hej världen" | Transformerat till "världen Hej" | ⏳ |
| T018 | Sortera ord | TextTransformer | Text: "banan äpple citron" | Transformerat till "äpple banan citron" | ⏳ |
| T019 | Blanda ord | TextTransformer | Text: "ett två tre" | Orden visas i slumpmässig ordning | ⏳ |
| **TEXT SEARCHER MODUL** | | | | | |
| T020 | Text Searcher laddar | TextSearcher | Klicka "🔍 Text Searcher" | Text Searcher gränssnitt visas | ⏳ |
| T021 | Hitta Första | TextSearcher | Sök: "hej" i text: "hej hej världen" | Första "hej" markeras | ⏳ |
| T022 | Hitta ALLA | TextSearcher | Sök: "hej" i text: "hej hej världen" | Alla "hej" markeras | ⏳ |
| T023 | Räkna | TextSearcher | Sök: "hej" i text: "hej hej världen" | Antal träffar: 2 | ⏳ |
| T024 | Finns | TextSearcher | Sök: "hej" i text: "hej världen" | Returnerar true om "hej" finns, annars false | ⏳ |
| **CLEAN CODE ARKITEKTUR** | | | | | |
| T025 | Modulariserad struktur | System | Kontrollera filstruktur | Alla moduler under 150 rader | ⏳ |
| T026 | Core moduler fungerar | System | Testa modul-laddning | module-loader och ui-renderer fungerar | ⏳ |
| T027 | Utilities moduler fungerar | System | Testa utility funktioner | dom-helpers, display-helpers fungerar | ⏳ |
| **FELHANTERING & GRÄNSER** | | | | | |
| T028 | Tom text hantering | Alla moduler | Tom sträng som input | Lämpligt felmeddelande eller hantering | ⏳ |
| T029 | Mycket lång text | Alla moduler | Text >10,000 tecken | Prestanda acceptabel, inga krascher | ⏳ |
| T030 | Specialtecken hantering | Alla moduler | Text med åäö, emojis, symboler | Korrekt hantering av Unicode | ⏳ |
| T031 | Modulfel hantering | System | Om modul inte kan laddas | Felmeddelande visas | ⏳ |
| T032 | Nätverksfel hantering | Alla moduler | När backend inte svarar | Timeout-hantering och felmeddelande | ⏳ |

---

## 🚀 UTFÖRANDEINSTRUKTIONER

### Förberedelser

1. Starta applikationen: `npm start` eller kör den driftsatta
2. Öppna webbläsare och navigera till `http://localhost:3000` eller `http://storemyr14.ddns.net`
3. Förbered testfiler med olika innehåll

### Testutförande

1. Utför varje test i ordning
2. Markera resultat i "Teststatus" kolumnen:
   - ✅ PASS - Test godkänd
   - ❌ FAIL - Test misslyckad  
   - ⚠️ WARNING - Partiellt godkänd med anmärkningar
   - ⏳ PENDING - Ej utförd

### Dokumentation

- Notera alla fel och avvikelser
- Ta skärmdumpar vid behov
- Dokumentera prestanda för stora textfiler

---

## 📋 TESTRAPPORT MALL

**Testdatum**: ___________
**Testmiljö**: ___________
**Testutförare**: ___________

**Sammanfattning**:

- Totalt antal tester: 32
- Godkända: ___/32
- Misslyckade: ___/32
- Kritiska fel: ___

**Kommentarer**:
_Plats för allmänna observationer och förbättringsförslag_
