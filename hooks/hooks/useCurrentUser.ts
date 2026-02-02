'use client';

import { authApi } from '@/shared/api';
import { useUserStore } from '@/shared/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useCurrentUser() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);
  const setUser = useUserStore((state) => state.setUser);
  const setHydrated = useUserStore((state) => state.setHydrated);
  const clearUser = useUserStore((state) => state.clearUser);

  const { data, error, isLoading, refetch } = authApi.useMe({
    staleTime: 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.data && !user) {
      const userData = {
        ...data.data,
        id: data.data.id,
      };
      setUser(userData);
    } else if (data && !data.data && !isHydrated) {
      setHydrated();
    }
  }, [data, user, isHydrated, setUser, setHydrated]);

  useEffect(() => {
    if (error && !isHydrated) {
      clearUser();

      const currentPath = window.location.pathname;
      const publicRoutes = ['/', '/specialist', '/login', '/register', '/forgot-password'];
      const isProtectedRoute = !publicRoutes.some((route) => currentPath.startsWith(route));

      if (isProtectedRoute) {
        router.push('/login');
      }
    }
  }, [error, isHydrated, clearUser, router]);

  return {
    user: user || data?.data,
    isLoading: !isHydrated || isLoading,
    error,
    refetch,
    hasValidToken: !!user || !!data?.data,
  };
}
