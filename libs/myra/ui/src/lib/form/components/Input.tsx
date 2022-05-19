import React, { useId } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input as ChakraInput,
} from '@chakra-ui/react';

import type { IInputProps } from '../types';

function useProps<TfieldTypes>(props: IInputProps<TfieldTypes>) {
  //! TODO: Type this
  const { control } = useFormContext();

  const { dependency, name } = props;

  const keys = dependency?.keys as string[];

  const values = useWatch({
    control,
    name: Array.isArray(keys) ? [...keys, String(name)] : [''], // TODO!
    disabled: !dependency,
  });

  //! TODO this is just shit typescript
  const valuesObj = keys?.reduce(
    (obj, curr, index) => ({ [curr]: values[index] }),
    {} as Record<string, string>
  );

  //! TODO this is just shit typescript
  const newProps = dependency?.conditions(
    (valuesObj as Record<keyof TfieldTypes, string>) ?? null
  );
  return { ...props, ...newProps };
}

export function Input<TfieldTypes>(props: IInputProps<TfieldTypes>) {
  const methods = useFormContext();
  const {
    formState: { errors },
    control,
  } = methods;
  const {
    validations,
    name,
    label,
    render = true,
    onChange: onChangeFromProps,
    variant,
    dependency: d,
    ...otherProps
  } = useProps(props);

  const id = useId();
  const customId = `${id}-${name}`;

  const error = errors[name];

  if (!render) return null;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={customId}>{label}</FormLabel>

      <Controller
        name={String(name)} // TODO! Check why this has to be done
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
}
