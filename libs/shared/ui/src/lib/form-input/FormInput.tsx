import { useState } from 'react';
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
    <Box w="auto" display="flex" flexDirection="column" gap="4px">
      {label && (
        <TextFields variant="formLabel" color="gray.700">
          {label}
        </TextFields>
      )}

      <InputGroup
        h="44px"
        boxShadow={isOn ? 'E1' : ''}
        borderColor={isError ? 'danger.500' : 'gray.300'}
        borderRadius="br2"
      >
        {leftElement && (
          <InputLeftElement pointerEvents="none" children={leftElement} />
        )}

        <Input
          variant={'outline'}
          h="100%"
          borderRadius="br2"
          color={'gray.700'}
          onFocus={() => setIsOn(true)}
          onBlur={() => setIsOn(false)}
          _focus={{ borderColor: 'primary.500' }}
          _hover={{ borderColor: 'primary.500' }}
          {...rest}
        />
        {rightElement && (
          <InputRightElement pointerEvents="none" children={rightElement} />
        )}
      </InputGroup>

      {!isError ? (
        textHelper ? (
          <TextFields variant="formHelper" color="gray.800">
            {textHelper}
          </TextFields>
        ) : null
      ) : (
        <TextFields variant="formHelper" color="danger.500">
          {textError}
        </TextFields>
      )}
    </Box>
  );
}

export default FormInput;
