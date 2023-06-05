import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { socket } from '../api/socket';
import Card from './Card';
import styles from './CardList.module.scss';

const CardList = (props = {}) => {
  const { onClickSelectMyCard = () => {} } = props;
  const defaultCardOpt = {
    animation: true,
    isSelected: false
  };
  const defaultCardList = Array(10)
    .fill(0)
    .map((_) => defaultCardOpt);
  const [cardList, setCardList] = useState(defaultCardList);
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [myCard, setMyCard] = useState(null);
  const [isBeforeDestroy, setIsBeforeDestroy] = useState(false);

  const isTwiceSelected = useMemo(() => selectedCards.length >= 2, [selectedCards]);

  const onClickCard = (info = {}) => {
    const { index, isSelected } = info;
    if (isTwiceSelected) {
      if (isBeforeDestroy) {
        return;
      }

      setIsBeforeDestroy(true);
      setMyCard(info.cardNumber);

      onClickSelectMyCard({
        number: info.cardNumber
      });
    }

    const clickedCardSize = clickedCards.length;

    if (isSelected || clickedCardSize >= 2) {
      return;
    }

    setClickedCards([...clickedCards, index]);
    console.log(clickedCards, [...clickedCards, index]);

    if (clickedCardSize === 0) {
      socket.emit('pick-first-card');
    } else {
      socket.emit('pick-second-card');
    }
  };

  useEffect(() => {
    const onResponsePickCard = (data, isFirst) => {
      const index = clickedCards[isFirst ? 0 : 1];
      const number = data?.pickedCard;
      const changedCardList = [...cardList];
      const changedInfo = {
        ...changedCardList[index],
        isSelected: true,
        cardNumber: number
      };

      changedCardList[index] = changedInfo;
      setCardList(changedCardList);
      setSelectedCards([...selectedCards, changedInfo]);
    };

    socket.on('response-pick-first-card', (data) => {
      console.log('first-pick-res', clickedCards, data);
      onResponsePickCard(data, true);
    });

    socket.on('response-pick-second-card', (data) => {
      console.log('second-pick-res', clickedCards, data);
      onResponsePickCard(data, false);
    });

    return () => {
      socket.off('response-pick-first-card');
      socket.off('response-pick-second-card');
    };
  }, [cardList, clickedCards, selectedCards]);

  return (
    <ol className={styles['list-card']}>
      {cardList.map((cardItem = {}, index) => (
        <Card
          key={index}
          index={index}
          animation={cardItem.animation}
          isSelected={cardItem.isSelected}
          cardNumber={cardItem.cardNumber}
          myCard={myCard}
          isTwiceSelected={isTwiceSelected}
          onClickCard={onClickCard}
        />
      ))}
    </ol>
  );
};

export default CardList;
