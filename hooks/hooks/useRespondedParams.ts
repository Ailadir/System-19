'use client';

import { useSearchParams } from 'next/navigation';

export interface RespondedParams {
  respondedToSpecialist?: string;
  respondedToRequest?: string;
}

export const useRespondedParams = (): RespondedParams => {
  const searchParams = useSearchParams();

  return {
    respondedToSpecialist: searchParams.get('respondedToSpecialist') ?? undefined,
    respondedToRequest: searchParams.get('respondedToRequest') ?? undefined,
  };
};

export const buildRegisterUrl = (params: {
  role: 'parent' | 'specialist';
  respondedToSpecialist?: number;
  respondedToRequest?: number;
}): string => {
  const queryParams = new URLSearchParams();
  queryParams.set('role', params.role);

  if (params.respondedToSpecialist) {
    queryParams.set('respondedToSpecialist', params.respondedToSpecialist.toString());
  }

  if (params.respondedToRequest) {
    queryParams.set('respondedToRequest', params.respondedToRequest.toString());
  }

  return `/register?${queryParams.toString()}`;
};

export const preserveRespondedParams = (
  baseUrl: string,
  currentParams: RespondedParams,
): string => {
  const url = new URL(baseUrl, window.location.origin);

  if (currentParams.respondedToSpecialist) {
    url.searchParams.set('respondedToSpecialist', currentParams.respondedToSpecialist);
  }

  if (currentParams.respondedToRequest) {
    url.searchParams.set('respondedToRequest', currentParams.respondedToRequest);
  }

  return url.pathname + url.search;
};
