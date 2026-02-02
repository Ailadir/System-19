import { referenceApi } from '@/shared/api';
import type { Competencies, Direction, Specialization } from '@/shared/api';
import { useMemo } from 'react';

interface UseReferenceFiltersParams {
  directionId: number | null;
}

interface UseReferenceFiltersReturn {
  directions: Direction[];
  specializations: Specialization[];
  competencies: Competencies[];
  isLoading: boolean;
}

export function useReferenceFilters(params: UseReferenceFiltersParams): UseReferenceFiltersReturn {
  const { directionId } = params;

  const { data: directions, isLoading: isLoadingDirections } = referenceApi.useGetDirections();
  const { data: allSpecializations, isLoading: isLoadingSpecializations } =
    referenceApi.useGetSpecializations();
  const { data: allCompetencies, isLoading: isLoadingCompetencies } =
    referenceApi.useGetCompetencies();

  const specializations = useMemo(() => {
    if (!allSpecializations) return [];
    if (directionId === null) return allSpecializations;
    return allSpecializations.filter((spec) => spec.direction.id === directionId);
  }, [allSpecializations, directionId]);

  const competencies = useMemo(() => {
    if (!allCompetencies) return [];
    if (directionId === null) return allCompetencies;
    return allCompetencies.filter((comp) => comp.direction.id === directionId);
  }, [allCompetencies, directionId]);

  const isLoading = isLoadingDirections || isLoadingSpecializations || isLoadingCompetencies;

  return {
    directions: (directions || []) as Direction[],
    specializations,
    competencies,
    isLoading,
  };
}
