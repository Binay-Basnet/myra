import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import { CalendarBuilderDate, TDateState } from '../../types/date';
import { ad2bs, bs2ad } from '../../utils/ad-bs-converter';
import { isSameDay } from '../../utils/calendar-builder';
import nepaliCalendarBuilder from '../../utils/nepali-calendar-builder';

interface ICalendarBase {
  onDateChange?: (newState: TDateState) => void;

  dateState: TDateState;
  setDateState: React.Dispatch<React.SetStateAction<TDateState>>;
}

export const CalendarBaseNepali = ({ dateState, setDateState, onDateChange }: ICalendarBase) => {
  const getCalendarDates = () => {
    const { bs, current } = dateState;
    const { month, year } = bs;

    const currentDate = current || new Date();

    const currentBs = ad2bs(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate?.getDate()
    );

    const calendarMonth = month || currentBs.month;
    const calendarYear = year || currentBs.year;
    return nepaliCalendarBuilder(calendarMonth, calendarYear);
  };

  const onDayClick = (date: CalendarBuilderDate) => {
    const ad = bs2ad(date.year, +date.month, +date.day);

    if (onDateChange) {
      onDateChange({
        today: dateState.today,
        current: new Date(ad.year, +ad.month - 1, +ad.day),
        bs: {
          year: date.year,
          month: +date.month,
          day: +date.day,
          dayOfWeek: date.dayOfWeek,
        },
        ad,
      });
    }

    setDateState((prevState) => ({
      ...prevState,
      current: new Date(ad.year, +ad.month - 1, +ad.day),
      bs: {
        year: date.year,
        month: +date.month,
        day: +date.day,
        dayOfWeek: date.dayOfWeek,
      },
      ad,
    }));
  };

  return (
    <Grid templateColumns="repeat(7, 1fr)" rowGap="s4" w="100%" placeItems="center">
      {getCalendarDates().map((calendarDate) => {
        const adDate = bs2ad(calendarDate.year, +calendarDate.month, +calendarDate.day);
        const date = new Date(adDate.year, adDate.month - 1, adDate.day);

        return (
          <GridItem
            cursor="pointer"
            borderRadius="br2"
            _hover={{
              bg: isSameDay(date, dateState.current ?? new Date()) ? 'primary.500' : 'gray.100',
            }}
            bg={isSameDay(date, dateState.current ?? new Date()) ? 'primary.500' : 'transparent'}
            color={
              isSameDay(date, dateState.current ?? new Date())
                ? '#fff'
                : Number(calendarDate.month) === dateState.bs.month
                ? 'gray.900'
                : 'gray.200'
            }
            w="40px"
            h="40px"
            onClick={() => onDayClick(calendarDate)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {calendarDate.day}
          </GridItem>
        );
      })}
    </Grid>
  );
};
