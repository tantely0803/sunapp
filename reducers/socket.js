import io from 'socket.io-client';
const socket = io('http://localhost:3001');
socket.connect();
export default socket;
