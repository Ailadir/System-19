'use client';

import { type BreakpointType } from '../types';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

export const useBreakpoint = (): BreakpointType => {
  const [breakpoint, setBreakpoint] = useState<BreakpointType | null>(null);

  const updateBreakpoint = useCallback(() => {
    const width = window.innerWidth;

    if (width >= 1920) {
      setBreakpoint('wideDesktop');
    } else if (width >= 1366) {
      setBreakpoint('desktop');
    } else if (width >= 768) {
      setBreakpoint('tablet');
    } else {
      setBreakpoint('mobile');
    }
  }, []);

  const throttledUpdateBreakpoint = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateBreakpoint, 100);
    };
  }, [updateBreakpoint]);

  useLayoutEffect(() => {
    updateBreakpoint();
    window.addEventListener('resize', throttledUpdateBreakpoint);
    return () => window.removeEventListener('resize', throttledUpdateBreakpoint);
  }, [updateBreakpoint, throttledUpdateBreakpoint]);

  return breakpoint || 'wideDesktop';
};
