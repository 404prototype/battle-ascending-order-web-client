import classNames from 'classnames';
import React from 'react';
import styles from './Button.module.scss';

const Button = (props = {}) => {
  const { color = 'primary', size = 'medium', onClick, children, className, ...otherProps } = props;
  return (
    <button
      type="button"
      className={classNames(className, styles.btn, styles[`btn-${color}`], styles[`btn-${size}`])}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
