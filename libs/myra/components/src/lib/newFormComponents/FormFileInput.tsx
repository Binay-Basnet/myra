import { Control, Controller, useFormContext } from 'react-hook-form';
import { Box, FileInput, FileInputProps, TextFields } from '@coop/shared/ui';

interface FormFileInputProps extends FileInputProps {
  control?: Control;
  name: string;
  label?: string;
  id?: string;
}

export const FormFileInput = ({
  control,
  name,
  label,
  ...rest
}: FormFileInputProps) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control: formControl,
  } = methods;

  const error = errors[name];
  return (
    <Box>
      {label && (
        <TextFields variant="formLabel" mb="s4">
          {label}
        </TextFields>
      )}

      <Controller
        control={formControl}
        name={name}
        render={({ field: { onChange } }) => (
          <FileInput {...rest} onChange={onChange} />
        )}
      />
      {error ? error?.message : null}
    </Box>
  );
};
