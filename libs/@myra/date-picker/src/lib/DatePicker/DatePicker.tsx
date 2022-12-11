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
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { Calendar } from '../../components/Calendar';
import { TDateState } from '../../types/date';
import { convertValueToDate, getTodayDate } from '../../utils/functions';

type DateValue = {
  date: Date;
  ad?: string;
  bs?: string;
};

interface IDatePickerProps {
  calendarType?: 'AD' | 'BS';
  value?: DateValue;
  onChange?: (newValue: DateValue) => void;
  dateFormat?: string;
}

export const DatePicker = ({
  calendarType = 'AD',
  value,
  onChange,
  dateFormat = 'YYYY-MM-DD',
}: IDatePickerProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [dateState, setDateState] = React.useState<TDateState>(
    value ? convertValueToDate(value) : getTodayDate()
  );

  useEffect(() => {
    if (value) {
      setDateState(convertValueToDate(value));
    }
  }, [value?.date?.toString()]);

  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onToggle}>
      <PopoverTrigger>
        <Box as="button">
          <InputGroup w="350px">
            <InputLeftElement>
              <Icon color="gray.400" as={CalendarIcon} />
            </InputLeftElement>
            <Input
              isDisabled
              key={dateState?.current?.toString()}
              value={dateState?.current ? dayjs(dateState?.current).format(dateFormat) : undefined}
              _disabled={{
                bg: 'white',
                cursor: 'pointer',
                border: '1px',
                borderColor: isOpen ? 'primary.500' : 'gray.300',
                boxShadow: isOpen ? `0 0 0 2px var(--myra-colors-primary-300)` : 'none',
              }}
              placeholder={dateFormat}
            />
            <InputRightElement>
              <Icon
                color="gray.400"
                onClick={() => {
                  setDateState((prev) => ({
                    ...prev,
                    current: null,
                  }));
                }}
                as={IoIosCloseCircleOutline}
                w="s20"
                h="s20"
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </PopoverTrigger>

      <PopoverContent w="100%" border="none">
        <Calendar
          calendarType={calendarType}
          value={dateState}
          onDateChange={(date) => {
            setDateState(date);
            if (date.current) {
              if (onChange) {
                onChange({
                  date: date.current,
                  ad: dayjs(date.current).format(dateFormat),
                });
                onToggle();
              }
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
