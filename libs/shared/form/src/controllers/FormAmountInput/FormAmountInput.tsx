import { Control, Controller, Path, UseControllerProps, useFormContext } from 'react-hook-form';
import { get } from 'lodash';

import { AmountInput, InputProps } from '@myra-ui';

/* eslint-disable-next-line */

interface FormAmountInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
  rules?: UseControllerProps['rules'];
  onChangeAction?: (val: string) => void;
}

export const FormAmountInput = <T,>({ name, onChangeAction, ...rest }: FormAmountInputProps<T>) => {
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
          onChange={(e) => {
            onChange(e?.target?.value);
            onChangeAction && onChangeAction(e?.target?.value);
          }}
          value={value}
          errorText={get(errors, name)?.message as string}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormAmountInput;
