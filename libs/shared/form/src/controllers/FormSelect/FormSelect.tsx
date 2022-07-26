import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

import { Select, SelectProps } from '@coop/shared/ui';

interface IFormSelectProps<T> extends SelectProps {
  control?: Control<T>;
  name: Path<T>;
  rules?: UseControllerProps['rules'];
}

interface Option {
  label: string;
  value: string;
}

export const FormSelect = <T,>({
  control,
  name,
  options,
  ...rest
}: IFormSelectProps<T>) => {
  const methods = useFormContext();
  const {
    formState: { errors },
    control: formControl,
    watch,
  } = methods;

  return (
    <Controller
      control={formControl}
      rules={rest.rules}
      name={name}
      render={({ field: { onChange, value } }) => {
        const foundValue = options?.find((option) => option.value === value);
        console.log(value);
        // if (rest?.isMulti) {
        //   const multiValue = value?.map((val: Option) => val.value);
        //   console.log(multiValue);
        // }
        return (
          <Select
            errorText={errors[name]?.message}
            options={options}
            value={rest.isMulti ? value : foundValue}
            inputId={name}
            {...rest}
            onChange={(newValue: Option | Option[]) => {
              if (Array.isArray(newValue)) {
                onChange(newValue);
              } else {
                const { value } = newValue as Option;
                onChange(value);
              }
            }}
          />
        );
      }}
    />
  );
};

export default FormSelect;
