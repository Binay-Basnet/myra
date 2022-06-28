import React from 'react';
import {
  Box,
  Flex,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';

import TextFields from '../text-fields/TextFields';

const SwitchTab = (props: UseRadioProps & { children: React.ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const { id, ...input } = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} id={id ?? props.name} />
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
        <Box
          w="6px"
          h="6px"
          rounded="full"
          bg={props.isChecked ? 'primary.500' : 'gray.500'}
        ></Box>
        <TextFields variant="switch">{props.children}</TextFields>
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
  value?: string | boolean;
  name?: string;
  onChange?: (nextValue: string) => void;
}

export function SwitchTabs({
  options,
  value,
  name,
  onChange,
  label,
  id,
  errorText,
  helperText,
}: SwitchTabsProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: value?.toString(),
    onChange: onChange,
  });

  const group = getRootProps();

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
        {options?.map((value, index) => {
          const radio = getRadioProps({ value: value.value.toString() });

          return (
            <SwitchTab name={name} key={`${value}${index}`} {...radio}>
              {value.label}
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
}

export default SwitchTabs;
