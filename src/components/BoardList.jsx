import styles from 'BoardList.module.scss';
import classNames from 'classnames';

const BoardList = (props = {}) => {
  const { boardList = [] } = props;
  return (
    <ol className={styles.list}>
      {boardList.map((boardItem, index) => (
        <li
          key={index}
          className={classNames(styles.list__item, {
            [styles['list__item--filled']]: boardItem.number !== null
          })}
        >
          {boardItem.number !== null && (
            <em className={styles.list__item__num}>{boardItem.number}</em>
          )}
        </li>
      ))}
    </ol>
  );
};

export default BoardList;
