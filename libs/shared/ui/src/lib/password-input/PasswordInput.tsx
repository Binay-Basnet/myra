import { forwardRef, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline, IoLockClosed } from 'react-icons/io5';
import { Box, InputProps } from '@chakra-ui/react';

import { Icon, Input } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface PasswordInputProps extends InputProps {
  labelColor?: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;

  fieldName?: string;
  validation?: Record<string, string | RegExp | boolean | number>;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { label, register, validation, fieldName, placeholder, ...rest } = props;
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Input
      type={show ? 'text' : 'password'}
      label={label ?? 'Password'}
      placeholder={placeholder ?? 'Enter Password'}
      ref={ref}
      leftElement={<Icon as={IoLockClosed} color="gray.500" size="sm" />}
      rightElement={
        <Box onClick={handleClick} cursor="pointer">
          <Icon as={show ? IoEyeOffOutline : IoEyeOutline} color="gray.500" />
        </Box>
      }
      {...rest}
      {...(register && fieldName && register(fieldName, validation))}
    />
  );
});

export default PasswordInput;
