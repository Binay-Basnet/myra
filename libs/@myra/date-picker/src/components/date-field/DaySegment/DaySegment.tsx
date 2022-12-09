import { Editable, EditableInput, EditablePreview, Input } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { DateFieldState } from '../../../types/date';
import { minAdYear } from '../../../utils/constants';

interface IDaySegment {
  date: DateFieldState;
  onDayChange: (newYear: string) => void;
}

const minDay = 1;

export const DaySegment = ({ date, onDayChange }: IDaySegment) => {
  const maxDay = dayjs(
    `${date?.year && Number(date?.year) < minAdYear ? new Date().getFullYear() : date?.year}-${
      date?.month || 1
    }-1`
  ).daysInMonth();

  return (
    <Editable
      as="span"
      id="day"
      value={date?.day ?? ''}
      onChange={(e) => {
        if (e.length > 2) {
          document.getElementById('day')?.focus();
        } else {
          onDayChange(e);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowUp' && Number(date?.day || 1) === maxDay) {
          onDayChange(String(minDay - 1));
        }
        if (e.key === 'ArrowDown' && Number(date?.day || 1) === minDay) {
          onDayChange(String(maxDay + 1));
        }
      }}
      placeholder="DD"
    >
      <EditablePreview py={0} />
      <Input
        as={EditableInput}
        type="number"
        variant="unstyled"
        placeholder="DD"
        maxW="2ch"
        min={minDay}
        max={maxDay}
        py={0}
        onBlur={() => {
          if (date.day) {
            onDayChange(Number(date.day) < 10 ? date.day?.padStart(2, '0') : date.day);
          }
        }}
        userSelect="none"
        _focus={{ bg: 'gray.200' }}
        _focusVisible={{ boxShadow: 'none' }}
      />
    </Editable>
  );
};
