import React from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import { Input, InputProps } from '@coop/shared/ui';

interface IFormAmountInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
}

export const FormAmountInput = <T,>({
  name,
  ...rest
}: IFormAmountInputProps<T>) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <Input
          id={name}
          type="number"
          onChange={onChange}
          textAlign="right"
          value={value}
          errorText={errors[name]?.message}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormAmountInput;
