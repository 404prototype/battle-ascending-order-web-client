import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { socket } from '../api/socket';
import Card from './Card';
import styles from './CardList.module.scss';

const CardList = (props = {}) => {
  const { onClickSelectMyCard = () => {}, id, isMyTurn } = props;
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

    if (!isMyTurn) {
      return;
    }

    if (isTwiceSelected) {
      if (isBeforeDestroy) {
        return;
      }

      setIsBeforeDestroy(true);

      socket.emit('select-a-card', {
        number: info.cardNumber
      });
    }

    const clickedCardSize = clickedCards.length;

    if (isSelected || clickedCardSize >= 2) {
      return;
    }

    setClickedCards([...clickedCards, index]);

    if (clickedCardSize === 0) {
      socket.emit('pick-first-card', { cardIndex: index });
    } else {
      socket.emit('pick-second-card', { cardIndex: index });
    }
  };

  useEffect(() => {
    const onResponsePickCard = (data = {}, isFirst) => {
      const { pickedCard, cardIndex } = data;
      const changedCardList = [...cardList];
      const changedInfo = {
        ...changedCardList[cardIndex],
        isSelected: true,
        cardNumber: pickedCard
      };
      changedCardList[cardIndex] = changedInfo;
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

    socket.on('response-select-a-card', (data) => {
      console.log('response-select-a-card', data);
      const number = data?.selectedCard?.[id];
      setMyCard(number);
      onClickSelectMyCard({ number });
    });

    return () => {
      socket.off('response-pick-first-card');
      socket.off('response-pick-second-card');
      socket.off('response-select-a-card');
    };
  }, [isMyTurn, cardList, clickedCards, selectedCards, id, onClickSelectMyCard]);

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
