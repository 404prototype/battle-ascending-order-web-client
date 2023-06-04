import { useEffect, useState } from 'react';
import classNames from 'classnames';
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
  const [isSelectedMode, setIsSelectedMode] = useState(false);
  const [myCard, setMyCard] = useState(null);
  const [isBeforeDestroy, setIsBeforeDestroy] = useState(false);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  const getRandomList = (arrLength) => {
    const arr = Array(arrLength)
      .fill(0)
      .map((_, i) => i + 1);
    const shuffledArray = shuffleArray(arr);
    return shuffledArray;
  };

  const randomList = getRandomList(10);

  const onClickCard = (info = {}) => {
    const { index, isSelected } = info;
    if (isSelectedMode) {
      if (isBeforeDestroy) {
        return;
      }

      setIsBeforeDestroy(true);
      setMyCard(info.cardNumber);

      onClickSelectMyCard({
        myCard: info.cardNumber,
        opponentCard: selectedCards.find((cardNum) => cardNum !== info.cardNumber)
      });
    }

    if (isSelected) {
      return;
    }

    const changedCardList = [...cardList];
    const changedInfo = {
      ...changedCardList[index],
      isSelected: true,
      cardNumber: randomList[index]
    };

    changedCardList[index] = changedInfo;
    setCardList(changedCardList);
    setSelectedCards([...selectedCards, index]);
  };

  useEffect(() => {
    if (selectedCards.length >= 2) {
      const removeNotSelectedCards = (removeCards) => {
        setIsSelectedMode(true);
      };

      removeNotSelectedCards(selectedCards);
    }
  }, [selectedCards]);

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
          isSelectedMode={isSelectedMode}
          onClickCard={onClickCard}
        />
      ))}
    </ol>
  );
};

export default CardList;
