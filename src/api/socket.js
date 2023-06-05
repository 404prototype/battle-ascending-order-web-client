import { io } from 'socket.io-client';

// eslint-disable-next-line import/no-mutable-exports
let socket = {};

const initSocket = (auth) => {
  socket = io('http://119.194.231.241:3000/in-game', {
    extraHeaders: {
      Authorization: auth
    }
  });
};

export { socket, initSocket };
