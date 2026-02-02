import { ReactNode } from 'react';

export type RadioProps = {
  id?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: ReactNode;
  className?: string;
  error?: boolean;
  required?: boolean;
};
