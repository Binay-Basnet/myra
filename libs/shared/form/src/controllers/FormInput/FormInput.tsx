import { Control, Controller, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { get } from 'lodash';

import { Input, InputProps } from '@myra-ui';

interface IFormInputProps<T extends Record<string, unknown>> extends InputProps {
  name: string;
  control?: Control<T>;
  rules?: UseControllerProps['rules'];
  onChangeAction?: (val: string) => void;
}

export const FormInput = <T extends Record<string, unknown>>({
  name,
  onChangeAction,
  ...rest
}: IFormInputProps<T>) => {
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
        <Input
          id={name}
          errorText={get(errors, name)?.message as string}
          onChange={(e) => {
            onChange(e);
            onChangeAction && onChangeAction(e?.target?.value);
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

export default FormInput;
