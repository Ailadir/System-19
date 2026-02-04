import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Checkbox visual variant',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox has an error state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="default"
        name="default"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Accept terms and conditions"
      />
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox
        id="checked"
        name="checked"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="I agree"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox
        id="disabled-unchecked"
        name="disabled-unchecked"
        checked={false}
        disabled
        label="Disabled unchecked"
      />
      <Checkbox
        id="disabled-checked"
        name="disabled-checked"
        checked
        disabled
        label="Disabled checked"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="error"
        name="error"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        error
        label="This field has an error"
      />
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [primary, setPrimary] = useState(false);
    const [secondary, setSecondary] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          id="primary"
          name="primary"
          variant="primary"
          checked={primary}
          onChange={(e) => setPrimary(e.target.checked)}
          label="Primary variant"
        />
        <Checkbox
          id="secondary"
          name="secondary"
          variant="secondary"
          checked={secondary}
          onChange={(e) => setSecondary(e.target.checked)}
          label="Secondary variant"
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="required"
        name="required"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        required
        label="Required field *"
      />
    );
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const options = [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue' },
      { id: 'angular', label: 'Angular' },
      { id: 'svelte', label: 'Svelte' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((option) => (
          <Checkbox
            key={option.id}
            id={option.id}
            name={option.id}
            checked={selected.includes(option.id)}
            onChange={(e) => {
              setSelected((prev) =>
                e.target.checked
                  ? [...prev, option.id]
                  : prev.filter((id) => id !== option.id)
              );
            }}
            label={option.label}
          />
        ))}
      </div>
    );
  },
};
