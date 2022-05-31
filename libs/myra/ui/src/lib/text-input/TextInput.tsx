import { Text, TextProps, Input, InputProps } from '@chakra-ui/react';
import { TextFields } from '@saccos/myra/ui';
import { forwardRef } from 'react';
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
          color={labelColor ?? 'gray.700'}
        >
          {' '}
          {label}
        </TextFields>
        <Input
          p="s12"
          variant={'outline'}
          type="text"
          fontSize={'s2'}
          placeholder={placeholder ?? 'Enter your Name'}
          ref={ref}
          {...rest}
        />
      </>
    );
  }
);

export default TextInput;
