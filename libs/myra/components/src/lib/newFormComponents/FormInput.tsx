import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { Box, TextInput, TextInputProps } from '@coop/myra/ui';
interface IFormInputProps<T> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
}

export function FormInput<T>({
  placeholder,
  name,
  type,
  ...rest
}: IFormInputProps<T>) {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  const error = errors[name];

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <TextInput
            id={name}
            placeholder={placeholder}
            name={name}
            type={type}
            onChange={onChange}
            {...rest}
          />
        )}
      />
      {error ? error?.message : null}
    </Box>
  );
}
