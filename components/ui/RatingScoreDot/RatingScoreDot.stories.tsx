import type { Meta, StoryObj } from '@storybook/react';
import RatingScoreDot from './RatingScoreDot';

const meta: Meta<typeof RatingScoreDot> = {
  title: 'Components/RatingScoreDot',
  component: RatingScoreDot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: 'text',
      description: 'Rating value to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RatingScoreDot>;

export const Default: Story = {
  args: {
    rating: '4.5',
  },
};

export const DifferentRatings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <RatingScoreDot rating="5.0" />
      <RatingScoreDot rating="4.8" />
      <RatingScoreDot rating="4.5" />
      <RatingScoreDot rating="4.0" />
      <RatingScoreDot rating="3.5" />
      <RatingScoreDot rating="3.0" />
    </div>
  ),
};

export const WithDecimal: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <RatingScoreDot rating="4.95" />
      <RatingScoreDot rating="4.73" />
      <RatingScoreDot rating="4.26" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        padding: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <RatingScoreDot rating="4.7" />
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>Excellent Service</p>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Based on 127 reviews</p>
      </div>
    </div>
  ),
};
