import { io } from "socket.io-client"

const WebSocket = () => io( import.meta.env.VITE_SOCKET_URL )

export default WebSocket