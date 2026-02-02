import { toast } from '@/shared/store';
import { UseFormSetError } from 'react-hook-form';

interface ApiError {
  message?: string;
  errors?: Record<string, string[]>;
}

export function useApiError() {
  const handleFormError = (
    error: unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setError: UseFormSetError<any>,
    fallbackMessage?: string,
  ) => {
    if (!error || typeof error !== 'object') {
      if (fallbackMessage) {
        toast.error(fallbackMessage);
      }
      return;
    }

    const apiError = error as ApiError;

    if (apiError.errors && Object.keys(apiError.errors).length > 0) {
      Object.entries(apiError.errors).forEach(([fieldName, messages]) => {
        if (messages && messages.length > 0) {
          setError(fieldName as never, {
            type: 'server',
            message: messages[0],
          });

          if (fieldName.includes('.')) {
            const parentField = fieldName.split('.')[0];
            setError(parentField as never, {
              type: 'server',
              message: messages[0],
            });
          }
        }
      });
    } else if (apiError.message) {
      toast.error(apiError.message);
    } else if (fallbackMessage) {
      toast.error(fallbackMessage);
    }
  };

  const handleError = (error: unknown, fallbackMessage: string) => {
    if (!error || typeof error !== 'object') {
      toast.error(fallbackMessage);
      return;
    }

    const apiError = error as ApiError;

    if (apiError.message) {
      toast.error(apiError.message);
    } else if (apiError.errors) {
      const firstError = Object.values(apiError.errors)[0];
      if (firstError && firstError.length > 0) {
        toast.error(firstError[0]);
      } else {
        toast.error(fallbackMessage);
      }
    } else {
      toast.error(fallbackMessage);
    }
  };

  return {
    handleFormError,
    handleError,
  };
}
