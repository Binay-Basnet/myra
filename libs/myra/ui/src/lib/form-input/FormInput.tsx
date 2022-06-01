import { TextFields } from '@saccos/myra/ui';
import {
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
/* eslint-disable-next-line */
export interface FormInputProps extends InputProps {
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  textHelper?: string;
  textError?: string;
  label?: string;
  isError?: boolean;
}

export function FormInput(props: FormInputProps) {
  const [isOn, setIsOn] = useState(false);
  const {
    rightElement,
    leftElement,
    textHelper,
    textError,
    label,
    isError,
    fontSize,
    fontWeight,
    ...rest
  } = props;
  return (
    <Box w="auto">
      <TextFields variant="formLabel" color="gray.700">
        {label}
      </TextFields>

      <InputGroup
        mt="8px"
        h="44px"
        boxShadow={isOn ? 'E1' : ''}
        borderColor={isError ? 'danger.500' : 'gray.50'}
        borderRadius="br2"
      >
        {leftElement && (
          <InputLeftElement pointerEvents="none" children={leftElement} />
        )}

        <Input
          onFocus={() => setIsOn(true)}
          onBlur={() => setIsOn(false)}
          {...rest}
          h="100%"
          fontSize="r2"
          fontWeight="400"
          color={'gray.700'}
          // _focus={{ borderColor: 'primary.500' }}
          // _hover={{ borderColor: 'primary.500' }}
        />
        {rightElement && (
          <InputRightElement pointerEvents="none" children={rightElement} />
        )}
      </InputGroup>

      {!isError ? (
        <TextFields mt="4px" variant="formHelper" color="gray.70">
          {textHelper}
        </TextFields>
      ) : (
        <TextFields mt="4px" variant="formHelper" color="danger.500">
          {textError}
        </TextFields>
      )}
    </Box>
  );
}

export default FormInput;
