import React from 'react';
import {
  Box,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
} from '@chakra-ui/react';

import { TextFields } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface InputProps extends ChakraInputProps {
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  helperText?: string;
  errorText?: string;
  label?: string;
  leftzIndex?: number;
}

export const Input = ({
  rightElement,
  leftElement,
  helperText,
  errorText,
  label,
  fontSize,
  size = 'default',
  leftzIndex,
  fontWeight,
  ...rest
}: InputProps) => {
  return (
    <Box w="auto" display="flex" flexDirection="column" gap="s4">
      {label && (
        <TextFields variant="formLabel" color="gray.700">
          {label}
        </TextFields>
      )}

      <InputGroup
        borderRadius="br2"
        height={size === 'default' ? '44px' : '36px'}
      >
        {leftElement && (
          <InputLeftElement
            pointerEvents="none"
            children={leftElement}
            zIndex={leftzIndex}
          />
        )}

        <ChakraInput h="100%" isInvalid={!!errorText} {...rest} />
        {rightElement && (
          <InputRightElement pointerEvents="none" children={rightElement} />
        )}
      </InputGroup>

      {errorText ? (
        <TextFields variant="formHelper" color="danger.500">
          {errorText}
        </TextFields>
      ) : helperText ? (
        <TextFields variant="formHelper" color="gray.700">
          {helperText}
        </TextFields>
      ) : null}
    </Box>
  );
};

export default Input;
