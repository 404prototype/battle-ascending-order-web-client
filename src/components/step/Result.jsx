import { useState, useMemo } from 'react';
import BoardList from '../BoardList';
import styles from './Result';

const Result = (props = {}) => {
  const { resultData, id } = props;
  const { sheets = [], winner } = resultData || {};
  const sortedSheets = sheets.toSorted((a, b) => a.id - b.id);
  const isWinnerMe = useMemo(() => winner === id, [winner, id]);

  return (
    <div className={styles['room-result']}>
      YOU {isWinnerMe ? 'WIN' : 'LOSE'}
      {sortedSheets.map((sheet, index) => (
        <div className={styles.result} key={index}>
          <strong className={styles.result__title}>
            {id === sheet.id ? '내 카드' : '상대방 카드'}
          </strong>
          <BoardList state="PENDING" initalBoardList={sheet.sheet.map((number) => ({ number }))} />
        </div>
      ))}
    </div>
  );
};

export default Result;
