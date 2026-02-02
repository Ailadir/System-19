import Text from '../Text';

import s from './FormInputGroup.module.scss';

export interface FormInputGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

function FormInputGroup({ label, children, className }: FormInputGroupProps) {
  return (
    <div className={`${s.inputGroup} ${className || ''}`}>
      {label && (
        <Text variant='p3' color='secondary' weight='regular'>
          {label}
        </Text>
      )}
      {children}
    </div>
  );
}

export default FormInputGroup;
