import { Control, Controller, useFormContext } from 'react-hook-form';

import { Box, FileInput, FileInputProps, TextFields } from '@coop/shared/ui';

interface FormFileInputProps extends FileInputProps {
  control?: Control;
  name: string;
  label?: string;
  id?: string;
}

export const FormFileInput = ({ name, label, ...rest }: FormFileInputProps) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  const error = errors[name];

  return (
    <>
      {label && (
        <TextFields variant="formLabel" color="gray.700">
          {label}
        </TextFields>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <FileInput {...rest} onChange={onChange} />
        )}
      />
      {error ? error?.message : null}
    </>
  );
};
