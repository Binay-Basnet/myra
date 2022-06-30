import React from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';

import { Box, RadioGroup, RadioGroupProps, TextFields } from '@coop/shared/ui';

interface IFormSelectProps extends RadioGroupProps {
  control?: Control;
  name: string;
  label?: string;
}

export const FormRadioGroup = ({ name, label, ...rest }: IFormSelectProps) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  const error = errors[name];
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box display="flex" flexDirection="column" gap="s16">
          <TextFields variant="formLabel">{label}</TextFields>
          <RadioGroup {...rest} value={value} onChange={onChange} name={name} />
          {error ? error?.message : null}
        </Box>
      )}
    />
  );
};
