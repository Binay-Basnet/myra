import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

import { NumberInput, NumberInputProps } from '@coop/shared/ui';

interface IFormNumberInputProps<T> extends NumberInputProps {
  name: Path<T> | string;
  control?: Control<T>;
  rules?: UseControllerProps['rules'];
}

export const FormNumberInput = <T,>({
  name,
  ...rest
}: IFormNumberInputProps<T>) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  return (
    <Controller
      name={name}
      rules={rest.rules}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => {
        return (
          <NumberInput
            id={name}
            errorText={errors[name]?.message as string}
            handleChange={onChange}
            value={value}
            {...rest}
            {...fieldProps}
          />
        );
      }}
    />
  );
};

export default FormNumberInput;
