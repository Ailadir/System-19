'use client';

import { CITY_COORDINATES } from '@/shared/ui/Map/config';
import { useEffect, useState } from 'react';

type Geo = {
  address?: string | null;
  longitude?: number | null;
  latitude?: number | null;
};

type UseMapCenterParams = {
  savedAddress?: Geo | null;
  userCityId?: number | null;
  defaultCenter: [number, number];
};

export function useMapCenter({ savedAddress, userCityId, defaultCenter }: UseMapCenterParams) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter);

  useEffect(() => {
    if (savedAddress?.longitude && savedAddress?.latitude) {
      setMapCenter([savedAddress.longitude, savedAddress.latitude]);
      return;
    }

    if (userCityId && CITY_COORDINATES[userCityId]) {
      setMapCenter(CITY_COORDINATES[userCityId]);
      return;
    }

    setMapCenter(defaultCenter);
  }, [savedAddress?.longitude, savedAddress?.latitude, userCityId, defaultCenter]);

  return [mapCenter, setMapCenter] as const;
}
