import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the toggle has an error state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Toggle
        id="default"
        name="default"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Enable notifications"
      />
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Toggle
        id="checked"
        name="checked"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Enabled"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toggle
        id="disabled-off"
        name="disabled-off"
        checked={false}
        disabled
        label="Disabled (Off)"
      />
      <Toggle
        id="disabled-on"
        name="disabled-on"
        checked
        disabled
        label="Disabled (On)"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Toggle
        id="error"
        name="error"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        error
        label="Toggle with error"
      />
    );
  },
};

export const MultipleToggles: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Toggle
          id="notifications"
          name="notifications"
          checked={settings.notifications}
          onChange={(e) =>
            setSettings({ ...settings, notifications: e.target.checked })
          }
          label="Enable notifications"
        />
        <Toggle
          id="darkMode"
          name="darkMode"
          checked={settings.darkMode}
          onChange={(e) =>
            setSettings({ ...settings, darkMode: e.target.checked })
          }
          label="Dark mode"
        />
        <Toggle
          id="autoSave"
          name="autoSave"
          checked={settings.autoSave}
          onChange={(e) =>
            setSettings({ ...settings, autoSave: e.target.checked })
          }
          label="Auto-save changes"
        />
        <Toggle
          id="analytics"
          name="analytics"
          checked={settings.analytics}
          onChange={(e) =>
            setSettings({ ...settings, analytics: e.target.checked })
          }
          label="Share analytics data"
        />
      </div>
    );
  },
};

export const WithLongLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ maxWidth: '400px' }}>
        <Toggle
          id="long"
          name="long"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label="I agree to receive marketing communications and promotional offers via email and notifications"
        />
      </div>
    );
  },
};
