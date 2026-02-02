import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      description: 'Button visual style variant',
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    borderType: {
      control: 'select',
      options: ['square', 'round'],
      description: 'Button border style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default story
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Primary Button',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="xsmall">Extra Small</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

// With left icon
export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    leftIcon: 'add',
    children: 'Add Item',
  },
};

// With right icon
export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    rightIcon: 'arrow_forward',
    children: 'Next',
  },
};

// Icon only
export const IconOnly: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    leftIcon: 'search',
    iconOnly: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
    children: 'Disabled Button',
  },
};

// Border types
export const BorderTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button borderType="square">Square Border</Button>
      <Button borderType="round">Round Border</Button>
    </div>
  ),
};

// Full width
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};
