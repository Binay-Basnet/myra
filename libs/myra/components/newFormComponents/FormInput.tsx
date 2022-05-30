import React from 'react';
import { Controller } from 'react-hook-form';
import { Input as StorybookInput, TextFields, Box } from '../../ui/src';

export const FormInput = ({ control, placeholder, name, label, type }) => {
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
          />
        )}
      />
    </Box>
  );
};
