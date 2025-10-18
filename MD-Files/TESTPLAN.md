# Testplan för L3A Text Analysis Application

## Översikt

Denna testplan täcker alla funktionella krav för L3A applikationen efter Clean Code refactoring. Testerna är designade för manuell utförning via applikationens webbgränssnitt.

## Testmiljö

- **URL**: <http://localhost:3000>

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
| T004 | Alla modulknappar visas | UI | Öppna showFile-sida | 9 modulknappar visas (Analyzer, Formatter, etc.) | ⏳ |
| **TEXT ANALYZER MODUL** | | | | | |
| T005 | Text Analyzer laddar | TextAnalyzer | Klicka "📊 Text Analyzer" | Text Analyzer gränssnitt visas | ⏳ |
| T006 | Ordräkning funktion | TextAnalyzer | Text: "Hej hej världen" | Visar antal ord: 3, tecken: 14 | ⏳ |
| T007 | Meningslängd analys | TextAnalyzer | Text med flera meningar | Genomsnittlig meningslängd beräknas | ⏳ |
| T008 | Ordfrekvens analys | TextAnalyzer | Text med upprepade ord | Lista över mest frekventa ord | ⏳ |
| **TEXT FORMATTER MODUL** | | | | | |
| T009 | Text Formatter laddar | TextFormatter | Klicka "🎨 Text Formatter" | Text Formatter gränssnitt visas | ⏳ |
| T010 | Versalisering funktion | TextFormatter | Text: "hej världen" | Formaterat till "HEJ VÄRLDEN" | ⏳ |
| T011 | Gemener funktion | TextFormatter | Text: "HEJ VÄRLDEN" | Formaterat till "hej världen" | ⏳ |
| T012 | Kapitaliserng funktion | TextFormatter | Text: "hej världen" | Formaterat till "Hej Världen" | ⏳ |
| T013 | Indragning funktion | TextFormatter | Flera rader text | Text indragning tillämpas | ⏳ |
| **TEXT TRANSFORMER MODUL** | | | | | |
| T014 | Text Transformer laddar | TextTransformer | Klicka "🔄 Text Transformer" | Text Transformer gränssnitt visas | ⏳ |
| T015 | ROT13 kodning | TextTransformer | Text: "ABC" | Transformerat till "NOP" | ⏳ |
| T016 | Base64 kodning | TextTransformer | Text: "Hej" | Base64 kodad sträng returneras | ⏳ |
| T017 | Morse kod transformation | TextTransformer | Text: "SOS" | Morse kod: "... --- ..." | ⏳ |
| T018 | Reverse transformation | TextTransformer | Text: "Hej" | Transformerat till "jeH" | ⏳ |
| **TEXT SEARCHER MODUL** | | | | | |
| T019 | Text Searcher laddar | TextSearcher | Klicka "🔍 Text Searcher" | Text Searcher gränssnitt visas | ⏳ |
| T020 | Enkel sökning | TextSearcher | Sök: "hej" i text: "Hej världen" | Träff hittas och markeras | ⏳ |
| T021 | Case-sensitive sökning | TextSearcher | Sök: "HEJ" (case-sensitive) i "Hej" | Ingen träff hittas | ⏳ |
| T022 | Regex sökning | TextSearcher | Regex: "[0-9]+" i text med siffror | Siffror hittas och markeras | ⏳ |
| T023 | Ersätt funktion | TextSearcher | Ersätt "hej" med "hallå" | Text uppdateras korrekt | ⏳ |
| **CLEAN CODE ARKITEKTUR** | | | | | |
| T024 | Modulariserad struktur | System | Kontrollera filstruktur | Alla moduler under 150 rader | ⏳ |
| T025 | Core moduler fungerar | System | Testa modul-laddning | module-loader och ui-renderer fungerar | ⏳ |
| T026 | Utilities moduler fungerar | System | Testa utility funktioner | dom-helpers, display-helpers fungerar | ⏳ |
| **FELHANTERING & GRÄNSER** | | | | | |
| T027 | Tom text hantering | Alla moduler | Tom sträng som input | Lämpligt felmeddelande eller hantering | ⏳ |
| T028 | Mycket lång text | Alla moduler | Text >10,000 tecken | Prestanda acceptabel, inga krascher | ⏳ |
| T029 | Specialtecken hantering | Alla moduler | Text med åäö, emojis, symboler | Korrekt hantering av Unicode | ⏳ |
| T030 | Modulfel hantering | System | Om modul inte kan laddas | Felmeddelande visas elegantly | ⏳ |
| T031 | Nätverksfel hantering | Alla moduler | När backend inte svarar | Timeout-hantering och felmeddelande | ⏳ |

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

- Totalt antal tester: 31
- Godkända: ___/31
- Misslyckade: ___/31
- Kritiska fel: ___

**Kommentarer**:
_Plats för allmänna observationer och förbättringsförslag_
