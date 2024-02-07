import { Control, Controller, useFormContext } from 'react-hook-form';

import { Box, FileInput, FileInputProps, Text } from '@myra-ui';

interface FormFileInputProps extends FileInputProps {
  control?: Control;
  name: string;
  label?: string;
  id?: string;
  isPdf?: boolean;
}

export const FormFileInput = ({ name, label, ...rest }: FormFileInputProps) => {
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
          <FileInput value={value} onChange={onChange} name={name} {...rest} />
        )}
      />
    </Box>
  );
};
