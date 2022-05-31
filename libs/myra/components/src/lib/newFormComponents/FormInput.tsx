import { Control, Controller } from 'react-hook-form';
import { Box, TextInput, TextInputProps } from '../../ui/src';

interface IFormInputProps extends TextInputProps {
  control: Control;
  name: string;
}

export const FormInput = ({
  control,
  placeholder,
  name,
  type,
  ...rest
}: IFormInputProps) => {
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
