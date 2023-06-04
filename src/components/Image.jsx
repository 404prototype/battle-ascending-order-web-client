import React from 'react';

const Image = (props = { src: '' }) => {
  const { src, ...otherProps } = props;
  return <img src={src} alt="" {...otherProps} />;
};

export default Image;
