import Icon from '../Icon';
import Text, { TextParagraphVariants } from '../Text';
import { InputProps } from './Input.types';
import clsx from 'clsx';
import { forwardRef } from 'react';

import s from './Input.module.scss';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    name,
    placeholder,
    hintText,
    size,
    disabled,
    minLength,
    maxLength,
    required,
    type,
    inputMode,
    value,
    leftIcon,
    rightIcon,
    iconSize = 'medium',
    iconColor = 'primary',
    onRightIconClick,
    onChange,
    onKeyDown,
    isRound,
    errorText,
    showError,
    validationState = 'default',
    semanticType,
    className,
  } = props;

  const rootClassNames = clsx(s.root, className, {
    [s.disabled]: disabled,
    [s.additionalMargin]: label,
  });

  const inputClassNames = clsx({
    [s[`input-${size}`]]: size && !semanticType,
    [s[`${semanticType}`]]: semanticType,
    [s.default]: !size && !semanticType,
    [s.inputLeftMargin]: leftIcon,
    [s.inputRightMargin]: rightIcon,
    [s.inputRound]: isRound,
    [s['validation-error']]: validationState === 'error',
    [s['validation-success']]: validationState === 'success',
    [s.hasValue]: !!value,
  });
  const labelClassName = s[`label-${size}`];

  const hintTextSize = {
    xsmall: 'p6',
    small: 'p6',
    medium: 'p5',
    large: 'p5',
  }[size ?? 'medium'] as TextParagraphVariants;

  const iconContainerClassNames = clsx(s[`iconContainer-${size}`], {
    [s.iconContainerRound]: isRound,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputMode === 'numeric') {
      const inputValue = e.target.value;
      if (inputValue && !/^\d*$/.test(inputValue)) {
        return;
      }
    }
    onChange?.(e);
  };

  return (
    <div className={rootClassNames}>
      {label && (
        <label className={labelClassName} htmlFor={name}>
          <Text variant='p3' weight='regular' semanticType='profile'>
            {label}
          </Text>
        </label>
      )}
      <div className={s.inputWrapper}>
        {leftIcon && (
          <Icon className={s.leftIcon} icon={leftIcon} size={iconSize} color={iconColor} />
        )}
        <input
          className={inputClassNames}
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          type={type}
          inputMode={inputMode}
          value={value ?? ''}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          readOnly={!onChange}
          aria-invalid={validationState === 'error'}
          aria-describedby={clsx(
            hintText && `${name}-hint`,
            showError && errorText && `${name}-error`
          ) || undefined}
          aria-required={required}
          suppressHydrationWarning
        />
        {rightIcon && (
          <div className={iconContainerClassNames}>
            <Icon
              className={clsx(s.rightIcon, { [s.clickable]: onRightIconClick })}
              icon={rightIcon}
              size={iconSize}
              color={iconColor}
              onClick={onRightIconClick}
            />
          </div>
        )}
      </div>
      {hintText && (
        <Text
          weight='light'
          id={`${name}-hint`}
          className={size ? s.hint : s.hintText}
          variant={size ? hintTextSize : 'p5'}
        >
          {hintText}
        </Text>
      )}
      {showError && errorText && (
        <div className={size ? s.error : s.errorText} id={`${name}-error`} role="alert">
          <Text variant={size ? hintTextSize : 'p5'} weight='light' color='critical'>
            {errorText}
          </Text>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
