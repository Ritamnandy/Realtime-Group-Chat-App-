# Realtime Group Chat

A lightweight, browser-based group chat application. The React client connects to an Express and Socket.IO server for live messages and typing indicators.

## Features

- Join the shared chat by entering a display name.
- Send and receive messages in real time.
- Show who is currently typing.
- Display sender names and local message timestamps.

## Project structure

```text
Chat-App/
├── backend/    # Express + Socket.IO server
└── frontend/   # React + Vite client
```

Each directory is an independent Node.js project and must be installed and started separately.

## Prerequisites

- Node.js 20 or later (recommended)
- npm

## Run locally

1. Install dependencies for both services:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Create the environment files using the examples below.

3. In one terminal, start the server:

   ```bash
   cd backend
   npm run dev
   ```

4. In a second terminal, start the client:

   ```bash
   cd frontend
   npm run dev
   ```

5. Open the URL printed by Vite (normally `http://localhost:5173`). Open a second browser window or device to verify live chat.

## Environment configuration

Create `backend/.env`:

```env
PORT=3400
CORS_ORIGIN=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_SOCKET_URL=http://localhost:3400
```

If either service is hosted elsewhere, update both values so that the client points to the server and the server permits the client's origin. Do not commit `.env` files.

## Scripts

| Directory | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run dev` | Start the Socket.IO server. |
| `frontend` | `npm run dev` | Start the Vite development server. |
| `frontend` | `npm run build` | Create a production client build. |
| `frontend` | `npm run lint` | Run ESLint. |
| `frontend` | `npm run preview` | Serve the built client locally. |

## How it works

All connected users join a single Socket.IO room named `group`. The server relays events to the other sockets in that room, while the sender immediately adds its own message in the browser. See the service-specific READMEs for the event contract and implementation notes.

## Current scope

This is an in-memory, shared-room chat. Messages are not persisted, users are not authenticated, and restarting the server clears the room state.
