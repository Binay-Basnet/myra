import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { Icon } from '@chakra-ui/icons';
import {
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { motion, useDragControls } from 'framer-motion';

import { Box, Text } from '@myra-ui/foundations';

import { COATree } from '@coop/shared/components';

const FORMULA_JSON = {
  formula: '@a+(@b+@c)',
  input: {
    a: '20.1',
    b: '30',
    c: '40',
  },
};

const charsToSplitOn = ['+', '-', '*', '/']; // characters to split the string on

const pattern = new RegExp(/[+*/-]/, 'g');

const Temp = () => {
  const [value, setValue] = useState<any>(null);
  const controls = useDragControls();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getFormulaInArray = (str: string) => {
    const arr = [];
    let i = 0;

    while (i < str.length) {
      if (str[i] === '@') {
        arr.push(str[i + 1].toUpperCase());
        i += 2;
      } else {
        arr.push(str[i]);
        i += 1;
      }
    }

    return arr;
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      bg="gray.100"
      px="120px"
      justifyContent="center"
      gap="s16"
      minH="100vh"
    >
      <Input
        onKeyDown={(e) => {
          if (e.altKey && e.code === 'Space') {
            onOpen();
          }
        }}
      />

      <Box
        bg="white"
        display="flex"
        border="1px"
        borderColor="border.layout"
        alignItems="start"
        p="s8"
        gap="s8"
        borderRadius="br2"
        contentEditable
      >
        {getFormulaInArray(FORMULA_JSON.formula).map((char) => {
          if (
            char === '(' ||
            char === ')' ||
            char === '[' ||
            char === ']' ||
            char === '{' ||
            char === '}'
          ) {
            return char;
          }

          return (
            <Menu placement="bottom-start">
              <MenuButton>
                <Box
                  color="black"
                  w="s32"
                  h="s32"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  borderRadius="br2"
                  _hover={{
                    bg: 'gray.100',
                  }}
                >
                  {char}
                </Box>
              </MenuButton>
              <MenuList overflow="hidden" py={0} border="none" boxShadow="E0">
                <MenuItem bg="white" _hover={{ bg: 'gray.50' }} fontSize="r1">
                  Select Ledger/s
                </MenuItem>
              </MenuList>
            </Menu>
          );
        })}
      </Box>

      <Portal>
        {isOpen && (
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 999999 }}
            drag
            dragListener={false}
            dragMomentum={false}
            dragControls={controls}
          >
            <Box
              w="486px"
              position="relative"
              boxShadow="E0"
              h="600px"
              bg="white"
              borderRadius="8px"
            >
              <Box
                h="50px"
                position="sticky"
                top={0}
                bg="white"
                zIndex={10}
                borderBottom="1px"
                borderBottomColor="border.layout"
                px="s16"
                borderTopRadius="8px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap="s8">
                  <Icon
                    as={MdOutlineDragIndicator}
                    cursor="move"
                    color="gray.500"
                    onPointerDown={(e) => controls.start(e)}
                    _hover={{ color: 'gray.800' }}
                  />
                  <Text fontSize="r2" color="gray.800" fontWeight={600}>
                    Ledger
                  </Text>
                </Box>
                <Icon
                  as={IoClose}
                  onClick={onClose}
                  cursor="pointer"
                  color="gray.500"
                  _hover={{ color: 'gray.800' }}
                />
              </Box>

              <Box px="s16" py="s16" h="550px" overflowY="auto">
                <COATree
                  defaultValue={null}
                  onChange={(v) => console.log(v)}
                  onClose={() => false}
                  value={value}
                  setValue={setValue}
                />
              </Box>
            </Box>
          </motion.div>
        )}
      </Portal>
    </Box>
  );
};

export default Temp;
