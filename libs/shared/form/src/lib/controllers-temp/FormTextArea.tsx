import { Control, Controller, useFormContext } from 'react-hook-form';

import { TextAreaInput, TextAreaInputProps } from '@coop/shared/ui';

interface IFormInputProps extends TextAreaInputProps {
  control?: Control;
  name: string;
  rows?: number;
}

export const FormTextArea = ({ name, rows, ...rest }: IFormInputProps) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control: formControl,
  } = methods;

  const error = errors[name];

  return (
    <>
      <Controller
        control={formControl}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextAreaInput
            id={name}
            value={value}
            onChange={onChange}
            rows={rows}
            {...rest}
          />
        )}
      />
      {error ? error?.message : null}
    </>
  );
};
