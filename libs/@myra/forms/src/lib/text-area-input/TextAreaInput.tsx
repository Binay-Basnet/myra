import { ForwardedRef, forwardRef } from 'react';
import { Flex, Textarea, TextareaProps } from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';

export interface TextAreaInputProps extends TextareaProps {
  label?: string;
  labelColor?: string;
  __placeholder?: string;
  placeholder?: string;
  id?: string;
  errorText?: string;
}

export const TextAreaInput = forwardRef<HTMLInputElement, TextAreaInputProps>((props, ref) => {
  const { label, placeholder, errorText, id, ...rest } = props;
  return (
    <Flex flexDir="column" gap="s4">
      {label && (
        <Text variant="formLabel" color="gray.800">
          {label ?? 'Description'}
        </Text>
      )}

      <Textarea
        borderColor={errorText ? 'danger.500' : 'gray.300'}
        variant="outline"
        maxH="200px"
        __placeholder={placeholder ?? 'Add description here'}
        id={id}
        size="sm"
        ref={ref as unknown as ForwardedRef<HTMLTextAreaElement>}
        {...rest}
      />

      {errorText && (
        <Text variant="formHelper" color="danger.500">
          {errorText}
        </Text>
      )}
    </Flex>
  );
});

export default TextAreaInput;
