import { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import {
  ControllerRenderProps,
  UseControllerProps,
} from 'react-hook-form/dist/types/controller';

// import { Select, SelectProps } from '@coop/shared/ui';
import { Option, Select, SelectProps } from './CustomSelect';

interface IFormCustomSelectProps<T> extends SelectProps {
  control?: Control<T>;
  name: string;
  rules?: UseControllerProps['rules'];
}

export const FormCustomSelect = <T,>(props: IFormCustomSelectProps<T>) => {
  const { name, ...rest } = props;

  const methods = useFormContext();
  const {
    formState: { errors },
    control: formControl,
  } = methods;

  return (
    <Controller
      control={formControl}
      rules={rest.rules}
      name={name}
      render={({ field }) => {
        return <FormControl field={field} errors={errors} {...props} />;
      }}
    />
  );
};

interface FormControlProps<T> extends IFormCustomSelectProps<T> {
  errors: any;
  field: ControllerRenderProps<FieldValues, string>;
}

const FormControl = <T,>({
  name,
  options,
  errors,
  field: { onChange, value },
  ...rest
}: FormControlProps<T>) => {
  const foundValue = options?.find((option) => option.value === value);

  const filteredValue = rest.isMulti
    ? options?.filter(
        (option) =>
          value?.some((v: Option) => v?.value === option.value) ||
          value?.includes(option?.value)
      )
    : [];

  useEffect(() => {
    if (rest.isMulti) {
      onChange(filteredValue);
    }
  }, []);

  return (
    <Select
      errorText={errors[name]?.message}
      options={options}
      value={rest.isMulti ? filteredValue : foundValue}
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
};

export default FormCustomSelect;
