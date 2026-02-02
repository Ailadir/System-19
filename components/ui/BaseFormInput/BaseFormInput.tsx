/**
 * Base Form Input Wrapper
 *
 * Eliminates duplicate React Hook Form Controller wrapper code across form inputs.
 * Uses render prop pattern for flexible child rendering.
 *
 * Benefits:
 * - DRY: Single source of truth for form field wrapper logic
 * - Type-safe: Full TypeScript support with generics
 * - Flexible: Render prop pattern supports any input component
 * - Consistent: Standardized error handling and validation
 */

import Text from '../Text';
import { Controller, FieldError, FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

import s from './BaseFormInput.module.scss';

interface BaseFormInputProps<TFieldValues extends FieldValues> {
  /** Field name from form schema */
  name: Path<TFieldValues>;
  /** Validation rules */
  rules?: RegisterOptions;
  /** Optional label */
  label?: string;
  /** Render prop that receives field and error */
  children: (
    field: {
      value: any;
      onChange: (...event: any[]) => void;
      onBlur: () => void;
      name: string;
    },
    error?: FieldError
  ) => React.ReactNode;
}

/**
 * Base form input wrapper with Controller logic
 *
 * @example
 * ```tsx
 * <BaseFormInput name="email" rules={{ required: 'Email is required' }}>
 *   {(field, error) => (
 *     <input
 *       {...field}
 *       className={error ? 'error' : ''}
 *     />
 *   )}
 * </BaseFormInput>
 * ```
 */
export function BaseFormInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  rules,
  label,
  children,
}: BaseFormInputProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = errors[name] as FieldError | undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className={s.root}>
          {label && (
            <Text variant='p3' weight='regular' semanticType='profile' color='secondary'>
              {label}
            </Text>
          )}
          {children(field, error)}
          {error && <p className={s.errorText}>{error.message}</p>}
        </div>
      )}
    />
  );
}
