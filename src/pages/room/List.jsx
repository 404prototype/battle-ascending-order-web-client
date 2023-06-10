import Button from '../../components/Button';
import styles from './List.module.scss';

const List = (props = {}) => {
  const onClickCreateRoomBtn = () => {};

  return (
    <div className={styles.room}>
      <div className={styles.room__head}>
        <strong className={styles.room__head__title}>방 목록</strong>
        <Button
          className={styles.room__head__btn}
          color="primary-game"
          size="large"
          onClick={onClickCreateRoomBtn}
        >
          방만들기
        </Button>
      </div>
      <ol className={styles.room__list}></ol>
    </div>
  );
};

export default List;
