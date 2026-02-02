import { ReactNode } from 'react';

export type CheckboxProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: ReactNode;
  className?: string;
  error?: boolean;
  required?: boolean;
  value?: string;
  variant?: 'primary' | 'ghost' | 'group';
};
