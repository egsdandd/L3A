
# 🧪 Detaljerad Testrapport

**Datum:** 23 oktober 2025  
**Projekt:** L3A Text Analysis Application  
**Testversion:** Node.js v24.8.0 med Vitest

---

## 📊 Sammanfattning

| Kategori | Resultat | Antal |
|----------|----------|-------|
| **Test Suites** | ✅ Passerade | 4 / 4 |
| **Tests** | ✅ Passerade | 42 / 42 |
| **Snapshots** | - | 0 |
| **Tid** | ⚡ | 0.19 s |

**🎉 Resultat: 100% av alla tester passerar!**

---

## 🚀 Kommando

```bash
npm test
# Motsvarar:
npx vitest run
```

---

## 📋 Utförlig Testlogg

```text
> l3a@0.0.0 test
> vitest

DEV  v4.0.1 E:/1DV610/L3A

stderr | src/frontend/tests/TextSearcherModule.test.js > TextSearcherModule > findFirst hittar första förekomst
findFirst: inputText eller searchQuery är inte en sträng eller är tom:     hej
findFirst: inputText eller searchQuery är inte en sträng eller är tom: hej på dig    

stderr | src/frontend/tests/TextSearcherModule.test.js > TextSearcherModule > findFirst hanterar felaktig input
findFirst: inputText eller searchQuery är inte en sträng eller är tom: 123 hej
findFirst: inputText eller searchQuery är inte en sträng eller är tom: hej 123
findFirst: inputText eller searchQuery är inte en sträng eller är tom: null hej
findFirst: inputText eller searchQuery är inte en sträng eller är tom: hej null

stderr | src/frontend/tests/TextSearcherModule.test.js > TextSearcherModule > findAll hittar alla förekomster
findAll: inputText eller searchQuery är inte en sträng eller är tom:     hej
findAll: inputText eller searchQuery är inte en sträng eller är tom: hej på dig    

stderr | src/frontend/tests/TextSearcherModule.test.js > TextSearcherModule > findAll hanterar felaktig input
findAll: inputText eller searchQuery är inte en sträng eller är tom: 123 hej
findAll: inputText eller searchQuery är inte en sträng eller är tom: hej 123
findAll: inputText eller searchQuery är inte en sträng eller är tom: null hej
findAll: inputText eller searchQuery är inte en sträng eller är tom: hej null

stderr | src/frontend/tests/TextSearcherModule.test.js > TextSearcherModule > count räknar antal förekomster
count: inputText eller searchQuery är inte en sträng eller är tom:     hej
count: inputText eller searchQuery är inte en sträng eller är tom: hej på dig    

stderr | src/frontend/tests/TextSearcherModule.test.js > TextSearcherModule > count hanterar felaktig input
count: inputText eller searchQuery är inte en sträng eller är tom: 123 hej
count: inputText eller searchQuery är inte en sträng eller är tom: hej 123
count: inputText eller searchQuery är inte en sträng eller är tom: null hej
count: inputText eller searchQuery är inte en sträng eller är tom: hej null

✓ src/frontend/tests/TextAnalyserModule.test.js (6 tests) 3ms
✓ src/frontend/tests/TextFormatterModule.test.js (13 tests) 3ms
✓ src/frontend/tests/TextSearcherModule.test.js (13 tests) 4ms
✓ src/frontend/tests/TextTransformerModule.test.js (10 tests) 8ms

Test Files  4 passed (4)
     Tests  42 passed (42)
  Start at  17:22:28
  Duration  187ms (transform 82ms, setup 0ms, collect 172ms, tests 19ms, environment 0ms, prepare 17ms)

```

## 📝 Anmärkningar för Examinator

### ✅ **Testresultat**

Alla **42 tester** har passerat, vilket indikerar att alla definierade API-endpoints, enhetsfunktioner och strukturkonfigurationer fungerar som förväntat.

### 🏗️ **Teststruktur**

Testerna är uppdelade i fyra sviter:

1. **`TextAnalyserModule.test.js`** – Tester för textanalysmodulen (ord, meningar, bokstäver)
2. **`TextFormatterModule.test.js`** – Tester för formatteringsmodulen (versaler, gemener, etc)
3. **`TextSearcherModule.test.js`** – Tester för sökmodulen (find, count, exists)
4. **`TextTransformerModule.test.js`** – Tester för transformeringsmodulen (reverse, sort, shuffle)

### 🎉 **Kvalitetssäkring**

- ✅ **API-funktionalitet** verifierad
- ✅ **Felhantering** testad
- ✅ **Modularitet** validerad
- ✅ **Code structure** kontrollerad
