import { forwardRef } from 'react';
import { Textarea, TextareaProps } from '@chakra-ui/react';

import { TextFields } from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface TextAreaInputProps extends TextareaProps {
  label?: string;
  labelColor?: string;
  placeholder?: string;
}

export const TextAreaInput = forwardRef<HTMLInputElement, TextAreaInputProps>(
  (props, ref) => {
    const { labelColor, label, placeholder, ...rest } = props;
    return (
      <>
        <TextFields variant="formLabel" color={labelColor}>
          {' '}
          {label ?? 'Description'}
        </TextFields>
        <Textarea
          minH="64px"
          placeholder={placeholder ?? 'Add description here'}
          mt="s4"
          h={'auto'}
          p="s12"
          fontSize={'s2'}
          focusBorderColor="primary.500"
        ></Textarea>
      </>
    );
  }
);

export default TextAreaInput;
