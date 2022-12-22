import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { Icon } from '@chakra-ui/icons';
import { Box, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';

import { CalendarBase } from '../CalendarBase';
import { CalendarWeek } from '../CalendarWeek';
import { MonthSelect } from '../MonthSelect';
import { TopButtonWrapper } from '../wrappers/TopButtonWrapper';
import { YearSelect } from '../YearSelect/YearSelect';
import { useMonthNavigateHook } from '../../hooks/useMonthNavigateHook';
import { TDateState } from '../../types/date';
import { ad2bs } from '../../utils/ad-bs-converter';
import { isDate } from '../../utils/calendar-builder';

interface ICalendar {
  calendarType: 'AD' | 'BS';
  locale: 'en' | 'ne';
  onDateChange?: (newState: TDateState) => void;
  value: TDateState | null;

  minDate?: Date;
  maxDate?: Date;
}

const adDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  dayOfWeek: new Date().getDay(),
};

const bsDate = ad2bs(adDate.year, adDate.month, adDate.day);

const todayDate = {
  current: null,
  today: new Date(),
  ad: adDate,
  bs: bsDate,
};

export const Calendar = ({
  calendarType = 'AD',
  value,
  onDateChange,
  locale,
  minDate,
  maxDate,
}: ICalendar) => {
  const [dateState, setDateState] = useState<TDateState>(value || todayDate);
  const [internalCalendarType, setInternalCalendarType] = useState(calendarType);

  const { gotoPreviousMonth, gotToNextMonth } = useMonthNavigateHook({
    calendarType: internalCalendarType,
    setState: setDateState,
    state: dateState,
  });

  const addDateToState = (date?: Date | null) => {
    const isDateObject = isDate(date);
    const _date = isDateObject && date ? date : new Date();

    const bsDateCurrent = ad2bs(_date.getFullYear(), _date.getMonth() + 1, _date.getDate());

    if (date) {
      setDateState({
        current: date,
        today: new Date(),
        ad: {
          year: _date.getFullYear(),
          month: _date.getMonth() + 1,
          day: _date.getDate(),
          dayOfWeek: _date.getDay(),
        },
        bs: bsDateCurrent,
      });
    }
  };

  useEffect(() => {
    setInternalCalendarType(calendarType);
  }, [calendarType]);

  useEffect(() => {
    addDateToState(value?.current);
  }, [value?.current?.toString()]);

  return (
    <Box display="flex" gap="s32">
      <Box
        w="350px"
        borderRadius="br2"
        display="flex"
        flexDir="column"
        h="100%"
        boxShadow="E1"
        bg="white"
        p="s16"
        gap="s16"
      >
        <Box display="flex" gap="s8">
          <TopButtonWrapper onClick={gotoPreviousMonth}>
            <Icon as={BsChevronLeft} />
          </TopButtonWrapper>

          <TopButtonWrapper onClick={gotToNextMonth}>
            <Icon as={BsChevronRight} />
          </TopButtonWrapper>

          <MonthSelect
            locale={locale}
            calendarType={internalCalendarType}
            state={dateState}
            setState={setDateState}
          />

          <YearSelect
            locale={locale}
            calendarType={internalCalendarType}
            state={dateState}
            setState={setDateState}
          />

          <Popover placement="bottom-end">
            {({ onClose, isOpen }) => (
              <>
                <PopoverTrigger>
                  <Box
                    w="s32"
                    h="s32"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    bg={isOpen ? 'gray.100' : 'transparent'}
                    cursor="pointer"
                    borderRadius="br1"
                    as="button"
                    type="button"
                    _hover={{ bg: 'gray.100' }}
                  >
                    <Icon as={IoSettingsOutline} />
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  border="none"
                  marginTop="-6px"
                  borderRadius="br1"
                  boxShadow="E2"
                  w="80px"
                  p="s4"
                >
                  <Box
                    px="s10"
                    py="s4"
                    borderRadius="br2"
                    cursor="pointer"
                    _hover={{ bg: internalCalendarType === 'AD' ? 'primary.5000' : 'gray.100' }}
                    color={internalCalendarType === 'AD' ? 'white' : 'gray.500'}
                    bg={internalCalendarType === 'AD' ? 'primary.500' : 'transparent'}
                    onClick={() => {
                      onClose();
                      setInternalCalendarType('AD');
                    }}
                  >
                    AD
                  </Box>

                  <Box
                    px="s10"
                    py="s4"
                    borderRadius="br2"
                    cursor="pointer"
                    _hover={{ bg: internalCalendarType === 'BS' ? 'primary.5000' : 'gray.100' }}
                    color={internalCalendarType === 'BS' ? 'white' : 'gray.500'}
                    bg={internalCalendarType === 'BS' ? 'primary.500' : 'transparent'}
                    onClick={() => {
                      onClose();
                      setInternalCalendarType('BS');
                    }}
                  >
                    BS
                  </Box>
                </PopoverContent>
              </>
            )}
          </Popover>
        </Box>

        <Box display="flex" flexDir="column" gap="s4" fontSize="s2" alignItems="center" w="100%">
          <CalendarWeek locale={locale} calendarType={internalCalendarType} />
          <CalendarBase
            maxDate={maxDate}
            minDate={minDate}
            dateState={dateState}
            setDateState={setDateState}
            locale={locale}
            calendarType={internalCalendarType}
            onDateChange={onDateChange}
          />
        </Box>
      </Box>
    </Box>
  );
};
