'use client';

import { useAuthStore } from '@/shared/store';
import { CatalogSearchParams, DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/shared/types/catalog';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useSearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cityIdFromStore = useAuthStore((state) => state.cityId);

  const currentParams = useMemo((): CatalogSearchParams => {
    const params: CatalogSearchParams = {};

    const cityIdParam = searchParams.get('city_id');
    if (cityIdParam) {
      params.city_id = parseInt(cityIdParam, 10);
    } else if (cityIdFromStore) {
      params.city_id = cityIdFromStore;
    } else {
      params.city_id = 1;
    }

    const childAge = searchParams.get('child_age');
    if (childAge) params.child_age = childAge as CatalogSearchParams['child_age'];

    const childGender = searchParams.get('child_gender');
    if (childGender === 'male' || childGender === 'female') {
      params.child_gender = childGender;
    }

    const priceMin = searchParams.get('price_min');
    if (priceMin) params.price_min = parseFloat(priceMin);

    const priceMax = searchParams.get('price_max');
    if (priceMax) params.price_max = parseFloat(priceMax);

    const similarRequestId = searchParams.get('similar_request_id');
    if (similarRequestId) params.similar_request_id = parseInt(similarRequestId, 10);

    const page = searchParams.get('page');
    params.page = page ? parseInt(page, 10) : DEFAULT_PAGE;

    const perPage = searchParams.get('per_page');
    params.per_page = perPage ? parseInt(perPage, 10) : DEFAULT_PER_PAGE;

    const directionId = searchParams.get('direction_id');
    if (directionId) {
      params.direction_id = parseInt(directionId, 10);
    }

    const specializationIds = searchParams.getAll('specialization_ids[]');
    if (specializationIds.length > 0) {
      params.specialization_ids = specializationIds.map((id) => parseInt(id, 10));
    }

    const competencyIds = searchParams.getAll('competency_ids[]');
    if (competencyIds.length > 0) {
      params.competency_ids = competencyIds.map((id) => parseInt(id, 10));
    }

    const workFormat = searchParams.getAll('work_format[]');
    if (workFormat.length > 0) {
      params.work_format = workFormat as CatalogSearchParams['work_format'];
    }
    return params;
  }, [searchParams, cityIdFromStore]);

  const updateParams = useCallback(
    (updates: Partial<CatalogSearchParams>, resetPage = true) => {
      const params = new URLSearchParams();
      const newParams = { ...currentParams, ...updates };

      if (resetPage && !('page' in updates)) {
        newParams.page = DEFAULT_PAGE;
      }

      if (newParams.city_id !== undefined) {
        params.set('city_id', newParams.city_id.toString());
      }

      if (newParams.child_age !== undefined) {
        params.set('child_age', newParams.child_age.toString());
      }

      if (newParams.child_gender !== undefined) {
        params.set('child_gender', newParams.child_gender);
      }

      if (newParams.price_min !== undefined) {
        params.set('price_min', newParams.price_min.toString());
      }

      if (newParams.price_max !== undefined) {
        params.set('price_max', newParams.price_max.toString());
      }

      if (newParams.similar_request_id !== undefined) {
        params.set('similar_request_id', newParams.similar_request_id.toString());
      }

      if (newParams.page !== undefined && newParams.page !== DEFAULT_PAGE) {
        params.set('page', newParams.page.toString());
      }

      if (newParams.per_page !== undefined && newParams.per_page !== DEFAULT_PER_PAGE) {
        params.set('per_page', newParams.per_page.toString());
      }

      if (newParams.direction_id !== undefined) {
        params.set('direction_id', newParams.direction_id.toString());
      }

      if (newParams.specialization_ids && newParams.specialization_ids.length > 0) {
        newParams.specialization_ids.forEach((id) => {
          params.append('specialization_ids[]', id.toString());
        });
      }

      if (newParams.competency_ids && newParams.competency_ids.length > 0) {
        newParams.competency_ids.forEach((id) => {
          params.append('competency_ids[]', id.toString());
        });
      }

      if (newParams.work_format && newParams.work_format.length > 0) {
        newParams.work_format.forEach((format) => {
          params.append('work_format[]', format);
        });
      }

      const queryString = params.toString();
      router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
    },
    [currentParams, pathname, router],
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  const toggleArrayParam = useCallback(
    (paramName: 'specialization_ids' | 'competency_ids', value: number) => {
      const currentValues = currentParams[paramName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((id) => id !== value)
        : [...currentValues, value];

      updateParams({ [paramName]: newValues });
    },
    [currentParams, updateParams],
  );

  const setDirection = useCallback(
    (directionId: number | null) => {
      if (directionId === null) {
        updateParams({ direction_id: undefined });
        return;
      }

      const isCurrentlySelected = currentParams.direction_id === directionId;

      if (isCurrentlySelected) {
        updateParams({ direction_id: undefined });
      } else {
        updateParams({
          direction_id: directionId,
          specialization_ids: undefined,
          competency_ids: undefined,
          child_age: undefined,
          price_min: undefined,
          price_max: undefined,
          similar_request_id: undefined,
        });
      }
    },
    [currentParams, updateParams],
  );

  return {
    params: currentParams,
    updateParams,
    clearFilters,
    toggleArrayParam,
    setDirection,
  };
}
