import { Control, Controller, useFormContext } from 'react-hook-form';
import {
  Box,
  PhoneNumber as StorybookInput,
  PhoneNumberProps as StorybookInputProps,
  TextFields,
} from '@coop/shared/ui';

interface Iprops extends StorybookInputProps {
  control?: Control<any>;
  name: string;
}

export const FormPhoneNumber = ({
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
        control={formControl}
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
