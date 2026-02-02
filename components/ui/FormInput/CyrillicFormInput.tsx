'use client';

import Input from '../Input';
import { FormInputProps } from './FormInput';
import { withCyrillicOnlySanitizer } from '../../../utils/utils/sanitizers';
import { Controller, useFormContext } from 'react-hook-form';

export function CyrillicFormInput({ name, rules, ...inputProps }: FormInputProps) {
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
          onChange={withCyrillicOnlySanitizer(field.onChange)}
          errorText={fieldState.error?.message}
          showError={!!fieldState.error}
          validationState={fieldState.error ? 'error' : 'default'}
        />
      )}
    />
  );
}
