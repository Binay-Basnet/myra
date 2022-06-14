import { Control, Controller, useFormContext } from 'react-hook-form';

import { Box, Switch, SwitchProps, Text } from '@coop/shared/ui';

interface IFormSelectProps extends SwitchProps {
  control?: Control;
  name: string;
  label?: string;
}

export const FormSwitch = ({
  control,
  name,
  label,
  ...rest
}: IFormSelectProps) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control: formControl,
  } = methods;

  const error = errors[name];

  console.log(error);

  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box display="flex" flexDirection="row" alignItems="center">
          <Switch
            mr={label && 5}
            isChecked={value}
            {...rest}
            onChange={(e) => {
              console.log(e.target.checked);
              onChange(e.target.checked);
            }}
          />
          {label && <Text fontSize="r1">{label}</Text>}
        </Box>
      )}
    />
  );
};
