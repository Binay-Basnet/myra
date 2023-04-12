import { Control, Controller, useFormContext } from 'react-hook-form';

import { Box, FileInputProps, NeosysFileInput, Text } from '@myra-ui';

interface FormFileInputProps extends FileInputProps {
  control?: Control;
  name: string;
  label?: string;
  id?: string;
}

export const FormNeosysFileInput = ({ name, label, ...rest }: FormFileInputProps) => {
  const methods = useFormContext();

  const {
    // formState: { errors },
    control,
  } = methods;

  // const error = errors[name];

  return (
    <Box display="flex" flexDir="column" gap="s4">
      {label && (
        <Text variant="formLabel" color="gray.700" whiteSpace="nowrap">
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <NeosysFileInput value={value} onChange={onChange} {...rest} />
        )}
      />
    </Box>
  );
};
