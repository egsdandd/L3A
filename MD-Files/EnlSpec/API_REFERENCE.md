# 🌐 API-Referens

Denna dokumentation beskriver hur man interagerar med [Ditt Projektnamn] API.

## Bas-URL

`[Driftsatt URL, t.ex. https://api.mittprojekt.com/api/v1]`

## Autentisering

Alla skyddade endpoints kräver en **JSON Web Token (JWT)** skickad i HTTP-headern:
`Authorization: Bearer [DIN_TOKEN]`

* **Hämta Token:** Skicka en POST-request till `/auth/login` med `{ "email": "...", "password": "..." }`.

## Endpoints

### 1. Användare

| HTTP-metod | Sökväg | Beskrivning | Krav |
| :--- | :--- | :--- | :--- |
| `POST` | `/users` | Skapa en ny användare. | Inga (publik) |
| `GET` | `/users/me` | Hämta inloggad användarinformation. | **JWT krävs** |
| `PATCH`| `/users/:id`| Uppdatera användarprofil. | **JWT krävs** |

#### POST /users

**Kropp (Request Body):**

```json
{
  "email": "nya@anvandaren.se",
  "password": "säkertlösenord"
}