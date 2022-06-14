import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import {
  Box,
  EmailInput as StorybookInput,
  EmailInputProps as StorybookInputProps,
  TextFields,
} from '@coop/shared/ui';

interface Iprops extends StorybookInputProps {
  control?: Control<any>;
  name: string;
}

export const FormEmailInput = ({
  control,
  placeholder,
  name,
  label,
  type,
}: Iprops) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control: formControl,
  } = methods;

  const error = errors[name];
  return (
    <Box display="flex" flexDirection="column">
      <TextFields fontSize="s3">{label}</TextFields>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <StorybookInput
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            bg="white"
            fontSize={14}
            id={name}
          />
        )}
      />
      {error ? error?.message : null}
    </Box>
  );
};
