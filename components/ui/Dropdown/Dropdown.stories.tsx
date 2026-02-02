import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Dropdown from './Dropdown';
import type { MenuItem } from '../OverflowMenu/OverflowMenu.types';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'],
      description: 'Dropdown size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleItems: MenuItem[] = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
  { id: '4', name: 'Option 4' },
  { id: '5', name: 'Option 5' },
];

const longListItems: MenuItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Option ${i + 1}`,
}));

// Default dropdown
export const Default: Story = {
  args: {
    name: 'default',
    autoCompleteItems: sampleItems,
    placeholder: 'Select an option',
    size: 'medium',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    name: 'labeled',
    label: 'Choose Option',
    autoCompleteItems: sampleItems,
    placeholder: 'Select...',
    size: 'medium',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Dropdown
        name="xsmall"
        autoCompleteItems={sampleItems}
        placeholder="Extra Small"
        size="xsmall"
      />
      <Dropdown
        name="small"
        autoCompleteItems={sampleItems}
        placeholder="Small"
        size="small"
      />
      <Dropdown
        name="medium"
        autoCompleteItems={sampleItems}
        placeholder="Medium"
        size="medium"
      />
      <Dropdown
        name="large"
        autoCompleteItems={sampleItems}
        placeholder="Large"
        size="large"
      />
    </div>
  ),
};

// With left icon
export const WithLeftIcon: Story = {
  args: {
    name: 'icon',
    autoCompleteItems: sampleItems,
    placeholder: 'Select with icon',
    leftIcon: 'search',
    size: 'medium',
  },
};

// Searchable dropdown
export const Searchable: Story = {
  args: {
    name: 'searchable',
    autoCompleteItems: longListItems,
    placeholder: 'Search options...',
    searchable: true,
    size: 'medium',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    name: 'disabled',
    autoCompleteItems: sampleItems,
    placeholder: 'Disabled dropdown',
    disabled: true,
    size: 'medium',
  },
};

// With validation states
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Dropdown
        name="default"
        autoCompleteItems={sampleItems}
        placeholder="Default state"
        validationState="default"
      />
      <Dropdown
        name="error"
        autoCompleteItems={sampleItems}
        placeholder="Error state"
        validationState="error"
        errorText="This field is required"
        showError
      />
      <Dropdown
        name="success"
        autoCompleteItems={sampleItems}
        placeholder="Success state"
        validationState="success"
      />
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<MenuItem | null>(null);

    return (
      <div style={{ width: '300px' }}>
        <Dropdown
          name="interactive"
          label="Select Your Favorite"
          autoCompleteItems={sampleItems}
          placeholder="Choose an option..."
          onSelect={(item) => setSelected(item)}
          hintText={selected ? `Selected: ${selected.name}` : 'No selection yet'}
        />
      </div>
    );
  },
};
