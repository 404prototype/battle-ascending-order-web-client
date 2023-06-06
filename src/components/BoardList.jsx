import classNames from 'classnames';
import { useState, useEffect, useMemo } from 'react';
import { socket } from '../api/socket';
import styles from './BoardList.module.scss';

const BoardList = (props = {}) => {
  // PICK_BOARD
  const { state, putToNumber, onSelectBoard, initalBoardList } = props;
  const [boardList, setBoardList] = useState(initalBoardList || Array(8).fill({ number: null }));
  const isValidateStep = useMemo(() => state === 'PICK_BOARD', [state]);

  const updateBoardList = (data = {}) => {
    const { index, number } = data;
    const changedList = [...boardList];
    const changedInfo = {
      ...changedList[index],
      number
    };

    changedList[index] = changedInfo;
    setBoardList(changedList);
    onSelectBoard(changedList);
  };

  const onClickBoard = (index, number) => {
    if (!isValidateStep || number === null) {
      return;
    }

    const payload = { index, number };
    updateBoardList(payload);
    socket.emit('write-number-to-sheet', payload);
  };

  useEffect(() => {
    socket.on('response-write-number-to-sheet', (data) => {
      console.log('response-write-number-to-sheet', data);
    });

    return () => {
      socket.off('response-write-number-to-sheet');
    };
  }, [boardList, onSelectBoard]);

  return (
    <ol className={styles.list}>
      {boardList.map((boardItem, index) => (
        <li
          key={index}
          className={classNames(styles.list__item, {
            [styles['list__item--filled']]: boardItem.number !== null
          })}
          onClick={() => onClickBoard(index, putToNumber)}
        >
          <div className={styles.list__item__inner}>
            {boardItem.number !== null && (
              <em className={styles.list__item__num}>{boardItem.number}</em>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default BoardList;
