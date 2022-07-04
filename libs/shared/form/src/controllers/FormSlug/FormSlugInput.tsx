import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import { InputProps, SlugInput } from '@coop/shared/ui';

interface IFormPhoneInputProps<T> extends InputProps {
  name: Path<T>;
  control?: Control<T>;
}

export const FormSlugInput = <T,>({
  name,
  ...rest
}: IFormPhoneInputProps<T>) => {
  const methods = useFormContext();

  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <SlugInput
          id={name}
          onChange={onChange}
          value={value}
          errorText={errors[name]?.message}
          {...fieldProps}
          {...rest}
        />
      )}
    />
  );
};

export default FormSlugInput;
