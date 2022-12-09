import React from 'react';
import { usePress } from 'react-aria';
import { Button } from '@chakra-ui/react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { CalendarBuilderDate, TDateState } from '../../types/date';
import { isSameDay, isSameMonth } from '../../utils/calendar-builder';
import { ordinal } from '../../utils/constants';

dayjs.extend(isBetween);

interface ICalendarCellProps {
  locale: 'en' | 'ne';
  cellState: CalendarBuilderDate;
  rangeStartDate: CalendarBuilderDate | null;
  setRangeStartDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

  rangeEndDate: CalendarBuilderDate | null;
  setRangeEndDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

  hoveredDate: CalendarBuilderDate | null;
  setHoveredDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;
  gridState: TDateState;
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
  gridState,
}: ICalendarCellProps) => {
  const isInvalidDate = !isSameMonth(getJSDate(cellState), gridState.current ?? new Date());

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
      ? dayjs(getJSDate(cellState)).isBetween(
          getJSDate(rangeStartDate),
          getJSDate(rangeEndDate ?? hoveredDate),
          'day',
          '[]'
        )
      : null;

  const _isRangeStart =
    rangeStartDate && isSameDay(getJSDate(rangeStartDate), getJSDate(cellState));
  const _isRangeEnd = rangeEndDate && isSameDay(getJSDate(rangeEndDate), getJSDate(cellState));

  const isRangeStart =
    rangeStartDate &&
    hoveredDate &&
    dayjs(getJSDate(rangeStartDate)).diff(getJSDate(rangeEndDate ?? hoveredDate)) <= 0
      ? _isRangeStart
      : _isRangeEnd;

  const isRangeEnd =
    rangeStartDate &&
    hoveredDate &&
    dayjs(getJSDate(rangeStartDate)).diff(getJSDate(rangeEndDate ?? hoveredDate)) >= 0
      ? _isRangeStart
      : _isRangeEnd;

  const isRangeStartOrEnd = isRangeStart || isRangeEnd;
  // const isToday = isSameDay(getJSDate(cellState), new Date());

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

const getJSDate = (date: CalendarBuilderDate) => new Date(date.year, +date.month - 1, +date.day);
