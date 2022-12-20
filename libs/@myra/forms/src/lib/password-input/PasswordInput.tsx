import { forwardRef, useState } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline, IoLockClosed } from 'react-icons/io5';
import { Box, InputProps } from '@chakra-ui/react';

import { Input } from '@myra-ui/forms';
import { Icon } from '@myra-ui/foundations';

/* eslint-disable-next-line */
export interface PasswordInputProps extends InputProps {
  labelColor?: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;

  fieldName?: string;
  validation?: RegisterOptions;
  errorText?: string;

  hideLock?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { label, register, validation, fieldName, placeholder, hideLock, ...rest } = props;
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Input
      ref={ref}
      type={show ? 'text' : 'password'}
      label={label ?? 'Password'}
      placeholder={placeholder ?? 'Enter Password'}
      leftElement={!hideLock && <Icon as={IoLockClosed} color="gray.500" size="sm" />}
      rightElement={
        <Box onClick={handleClick} cursor="pointer" display="flex" alignItems="center">
          <Icon as={!show ? IoEyeOffOutline : IoEyeOutline} color="gray.500" />
        </Box>
      }
      {...(register && fieldName && register(fieldName, validation))}
      {...rest}
    />
  );
});

export default PasswordInput;

PasswordInput.displayName = 'PasswordInput';
