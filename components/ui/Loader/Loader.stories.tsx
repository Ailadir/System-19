import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: 'Size of the loader',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
      <Loader size="medium" />
      <Loader size="large" />
    </div>
  ),
};

export const InContainer: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        height: '300px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader size="large" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ textAlign: 'center' }}>
      <Loader size="large" />
      <p style={{ marginTop: '16px', color: '#666' }}>Loading...</p>
    </div>
  ),
};
