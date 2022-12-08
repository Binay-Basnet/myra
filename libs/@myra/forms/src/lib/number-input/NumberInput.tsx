import { FocusEvent, forwardRef, useState } from 'react';
import {
  Box,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputProps as ChakraNumberInputProps,
} from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';
/* eslint-disable-next-line */
export interface NumberInputProps extends ChakraNumberInputProps {
  helperText?: string;
  errorText?: string;
  label?: string;
  __placeholder?: string;
  placeholder?: string;
  value?: string;
  handleChange?: (val: string) => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { helperText, errorText, label, placeholder, handleChange, value, ...rest }: NumberInputProps,
    ref
  ) => {
    const format = (val: string) => (val ? parseFloat(val).toLocaleString('en-IN') : '');
    const parse = (val: string) => val.replace(/,/g, '');

    const [tempValue, setTempValue] = useState<string>(value ?? '');

    const change = (val: string) => {
      setTempValue(val);
      handleChange && handleChange(parse(val));
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setTempValue(format(e.target.value));
    };

    const handleFocus = () => {
      setTempValue(parse(tempValue));
    };

    return (
      <Box w="auto" display="flex" flexDirection="column" flexGrow={1} gap="s4">
        {label && (
          <Text variant="formLabel" color="gray.700">
            {label}
          </Text>
        )}

        <ChakraNumberInput
          ref={ref}
          h="100%"
          isInvalid={!!errorText}
          onChange={change}
          value={tempValue}
          onFocus={handleFocus}
          borderRadius="md"
          step={0.01}
          {...rest}
        >
          <ChakraNumberInputField
            onBlur={handleBlur}
            placeholder={String(placeholder ?? '0.0')}
            textAlign="right"
            _focus={{ borderColor: 'primary.500' }}
          />
        </ChakraNumberInput>

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
  }
);

export default NumberInput;
