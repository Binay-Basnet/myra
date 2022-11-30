import { Control, Controller, useFormContext } from 'react-hook-form';
import { Box } from '@chakra-ui/react';
import { RadioGroup, RadioGroupProps, TextFields } from '@myra-ui';
import { get } from 'lodash';

interface IFormSelectProps extends RadioGroupProps {
  control?: Control;
  name: string;
  label?: string;
}

export const FormRadioGroup = ({ name, label, ...rest }: IFormSelectProps) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  const errorText = get(errors, name)?.message as string;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box display="flex" flexDirection="column" gap="s16">
          {label && <TextFields variant="formLabel">{label}</TextFields>}
          <RadioGroup
            {...rest}
            value={value}
            onChange={onChange}
            errorMessage={errorText}
            name={name}
            id={name}
          />
        </Box>
      )}
    />
  );
};
