import { Control, Controller, useFormContext } from 'react-hook-form';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Box } from '@chakra-ui/react';
import { Icon, RadioGroup, RadioGroupProps, TextFields } from '@myra-ui';

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
          <RadioGroup
            _focus={{
              border: error ? '2px solid' : '1px solid',
              borderColor: error ? 'danger.500' : 'primary.500',
              bg: error ? 'danger.100' : 'primary.100',
            }}
            // border={error ? '2px solid' : '1px solid'}
            // borderColor={error ? 'danger.500' : 'primary.500'}
            // bg={error ? 'danger.100' : 'primary.100'}
            {...rest}
            value={value}
            onChange={onChange}
            name={name}
            id={name}
          />
          {error ? (
            <Box display="flex" gap="s10">
              <Icon color="danger.500" as={RiErrorWarningLine} />
              <TextFields variant="formHelper" color="danger.500">
                {(error?.message as string) ?? 'Please choose one option'}
              </TextFields>
            </Box>
          ) : null}
        </Box>
      )}
    />
  );
};
