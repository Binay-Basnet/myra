import { forwardRef, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline, IoLockClosed } from 'react-icons/io5';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

import { TextFields } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface PasswordInputProps extends InputProps {
  labelColor?: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;

  fieldName?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { labelColor, label, register, fieldName, ...rest } = props;
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <TextFields variant="formLabel" color={labelColor ?? 'gray.700'}>
        {' '}
        {label ?? 'Password'}
      </TextFields>
      <InputGroup h="44px" mt="s4">
        <InputLeftElement children={<IoLockClosed />} />
        <Input
          pr="58px"
          variant="outline"
          type={show ? 'text' : 'password'}
          __placeholder="Enter password"
          ref={ref}
          fontSize="s2"
          {...rest}
          {...(register &&
            fieldName &&
            register(fieldName, {
              required: true,
              minLength: 8,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
            }))}
        />
        <InputRightElement width="fit-content" onClick={handleClick} pr="s16" cursor="pointer">
          <Box>{show ? <IoEyeOffOutline /> : <IoEyeOutline />}</Box>
        </InputRightElement>
      </InputGroup>
    </>
  );
});

export default PasswordInput;
