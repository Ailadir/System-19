import { ContainerProps } from './Container.types';
import clsx from 'clsx';

import s from './Container.module.scss';

function Container(props: ContainerProps) {
  const {
    children,
    className,
    borderRadius = '48',
    bgColor = 'secondary',
    onClick,
    padding,
    margin = 'auto',
    fitWidth,
    fullWidth,
  } = props;

  const containerClassNames = clsx(
    s.root,
    s[`borderRadius-${borderRadius}`],
    s[`backgroundColor-${bgColor}`],
    s[`padding-${padding}`],
    margin === 'auto' && s.autoMargin,
    margin === 'noMargin' && s.noMargin,
    fitWidth && s.fitWidth,
    fullWidth && s.fullWidth,
    className,
  );

  return (
    <div className={containerClassNames} onClick={onClick}>
      {children}
    </div>
  );
}

export default Container;
