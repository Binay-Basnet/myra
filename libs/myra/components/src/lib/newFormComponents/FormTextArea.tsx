import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Box, TextAreaInput, TextAreaInputProps } from '@saccos/myra/ui';

interface IFormInputProps extends TextAreaInputProps {
  control: Control;
  name: string;
}

export const FormTextArea = ({ control, name, ...rest }: IFormInputProps) => {
  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <TextAreaInput onChange={onChange} {...rest} />
        )}
      />
    </Box>
  );
};
