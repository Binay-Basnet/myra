import { Control, Controller, useFormContext } from 'react-hook-form';
import { Box } from '@chakra-ui/react';

import { RadioGroup, RadioGroupProps, TextFields } from '@myra-ui';

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

  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Box display="flex" flexDirection="column" gap="s16">
          {label && <TextFields variant="formLabel">{label}</TextFields>}
          <RadioGroup {...rest} value={value} onChange={onChange} name={name} id={name} />
          {error ? (
            <TextFields variant="formHelper" color="danger.500">
              {error?.message as string}
            </TextFields>
          ) : null}
        </Box>
      )}
    />
  );
};
