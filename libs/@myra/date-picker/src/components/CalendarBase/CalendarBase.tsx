import React from 'react';
import { Grid } from '@chakra-ui/react';

import { CalendarCell } from '../CalendarCell/CalendarCell';
import { TDateState } from '../../types/date';
import { ad2bs } from '../../utils/ad-bs-converter';
import calendarBuilder from '../../utils/calendar-builder';
import { convertDate } from '../../utils/functions';
import nepaliCalendarBuilder from '../../utils/nepali-calendar-builder';

interface ICalendarBase {
  onDateChange?: (newState: TDateState) => void;
  dateState: TDateState;
  setDateState: React.Dispatch<React.SetStateAction<TDateState>>;
  name?: string;

  locale: 'en' | 'ne';
  calendarType: 'AD' | 'BS';
  minDate?: Date;
  maxDate?: Date;
  baseDate?: Date;
}

export const CalendarBase = ({
  dateState,
  setDateState,
  onDateChange,
  locale,
  name,
  calendarType,
  minDate,
  maxDate,
  baseDate,
}: ICalendarBase) => {
  const getCalendarDates = () => {
    const { ad, current } = dateState;
    const { month, year } = ad;

    const calendarMonth = month || Number(current?.getMonth()) + 1;
    const calendarYear = year || current?.getFullYear();
    return calendarBuilder(calendarMonth, calendarYear);
  };

  const getNepaliCalendarDates = () => {
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

  return (
    <Grid templateColumns="repeat(7, 1fr)" rowGap="s4" w="100%" placeItems="center">
      {calendarType === 'AD'
        ? getCalendarDates().map((calendarDate) => (
            <CalendarCell
              maxDate={maxDate}
              minDate={minDate}
              testid={`${name}-${convertDate(calendarDate, 'AD')?.en}`}
              locale={locale}
              calendarType="AD"
              dateState={dateState}
              onDateStateChange={(newDate) => {
                if (onDateChange) {
                  onDateChange(newDate);
                  setDateState(newDate);
                } else {
                  setDateState(newDate);
                }
              }}
              calendarDate={calendarDate}
              baseDate={baseDate}
            />
          ))
        : // JS
          getNepaliCalendarDates().map((calendarDate) => (
            <CalendarCell
              maxDate={maxDate}
              minDate={minDate}
              locale={locale}
              testid={`${name}-${convertDate(calendarDate, 'BS')?.en}`}
              calendarType="BS"
              dateState={dateState}
              onDateStateChange={(newDate) => {
                if (onDateChange) {
                  onDateChange(newDate);
                  setDateState(newDate);
                } else {
                  setDateState(newDate);
                }
              }}
              calendarDate={calendarDate}
            />
          ))}
    </Grid>
  );
};
