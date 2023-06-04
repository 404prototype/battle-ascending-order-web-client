import { io } from 'socket.io-client';

const socket = io('http://119.194.231.241:3000/in-game');
export { socket };
