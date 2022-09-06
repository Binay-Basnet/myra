import React from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import { AmountInput, InputProps } from '@coop/shared/ui';

/* eslint-disable-next-line */
interface FormAccountInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
}

export const FormAccountInput = <T,>({
  name,
  __placeholder,
  ...rest
}: FormAccountInputProps<T>) => {
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
        <AmountInput
          id={name}
          onChange={onChange}
          value={value}
          errorText={errors[name]?.message as string}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormAccountInput;
