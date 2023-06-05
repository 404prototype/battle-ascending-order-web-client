import styles from './Spinner.module.scss';

const Spinner = (props = {}) => {
  return (
    <div className={styles.layer}>
      <div className={styles.spinner}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={styles.spinner__item}></div>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
