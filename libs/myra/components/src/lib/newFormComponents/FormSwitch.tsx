<<<<<<< HEAD
import { Control, Controller, Path, useFormContext } from 'react-hook-form';
=======
import { Control, Controller, useFormContext } from 'react-hook-form';

>>>>>>> 6f918eb096f36e6d7c12333c3b76667b95ad8568
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
      render={({ field: { onChange, value } }) => (
        <Box display="flex" flexDirection="row" alignItems="center">
          <Switch
            mr={label && 5}
            isChecked={value}
            {...rest}
            onChange={(e) => {
<<<<<<< HEAD
              // console.log('SwitchTab', e.target.checked);
              onChange(e.target.checked);
            }}
          />
          <Text fontSize="r1">{label}</Text>
          {error ? error?.message : null}
=======
              onChange(e.target.checked);
            }}
          />
          {label && <Text fontSize="r1">{label}</Text>}
>>>>>>> 6f918eb096f36e6d7c12333c3b76667b95ad8568
        </Box>
      )}
    />
  );
};
