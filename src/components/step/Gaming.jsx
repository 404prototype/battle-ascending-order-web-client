import { useEffect, useMemo, useState } from 'react';
import CardModal from '../CardModal';
import Modal from '../Modal';
import BoardList from '../BoardList';
import { socket } from '../../api/socket';
import styles from './Gaming.module.scss';

const Gaming = (props = {}) => {
  const { id = null, initalGameInfo, onResponseEndGame } = props;
  const { currentTurnPlayer: initalTurnPlayer } = initalGameInfo || {};
  const [currentTurnId, setCurrentTurnId] = useState(initalTurnPlayer?.id);
  const [turn, setTurn] = useState(1);
  const [putToNumber, setPutToNumber] = useState(null);
  // PENDING, PICK_BOARD
  const [state, setState] = useState('PENDING');

  const isMyTurn = useMemo(() => id === currentTurnId, [id, currentTurnId]);

  useEffect(() => {
    console.log(id, isMyTurn, currentTurnId);
    if (!isMyTurn) {
      Modal({ text: '상대방의 카드 선택을 진행중에 있습니다. 잠시만 기다려주세요.' })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
    CardModal({ id, title: `카드 선택${isMyTurn ? '' : '(상대방 카드 선택중)'}`, isMyTurn })
      .then((data) => {
        const { number } = data;
        setPutToNumber(number);
        setState('PICK_BOARD');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentTurnId, id, isMyTurn]);

  const onSelectBoard = () => {
    // init state
    setPutToNumber(null);
  };

  useEffect(() => {
    socket.on('response-start-turn', (data = {}) => {
      const { room } = data;
      const { currentTurn, currentTurnPlayer } = room || {};

      console.log(data);
      setTurn(currentTurn);
      setCurrentTurnId(currentTurnPlayer?.id);
    });

    socket.on('response-end-game', (data) => {
      console.log('response-end-game', data);
      onResponseEndGame(data);
    });

    return () => {
      socket.off('response-start-turn');
      socket.off('response-end-game');
    };
  }, []);

  return (
    <div className={styles['room-gaming']}>
      <div className={styles['gaming-info']}>
        <dl className={styles['gaming-info__round']}>
          <dt>라운드</dt>
          <dd>{turn}</dd>
        </dl>
      </div>
      <BoardList state={state} putToNumber={putToNumber} onSelectBoard={onSelectBoard} />
    </div>
  );
};

export default Gaming;
