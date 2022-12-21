import { HiArrowRight } from 'react-icons/hi';
import { Icon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { DateSegments } from '@myra-ui/date-picker';

import { useLocale } from '../../../locale/useLocale';
import { CalendarBuilderDate, DateRange } from '../../../types/date';
import { today } from '../../../utils/constants';
import { convertDate, getJSDate } from '../../../utils/functions';

interface IDateRangeFooterProps {
  rangeStartDate: CalendarBuilderDate | null;
  rangeEndDate: CalendarBuilderDate | null;
  onChange: (newDate: DateRange) => void;
  onToggle: () => void;
  locale: 'en' | 'ne';
  calendarType: 'AD' | 'BS';

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
  calendarType,
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
              from: convertDate(rangeStartDate, calendarType),
              to: convertDate(rangeEndDate, calendarType),
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
