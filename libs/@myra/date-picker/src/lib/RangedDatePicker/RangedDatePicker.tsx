import React, { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { CalendarIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { DateSegments } from '../../components/date-field/DateField';
import { MonthSelect } from '../../components/MonthSelect';
import { TopButtonWrapper } from '../../components/wrappers/TopButtonWrapper';
import { YearSelect } from '../../components/YearSelect';
import { useLocale } from '../../locale/useLocale';
import { CalendarBase } from '../../range-date-picker/components/CalendarBase';
import { CalendarBuilderDate, TDateState } from '../../types/date';
import { ad2bs, bs2ad, EachBSYear } from '../../utils/ad-bs-converter';
import { getNextMonth, getPreviousMonth, zeroPad } from '../../utils/calendar-builder';
import {
  calendarData,
  last7Days,
  last30Days,
  ordinal,
  today,
  yesterday,
} from '../../utils/constants';

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

type DateRange = {
  from: {
    date: Date;
    en: string;
    ne: string;
  } | null;
  to: {
    date: Date;
    en: string;
    ne: string;
  } | null;
};

interface IRangeDatePickerProps {
  tillDateStart: Date;
  calendarType: 'AD' | 'BS';
  value: DateRange | undefined;
  locale?: 'en' | 'ne';
  onChange: (newDate: DateRange | undefined) => void;
  label: string;
}

export const RangedDatePicker = ({
  tillDateStart,
  value,
  onChange,
  label,
  calendarType = 'AD',
  locale = 'en',
}: IRangeDatePickerProps) => {
  const { t } = useLocale(locale);
  const tillDate = React.useMemo(
    () => ({
      year: tillDateStart.getFullYear(),
      month: String(tillDateStart.getMonth() + 1),
      day: String(tillDateStart.getDate()),
      dayOfWeek: tillDateStart.getDay(),
    }),
    [tillDateStart]
  );

  const { isOpen, onClose, onToggle } = useDisclosure();

  const [state, setState] = useState<TDateState>(todayDate);
  const [rangeStartDate, setRangeStartDate] = useState<CalendarBuilderDate | null>(
    tillDateStart ? tillDate : null
  );
  const [rangeEndDate, setRangeEndDate] = useState<CalendarBuilderDate | null>(today);
  const [hoveredDate, setHoveredDate] = useState<CalendarBuilderDate | null>(today);
  const [isFiscalDateSelected, setIsFiscalDateSelected] = useState<boolean>(false);
  const fiscalYears = getFiscalYears(tillDateStart, calendarType);

  const calendarProps = {
    state,
    rangeStartDate,
    setRangeStartDate,
    rangeEndDate,
    setRangeEndDate,
    hoveredDate,
    setHoveredDate,
  };

  const gotoPreviousMonth = () => {
    const { ad } = state;
    const { year, month, day } = ad;
    const previousMonth = getPreviousMonth(month, year);
    const bs = ad2bs(previousMonth.year, previousMonth.month, day);

    setState((prev) => ({
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
    const { ad } = state;
    const { year, month, day } = ad;
    // this.setState(getPreviousMonth(month, year));
    const nexMonth = getNextMonth(month, year);
    const bs = ad2bs(nexMonth.year, nexMonth.month, day);

    setState((prev) => ({
      ...prev,
      ad: {
        ...prev.ad,
        month: nexMonth.month,
        year: nexMonth.year,
      },
      bs,
    }));
  };

  const checkDate = (startDate: CalendarBuilderDate, endDate: CalendarBuilderDate = today) =>
    rangeStartDate && rangeEndDate
      ? dayjs(getJSDate(rangeStartDate)).isSame(getJSDate(startDate)) &&
        dayjs(getJSDate(rangeEndDate)).isSame(getJSDate(endDate))
      : false;

  useEffect(() => {
    if (rangeStartDate || rangeEndDate) {
      setIsFiscalDateSelected(false);
    }
  }, [rangeStartDate, rangeEndDate]);

  return (
    <Popover placement="bottom-start" isOpen={isOpen} onClose={onClose} onOpen={onToggle}>
      <PopoverTrigger>
        <Box w="100%" as="button" type="button" display="flex" flexDir="column" gap="s4" mb="1px">
          <Text fontWeight="500" lineHeight="1.5" fontSize="s3" color="gray.700">
            {label}
          </Text>
          <InputGroup>
            <InputLeftElement>
              <Icon color={isOpen ? 'gray.700' : 'gray.400'} as={CalendarIcon} />
            </InputLeftElement>
            <Input
              w="100%"
              value={
                calendarType === 'BS'
                  ? value?.from?.ne
                    ? locale === 'en'
                      ? `${value?.from?.ne} - ${value?.to?.ne}`
                      : ordinal(`${value?.from?.ne} - ${value?.to?.ne}`)
                    : ''
                  : value?.from?.en
                  ? locale === 'en'
                    ? `${value?.from?.en} - ${value?.to?.en}`
                    : ordinal(`${value?.from?.en} - ${value?.to?.en}`)
                  : ''
              }
              isDisabled
              _disabled={{
                bg: 'white',
                cursor: 'pointer',
                border: '1px',
                borderColor: isOpen ? 'primary.500' : 'gray.300',
                boxShadow: isOpen ? `0 0 0 2px var(--myra-colors-primary-300)` : 'none',
              }}
              placeholder="YYYY-MM-DD - YYYY-MM-DD"
            />
            {value && value?.from?.en && (
              <InputRightElement>
                <Icon
                  color="gray.400"
                  onClick={() => {
                    onChange(undefined);
                  }}
                  _hover={{
                    color: 'gray.700',
                  }}
                  as={IoMdClose}
                  w="s20"
                  h="s20"
                />
              </InputRightElement>
            )}
          </InputGroup>
        </Box>
      </PopoverTrigger>

      <PopoverContent w="100%" border="none">
        <Box display="flex" bg="white" borderRadius="br2" boxShadow="E2">
          <Box flexShrink={0} w="240px" borderRight="1px" borderColor="border.layout" p="s8">
            <PeriodWrapper
              title={t.today}
              isSelected={checkDate(today)}
              onClick={() => {
                setRangeStartDate(today);
                setRangeEndDate(today);
                setState(todayDate);
                setIsFiscalDateSelected(false);
              }}
            />
            <PeriodWrapper
              title={t.yesterday}
              isSelected={checkDate(yesterday, yesterday)}
              onClick={() => {
                setRangeStartDate(yesterday);
                setRangeEndDate(yesterday);
                setState(todayDate);
                setIsFiscalDateSelected(false);
              }}
            />
            <PeriodWrapper
              title={t.last7Days}
              isSelected={checkDate(last7Days)}
              onClick={() => {
                setRangeStartDate(last7Days);
                setRangeEndDate(today);
                setState(todayDate);
                setIsFiscalDateSelected(false);
              }}
            />
            <PeriodWrapper
              title={t.last30Days}
              isSelected={checkDate(last30Days)}
              onClick={() => {
                setRangeStartDate(last30Days);
                setRangeEndDate(today);
                setState(todayDate);
                setIsFiscalDateSelected(false);
              }}
            />
            <PeriodWrapper
              title={t.fiscalYear}
              isSelected={isFiscalDateSelected}
              onClick={() => {
                setIsFiscalDateSelected(true);
                setRangeStartDate(null);
                setRangeEndDate(null);
              }}
            />
            <PeriodWrapper
              title={t.customPeriod}
              isSelected={
                !checkDate(last30Days) &&
                !checkDate(last7Days) &&
                !checkDate(yesterday, yesterday) &&
                !checkDate(today) &&
                !checkDate(tillDate) &&
                !isFiscalDateSelected
              }
              onClick={() => {
                setRangeStartDate(null);
                setRangeEndDate(null);
                setIsFiscalDateSelected(false);
              }}
            />
            <PeriodWrapper
              title={t.tillDate}
              isSelected={checkDate(tillDate)}
              onClick={() => {
                setRangeStartDate(tillDate);
                setRangeEndDate(today);
                setIsFiscalDateSelected(false);
              }}
            />
          </Box>
          {isFiscalDateSelected ? (
            <Box p="s8">
              {fiscalYears?.map((fiscalYear) => {
                const adStartFiscalYear =
                  calendarType === 'BS'
                    ? bs2ad(fiscalYear.start.year, +fiscalYear.start.month, +fiscalYear.start.day)
                    : fiscalYear.start;

                return (
                  <PeriodWrapper
                    isSelected={dayjs(
                      `${adStartFiscalYear.year}-${adStartFiscalYear.month}-${adStartFiscalYear.day}`
                    ).isSame(dayjs(value?.from?.en || 10), 'day')}
                    onClick={() => {
                      onChange({
                        from: convertDate(fiscalYear.start, calendarType),
                        to: convertDate(fiscalYear.end, calendarType),
                      });
                      onToggle();
                    }}
                    title={
                      locale === 'ne'
                        ? ordinal(
                            `${fiscalYear.start.year} / ${fiscalYear.end.year} (${fiscalYear.start.year}-${fiscalYear.start.month}-${fiscalYear.start.day} - ${fiscalYear.end.year}-${fiscalYear.end.month}-${fiscalYear.end.day})`
                          )
                        : `${fiscalYear.start.year} / ${fiscalYear.end.year} (${fiscalYear.start.year}-${fiscalYear.start.month}-${fiscalYear.start.day} - ${fiscalYear.end.year}-${fiscalYear.end.month}-${fiscalYear.end.day})`
                    }
                  />
                );
              })}
            </Box>
          ) : (
            <Box display="flex" flexDir="column">
              <HStack
                display="flex"
                alignItems="stretch"
                borderBottom="1px"
                borderColor="border.layout"
                py="s16"
              >
                <Box px="s16" display="flex" flexDir="column" gap="s8">
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <TopButtonWrapper onClick={gotoPreviousMonth}>
                        <Icon as={BsChevronLeft} />
                      </TopButtonWrapper>

                      <MonthSelect
                        locale={locale}
                        calendarType="AD"
                        month={state.ad.month}
                        onChange={(newMonth) => {
                          const bs = ad2bs(state.ad.year, newMonth, state.ad.day);

                          setState((prev) => ({
                            ...prev,
                            bs,
                            ad: {
                              ...prev.ad,
                              month: newMonth,
                            },
                          }));
                        }}
                      />
                    </Box>
                    <YearSelect
                      locale={locale}
                      calendarType="AD"
                      year={state.ad.year}
                      onChange={(newYear) => {
                        const bs = ad2bs(newYear, state.ad.month, state.ad.day);

                        setState((prev) => ({
                          ...prev,
                          bs,
                          ad: {
                            ...prev.ad,
                            year: newYear,
                          },
                        }));
                      }}
                    />
                  </Box>

                  <CalendarBase locale={locale} {...calendarProps} />
                </Box>
                <Divider
                  orientation="vertical"
                  h="auto"
                  color="background.500"
                  marginInlineStart={0}
                  borderColor="red.500"
                  borderLeft="1px"
                />
                <Box px="s16" display="flex" flexDir="column" gap="s8">
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <YearSelect
                      locale={locale}
                      calendarType="AD"
                      year={dayjs(new Date(state.ad.year, state.ad.month - 1))
                        .add(1, 'month')
                        .toDate()
                        ?.getFullYear()}
                      onChange={(newYear) => {
                        const bs = ad2bs(newYear, state.ad.month, state.ad.day);

                        setState((prev) => ({
                          ...prev,
                          bs,
                          ad: {
                            ...prev.ad,
                            year: newYear,
                          },
                        }));
                      }}
                    />
                    <Box display="flex" alignItems="center">
                      <MonthSelect
                        locale={locale}
                        calendarType="AD"
                        rightAlignMonth
                        month={
                          Number(
                            dayjs(new Date(state.ad.year, state.ad.month - 1))
                              .add(1, 'month')
                              .toDate()
                              ?.getMonth()
                          ) + 1
                        }
                        onChange={(newMonth) => {
                          const bs = ad2bs(state.ad.year, newMonth, state.ad.day);

                          setState((prev) => ({
                            ...prev,
                            bs,
                            ad: {
                              ...prev.ad,
                              month: newMonth,
                            },
                          }));
                        }}
                      />
                      <TopButtonWrapper onClick={gotToNextMonth}>
                        <Icon as={BsChevronRight} />
                      </TopButtonWrapper>
                    </Box>
                  </Box>
                  <CalendarBase locale={locale} offsetMonth={1} {...calendarProps} />
                </Box>
              </HStack>
              <DateRangeFooter
                onChange={onChange}
                locale={locale}
                tillDate={tillDate}
                onToggle={onToggle}
                rangeStartDate={rangeStartDate}
                rangeEndDate={rangeEndDate}
                onRangeStartDateChange={(newDate) => {
                  setRangeStartDate(newDate);
                }}
                onRangeEndDateChange={(newDate) => {
                  setRangeEndDate(newDate);
                }}
              />
            </Box>
          )}
        </Box>
      </PopoverContent>
    </Popover>
  );
};

interface IDateRangeFooterProps {
  rangeStartDate: CalendarBuilderDate | null;
  rangeEndDate: CalendarBuilderDate | null;
  onChange: (newDate: DateRange) => void;
  onToggle: () => void;
  locale: 'en' | 'ne';

  tillDate: CalendarBuilderDate;
  onRangeStartDateChange: (newDate: CalendarBuilderDate) => void;
  onRangeEndDateChange: (newDate: CalendarBuilderDate) => void;
}

export const DateRangeFooter = ({
  onToggle,
  rangeEndDate,
  tillDate,
  rangeStartDate,
  onRangeEndDateChange,
  onRangeStartDateChange,
  onChange,
  locale,
}: IDateRangeFooterProps) => {
  const { t } = useLocale(locale);
  const startDate =
    rangeStartDate &&
    rangeEndDate &&
    dayjs(getJSDate(rangeStartDate)).diff(getJSDate(rangeEndDate)) <= 0
      ? rangeStartDate
      : rangeEndDate;
  const endDate =
    rangeStartDate &&
    rangeEndDate &&
    dayjs(getJSDate(rangeStartDate)).diff(getJSDate(rangeEndDate)) >= 0
      ? rangeStartDate
      : rangeEndDate;

  return (
    <Box display="flex" alignItems="end" justifyContent="space-between" p="s10">
      <Box display="flex" gap="s16" alignItems="center">
        <Box display="flex" flexDir="column" gap="s2">
          <Text fontWeight={500} color="gray.700" fontSize="s3">
            {t.from}
          </Text>
          <Box
            p="s12"
            display="flex"
            alignItems="center"
            gap="s12"
            w="150px"
            h="s36"
            border="1px"
            borderColor="border.element"
            borderRadius="br2"
          >
            <DateSegments
              value={
                startDate && endDate
                  ? {
                      year: String(startDate?.year || ''),
                      month: startDate?.month || '',
                      day: startDate?.day || '',
                    }
                  : { year: '', month: '', day: '' }
              }
              onValueChange={(newDate) => {
                if (newDate?.year && newDate?.month && newDate?.day) {
                  onRangeStartDateChange({
                    year: Number(newDate?.year),
                    month: newDate?.month,
                    day: newDate?.day,
                    dayOfWeek: 0,
                  });
                }
              }}
            />
          </Box>
        </Box>
        <Icon as={HiArrowRight} color="gray.500" w="s24" h="s24" />
        <Box display="flex" flexDir="column" gap="s2">
          <Text fontWeight={500} color="gray.700" fontSize="s3">
            {t.to}
          </Text>
          <Box
            p="s12"
            display="flex"
            alignItems="center"
            gap="s12"
            w="150px"
            h="s36"
            border="1px"
            borderColor="border.element"
            borderRadius="br2"
          >
            <DateSegments
              value={{
                year: String(endDate?.year || ''),
                month: endDate?.month || '',
                day: endDate?.day || '',
              }}
              onValueChange={(newDate) => {
                if (newDate?.year && newDate?.month && newDate?.day) {
                  onRangeEndDateChange({
                    year: Number(newDate?.year),
                    month: newDate?.month,
                    day: newDate?.day,
                    dayOfWeek: 0,
                  });
                }
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="s8">
        <Button
          w="100px"
          colorScheme="gray"
          variant="ghost"
          onClick={() => {
            onRangeStartDateChange(tillDate);
            onRangeEndDateChange(today);
          }}
        >
          {t.cancel}
        </Button>
        <Button
          w="100px"
          type="button"
          isDisabled={!rangeEndDate || !rangeEndDate}
          onClick={() => {
            onChange({
              from: convertDate(rangeStartDate),
              to: convertDate(rangeEndDate),
            });
            onToggle();
          }}
        >
          {t.apply}
        </Button>
      </Box>
    </Box>
  );
};

const convertDate = (
  calendarDate: CalendarBuilderDate | null,
  calendarType: 'AD' | 'BS' = 'AD'
) => {
  if (!calendarDate) return null;

  if (calendarType === 'BS') {
    const _adDate = bs2ad(calendarDate.year, +calendarDate.month, +calendarDate.day);
    const dateStringAD = `${_adDate?.year}-${zeroPad(_adDate?.month, 2)}-${zeroPad(
      _adDate?.day,
      2
    )}`;

    const date = dayjs(dateStringAD).toDate();
    const dateStringBs = `${calendarDate?.year}-${calendarDate?.month}-${calendarDate?.day}`;

    return {
      date,
      en: dateStringAD,
      ne: dateStringBs,
    };
  }

  const dateString = `${calendarDate?.year}-${calendarDate?.month}-${calendarDate?.day}`;
  const date = dayjs(dateString).toDate();
  const _adDate = dayjs(date).format('YYYY-MM-DD');
  const _bsDate = ad2bs(calendarDate.year, +calendarDate.month, +calendarDate.day);
  const dateStringBs = `${_bsDate?.year}-${zeroPad(_bsDate?.month, 2)}-${zeroPad(_bsDate?.day, 2)}`;

  return {
    date,
    en: _adDate,
    ne: dateStringBs,
  };
};

interface IPeriodWrapperProps extends React.ComponentProps<'div'> {
  isSelected?: boolean;
  title: string;
}

const PeriodWrapper = ({ isSelected = false, title, ...rest }: IPeriodWrapperProps) => (
  <Box
    w="100%"
    _hover={{
      bg: 'gray.100',
    }}
    color="gray.700"
    borderRadius="br2"
    px="s8"
    h="s40"
    bg={isSelected ? 'gray.100' : 'transparent'}
    fontSize="r1"
    display="flex"
    alignItems="center"
    cursor="pointer"
    {...rest}
  >
    {title}
  </Box>
);

const getJSDate = (date: CalendarBuilderDate) => new Date(date.year, +date.month - 1, +date.day);

const getFiscalYears = (date: Date, calendarType: 'AD' | 'BS' = 'AD') => {
  const dateBs = ad2bs(date.getFullYear(), date.getMonth() + 1, date.getDate());

  const todayBs = todayDate.bs;

  const years = Array.from({ length: todayBs.year - dateBs.year + 1 }, (v, k) => k).map(
    (a) => a + dateBs.year
  );

  return years?.map((year) => {
    if (calendarType === 'AD') {
      const fiscalYearStartInAd = bs2ad(year, 4, 1);
      const fiscalYearEndInAd = bs2ad(year + 1, 3, calendarData[(year + 1) as EachBSYear][2]);
      return {
        start: {
          year: fiscalYearStartInAd.year,
          month: zeroPad(fiscalYearStartInAd.month, 2),
          day: zeroPad(fiscalYearStartInAd.day, 2),
          dayOfWeek: fiscalYearStartInAd.dayOfWeek,
        },

        end: {
          year: fiscalYearEndInAd.year,
          month: zeroPad(fiscalYearEndInAd.month, 2),
          day: zeroPad(fiscalYearEndInAd.day, 2),
          dayOfWeek: fiscalYearEndInAd.dayOfWeek,
        },
      };
    }

    return {
      start: {
        year,
        month: '04',
        day: '01',
        // Todo!
        dayOfWeek: 1,
      },
      end: {
        year: year + 1,
        month: '03',
        day: String(calendarData[(year + 1) as EachBSYear][2]),
        dayOfWeek: 1,
      },
    };
  });
};
