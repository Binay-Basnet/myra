import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Icon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

import { CalendarBase } from '../CalendarBase';
import { MonthSelect } from '../../../components/MonthSelect';
import { TopButtonWrapper } from '../../../components/wrappers/TopButtonWrapper';
import { YearSelect } from '../../../components/YearSelect';
import { useMonthNavigateHook } from '../../../hooks/useMonthNavigateHook';
import { CalendarBuilderDate, TDateState } from '../../../types/date';

interface CalendarProps {
  calendarProps: {
    calendarType: 'AD' | 'BS';
    locale?: 'en' | 'ne';
    state: TDateState;
    offsetMonth?: number;
    setState: React.Dispatch<React.SetStateAction<TDateState>>;

    rangeStartDate: CalendarBuilderDate | null;
    setRangeStartDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

    rangeEndDate: CalendarBuilderDate | null;
    setRangeEndDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

    hoveredDate: CalendarBuilderDate | null;
    setHoveredDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;
  };

  nextMonth?: boolean;
}

export const Calendar = ({ calendarProps, nextMonth }: CalendarProps) => {
  const { gotToNextMonth, gotoPreviousMonth } = useMonthNavigateHook({
    state: calendarProps.state,
    setState: calendarProps.setState,
    calendarType: calendarProps.calendarType,
  });

  return (
    <Box px="s16" display="flex" flexDir="column" gap="s8">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDir={nextMonth ? 'row' : 'row-reverse'}
      >
        <YearSelect
          calendarType={calendarProps.calendarType}
          state={calendarProps.state}
          setState={calendarProps.setState}
          showNextYear={nextMonth}
        />
        <Box display="flex" alignItems="center" flexDir={nextMonth ? 'row' : 'row-reverse'}>
          <MonthSelect
            locale={calendarProps.locale}
            calendarType={calendarProps.calendarType}
            state={calendarProps.state}
            setState={calendarProps.setState}
            showNextMonth={nextMonth}
            rightAlignMonth={nextMonth}
          />

          <TopButtonWrapper onClick={nextMonth ? gotToNextMonth : gotoPreviousMonth}>
            <Icon as={nextMonth ? BsChevronRight : BsChevronLeft} />
          </TopButtonWrapper>
        </Box>
      </Box>
      <CalendarBase
        locale={calendarProps.locale}
        offsetMonth={nextMonth ? 1 : undefined}
        {...calendarProps}
      />
    </Box>
  );
};
