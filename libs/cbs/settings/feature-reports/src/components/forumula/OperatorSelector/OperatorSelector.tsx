import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FiDivide } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';

import { Box, Icon, Text } from '@myra-ui/foundations';

type Operator = '+' | '-' | '*' | '/';

const BASIC_OPERATORS: { label: string; value: Operator }[] = [
  {
    label: 'Addition',
    value: '+',
  },
  {
    label: 'Subtraction',
    value: '-',
  },
  {
    label: 'Multiplication',
    value: '*',
  },
  {
    label: 'Division',
    value: '/',
  },
];

const OPERATOR_ICONS = {
  '+': AiOutlinePlus,
  '-': AiOutlineMinus,
  '*': IoMdClose,
  '/': FiDivide,
};

interface OperatorSelectorProps {
  value: Operator;
}

export const OperatorSelector = ({ value }: OperatorSelectorProps) => {
  const [selectedOperator, setSelectedOperator] = useState(value);

  return (
    <Menu placement="right-start" key={selectedOperator}>
      {({ isOpen: menuIsOpen }) => (
        <>
          <MenuButton data-operator={selectedOperator}>
            <Box
              tabIndex={0}
              color="primary.500"
              h="s16"
              w="s16"
              bg="primary.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              borderRadius="br2"
              _hover={{
                bg: 'gray.100',
              }}
              sx={
                menuIsOpen
                  ? {
                      ring: '1px',
                      ringColor: 'primary.300',
                      ringOffset: '1px',
                      outline: 'none',
                    }
                  : {}
              }
              _focus={{
                ring: '1px',
                ringColor: 'primary.300',
                ringOffset: '1px',
                outline: 'none',
              }}
            >
              <Icon as={OPERATOR_ICONS[selectedOperator]} size="sm" w="s12" h="s12" />
            </Box>
          </MenuButton>
          <Portal>
            <MenuList overflow="hidden" py={0} border="none" boxShadow="E0">
              {BASIC_OPERATORS?.map((operator) => (
                <MenuItem
                  onClick={() => setSelectedOperator(operator.value)}
                  id={operator.value}
                  bg="white"
                  _hover={{ bg: 'gray.50' }}
                  fontSize="r1"
                  display="flex"
                  alignItems="center"
                  gap="s16"
                >
                  <Icon as={OPERATOR_ICONS[operator.value]} size="sm" w="s12" h="s12" />
                  <Text color="gray.600">{operator.label}</Text>
                </MenuItem>
              ))}
            </MenuList>
          </Portal>
        </>
      )}
    </Menu>
  );
};
