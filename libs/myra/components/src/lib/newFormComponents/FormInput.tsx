import { Control, Controller, Path } from 'react-hook-form';
import { Box, TextInput, TextInputProps } from '@saccos/myra/ui';

interface IFormInputProps<T> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
}

export const FormInput = <T,>({
  control,
  placeholder,
  name,
  type,
  ...rest
}: IFormInputProps<T>) => {
  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <TextInput placeholder={placeholder} onChange={onChange} {...rest} />
        )}
      />
    </Box>
  );
};
