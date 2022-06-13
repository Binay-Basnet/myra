import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Box, TextAreaInput, TextAreaInputProps } from '@coop/shared/ui';

interface IFormInputProps extends TextAreaInputProps {
  control: Control;
  name: string;
}

export const FormTextArea = ({
  control,
  name,
  id,
  ...rest
}: IFormInputProps) => {
  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <TextAreaInput id={name} onChange={onChange} {...rest} />
        )}
      />
    </Box>
  );
};
