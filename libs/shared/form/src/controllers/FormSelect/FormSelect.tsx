import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import { Select, SelectProps } from '@coop/shared/ui';

interface IFormSelectProps<T> extends SelectProps {
  control?: Control<T>;
  name: Path<T>;
}

export const FormSelect = <T,>({
  control,
  name,
  options,
  ...rest
}: IFormSelectProps<T>) => {
  const methods = useFormContext();
  const {
    formState: { errors },
    control: formControl,
  } = methods;

  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field: { onChange, value } }) => {
        const foundValue = options?.find((option) => option.value === value);

        return (
          <Select
            errorText={errors[name]?.message}
            options={options}
            value={foundValue}
            onChange={(newValue: { label: string; value: string }) => {
              onChange(newValue.value);
            }}
            inputId={name}
            {...rest}
          />
        );
      }}
    />
  );
};

export default FormSelect;
