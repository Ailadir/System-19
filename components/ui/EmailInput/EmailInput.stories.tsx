import type { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from './EmailInput';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof EmailInput> = {
  title: 'Components/Form/EmailInput',
  component: EmailInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmailInput>;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { email: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <EmailInput
            name="email"
            placeholder="user@example.com"
          />
        </div>
      </FormProvider>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { email: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <EmailInput
            name="email"
            label="Email Address"
            placeholder="user@kidgu.ru"
          />
        </div>
      </FormProvider>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { email: '' } });
    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px' }}>
          <EmailInput
            name="email"
            label="Email"
            placeholder="user@example.com"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email format',
              },
            }}
          />
          <button
            type="submit"
            onClick={methods.handleSubmit((data) => alert(JSON.stringify(data)))}
            style={{
              marginTop: '16px',
              padding: '12px',
              width: '100%',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const RoundedVariant: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { email: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <EmailInput
            name="email"
            label="Email (Rounded)"
            placeholder="user@example.com"
            isRound
          />
        </div>
      </FormProvider>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        emailXsmall: '',
        emailSmall: '',
        emailMedium: '',
        emailLarge: '',
      },
    });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <EmailInput name="emailXsmall" label="X-Small" size="xsmall" />
          <EmailInput name="emailSmall" label="Small" size="small" />
          <EmailInput name="emailMedium" label="Medium" size="medium" />
          <EmailInput name="emailLarge" label="Large" size="large" />
        </div>
      </FormProvider>
    );
  },
};

export const Prefilled: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: { email: 'john.doe@example.com' },
    });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <EmailInput
            name="email"
            label="Email Address"
          />
        </div>
      </FormProvider>
    );
  },
};
