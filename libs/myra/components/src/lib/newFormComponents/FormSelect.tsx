import { Control, Controller, Path } from 'react-hook-form';
import { Select, SelectProps } from '@coop/shared/ui';

interface IFormSelectProps<T> extends SelectProps {
  control: Control<T>;
  name: Path<T>;
}

export const FormSelect = <T,>({
  control,
  name,
  ...rest
}: IFormSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Select
          {...rest}
          onChange={(newValue: { label: string; value: string }) => {
            onChange(newValue.value);
          }}
          inputId={name}
        />
      )}
    />
  );
};
