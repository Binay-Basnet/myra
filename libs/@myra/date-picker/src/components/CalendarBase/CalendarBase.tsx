import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import { CalendarBuilderDate, TDateState } from '../../types/date';
import { ad2bs } from '../../utils/ad-bs-converter';
import calendarBuilder, { isSameDay, isSameMonth } from '../../utils/calendar-builder';

interface ICalendarBase {
  onDateChange?: (newState: TDateState) => void;

  dateState: TDateState;
  setDateState: React.Dispatch<React.SetStateAction<TDateState>>;
}

export const CalendarBase = ({ dateState, setDateState, onDateChange }: ICalendarBase) => {
  const currentDate = new Date(dateState.ad.year, dateState.ad.month - 1);

  const getCalendarDates = () => {
    const { ad, current } = dateState;
    const { month, year } = ad;

    const calendarMonth = month || Number(current?.getMonth()) + 1;
    const calendarYear = year || current?.getFullYear();
    return calendarBuilder(calendarMonth, calendarYear);
  };

  const onDayClick = (date: CalendarBuilderDate) => {
    const bs = ad2bs(date.year, +date.month, +date.day);

    if (onDateChange) {
      onDateChange({
        today: dateState.today,
        current: new Date(date.year, +date.month - 1, +date.day),
        ad: {
          year: date.year,
          month: +date.month,
          day: +date.day,
          dayOfWeek: date.dayOfWeek,
        },
        bs,
      });
    }

    setDateState((prevState) => ({
      ...prevState,
      current: new Date(date.year, +date.month - 1, +date.day),
      ad: {
        year: date.year,
        month: +date.month,
        day: +date.day,
        dayOfWeek: date.dayOfWeek,
      },
      bs,
    }));
  };

  return (
    <Grid templateColumns="repeat(7, 1fr)" rowGap="s4" w="100%" placeItems="center">
      {getCalendarDates().map((calendarDate) => (
        <GridItem
          key={`${calendarDate.year}-${calendarDate.month}-${calendarDate.day}`}
          cursor="pointer"
          _hover={{
            bg: isSameDay(getJSDate(calendarDate), dateState.current ?? new Date())
              ? 'primary.500'
              : 'gray.200',
          }}
          w="40px"
          borderRadius="br2"
          onClick={() => onDayClick(calendarDate)}
          h="40px"
          bg={
            isSameDay(getJSDate(calendarDate), dateState.current ?? new Date())
              ? 'primary.500'
              : 'transparent'
          }
          color={
            isSameDay(getJSDate(calendarDate), dateState.current ?? new Date())
              ? '#fff'
              : isSameMonth(getJSDate(calendarDate), currentDate)
              ? 'gray.900'
              : 'gray.200'
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {calendarDate.day}
        </GridItem>
      ))}
    </Grid>
  );
};

const getJSDate = (date: CalendarBuilderDate) => new Date(date.year, +date.month - 1, +date.day);
