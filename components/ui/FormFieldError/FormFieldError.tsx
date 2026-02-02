/**
 * Form Field Error Component
 *
 * Standardized error display for all form inputs.
 * Provides consistent styling and accessibility.
 */

import Icon from '../Icon';
import Text from '../Text';
import { SIZE_MAPPINGS, InputSizeType } from '@/config/constants/sizeMapping';
import clsx from 'clsx';

import s from './FormFieldError.module.scss';

interface FormFieldErrorProps {
  error?: string;
  size?: InputSizeType;
  className?: string;
}

/**
 * Displays form field error with icon and message
 *
 * @example
 * ```tsx
 * <FormFieldError error="Email is required" size="medium" />
 * ```
 */
export function FormFieldError({ error, size = 'medium', className }: FormFieldErrorProps) {
  if (!error) return null;

  const textVariant = SIZE_MAPPINGS.inputToHint[size];

  return (
    <div className={clsx(s.errorContainer, className)} role="alert">
      <Icon icon="warning" size="xsmall" color="critical" />
      <Text variant={textVariant} weight='light' color='critical'>
        {error}
      </Text>
    </div>
  );
}
