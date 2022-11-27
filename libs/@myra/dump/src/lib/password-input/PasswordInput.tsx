// import { forwardRef, useState } from 'react';
// import { FieldValues, UseFormRegister } from 'react-hook-form';
// import { IoEyeOffOutline, IoEyeOutline, IoLockClosed } from 'react-icons/io5';
// import {
//   Box,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   InputProps,
//   InputRightElement,
// } from '@chakra-ui/react';

// import { TextFields } from '@coop/shared/ui';

// /* eslint-disable-next-line */
// export interface PasswordInputProps extends InputProps {
//   labelColor?: string;
//   label?: string;
//   register?: UseFormRegister<FieldValues>;

//   fieldName?: string;
//   validation?: Record<string, string | RegExp | boolean | number>;
// }

// export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
//   const { labelColor, label, register, validation, fieldName, ...rest } = props;
//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);

//   return (
//     <Box w="auto" display="flex" flexDirection="column" flexGrow={1} gap="s4">
//       <TextFields variant="formLabel" color={labelColor ?? 'gray.700'}>
//         {' '}
//         {label ?? 'Password'}
//       </TextFields>
//       <InputGroup h="44px" mt="s4">
//         <InputLeftElement children={<IoLockClosed />} />
//         <Input
//           variant="outline"
//           type={show ? 'text' : 'password'}
//           placeholder="Enter password"
//           ref={ref}
//           {...rest}
//           {...(register &&
//             fieldName &&
//             register(
//               fieldName,
//               validation
//               //   {
//               //   required: true,
//               //   minLength: 8,
//               //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
//               // }
//             ))}
//         />
//         <InputRightElement width="fit-content" onClick={handleClick} pr="s16" cursor="pointer">
//           <Box>{show ? <IoEyeOffOutline /> : <IoEyeOutline />}</Box>
//         </InputRightElement>
//       </InputGroup>
//     </Box>
//   );
// });

// export default PasswordInput;

import { forwardRef, useState } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline, IoLockClosed } from 'react-icons/io5';
import { Box, InputProps } from '@chakra-ui/react';
import { Icon, Input } from '@myra/dump';

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
          <Icon as={show ? IoEyeOutline : IoEyeOffOutline} color="gray.500" />
        </Box>
      }
      {...(register && fieldName && register(fieldName, validation))}
      {...rest}
    />
  );
});

export default PasswordInput;
