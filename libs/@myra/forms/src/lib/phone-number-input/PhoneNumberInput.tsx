import { forwardRef } from 'react';
import { HiPhone } from 'react-icons/hi';
import { Input, InputGroup, InputLeftElement, InputProps } from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';

export interface PhoneNumberProps extends InputProps {
  label?: string;
  placeholder?: string;
  labelColor?: string;
  id?: string;
}

export const PhoneNumber = forwardRef<HTMLInputElement, PhoneNumberProps>((props, ref) => {
  const { label, id, placeholder, labelColor } = props;
  return (
    <>
      <Text variant="formLabel" color={labelColor ?? 'gray.700'}>
        {label}
      </Text>
      <InputGroup mt="s4">
        <InputLeftElement children={<HiPhone />} />
        <Input
          id={id}
          variant="outline"
          type="number"
          placeholder={placeholder}
          fontSize="s2"
          ref={ref}
        />
      </InputGroup>
    </>
  );
});

export default PhoneNumber;
