import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Box,
  EmailInput as StorybookInput,
  EmailInputProps as StorybookInputProps,
  TextFields,
} from '@saccos/myra/ui';

interface Iprops extends StorybookInputProps {
  control: Control<any>;
  name: string;
}

export const FormEmailInput = ({
  control,
  placeholder,
  name,
  label,
  type,
}: Iprops) => {
  return (
    <Box display="flex" flexDirection="column">
      <TextFields fontSize="s3">{label}</TextFields>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <StorybookInput
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            bg="white"
            fontSize={14}
          />
        )}
      />
    </Box>
  );
};
