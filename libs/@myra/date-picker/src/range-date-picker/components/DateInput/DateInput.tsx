import { IoMdClose } from 'react-icons/io';
import { CalendarIcon, Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import NepaliDate from 'nepali-date-converter';

import { DateRange } from '../../../types/date';
import { ordinal } from '../../../utils/constants';

interface IDateInputProps {
  isOpen: boolean;
  onToggle: () => void;
  calendarType: 'AD' | 'BS';
  locale: 'en' | 'ne';
  value: DateRange | undefined;
  onChange: (newDate: DateRange | undefined) => void;
}

export const DateInput = ({
  locale,
  onToggle,
  calendarType,
  value,
  isOpen,
  onChange,
}: IDateInputProps) => (
  <InputGroup w="100%" onClick={onToggle}>
    <InputLeftElement cursor="pointer">
      <Icon color={isOpen ? 'gray.700' : 'gray.400'} as={CalendarIcon} />
    </InputLeftElement>
    <Input
      value={
        calendarType === 'BS'
          ? value?.from?.np
            ? locale === 'en'
              ? `${new NepaliDate(value?.from?.np).format('YYYY-MM-DD')} - ${new NepaliDate(
                  value?.to?.np
                ).format('YYYY-MM-DD')}`
              : ordinal(
                  `${new NepaliDate(value?.from?.np).format('YYYY-MM-DD')} - ${new NepaliDate(
                    value?.to?.np
                  ).format('YYYY-MM-DD')}`
                )
            : ''
          : value?.from?.en
          ? locale === 'en'
            ? `${value?.from?.en} - ${value?.to?.en}`
            : ordinal(`${value?.from?.en} - ${value?.to?.en}`)
          : ''
      }
      isReadOnly
      _readOnly={{
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
);
