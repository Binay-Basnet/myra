import { HiPhone } from 'react-icons/hi';
import {
  Input,
  InputGroup,
  InputProps,
  InputLeftElement,
} from '@chakra-ui/react';
import { TextFields } from '@coop/myra/ui';
import { BiLabel } from 'react-icons/bi';
import { forwardRef } from 'react';
/* eslint-disable-next-line */
export interface PhoneNumberProps extends InputProps {
  label?: string;
  placeholder?: string;
  labelColor?: string;
}

export const PhoneNumber = forwardRef<HTMLInputElement, PhoneNumberProps>(
  (props, ref) => {
    const { label, placeholder, labelColor, ...rest } = props;
    return (
      <>
        <TextFields variant="formLabel" color={labelColor ?? 'gray.700'}>
          {' '}
          {label}
        </TextFields>
        <InputGroup mt="s4">
          <InputLeftElement children={<HiPhone />} />
          <Input
            variant="outline"
            type="number"
            placeholder={placeholder}
            fontSize="s2"
            ref={ref}
          ></Input>
        </InputGroup>
      </>
    );
  }
);

export default PhoneNumber;
