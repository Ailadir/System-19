'use client';

import Input, { InputProps } from '../Input';
import { useBreakpoint } from '../../../hooks';
import { useState } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

export interface PasswordInputProps
  extends Omit<
    InputProps,
    | 'name'
    | 'value'
    | 'onChange'
    | 'errorText'
    | 'showError'
    | 'validationState'
    | 'type'
    | 'rightIcon'
    | 'onRightIconClick'
  > {
  name: string;
  rules?: RegisterOptions;
}

export function PasswordInput({ name, rules, ...inputProps }: PasswordInputProps) {
  const { control } = useFormContext();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isWideDesktop = breakpoint === 'wideDesktop';
  const inputSize = isMobile ? 'small' : isWideDesktop ? 'large' : 'medium';
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const hasValue = field.value && field.value.trim().length > 0;
        const showError = !!fieldState.error;

        const validationState = showError
          ? 'error'
          : hasValue && !fieldState.error && fieldState.isTouched
            ? 'success'
            : 'default';

        return (
          <Input
            {...inputProps}
            {...field}
            value={field.value ?? ''}
            type={isVisible ? 'text' : 'password'}
            rightIcon={isVisible ? 'visibility_off' : 'visibility'}
            onRightIconClick={toggleVisibility}
            isRound
            errorText={fieldState.error?.message}
            showError={showError}
            validationState={validationState}
            size={inputSize}
          />
        );
      }}
    />
  );
}
