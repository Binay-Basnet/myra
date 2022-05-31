import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput as StorybookInput, TextFields, Box } from '../../ui/src';

export const FormTextInput = ({ control, placeholder, name, label, type }) => {
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
