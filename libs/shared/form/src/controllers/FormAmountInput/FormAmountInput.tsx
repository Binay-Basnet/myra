import { Control, Controller, Path, UseControllerProps, useFormContext } from 'react-hook-form';
import { AmountInput, InputProps } from '@myra-ui';

/* eslint-disable-next-line */

interface FormAmountInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
  rules?: UseControllerProps['rules'];
}

export const FormAmountInput = <T,>({ name, ...rest }: FormAmountInputProps<T>) => {
  const methods = useFormContext();

  const {
    formState: { errors },

    control,
  } = methods;

  return (
    <Controller
      control={control}
      name={name}
      rules={rest.rules}
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

export default FormAmountInput;
