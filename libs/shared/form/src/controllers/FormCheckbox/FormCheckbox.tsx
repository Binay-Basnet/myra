import React from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

import { Checkbox, CheckboxProps } from '@coop/shared/ui';

interface IFormCheckboxProps<T> extends CheckboxProps {
  name: Path<T>;
}

export const FormCheckbox = <T,>({ name, ...rest }: IFormCheckboxProps<T>) => {
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
        <Checkbox
          isInvalid={!!errors[name]?.message}
          id={name}
          onChange={onChange}
          isChecked={value}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormCheckbox;
