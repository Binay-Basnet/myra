import React from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import { Icon, Input, InputProps } from '@coop/shared/ui';

interface IFormEmailInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
}

export const FormEmailInput = <T,>({
  name,
  ...rest
}: IFormEmailInputProps<T>) => {
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
          type="email"
          leftElement={<Icon as={MdEmail} size="sm" />}
          errorText={errors[name]?.message}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormEmailInput;
