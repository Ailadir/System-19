'use client';

import Icon, { IconColorType, IconType } from '../Icon';
import Text from '../Text';
import clsx from 'clsx';

import s from './Badge.module.scss';

export type BadgeType = 'default' | 'progress' | 'caution' | 'error' | 'success' | 'active';
interface BadgeProps {
  children?: React.ReactNode | 'string';
  borderType?: 'round' | 'square';
  selected?: boolean;
  type?: BadgeType;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  leftIcon?: IconType;
  iconColor?: IconColorType;
}

function Badge(props: BadgeProps) {
  const {
    children,
    borderType = 'square',
    selected = false,
    type,
    size,
    leftIcon,
    iconColor,
  } = props;

  const rootClassNames = clsx(s.root, s[borderType], {
    [s.selected]: selected,
    ...(type && { [s[type]]: true }),
    ...(size && { [s[size]]: true }),
  });
  const childrenIsString = typeof children === 'string';

  return (
    <div className={rootClassNames} tabIndex={0}>
      {leftIcon && <Icon icon={leftIcon} size={size} color={iconColor} />}

      {childrenIsString && (
        <Text clamp={1} variant='p3' semanticType='tag' className={s.text} weight='regular'>
          {children}
        </Text>
      )}
      {!childrenIsString && children}
    </div>
  );
}

export default Badge;
