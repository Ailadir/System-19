import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ModalContainer from './ModalContainer';
import type { ModalData } from './ModalContainer.types';

const meta: Meta<typeof ModalContainer> = {
  title: 'Components/ModalContainer',
  component: ModalContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalContainer>;

export const SingleModal: Story = {
  render: () => {
    const [modals, setModals] = useState<ModalData[]>([
      {
        id: '1',
        type: 'centered',
        title: 'Single Modal',
        content: <div style={{ padding: '20px' }}>This is a single modal managed by ModalContainer.</div>,
      },
    ]);

    const handleClose = (id: string) => {
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    };

    return (
      <div>
        <button
          onClick={() =>
            setModals([
              {
                id: '1',
                type: 'centered',
                title: 'Single Modal',
                content: <div style={{ padding: '20px' }}>This is a single modal.</div>,
              },
            ])
          }
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Show Modal
        </button>
        <ModalContainer modals={modals} onCloseModal={handleClose} />
      </div>
    );
  },
};

export const MultipleModals: Story = {
  render: () => {
    const [modals, setModals] = useState<ModalData[]>([]);

    const addModal = (type: 'centered' | 'right-sidebar' | 'bottom-sheet') => {
      const id = Date.now().toString();
      setModals((prev) => [
        ...prev,
        {
          id,
          type,
          title: `Modal ${prev.length + 1}`,
          content: (
            <div style={{ padding: '20px' }}>
              <p>This is modal number {prev.length + 1}</p>
              <p>Type: {type}</p>
            </div>
          ),
        },
      ]);
    };

    const handleClose = (id: string) => {
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => addModal('centered')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Add Centered Modal
          </button>
          <button
            onClick={() => addModal('right-sidebar')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Add Right Sidebar
          </button>
          <button
            onClick={() => addModal('bottom-sheet')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Add Bottom Sheet
          </button>
        </div>
        <p>Active modals: {modals.length}</p>
        <ModalContainer modals={modals} onCloseModal={handleClose} />
      </div>
    );
  },
};

export const SequentialModals: Story = {
  render: () => {
    const [modals, setModals] = useState<ModalData[]>([]);
    const [step, setStep] = useState(1);

    const showStep = (stepNumber: number) => {
      setStep(stepNumber);
      setModals([
        {
          id: `step-${stepNumber}`,
          type: 'centered',
          title: `Step ${stepNumber} of 3`,
          content: (
            <div style={{ padding: '20px' }}>
              <p>This is step {stepNumber} of a multi-step process.</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                {stepNumber > 1 && (
                  <button
                    onClick={() => showStep(stepNumber - 1)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    Previous
                  </button>
                )}
                {stepNumber < 3 && (
                  <button
                    onClick={() => showStep(stepNumber + 1)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#4A90E2',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    Next
                  </button>
                )}
                {stepNumber === 3 && (
                  <button
                    onClick={() => {
                      setModals([]);
                      setStep(1);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          ),
          closeOnOverlayClick: false,
          closeOnEsc: false,
        },
      ]);
    };

    const handleClose = () => {
      setModals([]);
      setStep(1);
    };

    return (
      <div style={{ padding: '20px' }}>
        <button
          onClick={() => showStep(1)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Start Multi-Step Process
        </button>
        <ModalContainer modals={modals} onCloseModal={handleClose} />
      </div>
    );
  },
};

export const DifferentConfigurations: Story = {
  render: () => {
    const [modals, setModals] = useState<ModalData[]>([]);

    const addModal = (config: Partial<ModalData>) => {
      const id = Date.now().toString();
      setModals((prev) => [
        ...prev,
        {
          id,
          type: 'centered',
          title: 'Modal',
          content: <div style={{ padding: '20px' }}>Modal content</div>,
          ...config,
        } as ModalData,
      ]);
    };

    const handleClose = (id: string) => {
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
          <button
            onClick={() =>
              addModal({
                title: 'No Close Button',
                showCloseButton: false,
                content: (
                  <div style={{ padding: '20px' }}>
                    <p>This modal has no close button.</p>
                  </div>
                ),
              })
            }
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            No Close Button
          </button>
          <button
            onClick={() =>
              addModal({
                title: 'Non-Dismissible',
                closeOnOverlayClick: false,
                closeOnEsc: false,
                content: (
                  <div style={{ padding: '20px' }}>
                    <p>Can only be closed with the X button.</p>
                  </div>
                ),
              })
            }
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Non-Dismissible
          </button>
          <button
            onClick={() =>
              addModal({
                type: 'bottom-sheet',
                title: 'Swipeable',
                swipeable: true,
                content: (
                  <div style={{ padding: '20px' }}>
                    <p>Swipe down to dismiss (on mobile).</p>
                  </div>
                ),
              })
            }
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Swipeable Bottom Sheet
          </button>
        </div>
        <ModalContainer modals={modals} onCloseModal={handleClose} />
      </div>
    );
  },
};
