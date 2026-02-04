// Mock app dependencies for Storybook

// Catalog types mock
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Service {
  id: number;
  name: string;
  category: Category;
}

export interface SearchFilters {
  categories?: number[];
  services?: number[];
  city?: string;
}

// Store mock
export interface Store {
  user: any;
  specialist: any;
  client: any;
}

export const useStore = () => ({
  user: null,
  specialist: null,
  client: null,
});

// ServerUserContext mock
export const useServerUser = () => ({
  user: null,
  specialist: null,
  client: null,
  loading: false,
});

// userStore mock
export const useUserStore = () => ({
  user: null,
  specialist: null,
  client: null,
  setUser: () => {},
  setSpecialist: () => {},
  setClient: () => {},
  clearUser: () => {},
});

// profileHelpers mock
export const isProfileComplete = () => true;
export const getProfileCompletionPercentage = () => 100;

// apiHelpers mock
export const apiRequest = async () => ({ data: null });
export const handleApiError = (error: any) => console.error(error);

// searchHelpers mock
export const buildSearchParams = () => new URLSearchParams();
export const parseSearchParams = () => ({});

// routerHelpers mock
export const getRouteParams = () => ({});

// cityHelpers mock
export const getCityId = () => null;
export const getCityName = () => '';

// toast mock
export const toast = {
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.error('Error:', message),
  info: (message: string) => console.log('Info:', message),
  warning: (message: string) => console.warn('Warning:', message),
};

export const showToast = toast.success;
