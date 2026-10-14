# Chat server

The backend is an Express HTTP server with Socket.IO for the application's live group-chat functionality.

## Setup

```bash
npm install
```

Create a `.env` file:

```env
PORT=3400
CORS_ORIGIN=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

`GET /` returns a small JSON health response. Socket.IO listens on the same port.

## Socket events

Every client joins the single `group` room after providing a display name.

| Event | Direction | Payload | Behavior |
| --- | --- | --- | --- |
| `joinRoom` | client → server | `userName` string | Joins the caller to the shared room. |
| `roomNotice` | server → other clients | `userName` string | Emitted when another client joins; the current UI does not display it. |
| `ChatMessage` | client → server → other clients | `{ id, sender, text, ts }` | Relays a chat message to everyone else in the room. |
| `typing` | client → server → other clients | `userName` string | Announces that another user is typing. |
| `stopTyping` | client → server → other clients | `userName` string | Clears that user's typing state. |

The client renders its own outgoing messages immediately, which is why the server broadcasts the message only to other sockets.

## Notes

- The room and messages exist only in memory; no database is configured.
- CORS is limited to `CORS_ORIGIN`. Set it to the exact URL of the deployed frontend.
- The server trusts event payloads. Add validation, rate limiting, authentication, and persistence before using this as a production chat service.
