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
  placeholder?: string;
}

type ForwardRefInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      rightElement,
      leftElement,
      helperText,
      errorText,
      label,
      fontSize,
      placeholder,
      size = 'default',
      fontWeight,
      ...rest
    }: InputProps,
    ref
  ) => {
    return (
      <Box w="auto" display="flex" flexDirection="column" flexGrow={1} gap="s4">
        {label && (
          <TextFields variant="formLabel" color="gray.700">
            {label}
          </TextFields>
        )}

        <InputGroup
          borderRadius="br2"
          px="s4"
          height={size === 'default' ? '44px' : '36px'}
        >
          {leftElement && (
            <InputLeftElement pointerEvents="none" children={leftElement} />
          )}

          <ChakraInput
            ref={ref}
            h="100%"
            isInvalid={!!errorText}
            placeholder={String(placeholder ?? '')}
            {...rest}
          />
          {rightElement && (
            <InputRightElement
              pointerEvents="none"
              children={rightElement}
              ml="s4"
              px="s12"
            />
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
  }
);

export default Input;

Input.displayName = 'Input';
