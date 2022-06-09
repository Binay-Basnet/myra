import { Control, Controller } from 'react-hook-form';
import {
  Box,
  PhoneNumber as StorybookInput,
  PhoneNumberProps as StorybookInputProps,
  TextFields,
} from '@coop/myra/ui';

interface Iprops extends StorybookInputProps {
  control: Control<any>;
  name: string;
}

export const FormPhoneNumber = ({
  control,
  placeholder,
  name,
  label,
  type,
}: Iprops) => {
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
    </Box>
  );
};
