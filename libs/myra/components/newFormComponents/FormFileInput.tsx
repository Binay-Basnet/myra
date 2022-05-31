import { Control, Controller } from 'react-hook-form';
import { FileInput, FileInputProps } from '../../ui/src';

interface FormFileInputProps extends FileInputProps {
  control: Control;
  name: string;
}

export const FormFileInput = ({
  control,
  name,
  ...rest
}: FormFileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <FileInput onChange={onChange} {...rest} />
      )}
    />
  );
};
