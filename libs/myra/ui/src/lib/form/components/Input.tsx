import React, { useId } from 'react';
import { useFormContext, RegisterOptions, Controller } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps,
} from '@chakra-ui/react';

interface IInputProps extends InputProps {
  name: string;
  label: React.ReactNode;
  validations?: RegisterOptions;
}

export const Input = (props: IInputProps) => {
  const {
    validations,
    label,
    name,
    onChange: onChangeFromProps,
    ...otherProps
  } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const id = useId();
  const customId = `${id}-${name}`;

  const error = errors[name];

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={customId}>{label}</FormLabel>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...otherFields } }) => (
          <ChakraInput
            id={customId}
            autoComplete="off"
            {...otherFields}
            onChange={(e) => {
              onChangeFromProps && onChangeFromProps(e);
              onChange(e);
            }}
            {...otherProps}
          />
        )}
      />

      <FormErrorMessage>{error && error?.message}</FormErrorMessage>
    </FormControl>
  );
};
