import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'],
      description: 'Input size',
    },
    validationState: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    isRound: {
      control: 'boolean',
      description: 'Use round border style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Default input
export const Default: Story = {
  args: {
    name: 'default',
    placeholder: 'Enter text...',
    size: 'medium',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    name: 'labeled',
    label: 'Full Name',
    placeholder: 'Enter your name',
    size: 'medium',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input name="xsmall" placeholder="Extra Small" size="xsmall" />
      <Input name="small" placeholder="Small" size="small" />
      <Input name="medium" placeholder="Medium" size="medium" />
      <Input name="large" placeholder="Large" size="large" />
    </div>
  ),
};

// With left icon
export const WithLeftIcon: Story = {
  args: {
    name: 'search',
    placeholder: 'Search...',
    leftIcon: 'search',
    size: 'medium',
  },
};

// With right icon
export const WithRightIcon: Story = {
  args: {
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    rightIcon: 'visibility',
    size: 'medium',
  },
};

// Validation states
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        name="default"
        placeholder="Default state"
        validationState="default"
      />
      <Input
        name="error"
        placeholder="Error state"
        validationState="error"
        errorText="This field is required"
        showError
      />
      <Input
        name="success"
        placeholder="Success state"
        validationState="success"
      />
    </div>
  ),
};

// With hint text
export const WithHintText: Story = {
  args: {
    name: 'email',
    label: 'Email Address',
    placeholder: 'your@email.com',
    hintText: 'We will never share your email',
    size: 'medium',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    name: 'disabled',
    placeholder: 'Disabled input',
    disabled: true,
    size: 'medium',
  },
};

// Round style
export const RoundStyle: Story = {
  args: {
    name: 'round',
    placeholder: 'Round input',
    isRound: true,
    size: 'medium',
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '300px' }}>
        <Input
          name="interactive"
          label="Interactive Input"
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          hintText={`Characters: ${value.length}`}
        />
      </div>
    );
  },
};
