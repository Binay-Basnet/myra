import React from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { HiPhone } from 'react-icons/hi';

import { Icon, Input, InputProps } from '@coop/shared/ui';

interface IFormPhoneInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
}

export const FormPhoneNumber = <T,>({
  name,
  ...rest
}: IFormPhoneInputProps<T>) => {
  const methods = useFormContext();

  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <Input
          id={name}
          type="number"
          onChange={onChange}
          value={value}
          leftElement={<Icon as={HiPhone} size="sm" />}
          errorText={errors[name]?.message as string}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormPhoneNumber;
