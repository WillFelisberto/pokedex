/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

// Mockando o comportamento do next/image para que ele se comporte como um <img> normal
const NextImage = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

export default NextImage;
