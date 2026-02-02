'use client';

import { type ApiResponse, type Specialist, requestApi } from '@/shared/api';
import type { CatalogMeta } from '@/shared/api';
import { specialistApiCompat } from '@/shared/api/resources/specialist.api';
import type { CatalogSearchParams } from '@/shared/types/catalog';
import type { UseQueryResult } from '@tanstack/react-query';

interface UseCatalogMetaParams {
  isRequestCatalog: boolean;
  searchParams: CatalogSearchParams;
  enabled?: boolean;
}

export function useCatalogMeta({
  isRequestCatalog,
  searchParams,
  enabled = true,
}: UseCatalogMetaParams) {
  const specialistQuery = specialistApiCompat.useSearchSpecialists(searchParams, {
    includeMetadata: true as const,
    enabled: enabled && !isRequestCatalog,
  }) as unknown as UseQueryResult<ApiResponse<Specialist[], CatalogMeta>, Error>;

  const requestQuery = requestApi.useGetAll(
    searchParams.city_id ? { city_id: searchParams.city_id } : undefined,
    {
      includeMetadata: true as const,
      enabled: enabled && isRequestCatalog,
    },
  ) as unknown as UseQueryResult<ApiResponse<unknown[], CatalogMeta>, Error>;

  const meta = isRequestCatalog ? requestQuery.data?.meta : specialistQuery.data?.meta;
  const isLoading = isRequestCatalog ? requestQuery.isLoading : specialistQuery.isLoading;

  return {
    meta,
    isLoading,
  };
}
