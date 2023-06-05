import classNames from 'classnames';
import { useState } from 'react';
import styles from './BoardList.module.scss';

const BoardList = (props = {}) => {
  const { isPickingCard, boardList = [], onSelectBoard } = props;
  const [isPicked, setIsPicked] = useState(false);

  const onClickBoard = (index, number) => {
    if (isPickingCard) {
      return;
    }
    const changedList = [...boardList];
    const changedInfo = {
      ...changedList[index],
      number
    };

    changedList[index] = changedInfo;
    onSelectBoard(changedList);
  };

  return (
    <ol className={styles.list}>
      {boardList.map((boardItem, index) => (
        <li
          key={index}
          className={classNames(styles.list__item, {
            [styles['list__item--filled']]: boardItem.number !== null
          })}
          onClick={() => onClickBoard(index, boardItem.number)}
        >
          <div className={styles.list__item__inner}></div>
          {boardItem.number !== null && (
            <em className={styles.list__item__num}>{boardItem.number}</em>
          )}
        </li>
      ))}
    </ol>
  );
};

export default BoardList;
