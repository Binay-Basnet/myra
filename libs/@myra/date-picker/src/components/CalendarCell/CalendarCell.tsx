import { Button } from '@chakra-ui/react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { CalendarBuilderDate, TDateState } from '../../types/date';
import { ad2bs, bs2ad } from '../../utils/ad-bs-converter';
import { isSameDay, isSameMonth } from '../../utils/calendar-builder';
import { ordinal } from '../../utils/constants';
import { getJSDate } from '../../utils/functions';

dayjs.extend(isBetween);

interface ICalendarCellProps {
  locale: 'en' | 'ne';
  calendarType: 'AD' | 'BS';
  dateState: TDateState;
  onDateStateChange: (newDate: TDateState) => void;
  calendarDate: CalendarBuilderDate;

  minDate?: Date;
  maxDate?: Date;
}

export const CalendarCell = ({
  calendarType,
  dateState,
  locale,
  calendarDate,
  onDateStateChange,
  minDate = new Date('1921-01-01'),
  maxDate = new Date('2042-12-31'),
}: ICalendarCellProps) => {
  const isInvalid =
    minDate && maxDate
      ? !dayjs(getJSDate(calendarDate, calendarType)).isBetween(minDate, maxDate, 'day', '[]')
      : false;

  const isNotSameMonth =
    calendarType === 'AD'
      ? isSameMonth(getJSDate(calendarDate), new Date(dateState.ad.year, dateState.ad.month - 1))
      : Number(calendarDate.month) === dateState.bs.month;

  const isToday = isSameDay(getJSDate(calendarDate, calendarType));

  const isSelectedDate = dateState.current
    ? isSameDay(getJSDate(calendarDate, calendarType), dateState.current)
    : false;

  const onDayClick = (date: CalendarBuilderDate) => {
    if (calendarType === 'AD') {
      const bs = ad2bs(date.year, +date.month, +date.day);

      onDateStateChange({
        today: new Date(),
        current: new Date(date.year, +date.month - 1, +date.day),
        ad: {
          year: date.year,
          month: +date.month,
          day: +date.day,
          dayOfWeek: date.dayOfWeek,
        },
        bs,
      });
    } else {
      const ad = bs2ad(date.year, +date.month, +date.day);

      onDateStateChange({
        today: new Date(),
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
  };
  return (
    <Button
      type="button"
      variant="unstyled"
      fontWeight="400"
      fontSize="s2"
      w="40px"
      h="40px"
      cursor="pointer"
      borderRadius="br2"
      border={isToday ? '1px' : 'none'}
      borderColor={isToday ? 'primary.500' : 'none'}
      userSelect="none"
      _hover={{
        bg: isSelectedDate ? 'primary.500' : 'gray.100',
      }}
      isDisabled={isInvalid}
      bg={isSelectedDate ? 'primary.500' : 'transparent'}
      color={!isNotSameMonth ? 'gray.200' : isSelectedDate ? 'white' : 'gray.900'}
      onClick={() => onDayClick(calendarDate)}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {locale === 'ne' ? ordinal(calendarDate.day) : calendarDate.day}
    </Button>
  );
};
