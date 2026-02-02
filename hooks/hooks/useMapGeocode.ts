'use client';

import { useGeocoderSearch } from './useGeocoderSearch';
import { Geo } from '@/shared/types';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseMapGeocodeOptions {
  delayMs?: number;
  onAddressResolved?: (geo: Geo) => void;
  onError?: (error: Error) => void;
}

interface UseMapGeocodeResult {
  geocodeCoordinates: (latitude: number, longitude: number) => void;
  resolvedAddress: Geo | null;
  isLoading: boolean;
  error: Error | null;
  clear: () => void;
}

export const useMapGeocode = (options: UseMapGeocodeOptions = {}): UseMapGeocodeResult => {
  const { delayMs = 0, onAddressResolved, onError } = options;

  const [pendingCoords, setPendingCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [resolvedAddress, setResolvedAddress] = useState<Geo | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const {
    results,
    isLoading,
    error,
    search,
    clear: clearSearch,
  } = useGeocoderSearch({
    debounceMs: 0,
  });

  const onAddressResolvedRef = useRef(onAddressResolved);

  useEffect(() => {
    onAddressResolvedRef.current = onAddressResolved;
  }, [onAddressResolved]);

  useEffect(() => {
    if (results.length > 0) {
      const firstResult = results[0];
      setResolvedAddress(firstResult);
      onAddressResolvedRef.current?.(firstResult);
    }
  }, [results]);

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (pendingCoords) {
      search({
        latitude: pendingCoords.latitude,
        longitude: pendingCoords.longitude,
      });
      setPendingCoords(null);
    }
  }, [pendingCoords, search]);

  const geocodeCoordinates = useCallback(
    (latitude: number, longitude: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (delayMs > 0) {
        timeoutRef.current = setTimeout(() => {
          setPendingCoords({ latitude, longitude });
        }, delayMs);
      } else {
        setPendingCoords({ latitude, longitude });
      }
    },
    [delayMs],
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setResolvedAddress(null);
    setPendingCoords(null);
    clearSearch();
  }, [clearSearch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    geocodeCoordinates,
    resolvedAddress,
    isLoading,
    error,
    clear,
  };
};
