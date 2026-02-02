import Button from '../Button';
import Text, { TextParagraphVariants } from '../Text';
import { FieldInputProps } from './FieldInput.types';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import {
  getDefaultInputClass,
  getInputSizeClass,
  getSemanticTypeClass,
  getValidationStateClass,
} from '@/utils/classNameHelpers';

import s from './FieldInput.module.scss';

const FieldInput = forwardRef<HTMLTextAreaElement, FieldInputProps>((props, ref) => {
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
    value,
    rows = 3,
    onChange,
    errorText,
    showError,
    validationState = 'default',
    semanticType,
    leftIcon,
    rightIcon,
    leftIconColor = 'primary',
    rightIconColor = 'primaryInverse',
    onLeftIconClick,
    onRightIconClick,
    isRound = false,
    iconSize = 'medium',
    disableResize = false,
    autoGrow = false,
    minRows = 1,
    maxRows = 4,
    onEnterPress,
    rightButtonRef,
  } = props;

  const internalRef = useRef<HTMLTextAreaElement>(null);
  const [isMaxHeightReached, setIsMaxHeightReached] = useState(false);

  const textareaRef = (node: HTMLTextAreaElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const adjustHeight = useCallback(() => {
    const textarea = internalRef.current;
    if (!textarea || !autoGrow) return;

    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseInt(computedStyle.lineHeight, 10) || 20;

    const cssMinHeight = parseInt(computedStyle.minHeight, 10) || 40;

    const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
    const paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;

    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;

    textarea.style.height = `${cssMinHeight}px`;

    const scrollHeight = textarea.scrollHeight;

    const newHeight =
      scrollHeight > cssMinHeight ? Math.min(scrollHeight, maxHeight) : cssMinHeight;

    textarea.style.height = `${newHeight}px`;

    setIsMaxHeightReached(scrollHeight > maxHeight);
  }, [autoGrow, maxRows]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey && onEnterPress) {
        event.preventDefault();
        onEnterPress();
      }
    },
    [onEnterPress],
  );

  useEffect(() => {
    if (autoGrow) {
      adjustHeight();
    }
  }, [value, autoGrow, adjustHeight]);

  useEffect(() => {
    if (autoGrow) {
      adjustHeight();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rootClassNames = clsx(s.root, {
    [s.disabled]: disabled,
    [s.additionalMargin]: label,
  });

  const textareaClassNames = clsx(
    size && !semanticType && s[`textarea-${size}`],
    getSemanticTypeClass(semanticType as any, s),
    getDefaultInputClass(size as any, semanticType as any, s),
    getValidationStateClass(validationState, s),
    leftIcon && s['textarea-with-left-icon'],
    rightIcon && s['textarea-with-right-icon'],
    isRound && s.inputRound,
    (disableResize || autoGrow) && s['textarea-no-resize'],
    autoGrow && s['textarea-auto-grow'],
    autoGrow && isMaxHeightReached && s['max-height-reached'],
    !!value && s.hasValue
  );

  const labelClassName = s[`label-${size}`];

  const hintTextSize = {
    xsmall: 'p6',
    small: 'p6',
    medium: 'p5',
    large: 'p5',
  }[size ?? 'medium'] as TextParagraphVariants;

  const buttonSize: 'xsmall' | 'small' | 'medium' | 'large' =
    iconSize === 'xlLarge' || iconSize === 'landing' ? 'large' : iconSize;

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
        <textarea
          className={textareaClassNames}
          id={name}
          name={name}
          ref={textareaRef}
          placeholder={placeholder}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          rows={autoGrow ? minRows : rows}
          value={value ?? ''}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          readOnly={!onChange}
          aria-describedby={hintText ? `${name}-hint` : undefined}
          aria-invalid={false}
          suppressHydrationWarning
        />
        {leftIcon && (
          <Button
            leftIcon={leftIcon}
            variant='secondary'
            borderType={isRound ? 'round' : 'square'}
            semanticType='fieldInput'
            onClick={onLeftIconClick}
            disabled={disabled}
            iconColor={leftIconColor}
            size={buttonSize}
            className={s.iconButtonLeft}
          />
        )}
        {rightIcon && (
          <Button
            ref={rightButtonRef}
            leftIcon={rightIcon}
            variant='primary'
            borderType={isRound ? 'round' : 'square'}
            semanticType='fieldInput'
            onClick={onRightIconClick}
            disabled={disabled}
            iconColor={rightIconColor}
            size={buttonSize}
            className={s.iconButtonRight}
          />
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
        <div className={size ? s.error : s.errorText}>
          <Text variant={size ? hintTextSize : 'p5'} weight='light' color='critical'>
            {errorText}
          </Text>
        </div>
      )}
    </div>
  );
});

FieldInput.displayName = 'FieldInput';

export default FieldInput;
