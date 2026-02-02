export const useApiDataNormalizer = <T>(apiResponse: unknown): T[] => {
  if (Array.isArray(apiResponse)) {
    return apiResponse as T[];
  }

  if (apiResponse && typeof apiResponse === 'object' && 'data' in apiResponse) {
    const data = (apiResponse as { data: unknown }).data;
    if (Array.isArray(data)) {
      return data as T[];
    }
  }

  return [];
};
