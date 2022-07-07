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
    <Box display="flex" flexDir="column" gap="s4">
      {label && (
        <TextFields variant="formLabel" color="gray.700">
          {label}
        </TextFields>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          console.log(value, 'fileValue');

          return <FileInput {...rest} value={value} onChange={onChange} />;
        }}
      />
    </Box>
  );
};
