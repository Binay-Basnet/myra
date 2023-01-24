import { Control, Controller, FieldValues, useFormContext } from 'react-hook-form';
import { ControllerRenderProps, UseControllerProps } from 'react-hook-form/dist/types/controller';

import { SelectPopout, TSelectPopoutProps } from '@myra-ui';

type Option = {
  label: string;
  value: string;
};

type IFormSelectPopoutProps<T extends Record<string, unknown>> = TSelectPopoutProps & {
  control?: Control<T>;
  name?: string;
  showAll?: boolean;
  optionType?: 'default' | 'member' | undefined;
  rules?: UseControllerProps['rules'];
};

export const FormSelectPopout = <T extends Record<string, unknown>>(
  props: IFormSelectPopoutProps<T>
) => {
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

type FormControlProps<T extends Record<string, unknown>> = IFormSelectPopoutProps<T> & {
  name?: string;
  errors: any;
  field: ControllerRenderProps<FieldValues, string>;
};

const FormControl = <T extends Record<string, unknown>>({
  name,
  errors,
  field: { onChange, value },
  ...rest
}: FormControlProps<T>) => {
  const methods = useFormContext();
  const { clearErrors } = methods;

  return (
    <SelectPopout
      value={value}
      inputId={name}
      {...rest}
      onChange={(newValue) => {
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

export default FormSelectPopout;
