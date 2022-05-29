import React from 'react';
import { Controller } from 'react-hook-form';
import { BaseSelect as StorybookSelect, Box, TextFields } from '../../ui/src';

export const FormSelect = ({ control, placeholder, name, label, options }) => {
  return (
    <Box display="flex" flexDirection="column">
      <TextFields fontSize="s3">{label}</TextFields>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <StorybookSelect
            placeholder={placeholder}
            onChange={onChange}
            options={options}
          />
        )}
      />
    </Box>
  );
};
