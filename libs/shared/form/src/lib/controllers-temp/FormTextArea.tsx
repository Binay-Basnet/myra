import { Control, Controller, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

import { TextAreaInput, TextAreaInputProps } from '@coop/shared/ui';

interface IFormInputProps extends TextAreaInputProps {
  control?: Control;
  name: string;
  rows?: number;
  rules?: UseControllerProps['rules'];
}

export const FormTextArea = ({ name, rows, rules, ...rest }: IFormInputProps) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control: formControl,
  } = methods;

  const error = errors[name];

  return (
    <Controller
      control={formControl}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <TextAreaInput
          id={name}
          value={value}
          onChange={onChange}
          rows={rows}
          errorText={error?.message?.toString()}
          {...rest}
        />
      )}
    />
  );
};
