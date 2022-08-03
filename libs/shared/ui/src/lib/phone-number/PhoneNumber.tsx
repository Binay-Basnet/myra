import { forwardRef } from 'react';
import { HiPhone } from 'react-icons/hi';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';

import { TextFields } from '@coop/shared/ui';
/* eslint-disable-next-line */
export interface PhoneNumberProps extends InputProps {
  label?: string;
  placeholder?: string;
  labelColor?: string;
  id?: string;
}

export const PhoneNumber = forwardRef<HTMLInputElement, PhoneNumberProps>(
  (props, ref) => {
    const { label, id, placeholder, labelColor, ...rest } = props;
    return (
      <>
        <TextFields variant="formLabel" color={labelColor ?? 'gray.700'}>
          {' '}
          {label}
        </TextFields>
        <InputGroup mt="s4">
          <InputLeftElement children={<HiPhone />} />
          <Input
            id={id}
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
