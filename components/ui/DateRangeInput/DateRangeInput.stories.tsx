import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DateRangeInput from './DateRangeInput';

const meta: Meta<typeof DateRangeInput> = {
  title: 'Components/Form/DateRangeInput',
  component: DateRangeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangeInput>;

export const Default: Story = {
  render: () => {
    const [startYear, setStartYear] = useState<number | null>(null);
    const [endYear, setEndYear] = useState<number | null>(null);
    const [isCurrent, setIsCurrent] = useState(false);

    return (
      <div style={{ width: '400px' }}>
        <DateRangeInput
          startYear={startYear}
          endYear={endYear}
          isCurrent={isCurrent}
          onStartYearChange={setStartYear}
          onEndYearChange={setEndYear}
          onCurrentToggle={() => setIsCurrent(!isCurrent)}
          labels={{
            group: 'Date Range',
            start: 'Start Year',
            end: 'End Year',
            current: 'Current',
          }}
        />
      </div>
    );
  },
};

export const EmploymentHistory: Story = {
  render: () => {
    const [startYear, setStartYear] = useState<number | null>(2020);
    const [endYear, setEndYear] = useState<number | null>(2023);
    const [isCurrent, setIsCurrent] = useState(false);

    return (
      <div style={{ width: '400px' }}>
        <DateRangeInput
          startYear={startYear}
          endYear={endYear}
          isCurrent={isCurrent}
          onStartYearChange={setStartYear}
          onEndYearChange={setEndYear}
          onCurrentToggle={() => setIsCurrent(!isCurrent)}
          labels={{
            group: 'Employment Period',
            start: 'Start Year',
            end: 'End Year',
            current: 'I currently work here',
          }}
        />
      </div>
    );
  },
};

export const Education: Story = {
  render: () => {
    const [startYear, setStartYear] = useState<number | null>(2015);
    const [endYear, setEndYear] = useState<number | null>(2019);
    const [isCurrent, setIsCurrent] = useState(false);

    return (
      <div style={{ width: '400px' }}>
        <DateRangeInput
          startYear={startYear}
          endYear={endYear}
          isCurrent={isCurrent}
          onStartYearChange={setStartYear}
          onEndYearChange={setEndYear}
          onCurrentToggle={() => setIsCurrent(!isCurrent)}
          labels={{
            group: 'Education Period',
            start: 'From',
            end: 'To',
            current: 'Still studying',
          }}
        />
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
            <strong>Period:</strong> {startYear || '—'} - {isCurrent ? 'Present' : endYear || '—'}
          </p>
        </div>
      </div>
    );
  },
};

export const WithCurrentToggled: Story = {
  render: () => {
    const [startYear, setStartYear] = useState<number | null>(2021);
    const [endYear, setEndYear] = useState<number | null>(null);
    const [isCurrent, setIsCurrent] = useState(true);

    return (
      <div style={{ width: '400px' }}>
        <DateRangeInput
          startYear={startYear}
          endYear={endYear}
          isCurrent={isCurrent}
          onStartYearChange={setStartYear}
          onEndYearChange={setEndYear}
          onCurrentToggle={() => setIsCurrent(!isCurrent)}
          labels={{
            group: 'Work Experience',
            start: 'Started',
            end: 'Ended',
            current: 'I currently work here',
          }}
        />
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          When &quot;Current&quot; is checked, the end year input is disabled
        </p>
      </div>
    );
  },
};

export const WithErrors: Story = {
  render: () => {
    const [startYear, setStartYear] = useState<number | null>(null);
    const [endYear, setEndYear] = useState<number | null>(null);
    const [isCurrent, setIsCurrent] = useState(false);

    return (
      <div style={{ width: '400px' }}>
        <DateRangeInput
          startYear={startYear}
          endYear={endYear}
          isCurrent={isCurrent}
          onStartYearChange={setStartYear}
          onEndYearChange={setEndYear}
          onCurrentToggle={() => setIsCurrent(!isCurrent)}
          errors={{
            startYear: 'Start year is required',
            endYear: 'End year is required',
          }}
          labels={{
            group: 'Date Range',
            start: 'Start Year',
            end: 'End Year',
            current: 'Current',
          }}
        />
      </div>
    );
  },
};

export const MultipleEntries: Story = {
  render: () => {
    const [entries, setEntries] = useState([
      { start: 2018, end: 2020, current: false },
      { start: 2020, end: null, current: true },
    ]);

    return (
      <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ margin: 0 }}>Work History</h3>

        {entries.map((entry, index) => (
          <div key={index} style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 16px 0' }}>Position {index + 1}</h4>
            <DateRangeInput
              startYear={entry.start}
              endYear={entry.end}
              isCurrent={entry.current}
              onStartYearChange={(year) => {
                const newEntries = [...entries];
                newEntries[index].start = year;
                setEntries(newEntries);
              }}
              onEndYearChange={(year) => {
                const newEntries = [...entries];
                newEntries[index].end = year;
                setEntries(newEntries);
              }}
              onCurrentToggle={() => {
                const newEntries = [...entries];
                newEntries[index].current = !newEntries[index].current;
                setEntries(newEntries);
              }}
              labels={{
                group: 'Employment Period',
                start: 'From',
                end: 'To',
                current: 'Current position',
              }}
            />
          </div>
        ))}

        <button
          onClick={() => setEntries([...entries, { start: 0, end: null, current: false }])}
          style={{
            padding: '12px',
            border: '1px dashed #ccc',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          + Add Another Position
        </button>
      </div>
    );
  },
};
