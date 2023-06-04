import classNames from 'classnames';
import { ReactComponent as ProfileImage } from '../../assets/images/profile.svg';
import Button from '../Button';
import styles from './Ready.module.scss';
const Ready = (props = {}) => {
  const {
    info: { title, desc, rules },
    players = []
  } = props;

  const onClickReadyBtn = () => {};

  return (
    <div className={styles['room-ready']}>
      <div className={styles.rule}>
        <div className={styles.rule__box}>
          <strong className={styles.rule__box__title}>{title}</strong>
          <p className={styles.rule__box__desc}>{desc}</p>
        </div>
        <ul className={styles.rule__list}>
          {rules.map((rule, index) => (
            <li className={styles.rule__item} key={index}>
              <p className={styles.rule__item__text}>{rule.text}</p>
              {rule.alert && <span className={styles.rule__item__alert}>{rule.alert}</span>}
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles.player}>
        {players.map((player, index) => (
          <li className={styles.player__item} key={index}>
            <strong className={styles.player__divide}>{}</strong>
            <div className={styles.player__info}>
              <ProfileImage />
              <strong className={styles.player__info__name}>{player.name}</strong>
            </div>
            <Button
              className={classNames(styles.player__btn, {
                [styles['player__btn--ready']]: player.isReady
              })}
              disabled={player.isReady}
              color="primary"
              size="large"
              onClick={onClickReadyBtn}
            >
              {player.isReady ? '준비완료' : '준비하기'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ready;
