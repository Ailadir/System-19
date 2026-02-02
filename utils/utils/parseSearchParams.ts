import { CatalogSearchParams, DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/shared/types/catalog';

/**
 * Парсит параметры из адреса скроки из хедера
 *
 * Пример:
 * @param searchString - Это просто строка адреса(e.g., "?city_id=1&child_age=3-6")
 * @returns Возаращает валидные значения для каталогов
 *
 * @example
 * const headersList = await headers();
 * const searchString = headersList.get('x-search-params') || '';
 * const params = parseSearchParamsFromHeaders(searchString);
 * return { city_id: 1, child_age: "3-6", page: 1, per_page: 20 }
 */

export function parseSearchParamsFromHeaders(searchString: string): CatalogSearchParams {
  const searchParams: { [key: string]: string | string[] | undefined } = {};

  if (searchString) {
    const cleanSearch = searchString.startsWith('?') ? searchString.slice(1) : searchString;
    const urlSearchParams = new URLSearchParams(cleanSearch);

    const keys = new Set(urlSearchParams.keys());

    keys.forEach((key) => {
      const values = urlSearchParams.getAll(key);
      searchParams[key] = values.length === 1 ? values[0] : values;
    });
  }

  return parseSearchParams(searchParams);
}

export function parseSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): CatalogSearchParams {
  const params: CatalogSearchParams = {};

  const cityId = searchParams.city_id;
  params.city_id = cityId ? parseInt(cityId as string, 10) : 1;

  const childAge = searchParams.child_age;
  if (childAge) {
    params.child_age = childAge as CatalogSearchParams['child_age'];
  }

  const childGender = searchParams.child_gender;
  if (childGender === 'male' || childGender === 'female') {
    params.child_gender = childGender;
  }

  const priceMin = searchParams.price_min;
  if (priceMin) {
    params.price_min = parseFloat(priceMin as string);
  }

  const priceMax = searchParams.price_max;
  if (priceMax) {
    params.price_max = parseFloat(priceMax as string);
  }

  const similarRequestId = searchParams.similar_request_id;
  if (similarRequestId) {
    params.similar_request_id = parseInt(similarRequestId as string, 10);
  }

  const page = searchParams.page;
  params.page = page ? parseInt(page as string, 10) : DEFAULT_PAGE;

  const perPage = searchParams.per_page;
  params.per_page = perPage ? parseInt(perPage as string, 10) : DEFAULT_PER_PAGE;

  const directionId = searchParams.direction_id;
  if (directionId) {
    params.direction_id = parseInt(directionId as string, 10);
  }

  const specializationIds = searchParams['specialization_ids[]'];
  if (specializationIds) {
    const ids = Array.isArray(specializationIds) ? specializationIds : [specializationIds];
    params.specialization_ids = ids.map((id) => parseInt(id, 10));
  }

  const competencyIds = searchParams['competency_ids[]'];
  if (competencyIds) {
    const ids = Array.isArray(competencyIds) ? competencyIds : [competencyIds];
    params.competency_ids = ids.map((id) => parseInt(id, 10));
  }

  const workFormat = searchParams['work_format[]'];
  if (workFormat) {
    const formats = Array.isArray(workFormat) ? workFormat : [workFormat];
    params.work_format = formats as CatalogSearchParams['work_format'];
  }

  return params;
}
