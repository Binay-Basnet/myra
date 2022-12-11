import { Editable, EditableInput, EditablePreview, Input } from '@chakra-ui/react';

import { maxAdYear, minAdYear } from '../../../utils/constants';

interface IYearSegment {
  year: string | null;
  onYearChange: (newYear: string) => void;
}

export const YearSegment = ({ year, onYearChange }: IYearSegment) => (
  <Editable
    as="span"
    value={year ?? ''}
    onChange={(e) => {
      if (e.length > 4) {
        document.getElementById('month')?.focus();
      } else {
        onYearChange(e);
      }
    }}
    onKeyDown={(e) => {
      if (e.key === 'ArrowUp' && Number(year) === maxAdYear) {
        onYearChange(String(minAdYear - 1));
      }
      if (e.key === 'ArrowDown' && Number(year) === minAdYear) {
        onYearChange(String(maxAdYear + 1));
      }
    }}
    placeholder="YYYY"
  >
    <EditablePreview py={0} />
    <Input
      id="day"
      as={EditableInput}
      type="number"
      maxW="4ch"
      max={maxAdYear}
      min={minAdYear}
      lineHeight={0}
      variant="unstyled"
      placeholder="YYYY"
      py={0}
      userSelect="none"
      _focus={{ bg: 'gray.200' }}
      _focusVisible={{ boxShadow: 'none' }}
    />
  </Editable>
);
