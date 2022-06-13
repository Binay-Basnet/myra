import { Control, Controller } from 'react-hook-form';
import { Box, Switch, SwitchProps, Text } from '@coop/shared/ui';

interface IFormSelectProps extends SwitchProps {
  control: Control;
  name: string;
  label?: string;
}

export const FormSwitch = ({
  control,
  name,
  label,
  ...rest
}: IFormSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Box display="flex" flexDirection="row" alignItems="center">
          <Switch
            mr={5}
            {...rest}
            onChange={(e) => {
              console.log(e.target.checked);
              onChange(e.target.checked);
            }}
          />
          <Text fontSize="r1">{label}</Text>
        </Box>
      )}
    />
  );
};
