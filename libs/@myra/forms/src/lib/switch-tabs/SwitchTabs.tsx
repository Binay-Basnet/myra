import React, { useEffect } from 'react';
import { Box, HStack, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';

const SwitchTab = (props: UseRadioProps & { children: React.ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const { name, children, isChecked } = props;

  const { id, ...input } = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} id={id ?? name} data-testid={children} />
      <Box
        {...checkbox}
        cursor="pointer"
        // bg="background.500"
        // borderRight="1px"
        // borderRightColor="border.layout"
        color="gray.500"
        _hover={{
          color: 'gray.700',
        }}
        _checked={{
          bg: 'gray.0',
          color: 'primary.500',
        }}
        _disabled={{
          cursor: 'not-allowed',
          bg: 'background.500',
          color: 'gray.300',
        }}
        display="flex"
        alignItems="center"
        h="s32"
        borderRadius="br1"
        boxShadow={isChecked ? 'E0' : 'none'}
        px="s20"
        gap="s8"
        transition="ease-in 0.2s background"
        position="relative"
      >
        {isChecked && <Box w="6px" h="6px" rounded="full" bg="primary.500" />}
        <Text fontSize="r1" fontWeight="500" whiteSpace="nowrap">
          {children}
        </Text>
      </Box>
    </Box>
  );
};

export interface SwitchTabsProps {
  options: {
    label: string;
    value: string | boolean;
    isDisabled?: boolean;
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
  const {
    getRootProps,
    getRadioProps,
    setValue,
    value: checkedValue,
  } = useRadioGroup({
    name,
    defaultValue: value?.toString(),
    onChange,
  });

  const group = getRootProps();

  const checkedIndex = options.findIndex((r) => String(r.value) === String(checkedValue));

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
        <Text variant="formLabel" color="gray.700">
          {label}
        </Text>
      )}

      <HStack
        {...group}
        bg="background.500"
        overflow="hidden"
        borderRadius="br2"
        width="fit-content"
        p="s4"
        spacing={0}
      >
        {options?.map((val, index) => {
          const radio = getRadioProps({ value: val?.value?.toString() }) as UseRadioProps;

          return (
            <Box
              key={String(val.value)}
              position="relative"
              _after={
                radio.isChecked || checkedIndex - 1 === index || index === options.length - 1
                  ? {}
                  : {
                      content: "''",
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      right: '0',
                      width: '1px',
                      height: '10px',
                      background: 'border.element',
                    }
              }
            >
              <SwitchTab name={name} key={val.label} isDisabled={val.isDisabled} {...radio} id={id}>
                {val.label}
              </SwitchTab>
            </Box>
          );
        })}
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
    </Box>
  );
};

export default SwitchTabs;
