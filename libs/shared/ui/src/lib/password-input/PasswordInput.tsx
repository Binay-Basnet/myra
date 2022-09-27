import { forwardRef, useState } from 'react';
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
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { labelColor, label, ...rest } = props;
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
        />
        <InputRightElement width="fit-content" onClick={handleClick} pr="s16" cursor="pointer">
          <Box>{show ? <IoEyeOffOutline /> : <IoEyeOutline />}</Box>
        </InputRightElement>
      </InputGroup>
    </>
  );
});

export default PasswordInput;
