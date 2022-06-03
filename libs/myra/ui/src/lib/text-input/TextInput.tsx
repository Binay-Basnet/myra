import { forwardRef } from 'react';
import { Input, InputProps } from '@chakra-ui/react';

import { TextFields } from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface TextInputProps extends InputProps {
  label?: string;
  labelColor?: string;
  placeholder?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { labelColor, label, placeholder, ...rest } = props;
    return (
      <>
        <TextFields
          mb="s4"
          variant="formLabel"
          whiteSpace="nowrap"
          color={labelColor ?? 'gray.700'}
        >
          {label}
        </TextFields>
        <Input
          flexGrow={0}
          variant={'outline'}
          type="text"
          borderRadius="br2"
          placeholder={placeholder ?? 'Enter your Name'}
          ref={ref}
          {...rest}
        />
      </>
    );
  }
);

export default TextInput;
