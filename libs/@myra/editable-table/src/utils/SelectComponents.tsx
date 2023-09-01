import { useEffect, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Icon, Text } from '@chakra-ui/react';
import {
  chakraComponents,
  GroupBase,
  InputProps,
  SelectComponentsConfig,
} from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
}

export const getComponents: (
  addItemHandler?: () => void,
  addItemLabel?: string,
  name?: string
) => SelectComponentsConfig<Option, boolean, GroupBase<Option>> = (
  addItemHandler,
  addItemLabel,
  name
) => ({
  Menu: ({ children, ...props }) => (
    <chakraComponents.Menu {...props}>
      <Box>
        {children}
        {addItemHandler && (
          <Box
            w="100%"
            h="3.125rem"
            bg="gray.0"
            display="flex"
            alignItems="center"
            gap="s4"
            px="12px"
            py="14px"
            color="primary.500"
            cursor="pointer"
            onClick={addItemHandler}
          >
            <Icon h="14px" w="14px" as={AddIcon} />
            <Text fontSize="r1" fontWeight={500}>
              {addItemLabel ?? 'Add Item'}
            </Text>
          </Box>
        )}
      </Box>
    </chakraComponents.Menu>
  ),
  Control: ({ innerProps, ...props }) => (
    <chakraComponents.Control
      {...props}
      innerProps={
        {
          ...innerProps,
          'data-testid': `${name}`,
        } as unknown as Record<string, string>
      }
    />
  ),
  Option: ({ children, ...props }) => (
    <chakraComponents.Option
      {...props}
      data-testid="testID"
      innerProps={
        {
          ...props.innerProps,
          'data-testid': `${name}-${props?.data?.label?.toString().toLowerCase()}`,
        } as unknown as Record<string, string>
      }
    >
      {children}
    </chakraComponents.Option>
  ),

  // Input: (props) => <Input {...props} />,

  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={IoSearch} fontSize="lg" cursor="pointer" />
    </chakraComponents.DropdownIndicator>
  ),
});

// const Input = (props: InputProps<Option, boolean, GroupBase<Option>>) => {
//   const ref = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     console.log(ref);
//   });

//   return <chakraComponents.Input selectProps={{ref}} {...props} />;
// };
