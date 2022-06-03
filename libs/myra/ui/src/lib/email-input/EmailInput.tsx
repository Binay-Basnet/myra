import { MdEmail } from 'react-icons/md';
import {
  Input,
  InputGroup,
  InputProps,
  InputLeftElement,
} from '@chakra-ui/react';
import { TextFields } from '@saccos/myra/ui';
import { BiLabel } from 'react-icons/bi';
import { forwardRef } from 'react';
/* eslint-disable-next-line */
export interface EmailInputProps extends InputProps {
  label?: string;
  labelColor?: string;
  placeholder?: string;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (props, ref) => {
    const { label, labelColor, placeholder, ...rest } = props;
    return (
      <>
        <TextFields variant="formLabel" color={labelColor ?? 'gray.700'}>
          {' '}
          {label}
        </TextFields>
        <InputGroup mt="s4">
          <InputLeftElement children={<MdEmail />} />
          <Input
            variant="outline"
            type="email"
            fontSize={'s2'}
            placeholder={placeholder ?? 'Enter your Email'}
            ref={ref}
          ></Input>
        </InputGroup>
      </>
    );
  }
);

export default EmailInput;
