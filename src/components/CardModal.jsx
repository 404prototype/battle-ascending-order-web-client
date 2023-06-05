import React, { useEffect, useState } from 'react';
import { create } from 'react-modal-promise';
import CardList from './CardList';
import styles from './CardModal.module.scss';

const CardModal = ({ isOpen, onResolve, title, id, isMyTurn }) => {
  const [isPicked, setIsPicked] = useState(false);
  const [remainTime, setRemainTime] = useState(5);

  const setTimeoutRemainTime = (time, remainTime, cb) => {
    window.setTimeout(() => {
      if (remainTime === 0) {
        cb();
        return;
      }

      setRemainTime(remainTime - 1);
      setTimeoutRemainTime(time, remainTime - 1, cb);
    }, time);
  };

  const onClickSelectMyCard = (data) => {
    setIsPicked(true);
    setTimeoutRemainTime(1000, remainTime, () => {
      onResolve(data);
    });
  };

  return (
    <div className={styles.modal} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles.modal__inner}>
        <div className={styles.modal__header}>
          <strong className={styles.modal__header__title}>{title}</strong>
          {isPicked && (
            <p
              className={styles.modal__header__desc}
            >{`${remainTime}초 후 창이 자동으로 닫히고 선택이 가능합니다.`}</p>
          )}
        </div>
        <div className={styles.modal__body}>
          <CardList id={id} isMyTurn={isMyTurn} onClickSelectMyCard={onClickSelectMyCard} />
        </div>
      </div>
    </div>
  );
};

export default create(CardModal, {});
