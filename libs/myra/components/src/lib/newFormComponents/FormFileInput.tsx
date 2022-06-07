import { Control, Controller } from 'react-hook-form';
import { Box, FileInput, FileInputProps, TextFields } from '@coop/myra/ui';

interface FormFileInputProps extends FileInputProps {
  control: Control;
  name: string;
  label?: string;
}

export const FormFileInput = ({
  control,
  name,
  label,
  ...rest
}: FormFileInputProps) => {
  return (
    <Box>
      {label && (
        <TextFields variant="formLabel" mb="s4">
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
    </Box>
  );
};
