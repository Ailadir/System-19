'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface RequestModalParams {
  requestId: string | null;
  isOpen: boolean;
}

export function useRequestModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = useMemo((): RequestModalParams => {
    const requestId = searchParams.get('request');
    const isOpen = searchParams.get('modal') === 'open';

    return {
      requestId: requestId || null,
      isOpen: isOpen && !!requestId,
    };
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: Partial<RequestModalParams>) => {
      const params = new URLSearchParams(searchParams.toString());

      if ('requestId' in updates) {
        if (updates.requestId) {
          params.set('request', updates.requestId);
          params.set('modal', 'open');
        } else {
          params.delete('request');
          params.delete('modal');
        }
      }

      if ('isOpen' in updates && !('requestId' in updates)) {
        if (updates.isOpen && currentParams.requestId) {
          params.set('modal', 'open');
        } else {
          params.delete('modal');
          params.delete('request');
        }
      }

      const queryString = params.toString();
      const newUrl = `${pathname}?${queryString}`;
      router.push(newUrl, { scroll: false });
    },
    [pathname, router, searchParams, currentParams],
  );

  const openModal = useCallback(
    (requestId: string) => {
      updateParams({ requestId, isOpen: true });
    },
    [updateParams],
  );

  const closeModal = useCallback(() => {
    updateParams({ isOpen: false, requestId: null });
  }, [updateParams]);

  return {
    requestId: currentParams.requestId,
    isOpen: currentParams.isOpen,
    openModal,
    closeModal,
  };
}
