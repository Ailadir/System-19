'use client';

import { useUserStore } from '@/shared/store';

/**
 * Получение города из профиля текущего пользователя
 * @returns city_id
 *
 * @example
 * const cityId = useUserCityId();
 * const { data } = useChats({ role: 'parent', city_id: cityId });
 */
export function useUserCityId(): number | undefined {
  return useUserStore((state) => state.user?.profile?.city_id);
}
