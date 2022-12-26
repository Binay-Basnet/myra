import React from 'react';
import { usePress } from 'react-aria';
import { Button } from '@chakra-ui/react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { CalendarBuilderDate, TDateState } from '../../types/date';
import { isSameDay, isSameMonth } from '../../utils/calendar-builder';
import { ordinal } from '../../utils/constants';
import { getJSDate } from '../../utils/functions';

dayjs.extend(isBetween);

interface ICalendarCellProps {
  locale: 'en' | 'ne';
  calendarType: 'AD' | 'BS';

  cellState: CalendarBuilderDate;
  rangeStartDate: CalendarBuilderDate | null;
  setRangeStartDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

  rangeEndDate: CalendarBuilderDate | null;
  setRangeEndDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

  hoveredDate: CalendarBuilderDate | null;
  setHoveredDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;
  gridState: TDateState;

  activeMonth?: number;
}

export const CalendarCell = ({
  locale,
  cellState,
  rangeStartDate,
  rangeEndDate,
  setRangeEndDate,
  setRangeStartDate,
  hoveredDate,
  setHoveredDate,
  calendarType,
  gridState,
  activeMonth,
}: ICalendarCellProps) => {
  const isInvalidDate =
    calendarType === 'AD'
      ? !isSameMonth(getJSDate(cellState), gridState.current ?? new Date())
      : activeMonth
      ? Number(cellState.month) !== activeMonth
      : false;

  const { pressProps } = usePress({
    preventFocusOnPress: true,
    isDisabled: isInvalidDate,

    // onPressStart: () => {
    //
    //     setRangeStartDate(cellState);
    //
    // },
    // onPressUp: () => {
    //
    //     setRangeEndDate(cellState);
    //     setIsDragging(false);
    //
    // },

    onPress: () => {
      if (rangeStartDate && rangeEndDate) {
        setRangeStartDate(cellState);
        setRangeEndDate(null);
        return;
      }
      if (rangeStartDate && !rangeEndDate) {
        setRangeEndDate(cellState);
        return;
      }

      if (!rangeStartDate && !rangeEndDate) {
        setRangeStartDate(cellState);
        setRangeEndDate(null);
        setHoveredDate(cellState);
      }
    },
  });

  const isDateInRange =
    rangeStartDate && hoveredDate
      ? dayjs(getJSDate(cellState, calendarType)).isBetween(
          getJSDate(rangeStartDate, calendarType),
          getJSDate(rangeEndDate ?? hoveredDate, calendarType),
          'day',
          '[]'
        )
      : null;

  const _isRangeStart =
    rangeStartDate &&
    isSameDay(getJSDate(rangeStartDate, calendarType), getJSDate(cellState, calendarType));
  const _isRangeEnd =
    rangeEndDate &&
    isSameDay(getJSDate(rangeEndDate, calendarType), getJSDate(cellState, calendarType));

  const isRangeStart =
    rangeStartDate &&
    hoveredDate &&
    dayjs(getJSDate(rangeStartDate, calendarType)).diff(
      getJSDate(rangeEndDate ?? hoveredDate, calendarType)
    ) <= 0
      ? _isRangeStart
      : _isRangeEnd;

  const isRangeEnd =
    rangeStartDate &&
    hoveredDate &&
    dayjs(getJSDate(rangeStartDate, calendarType)).diff(
      getJSDate(rangeEndDate ?? hoveredDate, calendarType)
    ) >= 0
      ? _isRangeStart
      : _isRangeEnd;

  const isRangeStartOrEnd = isRangeStart || isRangeEnd;

  return (
    <Button
      type="button"
      variant="unstyled"
      fontWeight="400"
      fontSize="s2"
      isDisabled={isInvalidDate}
      userSelect="none"
      w={isDateInRange ? '100%' : '40px'}
      h="40px"
      borderRadius={isDateInRange ? '0px' : 'br2'}
      borderLeftRadius={isRangeStart ? 'br2' : '0'}
      borderRightRadius={isRangeEnd ? 'br2' : '0'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onMouseMove={() => {
        if (rangeStartDate) {
          setHoveredDate(cellState);
        }
      }}
      bg={
        isInvalidDate && isDateInRange
          ? 'primary.100'
          : isRangeStartOrEnd
          ? 'primary.500'
          : isDateInRange
          ? 'primary.100'
          : 'transparent'
      }
      color={isInvalidDate ? 'gray.400' : isRangeStartOrEnd ? 'white' : 'gray.700'}
      {...pressProps}
    >
      {locale === 'ne' ? ordinal(cellState.day) : cellState.day}
    </Button>
  );
};
