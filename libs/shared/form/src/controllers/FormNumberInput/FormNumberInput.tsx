import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

import { Input, InputProps } from '@myra-ui';

interface IFormNumberInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
  rules?: UseControllerProps['rules'];
}

export const FormNumberInput = <T,>({ name, ...rest }: IFormNumberInputProps<T>) => {
  const methods = useFormContext<T>();

  const {
    formState: { errors },
    control,
  } = methods;

  return (
    <Controller
      name={name}
      rules={rest.rules}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <Input
          id={name}
          textAlign="right"
          errorText={errors[name]?.message as string}
          type="number"
          value={value as number}
          onChange={onChange}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormNumberInput;
