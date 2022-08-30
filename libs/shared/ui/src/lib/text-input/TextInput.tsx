import { forwardRef } from 'react';
import { Input, InputProps } from '@chakra-ui/react';

import { TextFields } from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface TextInputProps extends InputProps {
  label?: string;
  labelColor?: string;
  __placeholder?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { labelColor, label, __placeholder, ...rest } = props;
    return (
      <>
        {label && (
          <TextFields
            mb="s4"
            variant="formLabel"
            whiteSpace="nowrap"
            color={labelColor ?? 'gray.700'}
          >
            {label}
          </TextFields>
        )}

        <Input
          flexGrow={0}
          variant={'outline'}
          type="text"
          borderRadius="br2"
          __placeholder={__placeholder ?? 'Enter'}
          ref={ref}
          {...rest}
        />
      </>
    );
  }
);

export default TextInput;
