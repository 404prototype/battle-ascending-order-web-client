import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ReactComponent as ProfileImage } from '../../assets/images/profile.svg';
import Button from '../Button';
import { socket } from '../../api/socket';
import styles from './Ready.module.scss';
const Ready = (props = {}) => {
  const {
    id,
    info: { title, desc, rules },
    players = [],
    onResponseStartGame
  } = props;

  useEffect(() => {
    socket.on('response-start-game', (data) => {
      console.log('response-start-game', data);
      onResponseStartGame(data);
    });

    return () => {
      socket.off('response-start-game');
    };
  }, [onResponseStartGame]);

  const onClickReadyBtn = () => {
    socket.emit('ready-game');
  };

  return (
    <div className={styles['room-ready']}>
      <div className={classNames(styles.box, styles.player)}>
        <div className={styles.box__head}>
          <strong className={classNames(styles.box__head__title, styles.rule_title)}>
            플레이어
          </strong>
        </div>
        <ul className={styles.player__list}>
          {players.map((player, index) => (
            <li className={styles.player__item} key={index}>
              <strong className={styles.player__divide}>{}</strong>
              <div className={styles.player__info}>
                <ProfileImage />
                <strong className={styles.player__info__name}>{player.id}</strong>
              </div>
              <Button
                className={classNames(styles.player__btn, {
                  [styles['player__btn--ready']]: player.ready
                })}
                disabled={player.ready || player.id !== id}
                color={player.ready ? 'primary-game' : 'secondary'}
                size="large"
                onClick={onClickReadyBtn}
              >
                {player.ready ? '준비완료' : '준비하기'}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className={classNames(styles.box, styles.rule)}>
        <div className={styles.box__head}>
          <strong className={classNames(styles.box__head__title, styles.rule_title)}>
            RULE BOOK
          </strong>
        </div>
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
    </div>
  );
};

export default Ready;
