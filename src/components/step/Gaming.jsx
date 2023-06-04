import { useEffect, useState } from 'react';
import CardModal from '../CardModal';

const Gaming = (props = {}) => {
  useEffect(() => {
    CardModal({ title: '카드 선택' })
      .then(({ myCard, opponentCard }) => {
        console.log({ myCard, opponentCard });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div></div>;
};

export default Gaming;
