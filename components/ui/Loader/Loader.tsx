'use client';

import { LoaderProps } from './Loader.types';
import { useBreakpoint } from '../../../hooks';
import clsx from 'clsx';

import s from './Loader.module.scss';

export default function Loader({ size, className }: LoaderProps) {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  const loaderSize = size || (isMobile ? 'medium' : 'large');

  return (
    <div className={clsx(s.loaderWrapper, className)}>
      <div className={clsx(s.loader, s[loaderSize])} aria-label='Загрузка' role='status'>
        <span className={s.visuallyHidden}>Загрузка...</span>
      </div>
    </div>
  );
}
