import Button from '../../Button';
import Text from '../../Text';
import { modal } from '@/shared/store/modalStore';

import s from '../FileUpload.module.scss';

interface MobileUploadModalProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function openMobileUploadModal({ fileInputRef }: MobileUploadModalProps) {
  const modalId = modal.open({
    title: <Text variant='h5'>Загрузить файл</Text>,
    type: 'bottom-sheet',
    swipeable: true,
    content: (
      <div className={s.mobileModalContent}>
        <div className={s.mobileUploadOptions}>
          <Button
            variant='secondary'
            size='small'
            fullWidth
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.setAttribute('capture', 'environment');
                fileInputRef.current.click();
              }
              modal.close(modalId);
            }}
            leftIcon='camera_video_fill'
          >
            Сделать фото
          </Button>
          <Button
            variant='secondary'
            size='small'
            fullWidth
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.removeAttribute('capture');
                fileInputRef.current.click();
              }
              modal.close(modalId);
            }}
            leftIcon='bid_landscape'
          >
            Выбрать из галереи
          </Button>
        </div>
      </div>
    ),
  });
}
