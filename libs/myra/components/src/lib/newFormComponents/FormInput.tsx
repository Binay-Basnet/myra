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
  console.log('errors', errors);
  // let error;
  // if (name in errors) {
  //   error = errors[name];
  // }
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
      {/* {error ? error?.message : null} */}
    </Box>
  );
};
