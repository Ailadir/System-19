import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SmsCodeInput from './SmsCodeInput';

const meta: Meta<typeof SmsCodeInput> = {
  title: 'Components/Form/SmsCodeInput',
  component: SmsCodeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: { type: 'number', min: 3, max: 8 },
      description: 'Number of code digits',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SmsCodeInput>;

export const Default: Story = {
  render: () => {
    const [code, setCode] = useState(['', '', '', '']);
    return (
      <div>
        <SmsCodeInput
          value={code}
          onChange={setCode}
        />
        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Code: {code.join('')}
        </p>
      </div>
    );
  },
};

export const WithCompletion: Story = {
  render: () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [completed, setCompleted] = useState(false);

    return (
      <div>
        <SmsCodeInput
          value={code}
          onChange={setCode}
          onComplete={(fullCode) => {
            setCompleted(true);
            alert(`Code completed: ${fullCode}`);
          }}
        />
        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          {completed ? `✓ Code: ${code.join('')}` : 'Enter 4-digit code'}
        </p>
      </div>
    );
  },
};

export const SixDigits: Story = {
  render: () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    return (
      <div>
        <SmsCodeInput
          value={code}
          onChange={setCode}
          length={6}
        />
        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Code: {code.join('')}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [code] = useState(['1', '2', '3', '4']);
    return (
      <div>
        <SmsCodeInput
          value={code}
          disabled
        />
        <p style={{ marginTop: '16px', textAlign: 'center', color: '#666' }}>
          Input is disabled
        </p>
      </div>
    );
  },
};

export const VerificationFlow: Story = {
  render: () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const correctCode = '1234';

    const handleComplete = (fullCode: string) => {
      setIsVerifying(true);
      setTimeout(() => {
        if (fullCode === correctCode) {
          setIsVerified(true);
          setIsVerifying(false);
        } else {
          setIsVerifying(false);
          alert('Incorrect code. Try 1234');
          setCode(['', '', '', '']);
        }
      }, 1000);
    };

    if (isVerified) {
      return (
        <div style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
          <h2 style={{ margin: '0 0 8px 0', color: '#4CAF50' }}>Verified!</h2>
          <p style={{ margin: 0, color: '#666' }}>Your code has been confirmed</p>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '400px', padding: '24px', border: '1px solid #e0e0e0', borderRadius: '12px' }}>
        <h2 style={{ margin: '0 0 8px 0', textAlign: 'center' }}>Verify Your Phone</h2>
        <p style={{ margin: '0 0 24px 0', textAlign: 'center', color: '#666' }}>
          Enter the 4-digit code sent to your phone
        </p>

        <SmsCodeInput
          value={code}
          onChange={setCode}
          onComplete={handleComplete}
          disabled={isVerifying}
        />

        {isVerifying && (
          <p style={{ marginTop: '16px', textAlign: 'center', color: '#666' }}>
            Verifying...
          </p>
        )}

        <button
          onClick={() => alert('Code resent!')}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          Resend Code
        </button>

        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
          Hint: Try code 1234
        </p>
      </div>
    );
  },
};

export const AutoFocus: Story = {
  render: () => {
    const [code, setCode] = useState(['', '', '', '']);
    return (
      <div>
        <p style={{ marginBottom: '16px', textAlign: 'center', color: '#666' }}>
          First input is automatically focused on mount
        </p>
        <SmsCodeInput
          value={code}
          onChange={setCode}
        />
      </div>
    );
  },
};

export const DifferentLengths: Story = {
  render: () => {
    const [code4, setCode4] = useState(['', '', '', '']);
    const [code5, setCode5] = useState(['', '', '', '', '']);
    const [code6, setCode6] = useState(['', '', '', '', '', '']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <p style={{ marginBottom: '8px', textAlign: 'center' }}>4 digits:</p>
          <SmsCodeInput value={code4} onChange={setCode4} length={4} />
        </div>
        <div>
          <p style={{ marginBottom: '8px', textAlign: 'center' }}>5 digits:</p>
          <SmsCodeInput value={code5} onChange={setCode5} length={5} />
        </div>
        <div>
          <p style={{ marginBottom: '8px', textAlign: 'center' }}>6 digits:</p>
          <SmsCodeInput value={code6} onChange={setCode6} length={6} />
        </div>
      </div>
    );
  },
};
