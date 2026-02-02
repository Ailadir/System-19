'use client';

import Text from '../Text';
import clsx from 'clsx';
import { useState } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import {
  getDefaultInputClass,
  getInputSizeClass,
  getSemanticTypeClass,
  getValidationStateClass,
} from '@/utils/classNameHelpers';

import s from '../Input/Input.module.scss';

export interface PhoneInputProps {
  name: string;
  rules?: RegisterOptions;
  label?: string;
  placeholder?: string;
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  semanticType?: 'default' | 'profile' | 'minSmall';
  isRound?: boolean;
}

export function PhoneInput({
  name,
  rules,
  label,
  placeholder,
  size,
  semanticType,
  isRound,
}: PhoneInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const displayValue = field.value
          ? field.value
              .replace(/\D/g, '')
              .replace(
                /^7?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2}).*/,
                (_match: string, a: string, b: string, c: string, d: string) => {
                  let result = '+7';
                  if (a) result += ` ${a}`;
                  if (b) result += ` ${b}`;
                  if (c) result += ` ${c}`;
                  if (d) result += `-${d}`;
                  return result;
                },
              )
          : '';

        const inputClassNames = clsx(
          getInputSizeClass(size as any, s),
          getSemanticTypeClass(semanticType as any, s),
          getDefaultInputClass(size as any, semanticType as any, s),
          isRound && s.inputRound,
          !!error && s['validation-error'],
          !!field.value && s.hasValue
        );

        return (
          <div className={s.root}>
            {label && (
              <Text variant='p3' weight='regular' semanticType='profile' color='secondary'>
                {label}
              </Text>
            )}
            <IMaskInput
              id={name}
              value={displayValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                field.onBlur();
              }}
              name={field.name}
              mask='+7 000 000 00-00'
              lazy={!isFocused && !field.value}
              unmask={false}
              type='tel'
              placeholder={placeholder || '+7 123 456 78-90'}
              onAccept={(value: string) => {
                const digits = value.replace(/\D/g, '');
                const phoneDigits = digits.startsWith('7') ? digits.slice(1) : digits;
                field.onChange(phoneDigits ? `+7${phoneDigits}` : '');
              }}
              className={inputClassNames}
            />
            {error && <p className={s.errorText}>{error.message as string}</p>}
          </div>
        );
      }}
    />
  );
}
