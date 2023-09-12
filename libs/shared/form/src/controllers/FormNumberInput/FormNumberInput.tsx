import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

import { Input, InputProps } from '@myra-ui';

interface IFormNumberInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
  rules?: UseControllerProps['rules'];
  onChangeAction?: (val: string) => void;
}

export const FormNumberInput = <T,>({
  name,
  onChangeAction,
  ...rest
}: IFormNumberInputProps<T>) => {
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
          onChange={(e) => {
            onChange(e?.target?.value);
            onChangeAction && onChangeAction(e?.target?.value);
          }}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormNumberInput;
