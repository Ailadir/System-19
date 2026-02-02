import FormInputGroup from '../FormInputGroup';
import Input from '../Input';
import Text from '../Text';
import Toggle from '../Toggle';

import s from './DateRangeInput.module.scss';

export interface DateRangeInputProps {
  startYear: number | null;
  endYear: number | null;
  isCurrent: boolean;
  onStartYearChange: (year: number) => void;
  onEndYearChange: (year: number) => void;
  onCurrentToggle: () => void;
  errors?: {
    startYear?: string;
    endYear?: string;
  };
  labels: {
    group: string;
    start: string;
    end: string;
    current: string;
  };
}

function DateRangeInput({
  startYear,
  endYear,
  isCurrent,
  onStartYearChange,
  onEndYearChange,
  onCurrentToggle,
  errors = {},
  labels,
}: DateRangeInputProps) {
  return (
    <FormInputGroup label={labels.group}>
      <div className={s.yearInputs}>
        <div>
          <Text variant='p5' color='secondary' weight='regular'>
            {labels.start}
          </Text>
          <Input
            name='startYear'
            isRound
            type='text'
            inputMode='numeric'
            placeholder='Год начала'
            value={startYear ? startYear.toString() : ''}
            onChange={(e) => onStartYearChange(Number(e.target.value) || 0)}
            errorText={errors.startYear}
            showError={!!errors.startYear}
            validationState={errors.startYear ? 'error' : 'default'}
          />
        </div>
        <div>
          <Text variant='p5' color='secondary' weight='regular'>
            {labels.end}
          </Text>
          <Input
            name='endYear'
            isRound
            type='text'
            inputMode='numeric'
            placeholder='Год окончания'
            value={endYear ? endYear.toString() : ''}
            onChange={(e) => onEndYearChange(Number(e.target.value) || 0)}
            disabled={isCurrent}
            errorText={errors.endYear}
            showError={!!errors.endYear}
            validationState={errors.endYear ? 'error' : 'default'}
          />
        </div>
      </div>
      <Toggle
        checked={isCurrent}
        onChange={() => onCurrentToggle()}
        label={labels.current}
        className={s.toggleWrapper}
      />
    </FormInputGroup>
  );
}

export default DateRangeInput;
