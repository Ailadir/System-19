import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SegmentedControl from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the segmented control',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the control is disabled',
    },
    isAdaptive: {
      control: 'boolean',
      description: 'Whether the control adapts to container width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    return (
      <SegmentedControl
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        selectedOption={selected}
        onChange={setSelected}
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    return (
      <SegmentedControl
        label="Choose an option"
        options={[
          { value: 'option1', label: 'First' },
          { value: 'option2', label: 'Second' },
          { value: 'option3', label: 'Third' },
        ]}
        selectedOption={selected}
        onChange={setSelected}
      />
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [small, setSmall] = useState('s1');
    const [medium, setMedium] = useState('m1');
    const [large, setLarge] = useState('l1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small:</p>
          <SegmentedControl
            size="small"
            options={[
              { value: 's1', label: 'One' },
              { value: 's2', label: 'Two' },
            ]}
            selectedOption={small}
            onChange={setSmall}
          />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium:</p>
          <SegmentedControl
            size="medium"
            options={[
              { value: 'm1', label: 'One' },
              { value: 'm2', label: 'Two' },
            ]}
            selectedOption={medium}
            onChange={setMedium}
          />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Large:</p>
          <SegmentedControl
            size="large"
            options={[
              { value: 'l1', label: 'One' },
              { value: 'l2', label: 'Two' },
            ]}
            selectedOption={large}
            onChange={setLarge}
          />
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState('list');
    return (
      <SegmentedControl
        options={[
          { value: 'list', label: 'List', leftIcon: 'list' },
          { value: 'grid', label: 'Grid', leftIcon: 'grid_view' },
          { value: 'map', label: 'Map', leftIcon: 'map' },
        ]}
        selectedOption={selected}
        onChange={setSelected}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    return (
      <SegmentedControl
        disabled
        options={[
          { value: 'option1', label: 'Disabled 1' },
          { value: 'option2', label: 'Disabled 2' },
        ]}
        selectedOption={selected}
        onChange={setSelected}
      />
    );
  },
};

export const Adaptive: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    return (
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <SegmentedControl
          isAdaptive
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
          selectedOption={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const TwoOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState('yes');
    return (
      <SegmentedControl
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
        selectedOption={selected}
        onChange={setSelected}
      />
    );
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState('1');
    return (
      <SegmentedControl
        options={[
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
          { value: '3', label: 'Three' },
          { value: '4', label: 'Four' },
          { value: '5', label: 'Five' },
        ]}
        selectedOption={selected}
        onChange={setSelected}
      />
    );
  },
};

export const ViewModes: Story = {
  render: () => {
    const [view, setView] = useState('comfortable');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <SegmentedControl
          label="View mode"
          options={[
            { value: 'comfortable', label: 'Comfortable', leftIcon: 'view_comfortable' },
            { value: 'compact', label: 'Compact', leftIcon: 'view_compact' },
            { value: 'list', label: 'List', leftIcon: 'view_list' },
          ]}
          selectedOption={view}
          onChange={setView}
        />
        <div style={{
          padding: '24px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <p>Current view: <strong>{view}</strong></p>
        </div>
      </div>
    );
  },
};

export const TimeRangeSelector: Story = {
  render: () => {
    const [range, setRange] = useState('week');
    return (
      <SegmentedControl
        label="Time range"
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' },
        ]}
        selectedOption={range}
        onChange={setRange}
      />
    );
  },
};
