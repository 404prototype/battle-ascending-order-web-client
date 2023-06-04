import React from 'react';
import styles from './Header.module.scss';

const Header = (props = {}) => {
  const { title = '', otherProps = {} } = props;
  return (
    <header className={styles['doc-header']} {...otherProps}>
      <h1 className={styles.tit_head}>{title}</h1>
    </header>
  );
};

export default Header;
