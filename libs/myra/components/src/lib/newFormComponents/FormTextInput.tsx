import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Box,
  TextFields,
  TextInput as StorybookInput,
  TextInputProps,
} from '@coop/shared/ui';

interface Iprops extends TextInputProps {
  control: Control<any>;
  name: string;
}

export const FormTextInput = ({
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
