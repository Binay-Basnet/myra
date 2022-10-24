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
}

export const TextAreaInput = forwardRef<HTMLInputElement, TextAreaInputProps>((props, ref) => {
  const { label, placeholder, id, ...rest } = props;
  return (
    <Flex flexDir="column" gap="s4">
      {label && (
        <TextFields variant="formLabel" color="gray.800">
          {label ?? 'Description'}
        </TextFields>
      )}

      <Textarea
        variant="outline"
        __placeholder={placeholder ?? 'Add description here'}
        id={id}
        size="sm"
        ref={ref as unknown as ForwardedRef<HTMLTextAreaElement>}
        {...rest}
      />
    </Flex>
  );
});

export default TextAreaInput;
