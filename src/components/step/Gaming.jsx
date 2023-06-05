import { useEffect, useMemo, useState } from 'react';
import CardModal from '../CardModal';
import Modal from '../Modal';
import BoardList from '../BoardList';
import { socket } from '../../api/socket';
import styles from './Gaming.module.scss';

const Gaming = (props = {}) => {
  const { id = null, gamingInfo } = props;
  const { currentTurnPlayer } = gamingInfo || {};
  const { id: currentTurnId } = currentTurnPlayer || {};
  const [boardList, setBoardList] = useState(Array(10).fill({ number: null }));
  const [putToNumber, setPutToNumber] = useState(null);
  // PICK_CARD, PICK_BOARD
  const [state, setState] = useState('PICK_CARD');

  console.log(id, gamingInfo);
  const isMyTurn = useMemo(() => id === currentTurnId, [id, currentTurnId]);
  const isPickingCard = useMemo(() => state === 'PICK_CARD', [state]);

  useEffect(() => {
    if (!isMyTurn) {
      Modal({ text: '상대방의 카드 선택을 진행중에 있습니다. 잠시만 기다려주세요.' })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      return;
    } else {
      CardModal({ title: '카드 선택' })
        .then((data) => {
          console.log({ data });
          socket.emit('select-a-card', data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isMyTurn]);

  useEffect(() => {
    socket.on('response-write-number-to-sheet', (data) => {
      console.log(data);
    });

    socket.on('response-select-a-card', (data) => {
      const number = data?.selectedCard?.[id];
      setPutToNumber(number);
      setState('PICK_BOARD');
    });

    return () => {
      socket.off('response-write-number-to-sheet');
      socket.off('response-select-a-card');
    };
  }, []);

  const onSelectBoard = (boardList) => {
    console.log(boardList);
    setBoardList(boardList);
  };

  return (
    <div className={styles['room-gaming']}>
      {!isMyTurn && <div className={styles['dimd-layer']}></div>}
      <BoardList
        isPickingCard={isPickingCard}
        boardList={boardList}
        onSelectBoard={onSelectBoard}
      />
    </div>
  );
};

export default Gaming;
