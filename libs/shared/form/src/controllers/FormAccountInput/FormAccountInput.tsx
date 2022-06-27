import React from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import { InputProps, AmountInput } from '@coop/shared/ui';

/* eslint-disable-next-line */
interface FormAccountInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
}
export const FormAccountInput = <T,>({
  name,
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

export default FormAccountInput;
