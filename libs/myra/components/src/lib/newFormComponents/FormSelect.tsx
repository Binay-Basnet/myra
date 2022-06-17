import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import { Box, Select, SelectProps } from '@coop/shared/ui';

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

  const error = errors[name];
  return (
    <Box>
      <Controller
        control={formControl}
        name={name}
        render={({ field: { onChange, value } }) => {
          const foundValue = options.find((option) => option.value === value);

          return (
            <Select
              {...rest}
              options={options}
              value={foundValue}
              onChange={(newValue: { label: string; value: string }) => {
                onChange(newValue.value);
              }}
              inputId={name}
            />
          );
        }}
      />
      {error ? error?.message : null}
    </Box>
  );
};
