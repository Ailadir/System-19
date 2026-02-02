export type ChildAgeCategory = 'infants' | 'preschool' | 'school' | 'all';

export type WorkFormatFilter = 'remote' | 'on_site' | 'at_home';

export interface CatalogSearchParams {
  city_id?: number;
  direction_id?: number;
  specialization_ids?: number[];
  competency_ids?: number[];
  child_age?: number | ChildAgeCategory;
  child_gender?: 'male' | 'female' | 'any';
  work_format?: WorkFormatFilter[];
  price_min?: number;
  price_max?: number;
  similar_request_id?: number;
  page?: number;
  per_page?: number;

  geo?: {
    latitude: number;
    longitude: number;
    range: number;
  };
}

type ChildAgeRange = {
  min: number;
  max: number;
  label: string;
  description: string;
};

export const CHILD_AGE_RANGES: Record<ChildAgeCategory, ChildAgeRange> = {
  infants: { min: 1, max: 3, label: 'Младенцы', description: 'от 1 до 3 лет' },
  preschool: { min: 4, max: 7, label: 'Дошкольники', description: 'от 4 до 7 лет' },
  school: { min: 7, max: 18, label: 'Школьники', description: 'от 7 до 18 лет' },
  all: { min: 1, max: 18, label: 'Все возраста', description: 'от 1 до 18 лет' },
};

export const DEFAULT_PER_PAGE = 15;
export const DEFAULT_PAGE = 1;
