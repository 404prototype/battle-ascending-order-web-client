import classNames from 'classnames';
import { useEffect } from 'react';
import { ReactComponent as ProfileImage } from '../../assets/images/profile.svg';
import Button from '../Button';
import { socket } from '../../api/socket';
import styles from './Ready.module.scss';
const Ready = (props = {}) => {
  const {
    info: { title, desc, rules },
    players = []
  } = props;

  useEffect(() => {
    socket.emit('join-room');

    socket.on('response-join-room', (data) => {
      console.log(data);
    });

    socket.on('response-ready-game', (data) => {
      console.log(data);
    });
    console.log(socket);

    return () => {
      socket.off('response-join-room');
      socket.off('response-ready-game');
    };
  }, []);

  const onClickReadyBtn = () => {
    socket.emit('ready-game');
  };

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
