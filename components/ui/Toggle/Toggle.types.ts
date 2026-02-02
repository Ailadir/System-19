import { ReactNode } from 'react';

export type ToggleProps = {
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
};
