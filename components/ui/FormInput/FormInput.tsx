'use client';

import Input, { InputProps } from '../Input';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

export interface FormInputProps
  extends Omit<
    InputProps,
    'name' | 'value' | 'onChange' | 'errorText' | 'showError' | 'validationState'
  > {
  name: string;
  rules?: RegisterOptions;
}

export function FormInput({ name, rules, ...inputProps }: FormInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Input
          {...inputProps}
          {...field}
          value={field.value ?? ''}
          errorText={fieldState.error?.message}
          showError={!!fieldState.error}
          validationState={fieldState.error ? 'error' : 'default'}
        />
      )}
    />
  );
}
