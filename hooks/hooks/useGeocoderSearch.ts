'use client';

import { geocoderApi } from '@/shared/api';
import { GeocoderSearchRequest } from '@/shared/api/types/geocoder';
import { Geo } from '@/shared/types';
import { useEffect, useState } from 'react';

interface UseGeocoderSearchOptions {
  debounceMs?: number;
  enabled?: boolean;
  onSuccess?: (results: Geo[]) => void;
  onError?: (error: Error) => void;
}

interface UseGeocoderSearchResult {
  results: Geo[];
  isLoading: boolean;
  error: Error | null;
  search: (params: GeocoderSearchRequest) => void;
  clear: () => void;
}

export const useGeocoderSearch = (
  options: UseGeocoderSearchOptions = {},
): UseGeocoderSearchResult => {
  const { debounceMs = 1000, enabled = true, onSuccess, onError } = options;

  const [searchParams, setSearchParams] = useState<GeocoderSearchRequest | null>(null);
  const [debouncedParams, setDebouncedParams] = useState<GeocoderSearchRequest | null>(null);

  useEffect(() => {
    if (!searchParams) {
      setDebouncedParams(null);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedParams(searchParams);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
    };
  }, [searchParams, debounceMs]);

  const { data, isLoading, error } = geocoderApi.useSearch(debouncedParams, {
    enabled: enabled && debouncedParams !== null,
  });

  useEffect(() => {
    if (data && onSuccess) {
      onSuccess(data);
    }
  }, [data, onSuccess]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const search = (params: GeocoderSearchRequest) => {
    setSearchParams(params);
  };

  const clear = () => {
    setSearchParams(null);
    setDebouncedParams(null);
  };

  return {
    results: data || [],
    isLoading,
    error,
    search,
    clear,
  };
};
