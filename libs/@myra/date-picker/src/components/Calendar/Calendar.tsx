import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { Icon } from '@chakra-ui/icons';
import { Box, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';

import { CalendarBase } from '../CalendarBase';
import { CalendarBaseNepali } from '../CalendarBaseNepali';
import { CalendarWeek } from '../CalendarWeek';
import { MonthSelect } from '../MonthSelect';
import { TopButtonWrapper } from '../wrappers/TopButtonWrapper';
import { YearSelect } from '../YearSelect/YearSelect';
import { TDateState } from '../../types/date';
import { ad2bs, bs2ad } from '../../utils/ad-bs-converter';
import { getNextMonth, getPreviousMonth, isDate } from '../../utils/calendar-builder';

interface ICalendar {
  calendarType: 'AD' | 'BS';
  onDateChange?: (newState: TDateState) => void;
  value: TDateState | null;
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

export const Calendar = ({ calendarType = 'AD', value, onDateChange }: ICalendar) => {
  const [dateState, setDateState] = useState<TDateState>(value ?? todayDate);
  const [internalCalendarType, setInternalCalendarType] = useState(calendarType);

  console.log(value);

  const gotoPreviousMonth = () => {
    if (internalCalendarType === 'BS') {
      const { bs } = dateState;
      const { year, month, day } = bs;
      const previousMonth = getPreviousMonth(month, year);
      const ad = bs2ad(previousMonth.year, previousMonth.month, day);

      setDateState((prev) => ({
        ...prev,
        bs: {
          ...prev.bs,
          month: previousMonth.month,
          year: previousMonth.year,
        },
        ad,
      }));
      return;
    }

    const { ad } = dateState;
    const { year, month, day } = ad;
    const previousMonth = getPreviousMonth(month, year);
    const bs = ad2bs(previousMonth.year, previousMonth.month, day);

    setDateState((prev) => ({
      ...prev,
      ad: {
        ...prev.ad,
        month: previousMonth.month,
        year: previousMonth.year,
      },
      bs,
    }));
  };

  const gotToNextMonth = () => {
    if (internalCalendarType === 'BS') {
      const { bs } = dateState;
      const { year, month, day } = bs;
      // this.setState(getPreviousMonth(month, year));
      const nexMonth = getNextMonth(month, year);
      const ad = ad2bs(nexMonth.year, nexMonth.month, day);

      setDateState((prev) => ({
        ...prev,
        bs: {
          ...prev.bs,
          month: nexMonth.month,
          year: nexMonth.year,
        },
        ad,
      }));
      return;
    }

    const { ad } = dateState;
    const { year, month, day } = ad;
    // this.setState(getPreviousMonth(month, year));
    const nexMonth = getNextMonth(month, year);
    const bs = ad2bs(nexMonth.year, nexMonth.month, day);

    setDateState((prev) => ({
      ...prev,
      ad: {
        ...prev.ad,
        month: nexMonth.month,
        year: nexMonth.year,
      },
      bs,
    }));
  };

  const addDateToState = (date?: Date | null) => {
    const isDateObject = isDate(date);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _date = isDateObject && date ? date : new Date();

    const bsDateCurrent = ad2bs(_date.getFullYear(), _date.getMonth() + 1, _date.getDate());

    setDateState({
      current: null,
      today: new Date(),
      ad: {
        year: _date.getFullYear(),
        month: _date.getMonth() + 1,
        day: _date.getDate(),
        dayOfWeek: _date.getDay(),
      },
      bs: bsDateCurrent,
    });
  };

  // Todo: Redo these useffects

  useEffect(() => {
    addDateToState(value?.current);
  }, []);

  useEffect(() => {
    setInternalCalendarType(calendarType);
  }, [calendarType]);

  useEffect(() => {
    if (value) {
      setDateState(value);
    }
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
            calendarType={internalCalendarType}
            month={internalCalendarType === 'BS' ? dateState.bs.month : dateState.ad.month}
            onChange={(newMonth) => {
              if (internalCalendarType === 'AD') {
                const bs = ad2bs(dateState.ad.year, newMonth, dateState.ad.day);

                setDateState((prev) => ({
                  ...prev,
                  bs,
                  ad: {
                    ...prev.ad,
                    month: newMonth,
                  },
                }));
              } else {
                const ad = bs2ad(dateState.bs.year, newMonth, dateState.bs.day);

                setDateState((prev) => ({
                  ...prev,
                  bs: {
                    ...prev.bs,
                    month: newMonth,
                  },
                  ad,
                }));
              }
            }}
          />

          <YearSelect
            calendarType={internalCalendarType}
            year={internalCalendarType === 'BS' ? dateState.bs.year : dateState.ad.year}
            onChange={(newYear) => {
              if (internalCalendarType === 'AD') {
                const bs = ad2bs(newYear, dateState.ad.month, dateState.ad.day);

                setDateState((prev) => ({
                  ...prev,
                  bs,
                  ad: {
                    ...prev.ad,
                    year: newYear,
                  },
                }));
              } else {
                const ad = bs2ad(newYear, dateState.bs.month, dateState.bs.day);

                setDateState((prev) => ({
                  ...prev,
                  ad,
                  bs: {
                    ...prev.bs,
                    year: newYear,
                  },
                }));
              }
            }}
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
          <CalendarWeek locale="en" calendarType={internalCalendarType} />
          {internalCalendarType === 'AD' ? (
            <CalendarBase
              onDateChange={onDateChange}
              dateState={dateState}
              setDateState={setDateState}
            />
          ) : (
            <CalendarBaseNepali
              onDateChange={onDateChange}
              dateState={dateState}
              setDateState={setDateState}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
