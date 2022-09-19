import React, { useEffect } from 'react';
import { Box, Flex, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react';

import TextFields from '../text-fields/TextFields';

const SwitchTab = (props: UseRadioProps & { children: React.ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const { name, children, isChecked } = props;

  const { id, ...input } = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} id={id ?? name} />
      <Box
        {...checkbox}
        cursor="pointer"
        bg="background.500"
        borderRight="1px"
        borderRightColor="border.layout"
        color="gray.600"
        _checked={{
          bg: 'gray.0',
          color: 'primary.500',
        }}
        _disabled={{
          cursor: 'not-allowed',
          bg: 'background.500',
          color: 'gray.300',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        display="flex"
        alignItems="center"
        py="s10"
        px="s16"
        gap="s8"
      >
        <Box w="6px" h="6px" rounded="full" bg={isChecked ? 'primary.500' : 'gray.500'} />
        <TextFields variant="switch" whiteSpace="nowrap">
          {children}
        </TextFields>
      </Box>
    </Box>
  );
};

export interface SwitchTabsProps {
  options: {
    label: string;
    value: string | boolean;
  }[];
  id?: string;
  label?: string;
  errorText?: string;
  helperText?: string;
  value?: string;
  name?: string;
  onChange?: (nextValue: string) => void;
  defaultValue?: string;
}

export const SwitchTabs = ({
  options,
  value,
  name,
  onChange,
  label,
  id,
  errorText,
  helperText,
  defaultValue,
}: SwitchTabsProps) => {
  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    name,
    defaultValue: value?.toString(),
    onChange,
  });

  const group = getRootProps();

  useEffect(() => {
    if (value !== undefined) {
      setValue(value?.toString());
    } else {
      defaultValue && setValue(defaultValue);
    }
  }, [value]);

  return (
    <Box display="flex" flexDir="column" gap="s4">
      {label && (
        <TextFields variant="formLabel" color="gray.700">
          {label}
        </TextFields>
      )}

      <Flex
        {...group}
        border="1px"
        borderColor="border.layout"
        overflow="hidden"
        borderRight="0"
        gap="0"
        borderRadius="br2"
        width="fit-content"
      >
        {options?.map((val) => {
          const radio = getRadioProps({ value: val.value.toString() });

          return (
            <SwitchTab name={name} key={val.label} {...radio} id={id}>
              {val.label}
            </SwitchTab>
          );
        })}
      </Flex>
      {errorText ? (
        <TextFields variant="formHelper" color="danger.500">
          {errorText}
        </TextFields>
      ) : helperText ? (
        <TextFields variant="formHelper" color="gray.700">
          {helperText}
        </TextFields>
      ) : null}
    </Box>
  );
};

export default SwitchTabs;
