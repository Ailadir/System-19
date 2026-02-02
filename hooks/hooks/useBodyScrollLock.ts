'use client';

import { useEffect, useRef } from 'react';

export const useBodyScrollLock = (isActive: boolean) => {
  const lockCountRef = useRef(0);

  useEffect(() => {
    if (isActive) {
      lockCountRef.current += 1;

      if (lockCountRef.current === 1) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      lockCountRef.current = Math.max(0, lockCountRef.current - 1);

      if (lockCountRef.current === 0) {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (isActive) {
        lockCountRef.current = Math.max(0, lockCountRef.current - 1);

        if (lockCountRef.current === 0) {
          document.body.style.overflow = '';
        }
      }
    };
  }, [isActive]);
};
