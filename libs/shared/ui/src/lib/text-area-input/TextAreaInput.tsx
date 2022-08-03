import { forwardRef } from 'react';
import { Flex,Textarea, TextareaProps } from '@chakra-ui/react';

import { TextFields } from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface TextAreaInputProps extends TextareaProps {
  label?: string;
  labelColor?: string;
  placeholder?: string;
  id?: string;
}

export const TextAreaInput = forwardRef<HTMLInputElement, TextAreaInputProps>(
  (props, ref) => {
    const { labelColor, label, placeholder, id, ...rest } = props;
    return (
      <Flex flexDir="column" gap="s4">
        {placeholder && (
          <TextFields variant="formLabel" color={labelColor}>
            {label ?? 'Description'}
          </TextFields>
        )}

        <Textarea
          variant="outline"
          placeholder={placeholder ?? 'Add description here'}
          id={id}
          {...rest}
        ></Textarea>
      </Flex>
    );
  }
);

export default TextAreaInput;
