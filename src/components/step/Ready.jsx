import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ReactComponent as ProfileImage } from '../../assets/images/profile.svg';
import Button from '../Button';
import { socket } from '../../api/socket';
import Spinner from '../Spinner';
import styles from './Ready.module.scss';
const Ready = (props = {}) => {
  const [isJoined, setIsJoined] = useState(false);
  const {
    info: { title, desc, rules },
    players = [],
    onResponseStartGame
  } = props;

  useEffect(() => {
    socket.emit('join-room');
    socket.on('response-join-room', (data) => {
      console.log('response-join-room', data);
      if (data?.state === 'playing') {
        onResponseStartGame(data);
        return;
      }
      setIsJoined(true);
    });

    socket.on('response-ready-game', (data) => {
      console.log('response-ready-game', data);
    });

    socket.on('response-start-game', (data) => {
      console.log('response-start-game', data);
      onResponseStartGame(data);
    });

    return () => {
      socket.off('response-join-room');
      socket.off('response-ready-game');
      socket.off('response-start-game');
    };
  }, [onResponseStartGame]);

  const onClickReadyBtn = () => {
    socket.emit('ready-game');
  };

  return (
    <div className={styles['room-ready']}>
      {!isJoined && <Spinner />}
      <div className={classNames(styles.box, styles.rule)}>
        <strong className={classNames(styles.box__title, styles.rule_title)}>룰 설명</strong>
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
      <div className={classNames(styles.box, styles.player)}>
        <strong className={classNames(styles.box__title, styles.rule_title)}>룰 설명</strong>
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
    </div>
  );
};

export default Ready;
