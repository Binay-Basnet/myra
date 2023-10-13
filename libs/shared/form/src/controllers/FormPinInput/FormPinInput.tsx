import { Control, Controller, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { Flex, HStack, PinInput, PinInputField, PinInputProps } from '@chakra-ui/react';

import { Text } from '@myra-ui';

interface IFormPinInputProps<T extends Record<string, unknown>>
  extends Omit<PinInputProps, 'children'> {
  name: string;
  label?: string;
  control?: Control<T>;
  rules?: UseControllerProps['rules'];
  errorText?: string;
  helperText?: string;
}

export const FormPinInput = <T extends Record<string, unknown>>({
  name,
  label,
  errorText,
  helperText,
  ...rest
}: IFormPinInputProps<T>) => {
  const methods = useFormContext();

  const { control } = methods;

  return (
    <Controller
      name={name}
      rules={rest.rules}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <Flex direction="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            {label}
          </Text>

          <HStack>
            <PinInput
              onChange={(val) => {
                onChange(val);
              }}
              value={value}
              placeholder=""
              {...rest}
              {...fieldProps}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          {errorText ? (
            <Text variant="formHelper" color="danger.500">
              {errorText}
            </Text>
          ) : helperText ? (
            <Text variant="formHelper" color="gray.700">
              {helperText}
            </Text>
          ) : null}
        </Flex>
      )}
    />
  );
};

export default FormPinInput;
