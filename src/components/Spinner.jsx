import styles from './Spinner.module.scss';

const Spinner = (props = {}) => {
  return (
    <div className={styles.spinner}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div className={styles.spinner_item}></div>
      ))}
    </div>
  );
};

export default Spinner;
