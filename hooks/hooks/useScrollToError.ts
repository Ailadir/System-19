import { toast } from '@/shared/store';
import { FieldErrors } from 'react-hook-form';

function flattenErrors(errors: FieldErrors, parentKey = ''): Array<[string, { message?: string }]> {
  const result: Array<[string, { message?: string }]> = [];

  Object.entries(errors).forEach(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === 'object') {
      if ('message' in value) {
        result.push([fullKey, value as { message?: string }]);
      } else {
        result.push(...flattenErrors(value as FieldErrors, fullKey));
      }
    }
  });

  return result;
}

export function scrollToFirstError(errors: FieldErrors) {
  const priorityFields = [
    'geo.address',
    'specialist.geo.address',
    'specialization',
    'specialist.specialization',
    'direction',
    'specialist.direction',
    'competencies',
    'specialist.competencies',
    'work_format',
    'specialist.work_format',
  ];

  const allErrorEntries = flattenErrors(errors);

  if (allErrorEntries.length === 0) {
    return;
  }

  const errorEntry =
    priorityFields
      .map((priorityField) => allErrorEntries.find(([name]) => name === priorityField))
      .find((entry) => entry) || allErrorEntries[0];

  if (!errorEntry) {
    return;
  }

  const [fieldName, error] = errorEntry;
  const message = error?.message || 'Ошибка валидации';

  toast.error(message);

  const element = document.querySelector<HTMLElement>(
    `[name="${fieldName}"], [data-field-name="${fieldName}"]`,
  );

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.focus();
      } else {
        const input = element.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          'input, textarea',
        );
        input?.focus();
      }
    }, 300);
  }
}
