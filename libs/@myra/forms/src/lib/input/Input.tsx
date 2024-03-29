import React from 'react';
import {
  Box,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightAddon,
  InputRightElement,
} from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';

export interface InputProps extends ChakraInputProps {
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  helperText?: string;
  errorText?: string;
  label?: string;
  placeholder?: string;
  /**
   * @deprecated __placeholder
   */
  __placeholder?: string;
  rightAddonText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type,
    name,
    rightElement,
    leftElement,
    helperText,
    placeholder,
    errorText,
    label,
    size = 'default',
    rightAddonText,
    isRequired,
    ...rest
  } = props;

  return (
    <Box w="auto" display="flex" flexDirection="column" flexGrow={1} gap="s4">
      {label && (
        <Text variant="formLabel" color="gray.700">
          {isRequired ? `${label} *` : label}
        </Text>
      )}

      <InputGroup borderRadius="br2" height={size === 'default' ? 's44' : 's36'}>
        {leftElement && <InputLeftElement pointerEvents="none" children={leftElement} />}

        <ChakraInput
          type={type}
          data-testid={name}
          _focus={{
            borderColor: errorText ? 'danger.500' : 'primary.500',
          }}
          name={name}
          ref={ref}
          h="100%"
          isInvalid={!!errorText}
          placeholder={placeholder}
          onWheel={(e) => e.currentTarget.blur()}
          autoComplete="none"
          borderRight={rightAddonText && 'none'}
          {...rest}
        />
        {rightElement && <InputRightElement children={rightElement} ml="s4" px="s12" />}
        {rightAddonText && (
          <InputRightAddon
            children={rightAddonText}
            bg="white"
            color="accent.debit"
            border="1px solid"
            borderColor={errorText ? 'red.500' : 'gray.300'}
          />
        )}
      </InputGroup>

      {errorText ? (
        <Text variant="formHelper" color="danger.500">
          {errorText}
        </Text>
      ) : helperText ? (
        <Text variant="formHelper" color="gray.700">
          {helperText}
        </Text>
      ) : null}
    </Box>
  );
});

export default Input;

Input.displayName = 'Input';
