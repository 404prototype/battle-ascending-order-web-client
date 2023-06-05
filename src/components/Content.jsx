import classNames from 'classnames';
import React from 'react';
import styles from './Content.module.scss';

const Content = (props = {}) => {
  const { children, title } = props;
  return (
    <main id="mainContent" className={styles['doc-main']}>
      <article className={styles['content-article']}>
        <h2 className={classNames('screen_out', styles['content-article__title'])}>{title}</h2>
        {children}
      </article>
    </main>
  );
};

export default Content;
