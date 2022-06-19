import React from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import { Input, InputProps } from '@coop/shared/ui';

interface IFormInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
}

export const FormInput = <T,>({ name, ...rest }: IFormInputProps<T>) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <Input
          id={name}
          errorText={errors[name]?.message}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormInput;
