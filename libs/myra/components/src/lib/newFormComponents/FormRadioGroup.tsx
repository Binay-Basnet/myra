import React from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { Box, RadioGroup, RadioGroupProps, TextFields } from '@coop/shared/ui';

interface IFormSelectProps extends RadioGroupProps {
  control?: Control;
  name: string;
  label?: string;
}

export const FormRadioGroup = ({
  control,
  name,
  label,
  ...rest
}: IFormSelectProps) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control: formControl,
  } = methods;

  const error = errors[name];
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Box display="flex" flexDirection="column" gap="s8">
          <TextFields variant="formLabel">{label}</TextFields>
          <RadioGroup
            {...rest}
            onChange={(e) => {
              onChange(e.target.value.toLowerCase() === 'yes');
            }}
          />
          {error ? error?.message : null}
        </Box>
      )}
    />
  );
};
