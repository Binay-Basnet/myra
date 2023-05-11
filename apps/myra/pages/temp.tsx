import { useEffect, useRef, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FiDivide } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { Menu, MenuButton, MenuItem, MenuList, Portal, useDisclosure } from '@chakra-ui/react';
import { motion, useDragControls } from 'framer-motion';

import { Box, Icon, Text } from '@myra-ui/foundations';

import { COATree } from '@coop/shared/components';

const FORMULA_JSON = {
  formula: '[{@20+(@30+@40)}-(@40+@50)]',
  input: {
    a: '20.1',
    b: '30',
    c: '40',
  },
};

const BASIC_OPERATORS: { label: string; value: '+' | '-' | '*' | '/' }[] = [
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

const charsToSplitOn = ['+', '-', '*', '/', '(', ')', '[', ']', '{', '}']; // characters to split the string on

const OPERATOR_ICONS = {
  '+': AiOutlinePlus,
  '-': AiOutlineMinus,
  '*': IoMdClose,
  '/': FiDivide,
};

const getFormulaInArray = (str: string) => {
  const arr = [];
  let currentToken = '';

  for (let i = 0; i < str.length; i += 1) {
    if (charsToSplitOn.includes(str[i])) {
      if (currentToken) {
        arr.push(currentToken);
      }
      arr.push(str[i]);
      currentToken = '';
    } else if (str[i].match(/[0-9]/)) {
      currentToken += str[i];
    }
  }

  return arr;
};

const Temp = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<any>(null);
  const coaSelectRef = useRef<HTMLDivElement | null>(null);

  const [coaModalPosition, setCoaModalPosition] = useState({ x: 0, y: 0 });
  const controls = useDragControls();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Select the target element using the ref
    const targetElement = ref.current;

    // Create a new instance of MutationObserver
    const observer = new MutationObserver((mutationsList, observer) => {
      // Loop through each mutation that has occurred
      for (const mutation of mutationsList) {
        // Check if any of the mutations were made to nodes inside the target element
        if (mutation.target.contains(targetElement)) {
          // Return the target element
          const textContent = Array.from(targetElement.children || [])
            .map((children) => {
              if (children.getAttribute('data-operator')) {
                return children.getAttribute('data-operator');
              }
              return children.textContent;
            })
            .join('');
          console.log(textContent);
          return;
        }
      }
    });

    // Configure the observer to watch for changes to child nodes of the target element
    const observerConfig = { childList: true, subtree: true };

    // Start observing the target element
    observer.observe(targetElement, observerConfig);

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

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
      <Box
        bg="white"
        display="flex"
        border="1px"
        borderColor="border.layout"
        alignItems="center"
        borderRadius="br2"
        px="s12"
        gap="s4"
        h="s48"
        ref={ref}
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
            return <Box>{char}</Box>;
          }

          if (char === '+' || char === '-' || char === '*' || char === '/') {
            return <OperatorSelector value={char} />;
          }
          return <COAMenu onOpen={onOpen} setCOAModalPosition={setCoaModalPosition} char={char} />;
        })}
      </Box>

      <Portal>
        {isOpen && (
          <motion.div
            style={{
              position: 'absolute',
              top: coaModalPosition.y,
              left: coaModalPosition.x,
              zIndex: 999999,
            }}
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

interface COAMenuProps {
  char: string;
  setCOAModalPosition: ({ x, y }: { x: number; y: number }) => void;
  onOpen: () => void;
}

const COAMenu = ({ char, setCOAModalPosition, onOpen }: COAMenuProps) => {
  const coaSelectRef = useRef<HTMLInputElement | null>(null);

  return (
    <Menu placement="bottom-start">
      {({ isOpen: menuIsOpen }) => (
        <>
          <MenuButton>
            <Box
              ref={coaSelectRef}
              tabIndex={0}
              color="gray.600"
              h="s24"
              px="6px"
              bg="background.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              borderRadius="br2"
              _hover={{
                bg: 'gray.100',
              }}
              _focus={{
                ring: '1px',
                ringColor: 'primary.300',
                ringOffset: '1px',
                outline: 'none',
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
            >
              {char}
            </Box>
          </MenuButton>
          <Portal>
            <MenuList overflow="hidden" py={0} border="none" boxShadow="E0">
              <MenuItem
                bg="white"
                _hover={{ bg: 'gray.50' }}
                fontSize="r1"
                onClick={() => {
                  setCOAModalPosition({
                    x: coaSelectRef.current.offsetLeft + coaSelectRef.current.clientWidth + 3,
                    y: coaSelectRef.current.offsetTop,
                  });
                  onOpen();
                }}
              >
                Select Ledger/s
              </MenuItem>
            </MenuList>
          </Portal>
        </>
      )}
    </Menu>
  );
};

interface OperatorSelectorProps {
  value: '+' | '-' | '*' | '/';
}

const OperatorSelector = ({ value }: OperatorSelectorProps) => {
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

export default Temp;
