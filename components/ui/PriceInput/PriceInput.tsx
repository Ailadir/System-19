'use client';

import Text from '../Text';
import { extractPriceFromMask } from '../../../utils/utils';
import clsx from 'clsx';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import s from '../Input/Input.module.scss';

export interface PriceInputProps {
  name: string;
  rules?: RegisterOptions;
  label?: string;
  placeholder?: string;
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  semanticType?: 'default' | 'profile' | 'minSmall';
  isRound?: boolean;
}

export function PriceInput({
  name,
  rules,
  label,
  placeholder,
  size,
  semanticType,
  isRound,
}: PriceInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const inputClassNames = clsx({
          [s[`input-${size}`]]: size && !semanticType,
          [s[`${semanticType}`]]: semanticType,
          [s.default]: !size && !semanticType,
          [s.inputRound]: isRound,
          [s['validation-error']]: !!error,
          [s.hasValue]: !!field.value,
        });

        return (
          <div className={s.root}>
            {label && (
              <Text variant='p3' weight='regular' semanticType='profile' color='secondary'>
                {label}
              </Text>
            )}
            <IMaskInput
              id={name}
              value={field.value ? String(field.value) : ''}
              onBlur={field.onBlur}
              name={field.name}
              mask={Number}
              thousandsSeparator=' '
              radix=','
              mapToRadix={['.']}
              scale={0}
              min={0}
              type='text'
              inputMode='numeric'
              placeholder={placeholder || '0'}
              onAccept={(value: unknown, maskRef: { unmaskedValue: string }) => {
                const numericValue = extractPriceFromMask(maskRef);
                field.onChange(numericValue || undefined);
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
