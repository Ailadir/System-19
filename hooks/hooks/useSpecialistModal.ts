'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

type ModalTab = 'profile' | 'reviews' | 'invitation' | 'map';

interface SpecialistModalParams {
  specialistId: string | null;
  tab: ModalTab;
  isOpen: boolean;
}

export function useSpecialistModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = useMemo((): SpecialistModalParams => {
    const specialistId = searchParams.get('specialist');
    const tab = searchParams.get('modalTab');
    const isOpen = searchParams.get('modal') === 'open';

    return {
      specialistId: specialistId || null,
      tab: tab === 'reviews' || tab === 'invitation' || tab === 'map' ? tab : 'profile',
      isOpen: isOpen && !!specialistId,
    };
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: Partial<SpecialistModalParams>) => {
      const params = new URLSearchParams(searchParams.toString());

      if ('specialistId' in updates) {
        if (updates.specialistId) {
          params.set('specialist', updates.specialistId);
          params.set('modal', 'open');
        } else {
          params.delete('specialist');
          params.delete('modal');
          params.delete('modalTab');
        }
      }

      if ('tab' in updates && updates.tab) {
        params.set('modalTab', updates.tab);
      }

      if ('isOpen' in updates && !('specialistId' in updates)) {
        if (updates.isOpen && currentParams.specialistId) {
          params.set('modal', 'open');
        } else {
          params.delete('modal');
          params.delete('specialist');
          params.delete('modalTab');
        }
      }

      const queryString = params.toString();
      const newUrl = `${pathname}?${queryString}`;
      router.push(newUrl, { scroll: false });
    },
    [pathname, router, searchParams, currentParams.specialistId],
  );

  const openModal = useCallback(
    (specialistId: string, tab: ModalTab = 'profile') => {
      updateParams({ specialistId, tab, isOpen: true });
    },
    [updateParams],
  );

  const closeModal = useCallback(() => {
    updateParams({ isOpen: false, specialistId: null });
  }, [updateParams]);

  const setTab = useCallback(
    (tab: ModalTab) => {
      updateParams({ tab });
    },
    [updateParams],
  );

  return {
    specialistId: currentParams.specialistId,
    tab: currentParams.tab,
    isOpen: currentParams.isOpen,
    openModal,
    closeModal,
    setTab,
  };
}
