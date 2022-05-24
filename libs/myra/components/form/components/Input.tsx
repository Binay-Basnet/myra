import React, { useId } from 'react';
import { useFormContext, RegisterOptions, Controller } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  InputProps,
} from '@chakra-ui/react';
import { Input as ChakraInput, TextFields } from '@saccos/myra/ui';

interface IInputProps extends InputProps {
  name: string;
  label: React.ReactNode;
  validations?: RegisterOptions;
  // placeholder?: string;
}

export const Input = (props: IInputProps) => {
  const {
    validations,
    label,
    name,
    placeholder,
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
      <TextFields variant="formLabel">{label}</TextFields>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...otherFields } }) => (
          <ChakraInput
            id={customId}
            placeholder={placeholder}
            autoComplete="off"
            {...otherFields}
            onChange={(e) => {
              onChangeFromProps && onChangeFromProps(e);
              onChange(e);
            }}
          />
        )}
      />

      <FormErrorMessage>{error && error?.message}</FormErrorMessage>
    </FormControl>
  );
};
