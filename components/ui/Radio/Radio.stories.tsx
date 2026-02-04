import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Radio from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the radio has an error state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    return (
      <Radio
        id="option1"
        name="default"
        value="option1"
        checked={selected === 'option1'}
        onChange={() => setSelected('option1')}
        label="Option 1"
      />
    );
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    const options = [
      { id: 'option1', value: 'option1', label: 'Option 1' },
      { id: 'option2', value: 'option2', label: 'Option 2' },
      { id: 'option3', value: 'option3', label: 'Option 3' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((option) => (
          <Radio
            key={option.id}
            id={option.id}
            name="group"
            value={option.value}
            checked={selected === option.value}
            onChange={() => setSelected(option.value)}
            label={option.label}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio
        id="disabled-unchecked"
        name="disabled"
        value="unchecked"
        checked={false}
        disabled
        label="Disabled unchecked"
      />
      <Radio
        id="disabled-checked"
        name="disabled"
        value="checked"
        checked
        disabled
        label="Disabled checked"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Radio
          id="error1"
          name="error"
          value="option1"
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
          error
          label="Option with error"
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Radio
          id="required1"
          name="required"
          value="yes"
          checked={selected === 'yes'}
          onChange={() => setSelected('yes')}
          required
          label="Yes"
        />
        <Radio
          id="required2"
          name="required"
          value="no"
          checked={selected === 'no'}
          onChange={() => setSelected('no')}
          required
          label="No"
        />
      </div>
    );
  },
};

export const WithLongLabels: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <Radio
          id="long1"
          name="long"
          value="long1"
          checked={selected === 'long1'}
          onChange={() => setSelected('long1')}
          label="This is a very long label that demonstrates how the radio button handles multi-line text content"
        />
        <Radio
          id="long2"
          name="long"
          value="long2"
          checked={selected === 'long2'}
          onChange={() => setSelected('long2')}
          label="Another long option with detailed description"
        />
      </div>
    );
  },
};
