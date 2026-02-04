import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'progress', 'caution', 'error', 'success', 'active'],
      description: 'Badge type for different states',
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'],
      description: 'Size of the badge',
    },
    borderType: {
      control: 'select',
      options: ['round', 'square'],
      description: 'Border style of the badge',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the badge is selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    borderType: 'square',
    type: 'default',
    size: 'medium',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge type="default">Default</Badge>
      <Badge type="progress">Progress</Badge>
      <Badge type="caution">Caution</Badge>
      <Badge type="error">Error</Badge>
      <Badge type="success">Success</Badge>
      <Badge type="active">Active</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge size="xsmall">XSmall</Badge>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </div>
  ),
};

export const BorderTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge borderType="square">Square</Badge>
      <Badge borderType="round">Round</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge leftIcon="check" type="success">Completed</Badge>
      <Badge leftIcon="warning" type="caution">Warning</Badge>
      <Badge leftIcon="error" type="error">Error</Badge>
      <Badge leftIcon="info" type="progress">Info</Badge>
    </div>
  ),
};

export const SelectedState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge selected={false}>Not Selected</Badge>
      <Badge selected>Selected</Badge>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge leftIcon="person" type="success" size="large">
        Active User
      </Badge>
      <Badge leftIcon="schedule" type="progress" size="medium" borderType="round">
        In Progress
      </Badge>
    </div>
  ),
};
