import React from 'react';
import { create } from 'react-modal-promise';
import CardList from './CardList';
import styles from './CardModal.module.scss';

const CardModal = ({ isOpen, onResolve, title }) => {
  const onClickSelectMyCard = (data) => {
    setTimeout(() => {
      onResolve(data);
    }, 1200);
  };

  return (
    <div className={styles.modal} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles.modal__inner}>
        <div className={styles.modal__header}>
          <strong className={styles.modal__header__title}>{title}</strong>
        </div>
        <div className={styles.modal__body}>
          <CardList onClickSelectMyCard={onClickSelectMyCard} />
        </div>
      </div>
    </div>
  );
};

export default create(CardModal, {});
