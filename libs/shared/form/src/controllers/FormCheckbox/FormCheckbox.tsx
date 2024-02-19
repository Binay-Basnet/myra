import { Controller, Path, useFormContext } from 'react-hook-form';

import { Checkbox, CheckboxProps } from '@myra-ui';

interface IFormCheckboxProps<T> extends CheckboxProps {
  name: Path<T>;
  onChangeAction?: (val: boolean) => void;
}

export const FormCheckbox = <T,>({ name, onChangeAction, ...rest }: IFormCheckboxProps<T>) => {
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
          onChange={(e) => {
            onChange(e);
            onChangeAction && onChangeAction(e.target.checked);
          }}
          isChecked={value}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormCheckbox;
