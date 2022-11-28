import { ForwardedRef, forwardRef } from 'react';
import { Flex, Textarea, TextareaProps } from '@chakra-ui/react';

import { TextFields } from '../text-fields/TextFields';

/* eslint-disable-next-line */
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
        <TextFields variant="formLabel" color="gray.800">
          {label ?? 'Description'}
        </TextFields>
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
        <TextFields variant="formHelper" color="danger.500">
          {errorText}
        </TextFields>
      )}
    </Flex>
  );
});

export default TextAreaInput;
