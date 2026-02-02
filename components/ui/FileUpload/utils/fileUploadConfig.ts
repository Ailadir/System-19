import { FileUploadState } from '../FileUpload.types';

export const ACCEPTED_FORMATS = 'JPEG, PNG, HEIC';

export type StateConfig = {
  icon: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonIcon?: string;
};

/**
 * Get state configuration for FileUpload component
 *
 * Maps upload state to UI configuration (icons, colors, messages)
 */
export const getStateConfig = (
  state: FileUploadState,
  errorMessage?: string,
  isMultipleUpload?: boolean
): StateConfig => {
  switch (state) {
    case 'default':
      return {
        icon: 'cloud_arrow_down_fill',
        iconColor: 'accent',
        title: `Перетащите ${isMultipleUpload ? 'файлы' : 'файл'} сюда`,
        subtitle: `Формат: ${ACCEPTED_FORMATS}`,
        buttonText: `Загрузить ${isMultipleUpload ? 'файлы' : 'файл'}`,
      };
    case 'loading':
      return {
        icon: 'cloud_arrow_down_fill',
        iconColor: 'progress',
        title: 'Подождите немного, загружаем...',
      };
    case 'uploaded':
      return {
        icon: 'cloud_check_fill',
        iconColor: 'success',
        title: `${isMultipleUpload ? 'Файлы' : 'Файл'} загружен`,
        subtitle: `Формат: ${ACCEPTED_FORMATS}`,
        buttonText: `Загрузить ${isMultipleUpload ? 'другие' : 'другой'}`,
        buttonIcon: 'autorenew',
      };
    case 'error':
      return {
        icon: 'cloud_minus_fill',
        iconColor: 'critical',
        title: 'Попробуйте снова',
        subtitle:
          errorMessage ||
          `Ошибка: Неподходящий ${isMultipleUpload ? 'формат файлов' : 'формат файла'}`,
        buttonText: `Загрузить ${isMultipleUpload ? 'файлы' : 'файл'}`,
      };
  }
};
