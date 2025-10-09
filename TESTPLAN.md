# Testplan för L3A Text Analysis Application

## Översikt

Denna testplan täcker alla funktionella krav för L3A applikationen efter Clean Code refactoring. Testerna är designade för manuell utförning via applikationens webbgränssnitt.

## Testmiljö

- **URL**: http://localhost:3000

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
| **WRITING ASSISTANT MODUL** | | | | | |
| T024 | Writing Assistant laddar | WordOptimizer | Klicka "✨ Writing Assistant" | Writing Assistant gränssnitt visas | ⏳ |
| T025 | Ordförslag funktion | WordOptimizer | Text med enkla ord | Förslag på bättre synonymer | ⏳ |
| T026 | Grammatikkontroll | WordOptimizer | Text med grammatiska fel | Förslag på korrigeringar | ⏳ |
| T027 | Stilförbättringar | WordOptimizer | Repetitiv text | Förslag på variationer | ⏳ |
| **TEXT GAMING HUB MODUL** | | | | | |
| T028 | Gaming Hub laddar | TextGaming | Klicka "🎮 Text Gaming Hub" | Gaming gränssnitt med spelknappar visas | ⏳ |
| T029 | Ordgissning spel | TextGaming | Starta ordgissning | Spel startar med dolt ord att gissa | ⏳ |
| T030 | Ordkryptering spel | TextGaming | Starta ordkryptering | Krypterat ord att dekryptera | ⏳ |
| T031 | Ordbyggare spel | TextGaming | Starta ordbyggare | Bokstäver att bygga ord från | ⏳ |
| T032 | Minnestest spel | TextGaming | Starta minnestest | Text visas kort, sedan döljs | ⏳ |
| T033 | Rimspel | TextGaming | Starta rimspel | Ord att hitta rim till | ⏳ |
| T034 | Ordkedja spel | TextGaming | Starta ordkedja | Spel där ord ska kopplas samman | ⏳ |
| **TEXT FORENSICS MODUL** | | | | | |
| T035 | Forensics laddar | TextForensics | Klicka "🕵️ Text Forensics" | Forensics gränssnitt visas | ⏳ |
| T036 | Text Fingerprint analys | TextForensics | Text med unikt innehåll | Unik fingerprint genereras | ⏳ |
| T037 | Mönster detektion | TextForensics | Text med repetitioner | Mönster identifieras och listas | ⏳ |
| T038 | Stilanalys | TextForensics | Formell vs informell text | Skrivsätt kategoriseras korrekt | ⏳ |
| T039 | Dold text detektion | TextForensics | Text med speciella tecken | Potentiell dold information hittas | ⏳ |
| T040 | Text jämförelse | TextForensics | Två liknande texter | Likhetsprocent beräknas | ⏳ |
| T041 | Språk detektion | TextForensics | Text på svenska | Svenska identifieras korrekt | ⏳ |
| **MOOD & EMOTION ENGINE** | | | | | |
| T042 | Mood Engine laddar | MoodEngine | Klicka "🎭 Mood & Emotion Engine" | Mood Engine gränssnitt visas | ⏳ |
| T043 | Sentiment analys | MoodEngine | Positiv text: "Jag är så glad!" | Positiv sentiment detekteras | ⏳ |
| T044 | Känslo detektion | MoodEngine | Text med känslor | Specifika känslor identifieras | ⏳ |
| T045 | Stämningsanalys | MoodEngine | Text med varierande stämning | Övergripande stämning bedöms | ⏳ |
| T046 | Stress detektion | MoodEngine | Text med stressord | Stressnivå beräknas | ⏳ |
| T047 | Energi analys | MoodEngine | Energisk text | Energinivå mäts | ⏳ |
| T048 | Stämningskarta | MoodEngine | Lång text med variationer | Visuell karta över stämningar | ⏳ |
| **TEXT REVERSER MODUL** | | | | | |
| T049 | Text Reverser laddar | TextReverser | Klicka "↩️ Text Reverser" | Text Reverser gränssnitt visas | ⏳ |
| T050 | Vändning av text | TextReverser | Text: "Hej världen" | Vänt till: "nedlräv jeH" | ⏳ |
| T051 | Radvis vändning | TextReverser | Flerra rader text | Varje rad vänds individuellt | ⏳ |
| T052 | Ordvis vändning | TextReverser | "Hej fina världen" | "världen fina Hej" | ⏳ |
| **CLEAN CODE ARKITEKTUR** | | | | | |
| T053 | Modulariserad struktur | System | Kontrollera filstruktur | Alla moduler under 150 rader | ⏳ |
| T054 | Gaming moduler fungerar | TextGaming | Testa alla gaming funktioner | Alla spel från gaming/ mappen fungerar | ⏳ |
| T055 | Mood moduler fungerar | MoodEngine | Testa alla mood funktioner | Alla analyser från mood/ mappen fungerar | ⏳ |
| T056 | Forensics moduler fungerar | TextForensics | Testa alla forensics funktioner | Alla analyser från forensics/ mappen fungerar | ⏳ |
| T057 | Core moduler fungerar | System | Testa modul-laddning | module-loader och ui-renderer fungerar | ⏳ |
| T058 | Utilities moduler fungerar | System | Testa utility funktioner | dom-helpers, display-helpers fungerar | ⏳ |
| **FELHANTERING & GRÄNSER** | | | | | |
| T059 | Tom text hantering | Alla moduler | Tom sträng som input | Lämpligt felmeddelande eller hantering | ⏳ |
| T060 | Mycket lång text | Alla moduler | Text >10,000 tecken | Prestanda acceptabel, inga krascher | ⏳ |
| T061 | Specialtecken hantering | Alla moduler | Text med åäö, emojis, symboler | Korrekt hantering av Unicode | ⏳ |
| T062 | Modulfel hantering | System | Om modul inte kan laddas | Felmeddelande visas elegantly | ⏳ |
| T063 | Nätverksfel hantering | Alla moduler | När backend inte svarar | Timeout-hantering och felmeddelande | ⏳ |

---

## 🚀 UTFÖRANDEINSTRUKTIONER

### Förberedelser

1. Starta applikationen: `npm start`

2. Öppna webbläsare och navigera till `http://localhost:3000`
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

- Totalt antal tester: 63
- Godkända: ___/63
- Misslyckade: ___/63
- Kritiska fel: ___

**Kommentarer**:
_Plats för allmänna observationer och förbättringsförslag_
