import { Control, Controller, Path, useFormContext } from 'react-hook-form';
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

  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field: { onChange } }) => (
        <Box display="flex" flexDirection="row" alignItems="center">
          <Switch
            mr={5}
            {...rest}
            onChange={(e) => {
              // console.log('SwitchTab', e.target.checked);
              onChange(e.target.checked);
            }}
          />
          <Text fontSize="r1">{label}</Text>
          {error ? error?.message : null}
        </Box>
      )}
    />
  );
};
