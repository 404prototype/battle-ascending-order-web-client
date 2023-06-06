import { useEffect, useState } from 'react';
import { socket, initSocket } from '../../api/socket';
const List = (props = {}) => {
  const [isInitSocket, setIsInitSocket] = useState(false);

  useEffect(() => {
    initSocket(1);
    // socket.connect();

    socket.on('connect', () => {
      setIsInitSocket(true);
      console.log(socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return <div>{isInitSocket && <ol></ol>}</div>;
};

export default List;
