import { forwardRef } from 'react';
import { MdEmail } from 'react-icons/md';
import { Input, InputGroup, InputLeftElement, InputProps } from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';

export interface EmailInputProps extends InputProps {
  label?: string;
  labelColor?: string;
  placeholder?: string;
  id?: string;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  const { label, labelColor, placeholder, id } = props;
  return (
    <>
      <Text variant="formLabel" color={labelColor ?? 'gray.700'}>
        {' '}
        {label}
      </Text>
      <InputGroup mt="s4">
        <InputLeftElement children={<MdEmail />} />
        <Input
          id={id}
          variant="outline"
          type="email"
          fontSize="s2"
          placeholder={placeholder ?? 'Enter your Email'}
          ref={ref}
        />
      </InputGroup>
    </>
  );
});

export default EmailInput;
