import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { DaySegment } from '../DaySegment';
import { MonthSegment } from '../MonthSegment';
import { YearSegment } from '../YearSegment';
import { DateFieldState } from '../../../types/date';

export const DateField = () => {
  const [state, setState] = useState<DateFieldState>({ year: '2002', month: '06', day: '06' });
  return (
    <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
      <Box
        fontSize="r1"
        bg="white"
        h="s40"
        w="300px"
        px="s12"
        borderRadius="br1"
        boxShadow="E1"
        display="flex"
        alignItems="center"
        gap="s8"
      >
        <DateSegments value={state} onValueChange={(newDate) => setState(newDate)} /> -{' '}
        <DateSegments />
      </Box>
    </Box>
  );
};

interface IDateSegments {
  value?: DateFieldState;
  onValueChange?: (newDate: DateFieldState) => void;
}

export const DateSegments = ({ value, onValueChange }: IDateSegments) => {
  const [state, setState] = useState<DateFieldState>(
    value ?? { year: null, month: null, day: null }
  );

  console.log(value);

  // TODO! Remove this effect
  useEffect(() => {
    if (onValueChange) {
      onValueChange({ year: state?.year, month: state?.month, day: state?.day || null });
    }
  }, [state?.year, state?.month, state?.day]);

  useEffect(() => {
    setState({ year: value?.year || '', month: value?.month || '', day: value?.day || null });
  }, [value?.year, value?.month, value?.day]);

  return (
    <Box display="flex" color="gray.500" fontWeight={400} alignItems="center" gap="s4">
      <YearSegment
        year={state.year}
        onYearChange={(newYear) => {
          setState((prev) => ({ ...prev, year: newYear }));
        }}
      />{' '}
      {' / '}
      <MonthSegment
        month={state.month}
        onMonthChange={(newMonth) => {
          setState((prev) => ({ ...prev, month: newMonth }));
        }}
      />
      {' / '}
      <DaySegment
        date={state}
        onDayChange={(newDay) => {
          setState((prev) => ({ ...prev, day: newDay }));
        }}
      />
    </Box>
  );
};
