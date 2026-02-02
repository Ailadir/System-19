'use client';

import Icon from '../Icon';
import Text from '../Text';
import { ButtonProps } from './Button.types';
import { SIZE_MAPPINGS } from '@/config/constants/sizeMapping';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { forwardRef } from 'react';

import s from './Button.module.scss';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    leftIcon,
    rightIcon,
    size,
    variant = 'primary',
    disabled,
    isLoading,
    isActive,
    onClick,
    iconColor,
    borderType = 'square',
    //См фикс в scss для использования fullWidth, когда несколько кнопок в ряд
    fullWidth = false,
    customText = false,
    textSize,
    type = 'button',
    semanticType,
    alignText = 'center',
    route,
    className,
    ...rest
  } = props;
  const router = useRouter();
  const handleOnClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };
  const handleRoute = () => {
    if (disabled || !route) return;
    router.push(route);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (route && onClick) {
      handleOnClick();
      handleRoute();
    } else if (route) {
      handleRoute();
    } else {
      handleOnClick();
    }

    setTimeout(() => {
      e.currentTarget?.blur();
    }, 0);
  };

  const textVariant = textSize || SIZE_MAPPINGS.buttonToText['medium'];
  const iconOnly = !!leftIcon && !rightIcon && !children;
  const buttonClassNames = clsx(
    s[`button-${variant}`],
    s[`button-${borderType}`],
    s[`button-text-${alignText}`],
    s[semanticType ? `button-${semanticType}-${size}` : `button-${size}`],
    {
      [s.default]: !size && !semanticType,
      [s.minSmall]: semanticType === 'minSmall',
      [s.minxSmallMaxMedium]: semanticType === 'minxSmallMaxMedium',
      [s.minXsmalAndSmSmallMedium]: semanticType === 'minXsmalAndSmSmallMedium',
      [s.fieldInput]: semanticType === 'fieldInput',
      [s['buttonIconOnly']]: iconOnly,
      [s['fullWidth']]: fullWidth,
      [s['is-active']]: isActive,
    },
    className,
  );

  if (isLoading) {
    return (
      <button
        className={clsx(buttonClassNames, s.loading)}
        disabled={true}
        type={type}
        aria-label='Loading'
      >
        <span className={s.loadingText}>Loading...</span>
      </button>
    );
  }

  return (
    <button
      ref={ref}
      aria-label={iconOnly ? `${leftIcon} button` : undefined}
      onClick={handleClick}
      className={buttonClassNames}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {leftIcon && (
        <Icon
          icon={leftIcon}
          color={disabled ? 'disabled' : iconColor}
          size={size}
          className={iconOnly ? s.icon : ''}
        />
      )}
      {children && !customText ? (
        <Text variant={textVariant} weight='regular'>
          {children}
        </Text>
      ) : (
        children
      )}
      {rightIcon && <Icon icon={rightIcon} color={iconColor} size={size} />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
