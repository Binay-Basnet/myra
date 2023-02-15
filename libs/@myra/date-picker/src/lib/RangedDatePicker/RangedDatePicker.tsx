import { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Calendar } from '../../range-date-picker/components/Calendar';
import { DateInput } from '../../range-date-picker/components/DateInput';
import { DateRangeFooter } from '../../range-date-picker/components/DateRangeFooter';
import { FiscalPeriod } from '../../range-date-picker/components/periods/FiscalPeriod';
import { Periods } from '../../range-date-picker/components/periods/Periods';
import { CalendarBuilderDate, DateRange, Period, TDateState } from '../../types/date';
import { DEFAULT_PERIODS } from '../../utils/constants';
import { convertTillDate, todayDate } from '../../utils/functions';

interface IRangeDatePickerProps {
  tillDateStart: Date;
  calendarType: 'AD' | 'BS';
  value: DateRange | undefined;
  locale?: 'en' | 'ne';
  onChange: (newDate: DateRange | undefined) => void;
  label: string;

  periods?: Period[];
  baseDate?: Date;
  showFiscalPeriod?: boolean;
  showTillDatePeriod?: boolean;
  showCustomPeriod?: boolean;
  showPeriods?: boolean;
}

export const RangedDatePicker = ({
  tillDateStart,
  value,
  onChange,
  label,
  calendarType = 'AD',
  locale = 'en',
  periods = DEFAULT_PERIODS,
  showPeriods = true,

  showFiscalPeriod = true,
  showTillDatePeriod = true,
  showCustomPeriod = true,
  baseDate,
}: IRangeDatePickerProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [state, setState] = useState<TDateState>(todayDate);

  const [rangeStartDate, setRangeStartDate] = useState<CalendarBuilderDate | null>(null);
  const [rangeEndDate, setRangeEndDate] = useState<CalendarBuilderDate | null>(null);
  const [hoveredDate, setHoveredDate] = useState<CalendarBuilderDate | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const tillDate = convertTillDate(tillDateStart, calendarType);

  const calendarProps = {
    state,
    setState,
    calendarType,
    rangeStartDate,
    setRangeStartDate,
    rangeEndDate,
    setRangeEndDate,
    hoveredDate,
    setHoveredDate,
  };

  const periodProps = {
    periods,
    baseDate,
    locale,
    onToggle,
    calendarType,
    setRangeStartDate,
    setRangeEndDate,
    setHoveredDate,
    selectedPeriod,
    showPeriods,
    setSelectedPeriod,
    showFiscalPeriod,
    showCustomPeriod,
    showTillDatePeriod,
    tillDateStart,
    tillDate,
    onChange,
    setState,
  };

  const inputProps = {
    locale,
    onToggle,
    calendarType,
    value,
    isOpen,
    onChange,
  };

  // Temporary fix for range date not updating when calendar type is changed!!.
  //  Fix issue by adding 'AD' | 'BS' to CalendarBuilderDate
  useEffect(() => {
    if (selectedPeriod !== 'FISCAL_YEAR') {
      setSelectedPeriod(null);
    }
  }, [calendarType]);

  return (
    <Box w="100%" display="flex" flexDir="column" gap="s4" mb="1px" alignItems="flex-start">
      <Text fontWeight="500" lineHeight="1.5" fontSize="s3" color="gray.700">
        {label}
      </Text>

      <Popover placement="bottom-start" isOpen={isOpen} onClose={onClose} onOpen={onToggle}>
        <PopoverTrigger>
          <Box as="button" type="button" w="100%">
            <DateInput {...inputProps} />
          </Box>
        </PopoverTrigger>

        <PopoverContent w="100%" border="none">
          <Box display="flex" bg="white" borderRadius="br2" boxShadow="E2">
            <Periods {...periodProps} />

            {selectedPeriod === 'FISCAL_YEAR' ? (
              <FiscalPeriod
                tillDateStart={tillDateStart}
                calendarType={calendarType}
                locale={locale}
                value={value}
                onChange={onChange}
                onToggle={onToggle}
              />
            ) : selectedPeriod === 'TODAY' ||
              selectedPeriod === 'YESTERDAY' ||
              !selectedPeriod ? null : (
              <Box display="flex" flexDir="column">
                <HStack
                  display="flex"
                  alignItems="stretch"
                  borderBottom="1px"
                  borderColor="border.layout"
                  py="s16"
                >
                  <Calendar calendarProps={calendarProps} />
                  <Calendar calendarProps={calendarProps} nextMonth />
                </HStack>
                <DateRangeFooter
                  calendarType={calendarType}
                  onChange={onChange}
                  locale={locale}
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
    </Box>
  );
};
