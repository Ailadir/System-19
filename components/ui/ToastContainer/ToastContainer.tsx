'use client';

import Toast from '../Toast';
import type { Toast as ToastType } from '../Toast/Toast.types';

import s from './ToastContainer.module.scss';

export interface ToastContainerProps {
  toasts: ToastType[];
  onRemoveToast: (id: string) => void;
}

function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={s.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onRemoveToast} />
      ))}
    </div>
  );
}

export default ToastContainer;
