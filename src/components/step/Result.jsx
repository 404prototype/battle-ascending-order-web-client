import classNames from 'classnames';
import { useState, useMemo } from 'react';
import BoardList from '../BoardList';
import styles from './Result.module.scss';

const Result = (props = {}) => {
  const { resultData, id } = props;
  const { sheets = [], winner } = resultData || {};
  const sortedSheets = sheets.toSorted((a, b) => a.id - b.id);
  const isWinnerMe = useMemo(() => winner === id, [winner, id]);

  return (
    <div className={classNames(styles.result, styles[isWinnerMe ? 'win' : 'lose'])}>
      <strong className={styles.result__tit}>
        <span className={styles.result__tit__inner}>YOU {isWinnerMe ? 'WIN' : 'LOSE'}</span>
      </strong>
      {sortedSheets.map((sheet, index) => (
        <div className={styles.result__board} key={index}>
          <strong className={styles.result__board__title}>
            {id === sheet.id ? '내 카드' : '상대방 카드'}
          </strong>
          <BoardList state="PENDING" initalBoardList={sheet.sheet.map((number) => ({ number }))} />
        </div>
      ))}
    </div>
  );
};

export default Result;
