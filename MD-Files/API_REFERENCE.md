# 🌐 API-Referens – Texttoolkit App

Denna dokumentation beskriver hur du interagerar med API:et för L3A Text Analysis Application.

## Bas-URL

`http://localhost:3000` (eller min driftsatta URL) `storemyr14.ddns.net`

## Endpoints

### 1. Filuppladdning

**POST** `/upload`
Ladda upp en textfil.
Request: `multipart/form-data` med fältet `file`.
Response: `{ "filename": "filnamn.txt", "success": true }`

### 2. Visa fil

**GET** `/showFile/:filename`
Hämtar innehållet i en uppladdad fil.
Response: `{ "filename": "filnamn.txt", "content": "...text..." }`

### 3. Text Analyzer

**POST** `/analyzer`
Analysera text (ordräkning, meningslängd, frekvens etc).
Request: `{ "text": "Din text här", "action": "countwords" }`
Response: `{ "result": ... }`

**Exempel:**

```json
POST /analyzer
{
  "text": "Hej hej världen",
  "action": "countwords"
}
Response:
{
  "result": { "words": 3, "characters": 14 }
}
```

### 4. Text Formatter

**POST** `/formatter`
Formatera text (versaler, gemener, indragning etc).
Request: `{ "text": "hej världen", "action": "uppercase" }`
Response: `{ "result": "HEJ VÄRLDEN" }`

### 5. Text Transformer

**POST** `/transformer`
Transformera text (ROT13, Base64, Morse, Reverse).
Request: `{ "text": "hemlig text", "action": "rot13" }`
Response: `{ "result": "UBJ UBJ INYRQRA" }`

### 6. Text Searcher

**POST** `/searcher`
Sök och ersätt i text (söksträng, regex, case-sensitive, ersätt).
Request: `{ "text": "Hej världen", "action": "search", "query": "hej" }`
Response: `{ "result": [ { "index": 0, "match": "Hej" } ] }`

---

## Generella svar

- Alla endpoints returnerar JSON.
- Felmeddelanden returneras som `{ "error": "Beskrivning av felet" }`

## Exempel på felhantering

```json
{
  "error": "No text provided or text is empty."
}
```

## Modulöversikt

- **analyzer**: Ordräkning, meningslängd, frekvens
- **formatter**: Versaler, gemener, indragning
- **transformer**: ROT13, Base64, Morse, Reverse
- **searcher**: Sök, ersätt, regex

## Notering

Ingen autentisering krävs. Alla endpoints är öppna för test.
