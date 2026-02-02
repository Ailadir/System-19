'use client';

import Text from '../Text';
import clsx from 'clsx';
import { ReactNode } from 'react';

import s from './FormSection.module.scss';

export interface FormSectionProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  rootClassName?: string;
  className?: string;
  type?: 'primary' | 'secondary';
}

function FormSection(props: FormSectionProps) {
  const { title, description, children, rootClassName, className, type = 'primary' } = props;
  const rootClassNames = clsx(s.root, s[type], rootClassName);

  return (
    <div className={rootClassNames}>
      {(title || description) && (
        <div className={s.text}>
          {title && (
            <Text variant='h3' semanticType='profile' className={s.title}>
              {title}
            </Text>
          )}
          {description && (
            <Text variant='p2' color='secondary' semanticType='profile' weight='regular'>
              {description}
            </Text>
          )}
        </div>
      )}
      {children && <div className={className}>{children}</div>}
    </div>
  );
}

export default FormSection;
