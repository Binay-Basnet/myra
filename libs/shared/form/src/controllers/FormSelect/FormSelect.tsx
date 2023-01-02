import { useEffect } from 'react';
import { Control, Controller, FieldValues, useFormContext } from 'react-hook-form';
import { ControllerRenderProps, UseControllerProps } from 'react-hook-form/dist/types/controller';
import { get } from 'lodash';

import { Select, SelectProps } from '@myra-ui';

interface IFormSelectProps<T extends Record<string, unknown>> extends SelectProps {
  control?: Control<T>;
  name?: string;
  showAll?: boolean;
  rules?: UseControllerProps['rules'];
}

interface Option {
  label: string;
  value: string;
}

export const FormSelect = <T extends Record<string, unknown>>(props: IFormSelectProps<T>) => {
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
      name={name ?? ''}
      render={({ field }) => <FormControl field={field} errors={errors} {...props} />}
    />
  );
};

interface FormControlProps<T extends Record<string, unknown>> extends IFormSelectProps<T> {
  errors: any;
  field: ControllerRenderProps<FieldValues, string>;
}

const FormControl = <T extends Record<string, unknown>>({
  name,
  options: selectOptions,
  errors,
  field: { onChange, value },
  showAll,
  ...rest
}: FormControlProps<T>) => {
  const options = showAll
    ? [{ label: 'All', value: 'ALL' }, ...(selectOptions || [])]
    : selectOptions;

  const foundValue = options?.find((option) => option.value === value);

  const methods = useFormContext();
  const { clearErrors } = methods;

  const filteredValue = rest.isMulti
    ? options?.filter(
        (option) =>
          value?.some((v: Option) => v?.value === option.value) || value?.includes(option?.value)
      )
    : [];

  useEffect(() => {
    if (rest.isMulti) {
      onChange(filteredValue);
    }
  }, []);

  return (
    <Select
      errorText={name ? (get(errors, name)?.message as string) : undefined}
      options={options}
      value={rest.isMulti ? filteredValue : foundValue}
      inputId={name}
      {...rest}
      onChange={(newValue: Option | Option[]) => {
        if (errors[name as string]?.type === 'required') {
          clearErrors(name);
        }
        if (Array.isArray(newValue)) {
          onChange(newValue);
        } else {
          const { value: newVal } = newValue as Option;
          onChange(newVal);
        }
      }}
    />
  );
};

export default FormSelect;
