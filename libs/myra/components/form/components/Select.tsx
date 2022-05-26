import React, { useId } from 'react';
import { useFormContext, RegisterOptions, Controller } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  // Input as ChakraInput,
  InputProps,
} from '@chakra-ui/react';
import { Select as ChakraSelect, TextFields } from '../../../ui/src';

interface IInputProps extends InputProps {
  name: string;
  label: React.ReactNode;
  placeholder: string;
  validations?: RegisterOptions;
  options: { label: string; value: string }[];
}

export const Select = (props: IInputProps) => {
  const { validations, label, placeholder, name, options, ...otherProps } =
    props;
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
          <ChakraSelect
            id={customId}
            {...otherFields}
            options={options}
            placeholder={placeholder}
          />
        )}
      />

      <FormErrorMessage>{error && error?.message}</FormErrorMessage>
    </FormControl>
  );
};
