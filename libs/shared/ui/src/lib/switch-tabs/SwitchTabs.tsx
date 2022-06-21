import { BsDot } from 'react-icons/bs';
import {
  Box,
  Flex,
  Icon,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';

import TextFields from '../text-fields/TextFields';

const SwitchTab = (props: UseRadioProps & { children: React.ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
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
        py="s12"
        pr="s16"
        pl="s8"
      >
        <Icon as={BsDot} w="s24" h="s24" />
        <TextFields variant="switch">{props.children}</TextFields>
      </Box>
    </Box>
  );
};

export interface SwitchTabsProps {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  name: string;
  onChange: (nextValue: string) => void;
}

export function SwitchTabs({
  options,
  value,
  name,
  onChange,
}: SwitchTabsProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: value,
    onChange: onChange,
    isFocusable: true,
  });

  const group = getRootProps();

  return (
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
      {options.map((value) => {
        const radio = getRadioProps({ value: value.value });

        return (
          <SwitchTab key={value.value} {...radio}>
            {value.label}
          </SwitchTab>
        );
      })}
    </Flex>
  );
}

export default SwitchTabs;
