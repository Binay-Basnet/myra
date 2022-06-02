import { Control, Controller } from 'react-hook-form';
import { Select, SelectProps } from '@saccos/myra/ui';

interface IFormSelectProps extends SelectProps {
  control: Control;
  name: string;
  onChange?: (e: unknown) => void; // TODO Change this typeacript
}

export const FormSelect = ({
  control,
  name,
  onChange: onChangeFromProps,
  ...rest
}: IFormSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Select
          onChange={(e) => {
            onChange(e);
            onChangeFromProps && onChangeFromProps(e);
          }}
          {...rest}
        />
      )}
    />
  );
};
