# Token Management Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Component                              │
│  (Uses socket through connectNamespace)                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
        ┌────────────────────────────────┐
        │   socketManager.ts             │
        │  connectNamespace()            │
        └────────────────┬───────────────┘
                         │
                         ↓
        ┌────────────────────────────────┐
        │   socket.ts                    │
        │  getSocket() - Main Logic      │
        └────────────┬───────────────────┘
                     │
                     ├─ Needs Auth?
                     │
                     ↓ (if yes)
        ┌────────────────────────────────────┐
        │   handleToken.ts (NEW SERVICE)     │
        │  getValidToken()                   │
        │  - Get token from Redux            │
        │  - Check expiration               │
        │  - Refresh if needed              │
        └────────┬───────────────────────────┘
                 │
        ┌────────┴─────────┐
        │                  │
    ✅ Valid         ❌ Expired
    Token            or Missing
        │                  │
        │                  ↓
        │        ┌─────────────────────┐
        │        │ refreshAccessToken()│
        │        │ Call Backend        │
        │        └────────┬────────────┘
        │                 │
        │            ✅ Success
        │                 │
        │                 ↓
        │        ┌──────────────────┐
        │        │ Update Redux     │
        │        │ Store new token  │
        │        └────────┬─────────┘
        │                 │
        └────────┬────────┘
                 │
                 ↓
        ┌────────────────────────┐
        │  Socket Connected      │
        │ With Auth Token        │
        └────────────────────────┘
```

---

## Redux State Management

```
┌──────────────────────────────────────────────────┐
│              Redux Store State                    │
├──────────────────────────────────────────────────┤
│  auth: {                                          │
│    user: {                                        │
│      id: "123",                                   │
│      email: "user@example.com",                   │
│      role: "manager"                              │
│    },                                             │
│    token: "eyJhbGc...",          ← Access Token │
│    refreshToken: "eyJhbGc..."    ← Refresh Token│
│  }                                                │
└──────────────────────────────────────────────────┘
     ↑                                    ↑
     │                                    │
  Used by:                            Updated by:
  • handleToken.ts                   • handleToken.ts
  • baseApi.tsx                      • Login endpoint
  • Socket auth                      • Token refresh
```

---

## Token Flow: Connection Sequence

```
TIME      COMPONENT              ACTION                     STATUS
──────────────────────────────────────────────────────────────────

 0ms   → Socket Creation         Initialize socket.io      ⏳ Pending
        (getSocket called)

 10ms  → Check Redis             Token exists?              ✅ Found
        (getValidToken)

 20ms  → Decode Token            Parse JWT                  ✅ Valid
        (isTokenExpired)

 30ms  → Check Expiry            exp > now?                 ✅ Not expired
                                 (with 1min buffer)

 40ms  → Attach Auth             socket.auth = {            ✅ Ready
                                   token: "Bearer xxx"
                                 }

 50ms  → Socket Connect          socket.connect()           ⏳ Connecting
        (WebSocket handshake)

 100ms → Server Validates        JWT verification           ✅ Valid
        (Backend)

 110ms → Connection Success      "connect" event fired      ✅ CONNECTED

─────────────────────────────────────────────────────────────────

TOTAL TIME: ~110ms for authenticated socket connection
```

---

## Error Handling Flow

```
┌─────────────────────────────────┐
│  Socket Connection Error        │
└────────┬────────────────────────┘
         │
         ↓
    ┌─────────────────┐
    │ Error Message?  │
    └────┬────────────┘
         │
    ┌────┴──────────────────────┐
    │                           │
 Contains            Does NOT contain
  "TOKEN"            "TOKEN"
    │                           │
    ↓                           ↓
┌──────────────────┐    ┌──────────────────┐
│ Attempt Refresh: │    │ Log Error &      │
│ getValidToken()  │    │ Return socket    │
└────┬─────────────┘    │ as-is            │
     │                  └──────────────────┘
     ↓
┌──────────────────┐
│ Refresh Success? │
└────┬─────────────┘
     │
   YES      NO
     │      │
     ↓      ↓
   Reconnect  Logout User
   Socket    & Redirect to
             Login Page
```

---

## File Dependencies

```
src/socket/socket.ts
    ↓
    ├─→ src/services/handleToken.ts (NEW ✨)
    │      ↓
    │      └─→ Redux Store
    │            ↓
    │            └─→ auth.token
    │            └─→ auth.refreshToken
    │
    └─→ Backend API: /api/auth/refresh-token
```

---

## Token Lifecycle

```
LOGIN
  ↓
  └─→ User submits credentials
      └─→ Backend returns {accessToken, refreshToken}
          └─→ Redux stores both tokens
              └─→ Persisted to localStorage

SUBSEQUENT REQUESTS
  ├─→ API calls use accessToken in Authorization header
  ├─→ Socket uses accessToken in auth object
  └─→ Each request checks token expiration

TOKEN EXPIRATION SCENARIOS
  ├─ Short expiry (5-15 min) → Refresh before 1min remaining
  ├─ Long expiry (1-7 days) → Refresh when needed
  └─ Refresh token expired → Force logout

LOGOUT
  └─→ Clear both tokens from Redux
      └─→ Disconnect all sockets
          └─→ Redirect to login
```

---

## Configuration Reference

### Environment Variables Needed

```bash
# .env.local or .env
VITE_PUBLIC_BASE_API="https://dabuke-gyedu.ssjoy.me"
```

### Backend Endpoints Expected

```
Login:
POST /api/auth/login
Body: { email, password }
Response: { accessToken, refreshToken, user }

Refresh Token:
POST /api/auth/refresh-token
Body: { refreshToken }
Response: { accessToken }

Logout:
POST /api/auth/logout
Headers: Authorization: Bearer {token}
```

---

## Debugging Checklist

- [ ] Token exists in Redux store
- [ ] Token is not expired
- [ ] Refresh endpoint returns new token
- [ ] Socket successfully connects with token
- [ ] Socket reconnects on token refresh
- [ ] Console shows correct debug logs
- [ ] No "getValidToken is not defined" errors
- [ ] Browser network shows Authorization header
