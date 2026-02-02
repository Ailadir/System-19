'use client';

import { useUserStore } from '@/shared/store/userStore';
import { needsProfileCompletion } from '@/shared/utils/profileHelpers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useProfileCompletionCheck() {
  const { user, isAuthenticated, getRole } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const needsCompletion = needsProfileCompletion(user);

    if (needsCompletion) {
      const role = getRole();
      router.push(`/register?step=profile&role=${role || 'parent'}`);
    }
  }, [user, isAuthenticated, router, getRole]);
}
