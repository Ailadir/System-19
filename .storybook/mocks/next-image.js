// Mock for next/image in Storybook
import * as React from 'react';

const Image = function NextImage(props) {
  const {
    src,
    alt = '',
    width,
    height,
    fill,
    className,
    style,
    priority,
    loading,
    onLoad,
    onError,
  } = props;

  const imgStyle = fill
    ? Object.assign({}, style || {}, { position: 'absolute', height: '100%', width: '100%', inset: 0, objectFit: 'cover' })
    : Object.assign({}, style || {}, { width, height });

  const imgProps = {
    src: typeof src === 'string' ? src : (src && src.src) || '',
    alt,
    className,
    style: imgStyle,
    loading: loading || (priority ? 'eager' : 'lazy'),
    onLoad,
    onError,
  };

  return React.createElement('img', imgProps);
};

Image.displayName = 'NextImage';

export default Image;
