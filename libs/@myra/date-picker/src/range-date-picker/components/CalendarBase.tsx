import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { CalendarCell } from './CalendarCell';
import { CalendarWeek } from '../../components/CalendarWeek';
import { CalendarBuilderDate, TDateState } from '../../types/date';
import { ad2bs } from '../../utils/ad-bs-converter';
import calendarBuilder, { getNextMonth } from '../../utils/calendar-builder';
import nepaliCalendarBuilder from '../../utils/nepali-calendar-builder';

export interface CalendarBaseProps {
  calendarType?: 'AD' | 'BS';
  locale?: 'en' | 'ne';
  state: TDateState;
  offsetMonth?: number;

  rangeStartDate: CalendarBuilderDate | null;
  setRangeStartDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

  rangeEndDate: CalendarBuilderDate | null;
  setRangeEndDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

  hoveredDate: CalendarBuilderDate | null;
  setHoveredDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;
}

export const CalendarBase = ({
  state,
  calendarType = 'AD',
  offsetMonth = 0,
  locale = 'en',
  ...rest
}: CalendarBaseProps) => {
  const getCalendarDates = () => {
    const { ad, current } = state;
    const { month, year } = ad;

    const calendarMonth = month || Number(current?.getMonth()) + 1;
    const calendarYear = year || Number(current?.getFullYear());

    if (offsetMonth === 1) {
      const nextMonth = getNextMonth(calendarMonth, calendarYear);
      return calendarBuilder(nextMonth.month, nextMonth.year);
    }
    return calendarBuilder(calendarMonth, calendarYear);
  };

  const getNepaliCalendarDates = () => {
    const { bs, current } = state;
    const { month, year } = bs;

    const currentDate = current || new Date();

    const currentBs = ad2bs(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate?.getDate()
    );

    const calendarMonth = month || currentBs.month;
    const calendarYear = year || currentBs.year;

    if (offsetMonth === 1) {
      const nextMonth = getNextMonth(calendarMonth, calendarYear);
      return nepaliCalendarBuilder(nextMonth.month, nextMonth.year);
    }

    return nepaliCalendarBuilder(calendarMonth, calendarYear);
  };

  return (
    <Box w="304px" display="flex" flexDir="column" gap="s4" fontSize="s2" alignItems="center">
      <CalendarWeek locale={locale} calendarType={calendarType} />

      <Grid templateColumns="repeat(7, 1fr)" rowGap="s4" w="100%" placeItems="center">
        {calendarType === 'AD'
          ? getCalendarDates().map((calendarDate) => (
              <CalendarCell
                calendarType="AD"
                locale={locale}
                gridState={{
                  ...state,
                  current:
                    offsetMonth === 1
                      ? dayjs(new Date(state.ad.year, state.ad.month - 1))
                          .add(1, 'month')
                          .toDate()
                      : new Date(state.ad.year, state.ad.month - 1),
                }}
                cellState={calendarDate}
                {...rest}
              />
            ))
          : getNepaliCalendarDates().map((calendarDate) => (
              <CalendarCell
                locale={locale}
                calendarType="BS"
                gridState={{
                  ...state,
                  current:
                    offsetMonth === 1
                      ? dayjs(new Date(state.ad.year, state.ad.month - 1))
                          .add(1, 'month')
                          .toDate()
                      : new Date(state.ad.year, state.ad.month - 1),
                }}
                cellState={calendarDate}
                activeMonth={
                  offsetMonth === 1
                    ? getNextMonth(state.bs.month, state.bs.year).month
                    : state.bs.month
                }
                {...rest}
              />
            ))}
      </Grid>
    </Box>
  );
};
