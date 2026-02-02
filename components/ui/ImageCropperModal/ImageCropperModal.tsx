'use client';

import Button from '../Button';
import Text from '../Text';
import { ImageCropperModalProps } from './ImageCropperModal.types';
import { useBreakpoint } from '../../../hooks/hooks';
import { toast } from '@/shared/store/toastStore';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';

import s from './ImageCropperModal.module.scss';

const createCroppedImage = async (imageSrc: string, pixelCrop: Area): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onerror = () => {
      reject(new Error('Ошибка загрузки изображения'));
    };

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(null);
        return;
      }

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Не удалось обработать изображение'));
          }
        },
        'image/jpeg',
        0.95,
      );
    };

    image.src = imageSrc;
  });
};

function ImageCropperModal(props: ImageCropperModalProps) {
  const { imageUrl, onCancel, onContinue, isOpen } = props;
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const [isProcessing, setIsProcessing] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleContinue = useCallback(async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);

    try {
      const blob = await createCroppedImage(imageUrl, croppedAreaPixels);
      if (blob && blob.size > 0) {
        onContinue(blob);
      } else {
        throw new Error('Не удалось обработать изображение');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка обработки изображения');
    } finally {
      setIsProcessing(false);
    }
  }, [imageUrl, croppedAreaPixels, onContinue]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  if (!isOpen) return null;

  return (
    <div className={s.modalContent}>
      <div className={s.header}>
        <Text variant='p3' color='secondary' weight='regular'>
          Выбранная область будет показана в вашем профиле
        </Text>
      </div>

      <div className={s.cropperWrapper}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape='round'
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className={s.buttonGroup}>
        <Button
          variant='secondary'
          size={isMobile ? 'small' : 'medium'}
          fullWidth
          borderType='round'
          onClick={handleCancel}
          disabled={isProcessing}
        >
          Отменить
        </Button>
        <Button
          variant='primary'
          size={isMobile ? 'small' : 'medium'}
          fullWidth
          borderType='round'
          onClick={handleContinue}
          disabled={isProcessing}
        >
          {isProcessing ? 'Обработка...' : 'Продолжить'}
        </Button>
      </div>
    </div>
  );
}

export default ImageCropperModal;
