import classNames from 'classnames';
import styles from './Card.module.scss';

const Card = (props = {}) => {
  const {
    index,
    animation = true,
    isSelected = false,
    isTwiceSelected = false,
    cardNumber = null,
    myCard,
    onClickCard = () => {}
  } = props;

  const onClick = () => {
    onClickCard({ index, animation, isSelected, cardNumber });
  };

  return (
    <li
      className={classNames(styles.card, {
        [styles.next]: isTwiceSelected,
        [styles.animation]: animation,
        [styles.selected]: isSelected,
        [styles[`selected__${myCard === cardNumber ? 'my' : 'opponent'}`]]:
          myCard !== null && isTwiceSelected
      })}
      onClick={onClick}
    >
      <div className={styles.card__inner}>
        <div className={styles.card__front}>
          {cardNumber !== null && <em className={styles.card__front__num}>{cardNumber}</em>}
        </div>
        <div className={styles.card__back}></div>
      </div>
    </li>
  );
};

export default Card;
