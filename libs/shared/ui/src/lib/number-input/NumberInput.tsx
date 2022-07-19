import { forwardRef, useState } from 'react';
import {
  Box,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputProps as ChakraNumberInputProps,
} from '@chakra-ui/react';

import { TextFields } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface NumberInputProps extends ChakraNumberInputProps {
  helperText?: string;
  errorText?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  handleChange?: (val: string) => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      helperText,
      errorText,
      label,
      placeholder,
      handleChange,
      value,
      ...rest
    }: NumberInputProps,
    ref
  ) => {
    const format = (val: string) =>
      val ? parseInt(val).toLocaleString('en-IN') : '';
    const parse = (val: string) => val.replace(/\D/g, '');

    const [tempValue, setTempValue] = useState<string>(value ?? '');

    const change = (val: string) => {
      setTempValue(val);
      handleChange && handleChange(parse(val));
    };

    const handleBlur = () => {
      setTempValue(format(tempValue));
    };

    const handleFocus = () => {
      setTempValue(parse(tempValue));
    };

    return (
      <Box w="auto" display="flex" flexDirection="column" flexGrow={1} gap="s4">
        {label && (
          <TextFields variant="formLabel" color="gray.700">
            {label}
          </TextFields>
        )}

        <ChakraNumberInput
          ref={ref}
          h="100%"
          isInvalid={!!errorText}
          onChange={change}
          value={tempValue}
          onFocus={handleFocus}
          borderRadius="md"
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

export default NumberInput;
