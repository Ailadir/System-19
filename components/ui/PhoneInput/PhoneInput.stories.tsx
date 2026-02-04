import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from './PhoneInput';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof PhoneInput> = {
  title: 'Components/Form/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { phone: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PhoneInput name="phone" />
        </div>
      </FormProvider>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { phone: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PhoneInput
            name="phone"
            label="Phone Number"
            placeholder="+7 123 456 78-90"
          />
        </div>
      </FormProvider>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { phone: '' } });
    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px' }}>
          <PhoneInput
            name="phone"
            label="Mobile Phone"
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^\+7\d{10}$/,
                message: 'Invalid phone format',
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

export const Prefilled: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: { phone: '+79123456789' },
    });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PhoneInput name="phone" label="Phone Number" />
        </div>
      </FormProvider>
    );
  },
};

export const RoundedVariant: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { phone: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PhoneInput
            name="phone"
            label="Phone Number (Rounded)"
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
        phoneXsmall: '',
        phoneSmall: '',
        phoneMedium: '',
        phoneLarge: '',
      },
    });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PhoneInput name="phoneXsmall" label="X-Small" size="xsmall" />
          <PhoneInput name="phoneSmall" label="Small" size="small" />
          <PhoneInput name="phoneMedium" label="Medium" size="medium" />
          <PhoneInput name="phoneLarge" label="Large" size="large" />
        </div>
      </FormProvider>
    );
  },
};

export const ContactForm: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        name: '',
        phone: '',
        email: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <form
          style={{
            width: '350px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
          }}
        >
          <h2 style={{ margin: '0 0 8px 0' }}>Contact Information</h2>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
            <input
              {...methods.register('name', { required: 'Name is required' })}
              type="text"
              placeholder="John Doe"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <PhoneInput
            name="phone"
            label="Phone Number"
            rules={{ required: 'Phone is required' }}
          />

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Email (Optional)</label>
            <input
              {...methods.register('email')}
              type="email"
              placeholder="john@example.com"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <button
            type="submit"
            onClick={methods.handleSubmit((data) =>
              alert(`Contact saved:\n${JSON.stringify(data, null, 2)}`)
            )}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Save Contact
          </button>
        </form>
      </FormProvider>
    );
  },
};
