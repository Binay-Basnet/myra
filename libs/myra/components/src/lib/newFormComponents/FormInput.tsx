import { Control, Controller, Path } from 'react-hook-form';
import { useFormState } from 'react-hook-form';
import { Box, TextInput, TextInputProps } from '@coop/myra/ui';
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
  const { errors } = useFormState({
    control,
  });

  const error = errors[name];
  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <TextInput
            placeholder={placeholder}
            name={name}
            id={name}
            onChange={onChange}
            {...rest}
          />
        )}
      />
      {error ? error.message : null}
    </Box>
  );
};
