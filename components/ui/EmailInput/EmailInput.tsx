'use client';

import Text from '../Text';
import { withEmailSanitizer } from '../../../utils/utils/sanitizers';
import clsx from 'clsx';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import {
  getDefaultInputClass,
  getInputSizeClass,
  getSemanticTypeClass,
} from '@/utils/classNameHelpers';

import s from '../Input/Input.module.scss';

export interface EmailInputProps {
  name: string;
  rules?: RegisterOptions;
  label?: string;
  placeholder?: string;
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  semanticType?: 'default' | 'profile' | 'minSmall';
  isRound?: boolean;
}

export function EmailInput({
  name,
  rules,
  label,
  placeholder,
  size,
  semanticType,
  isRound,
}: EmailInputProps) {
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
            <input
              id={name}
              type='email'
              value={field.value || ''}
              onChange={withEmailSanitizer(field.onChange)}
              onBlur={field.onBlur}
              name={field.name}
              placeholder={placeholder || 'user@kidgu.ru'}
              className={inputClassNames}
              autoComplete='email'
              inputMode='email'
            />
            {error && <p className={s.errorText}>{error.message as string}</p>}
          </div>
        );
      }}
    />
  );
}
