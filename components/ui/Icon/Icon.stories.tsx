import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name from the icon library',
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlLarge', 'landing'],
      description: 'Icon size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'accent', 'critical', 'warning', 'success'],
      description: 'Icon color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Default icon
export const Default: Story = {
  args: {
    icon: 'search',
    size: 'medium',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon icon="search" size="xsmall" />
      <Icon icon="search" size="small" />
      <Icon icon="search" size="medium" />
      <Icon icon="search" size="large" />
      <Icon icon="search" size="xlLarge" />
      <Icon icon="search" size="landing" />
    </div>
  ),
};

// All colors
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon icon="favorite" color="primary" size="large" />
      <Icon icon="favorite" color="secondary" size="large" />
      <Icon icon="favorite" color="tertiary" size="large" />
      <Icon icon="favorite" color="accent" size="large" />
      <Icon icon="favorite" color="critical" size="large" />
      <Icon icon="favorite" color="warning" size="large" />
      <Icon icon="favorite" color="success" size="large" />
    </div>
  ),
};

// Common icons
export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px', padding: '20px' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="search" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>search</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="add" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>add</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="close" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>close</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="delete" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>delete</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="edit" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>edit</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="favorite" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>favorite</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="arrow_back" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>arrow_back</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="arrow_forward" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>arrow_forward</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="arrow_upward" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>arrow_upward</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="arrow_downward" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>arrow_downward</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="settings" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>settings</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon="account" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>account</div>
      </div>
    </div>
  ),
};

// Navigation icons
export const NavigationIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon icon="menu" size="large" />
      <Icon icon="home" size="large" />
      <Icon icon="arrow_back" size="large" />
      <Icon icon="arrow_forward" size="large" />
      <Icon icon="expand_more" size="large" />
      <Icon icon="expand_less" size="large" />
    </div>
  ),
};

// Action icons
export const ActionIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon icon="add" size="large" />
      <Icon icon="edit" size="large" />
      <Icon icon="delete" size="large" />
      <Icon icon="save" size="large" />
      <Icon icon="close" size="large" />
      <Icon icon="check" size="large" />
    </div>
  ),
};

// Social icons
export const SocialIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon icon="telegram" size="large" />
      <Icon icon="vk" size="large" />
      <Icon icon="dzen" size="large" />
    </div>
  ),
};
