'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface UseNavigationConfirmationOptions {
  enabled?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function useNavigationConfirmation(options: UseNavigationConfirmationOptions = {}) {
  const { enabled = true, onConfirm, onCancel } = options;
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleNavigation = useCallback(
    (path: string) => {
      if (!enabled || !hasUnsavedChanges) {
        router.push(path);
        return;
      }

      setPendingPath(path);
      setIsModalOpen(true);
    },
    [enabled, hasUnsavedChanges, router],
  );

  const confirmNavigation = useCallback(() => {
    if (pendingPath) {
      onConfirm?.();
      setHasUnsavedChanges(false);
      router.push(pendingPath);
      setPendingPath(null);
    }
    setIsModalOpen(false);
  }, [pendingPath, router, onConfirm]);

  const cancelNavigation = useCallback(() => {
    onCancel?.();
    setPendingPath(null);
    setIsModalOpen(false);
  }, [onCancel]);

  useEffect(() => {
    if (!enabled || !hasUnsavedChanges) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        window.history.pushState(null, '', pathname);
        setIsModalOpen(true);
        setPendingPath('/settings'); // Go back to settings
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled, hasUnsavedChanges, pathname]);

  return {
    isModalOpen,
    setHasUnsavedChanges,
    handleNavigation,
    confirmNavigation,
    cancelNavigation,
  };
}
