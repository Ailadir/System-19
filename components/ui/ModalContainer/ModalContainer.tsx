'use client';

import Modal from '../Modal';
import type { ModalData } from './ModalContainer.types';

export interface ModalContainerProps {
  modals: ModalData[];
  onCloseModal: (id: string) => void;
}

export default function ModalContainer({ modals, onCloseModal }: ModalContainerProps) {
  return (
    <>
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          type={modal.type || 'centered'}
          isOpen={true}
          onClose={() => onCloseModal(modal.id)}
          title={modal.title}
          closeOnOverlayClick={modal.closeOnOverlayClick}
          closeOnEsc={modal.closeOnEsc}
          className={modal.className}
          showCloseButton={modal.showCloseButton}
          {...(modal.width && { width: modal.width })}
          {...(modal.maxWidth && { maxWidth: modal.maxWidth })}
          {...(modal.maxHeight && { maxHeight: modal.maxHeight })}
          {...(modal.swipeable !== undefined && { swipeable: modal.swipeable })}
        >
          {modal.content}
        </Modal>
      ))}
    </>
  );
}
