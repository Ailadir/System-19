import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';

import s from './Clickable.module.scss';

interface ClickableProps extends Omit<LinkProps, 'href'> {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  blank?: boolean;
}

const Clickable: React.FC<ClickableProps> = ({
  href,
  children,
  onClick,
  blank,
  className,
  ...linkProps
}) => {
  const rootClassName = clsx(s.root, className);

  if (href) {
    return (
      <Link
        href={href}
        className={rootClassName}
        target={blank ? '_blank' : ''}
        rel='noopener noreferrer'
        prefetch={false}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className={rootClassName}
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Clickable;
