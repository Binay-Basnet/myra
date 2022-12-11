import { Editable, EditableInput, EditablePreview, Input } from '@chakra-ui/react';

interface IMonthSegment {
  month: string | null;
  onMonthChange: (newMonth: string) => void;
}

export const MonthSegment = ({ month, onMonthChange }: IMonthSegment) => (
  <Editable
    as="span"
    id="month"
    value={month || ''}
    onChange={(e) => {
      if (e.length > 2) {
        document.getElementById('day')?.focus();
      } else {
        onMonthChange(e);
      }
    }}
    onKeyDown={(e) => {
      if (e.key === 'ArrowUp' && Number(month) === 12) {
        onMonthChange('00');
      }
      if (e.key === 'ArrowDown' && Number(month) === 1) {
        onMonthChange('13');
      }
    }}
    placeholder="MM"
  >
    <EditablePreview id="month" py={0} />
    <Input
      id="month"
      as={EditableInput}
      min={1}
      max={12}
      type="number"
      variant="unstyled"
      placeholder="MM"
      maxW="2ch"
      py={0}
      onBlur={() => {
        if (month) {
          onMonthChange(Number(month) < 10 ? month?.padStart(2, '0') : month);
        }
      }}
      userSelect="none"
      _focus={{ bg: 'gray.200' }}
      _focusVisible={{ boxShadow: 'none' }}
    />
  </Editable>
);
