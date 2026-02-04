import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FieldInput from './FieldInput';

const meta: Meta<typeof FieldInput> = {
  title: 'Components/Form/FieldInput',
  component: FieldInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'],
      description: 'Size of the textarea',
    },
    validationState: {
      control: 'select',
      options: ['default', 'success', 'error'],
      description: 'Validation state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    autoGrow: {
      control: 'boolean',
      description: 'Auto-grow based on content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <FieldInput
          name="message"
          label="Message"
          placeholder="Enter your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const WithHint: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <FieldInput
          name="description"
          label="Description"
          placeholder="Enter description..."
          hintText="Minimum 20 characters required"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <FieldInput
          name="comment"
          label="Comment"
          placeholder="Enter comment..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          validationState="error"
          errorText="This field is required"
          showError
        />
      </div>
    );
  },
};

export const AutoGrow: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <FieldInput
          name="notes"
          label="Notes (Auto-grow)"
          placeholder="Start typing and watch the field grow..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoGrow
          minRows={2}
          maxRows={6}
          hintText="Field automatically adjusts height based on content"
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <FieldInput
          name="message"
          label="Message with Icons"
          placeholder="Type your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          leftIcon="attach_file"
          rightIcon="send"
          onLeftIconClick={() => alert('Attach file clicked')}
          onRightIconClick={() => alert('Send clicked')}
        />
      </div>
    );
  },
};

export const RoundedVariant: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <FieldInput
          name="message"
          label="Rounded Input"
          placeholder="Enter text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isRound
        />
      </div>
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 200;
    return (
      <div style={{ width: '400px' }}>
        <FieldInput
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          hintText={`${value.length}/${maxLength} characters`}
        />
      </div>
    );
  },
};

export const EnterToSubmit: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState<string[]>([]);

    const handleSubmit = () => {
      if (value.trim()) {
        setSubmitted([...submitted, value]);
        setValue('');
      }
    };

    return (
      <div style={{ width: '400px' }}>
        <FieldInput
          name="chat"
          label="Chat Message"
          placeholder="Type message and press Enter..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onEnterPress={handleSubmit}
          rightIcon="send"
          onRightIconClick={handleSubmit}
          hintText="Press Enter to send (Shift+Enter for new line)"
          autoGrow
        />
        {submitted.length > 0 && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Messages:</p>
            {submitted.map((msg, i) => (
              <p key={i} style={{ margin: '4px 0', fontSize: '14px' }}>{msg}</p>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FieldInput
        name="disabled"
        label="Disabled Field"
        placeholder="This field is disabled"
        value="Cannot edit this content"
        disabled
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => {
    const [value, setValue] = useState('Sample text');
    return (
      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FieldInput
          name="xsmall"
          label="X-Small"
          size="xsmall"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FieldInput
          name="small"
          label="Small"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FieldInput
          name="medium"
          label="Medium"
          size="medium"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FieldInput
          name="large"
          label="Large"
          size="large"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};
