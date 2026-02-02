'use client';

import Icon from '../Icon';
import { IconColorType, IconSizeType, IconType } from '../Icon';
import Text from '../Text';
import clsx from 'clsx';

import s from './Tag.module.scss';

interface TagProps {
  children?: React.ReactNode | 'string';
  borderType?: 'round' | 'square';
  onClick?: () => void;
  selected?: boolean;
  textClassName?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'minSmall';
  leftIcon?: IconType;
  iconSize?: IconSizeType;
  iconColor?: IconColorType;
  className?: string;
}

function Tag(props: TagProps) {
  const {
    children,
    borderType = 'square',
    onClick,
    selected = false,
    textClassName,
    size,
    leftIcon,
    iconSize,
    iconColor = 'primary',
    className,
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    onClick();

    setTimeout(() => {
      e.currentTarget?.blur();
    }, 0);
  };
  const isMinSmall = size === 'minSmall';

  const rootClassNames = clsx(s[borderType], {
    [s.default]: !size && !isMinSmall,
    [s.minSmall]: isMinSmall,
    [s.selected]: selected,
    ...(size && !isMinSmall && { [s[size]]: true }),
    className,
    [s.clickable]: !!onClick,
  });
  const textClassNames = clsx(s.text, textClassName);

  const getIconClassName = () => {
    if (!size || isMinSmall) return '';
    switch (size) {
      case 'xsmall':
        return s.iconXsmall;
      case 'small':
        return s.iconSmall;
      case 'medium':
        return s.iconMedium;
      case 'large':
        return s.iconLarge;
      default:
        return '';
    }
  };
  const childrenIsString = typeof children === 'string';
  return (
    <div className={rootClassNames} tabIndex={0} onClick={handleClick}>
      {leftIcon && (
        <Icon icon={leftIcon} size={iconSize} color={iconColor} className={getIconClassName()} />
      )}
      {childrenIsString && (
        <Text variant='p3' semanticType='tag' weight='regular' className={textClassNames}>
          {children}
        </Text>
      )}

      {!childrenIsString && <div className={s.flex}>{children}</div>}
    </div>
  );
}

export default Tag;
