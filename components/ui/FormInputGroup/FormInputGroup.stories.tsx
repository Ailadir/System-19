import type { Meta, StoryObj } from '@storybook/react';
import FormInputGroup from './FormInputGroup';

const meta: Meta<typeof FormInputGroup> = {
  title: 'Components/Form/FormInputGroup',
  component: FormInputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormInputGroup>;

export const Default: Story = {
  args: {
    label: 'Personal Information',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="First Name"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    ),
  },
};

export const WithoutLabel: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder="City"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            flex: 1,
          }}
        />
        <input
          type="text"
          placeholder="ZIP"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100px',
          }}
        />
      </div>
    ),
  },
};

export const NestedInputs: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FormInputGroup label="Contact Information">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="Email"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="tel"
            placeholder="Phone"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <textarea
            placeholder="Address"
            rows={3}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </FormInputGroup>
    </div>
  ),
};

export const MultipleGroups: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <FormInputGroup label="Account Details">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Username"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </FormInputGroup>

      <FormInputGroup label="Personal Information">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Full Name"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="date"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </FormInputGroup>

      <FormInputGroup label="Preferences">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            Newsletter subscription
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            Email notifications
          </label>
        </div>
      </FormInputGroup>
    </div>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <FormInputGroup label="Date Range">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="date"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <span>to</span>
        <input
          type="date"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    </FormInputGroup>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <FormInputGroup
      label="Custom Styled Group"
      className="custom-group"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Field 1"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          placeholder="Field 2"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <style>{`
        .custom-group {
          background-color: #f5f5f5;
          padding: 16px;
          border-radius: 8px;
        }
      `}</style>
    </FormInputGroup>
  ),
};

export const ComplexForm: Story = {
  render: () => (
    <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ margin: 0 }}>Registration Form</h2>

      <FormInputGroup label="Basic Information">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <input
            type="text"
            placeholder="First Name"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </FormInputGroup>

      <FormInputGroup label="Contact">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="Email"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="tel"
            placeholder="Phone"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </FormInputGroup>

      <FormInputGroup label="Address">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Street Address"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <input
              type="text"
              placeholder="City"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="text"
              placeholder="ZIP"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        </div>
      </FormInputGroup>

      <button
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#4A90E2',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Submit
      </button>
    </div>
  ),
};
