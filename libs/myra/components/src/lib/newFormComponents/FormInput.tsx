import React from 'react';
import { Controller } from 'react-hook-form';
import { Box, Input as StorybookInput, TextFields } from '@saccos/myra/ui';

export const FormInput = ({ control, placeholder, name, label, type }: any) => {
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
