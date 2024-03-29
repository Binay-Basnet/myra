import { Controller, Path, useFormContext } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import { Icon, Input, InputProps } from '@myra-ui';

interface IFormEmailInputProps<T> extends InputProps {
  name: Path<T>;
}

export const FormEmailInput = <T,>({ name, ...rest }: IFormEmailInputProps<T>) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <Input
          id={name}
          type="email"
          onChange={onChange}
          value={value}
          leftElement={<Icon as={MdEmail} size="sm" zIndex={-1} />}
          errorText={errors[name]?.message as string}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormEmailInput;
