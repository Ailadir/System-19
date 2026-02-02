'use client';

import type { GuestUserType } from '../store/authStore';
import { usePathname, useSearchParams } from 'next/navigation';

export const useRoleFromUrl = (): GuestUserType => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const roleFromQuery = searchParams.get('role');
  if (roleFromQuery === 'specialist') return 'specialist';
  if (roleFromQuery === 'parent') return 'parent';

  if (pathname.startsWith('/specialist')) return 'specialist';

  return 'parent';
};
