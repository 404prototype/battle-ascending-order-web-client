import React from 'react';
import { create } from 'react-modal-promise';
import Button from './Button';
import styles from './Modal.module.scss';

const Modal = ({ isOpen, onResolve, onReject, isConfirm = true, text, title }) => {
  const submit = () => onResolve();
  const reject = () => onReject();

  return (
    <div className={styles.modal} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles.modal__inner}>
        <div className={styles.modal__header}>
          <strong className={styles.modal__header__title}>{title}</strong>
        </div>
        <div className={styles.modal__body}>
          <p className={styles.modal__body__desc}>{text}</p>
        </div>
        <div className={styles.modal__footer}>
          <Button color="primary" onClick={submit}>
            확인
          </Button>
          {!isConfirm && (
            <Button color="secondary" onClick={reject}>
              취소
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default create(Modal, {});
