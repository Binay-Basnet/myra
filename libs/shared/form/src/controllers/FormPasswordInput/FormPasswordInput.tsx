import { Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

import { InputProps, PasswordInput } from '@coop/shared/ui';

interface IFormPasswordInputProps<T> extends InputProps {
  name: Path<T> | string;
  rules?: UseControllerProps['rules'];
}

export const FormPasswordInput = <T,>({ name, ...rest }: IFormPasswordInputProps<T>) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    clearErrors,
    control,
  } = methods;

  return (
    <Controller
      name={name}
      rules={rest.rules}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <PasswordInput
          id={name}
          errorText={errors[name]?.message as string}
          onChange={(e) => {
            onChange(e);
            if (errors[name]?.type === 'required') {
              clearErrors(name);
            }
          }}
          value={value}
          {...rest}
          {...fieldProps}
        />
      )}
    />
  );
};

export default FormPasswordInput;
