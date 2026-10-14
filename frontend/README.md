# Chat client

The frontend is a React 19 single-page application built with Vite and styled with Tailwind CSS. It provides the display-name prompt, message timeline, composer, and typing indicator for the shared chat room.

## Setup

```bash
npm install
```

Create `.env`:

```env
VITE_SOCKET_URL=http://localhost:3400
```

Run the development server:

```bash
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`. The Socket.IO server must be running and must allow this origin.

## Available commands

```bash
npm run dev      # start Vite with hot reloading
npm run build    # produce a production build in dist/
npm run lint     # check source files with ESLint
npm run preview  # preview the production build locally
```

## Application flow

1. The visitor enters a display name.
2. The app emits `joinRoom` and opens the group-chat interface.
3. Sending a message adds it locally and emits `ChatMessage` to the server.
4. Incoming messages and typing events are received through Socket.IO and reflected in React state.

## Important files

| Path | Responsibility |
| --- | --- |
| `src/App.jsx` | Chat interface, state, and Socket.IO event handling. |
| `src/lib/socket.connect.js` | Creates the Socket.IO client using `VITE_SOCKET_URL`. |
| `src/index.css` | Imports Tailwind CSS. |
| `vite.config.js` | Configures React and the Tailwind Vite plugin. |

Environment variables prefixed with `VITE_` are exposed to browser code. Use only the public server URL here—never place secrets in this file.
