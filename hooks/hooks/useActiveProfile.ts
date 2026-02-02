'use client';

import { useServerUser } from '@/app/providers/ServerUserContext';
import { useUserStore } from '@/shared/store/userStore';
import { getAvatarUrl } from '@/shared/utils/profileHelpers';

export function useActiveProfile() {
  const serverProfile = useServerUser()?.profile;
  const storeProfile = useUserStore((state) => state.user?.profile);
  const isHydrated = useUserStore((state) => state.isHydrated);

  const profile = isHydrated ? storeProfile : serverProfile;
  const fallbackDisplayName = 'Пользователь';
  const fallbackInitials = 'П';

  return {
    profile,
    isLoading: false,
    error: null,
    displayName:
      profile && profile.first_name && profile.last_name
        ? `${profile.last_name} ${profile.first_name[0]}.`
        : fallbackDisplayName,
    initials:
      profile && profile.first_name && profile.last_name
        ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
        : fallbackInitials,
    avatarUrl: getAvatarUrl(profile?.avatars, '96'),
    email: profile?.email || '',
    max: profile?.max || '',
    telegram: profile?.telegram || '',
    isServerData: !isHydrated,
  };
}
