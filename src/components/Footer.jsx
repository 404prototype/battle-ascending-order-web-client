import React from 'react';
import styles from './Footer.module.scss';

const Footer = (props) => {
  const { copyright = '', otherProps = {} } = props;
  return (
    <footer className={styles['doc-footer']} {...otherProps}>
      <small>{copyright}</small>
    </footer>
  );
};

export default Footer;
