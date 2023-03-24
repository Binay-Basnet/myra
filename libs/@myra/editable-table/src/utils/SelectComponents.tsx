import { IoSearch } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Icon, Text } from '@chakra-ui/react';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
}

export const getComponents: (
  addItemHandler?: () => void,
  addItemLabel?: string
) => SelectComponentsConfig<Option, boolean, GroupBase<Option>> = (
  addItemHandler,
  addItemLabel
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
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={IoSearch} fontSize="lg" cursor="pointer" />
    </chakraComponents.DropdownIndicator>
  ),
});
