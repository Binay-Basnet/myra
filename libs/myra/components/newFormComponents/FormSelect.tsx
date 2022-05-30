import { Control, Controller } from 'react-hook-form';
import { Select, SelectProps } from '../../ui/src';

interface IFormSelectProps extends SelectProps {
  control: Control;
  name: string;
}

export const FormSelect = ({ control, name, ...rest }: IFormSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Select onChange={onChange} {...rest} />
      )}
    />
  );
};
