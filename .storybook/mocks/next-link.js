// Mock for next/link in Storybook
import * as React from 'react';

const Link = function NextLink(props) {
  const { href, children, className, onClick, target, rel, ...restProps } = props;

  const linkProps = {
    href: href || '#',
    className,
    onClick: function(e) {
      if (onClick) {
        onClick(e);
      }
      console.log('Navigate to:', href);
    },
    target,
    rel,
  };

  return React.createElement('a', Object.assign({}, linkProps, restProps), children);
};

Link.displayName = 'NextLink';

export default Link;
