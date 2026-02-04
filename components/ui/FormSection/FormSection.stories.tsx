import type { Meta, StoryObj } from '@storybook/react';
import FormSection from './FormSection';

const meta: Meta<typeof FormSection> = {
  title: 'Components/Form/FormSection',
  component: FormSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual type of the section',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormSection>;

export const Default: Story = {
  args: {
    title: 'Account Information',
    description: 'Update your account details and preferences',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="text"
          placeholder="Username"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="email"
          placeholder="Email"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    ),
  },
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <FormSection
        type="primary"
        title="Primary Section"
        description="This is a primary type section"
      >
        <input
          type="text"
          placeholder="Input field"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </FormSection>

      <FormSection
        type="secondary"
        title="Secondary Section"
        description="This is a secondary type section"
      >
        <input
          type="text"
          placeholder="Input field"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </FormSection>
    </div>
  ),
};

export const WithoutDescription: Story = {
  args: {
    title: 'Simple Section',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="text"
          placeholder="Field 1"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          placeholder="Field 2"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    description: 'This section has a description but no title',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="text"
          placeholder="Input field"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    ),
  },
};

export const OnlyChildren: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>This section has no title or description, only content.</p>
        <input
          type="text"
          placeholder="Input field"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    ),
  },
};

export const CompleteForm: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h1 style={{ margin: 0 }}>User Profile</h1>

      <FormSection
        title="Personal Information"
        description="Basic information about you"
        type="primary"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <input
            type="text"
            placeholder="First Name"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              gridColumn: 'span 2',
            }}
          />
        </div>
      </FormSection>

      <FormSection
        title="Contact Details"
        description="How can we reach you?"
        type="secondary"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            placeholder="Email Address"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </FormSection>

      <FormSection
        title="Address"
        description="Your current residential address"
        type="secondary"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="text"
            placeholder="Street Address"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <input
              type="text"
              placeholder="City"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="text"
              placeholder="ZIP Code"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        </div>
      </FormSection>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  ),
};

export const SettingsPage: Story = {
  render: () => (
    <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <FormSection
        title="Account Settings"
        description="Manage your account preferences and security"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" />
            <span>Enable two-factor authentication</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" defaultChecked />
            <span>Receive security alerts</span>
          </label>
        </div>
      </FormSection>

      <FormSection
        title="Notifications"
        description="Choose what updates you want to receive"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" defaultChecked />
            <span>Email notifications</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" />
            <span>Push notifications</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" defaultChecked />
            <span>Newsletter subscription</span>
          </label>
        </div>
      </FormSection>

      <FormSection
        title="Privacy"
        description="Control your privacy and data sharing"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" defaultChecked />
            <span>Make profile public</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" />
            <span>Allow search engines to index profile</span>
          </label>
        </div>
      </FormSection>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <FormSection
      title="Custom Styled Section"
      description="This section has custom styling applied"
      rootClassName="custom-root"
      className="custom-content"
    >
      <p>Content goes here with custom styling.</p>
      <style>{`
        .custom-root {
          border: 2px solid #4A90E2;
          border-radius: 12px;
          padding: 24px;
        }
        .custom-content {
          background-color: #f5f5f5;
          padding: 16px;
          border-radius: 8px;
        }
      `}</style>
    </FormSection>
  ),
};
