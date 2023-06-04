import React from 'react';
import styles from './Content.module.scss';

const Content = (props = {}) => {
  const { children } = props;
  return (
    <main id="mainContent" className={styles['doc-main']}>
      <article className={styles['content-article']}>
        {/* <h2 className="screen_out">본문</h2> */}
        {children}
      </article>
    </main>
  );
};

export default Content;
