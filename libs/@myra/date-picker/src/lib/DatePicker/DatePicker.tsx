import React, { useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CalendarIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
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
import NepaliDate from 'nepali-date-converter';

import { Calendar } from '../../components/Calendar';
import { TDateState } from '../../types/date';
import { convertValueToDate } from '../../utils/functions';

type DateValue = {
  date?: Date;
  ad?: string;
  bs?: string;
};

interface IDatePickerProps {
  calendarType?: 'AD' | 'BS';
  locale?: 'en' | 'ne';

  value?: DateValue;
  onChange?: (newValue: DateValue) => void;
  label?: string;
  dateFormat?: string;

  minDate?: Date;
  maxDate?: Date;

  isInvalid?: boolean;
}

export const DatePicker = ({
  calendarType = 'AD',
  value,
  onChange,
  dateFormat = 'YYYY-MM-DD',
  locale = 'en',
  isInvalid,
  minDate,
  maxDate,
  label,
}: IDatePickerProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [dateState, setDateState] = React.useState<TDateState | null>(
    value ? convertValueToDate(value) : null
  );

  useEffect(() => {
    if (value) {
      const convertedDate = convertValueToDate(value);

      if (onChange && convertedDate) {
        onChange({
          date: convertedDate.current,
          ad: dayjs(convertedDate.current).format(dateFormat),
          bs: new NepaliDate(convertedDate.current).format(dateFormat),
        });
      }

      setDateState(convertedDate);
    } else {
      setDateState(null);
    }
  }, [value?.date?.toString(), value?.ad, value?.bs]);

  return (
    <Box w="100%" display="flex" flexDir="column" gap="s4" mb="1px" alignItems="flex-start">
      <Text fontWeight="500" lineHeight="1.5" fontSize="s3" color="gray.700">
        {label}
      </Text>
      <Popover placement="bottom-start" isOpen={isOpen} onClose={onClose} onOpen={onToggle}>
        <PopoverTrigger>
          <Box as="button" w="100%" type="button">
            <InputGroup>
              <InputLeftElement>
                <Icon color="gray.400" as={CalendarIcon} />
              </InputLeftElement>
              <Input
                isInvalid={isInvalid}
                key={dateState?.current?.toString()}
                value={
                  calendarType === 'AD'
                    ? dateState?.current
                      ? dayjs(dateState?.current).format(dateFormat)
                      : undefined
                    : dateState?.current
                    ? new NepaliDate(dateState?.current).format(dateFormat)
                    : undefined
                }
                isReadOnly
                _readOnly={{
                  bg: 'white',
                  cursor: 'pointer',
                  border: '1px',
                  borderColor: isOpen ? 'primary.500' : 'gray.300',
                  boxShadow: isOpen ? `0 0 0 2px var(--myra-colors-primary-300)` : 'none',
                }}
                placeholder={dateFormat}
              />
              {dateState && (
                <InputRightElement>
                  <Icon
                    color="gray.400"
                    onClick={() => {
                      setDateState(null);
                    }}
                    as={IoIosCloseCircleOutline}
                    w="s20"
                    h="s20"
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>
        </PopoverTrigger>

        <PopoverContent w="100%" border="none" boxShadow="E2">
          <Calendar
            locale={locale}
            calendarType={calendarType}
            value={dateState}
            maxDate={maxDate}
            minDate={minDate}
            onDateChange={(date) => {
              setDateState(date);
              if (date.current) {
                if (onChange) {
                  onChange({
                    date: date.current,
                    ad: dayjs(date.current).format(dateFormat),
                    bs: new NepaliDate(date.current).format(dateFormat),
                  });
                  onToggle();
                }
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </Box>
  );
};
