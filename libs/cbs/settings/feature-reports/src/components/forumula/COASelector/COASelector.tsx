import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { Menu, MenuButton, MenuItem, MenuList, Portal, useDisclosure } from '@chakra-ui/react';
import { motion, useDragControls } from 'framer-motion';

import { Box, Button, Icon, Text } from '@myra-ui/foundations';

import { COATree } from '@coop/shared/components';

interface COASelectorProps {
  char: string;
  variable: string;
  onCharChange: (newChar: string) => void;
}

export const COASelector = ({ char, onCharChange, variable }: COASelectorProps) => {
  const constraintsRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const controls = useDragControls();

  const [value, setValue] = useState<string[]>(char?.split(',') || []);
  const [coaModalPosition, setCoaModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setValue(char?.split(','));
  }, [char]);

  return (
    <>
      <COAMenu
        variable={variable}
        onOpen={onOpen}
        setCOAModalPosition={setCoaModalPosition}
        char={char || variable.slice(4, variable.length)}
      />
      <Portal>
        {isOpen && (
          <Box
            position="fixed"
            top={0}
            zIndex={9999}
            left={0}
            h="100vh"
            w="100vw"
            ref={constraintsRef}
          >
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
              dragConstraints={constraintsRef}
            >
              <Box
                w="32rem"
                position="relative"
                boxShadow="E1"
                bg="white"
                borderRadius="8px"
                overflow="hidden"
              >
                <Box
                  h="50px"
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
                      userSelect="none"
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

                <Box h="37.5rem" px="s16" py="s16" overflowY="auto">
                  <COATree
                    value={value}
                    onValueChange={(newValue) => setValue(newValue)}
                    isMulti
                    selectableNodes="all"
                  />
                </Box>

                <Box
                  h="50px"
                  bg="white"
                  zIndex={10}
                  borderTop="1px"
                  borderTopColor="border.layout"
                  px="s16"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box />
                  <Button
                    w="100px"
                    onClick={() => {
                      const ids = value.filter(Boolean).sort((a, b) => {
                        const partsA = a.split('.').map(Number);
                        const partsB = b.split('.').map(Number);

                        const minLength = Math.min(partsA.length, partsB.length);

                        for (let i = 0; i < minLength; i += 1) {
                          if (partsA[i] !== partsB[i]) {
                            return partsA[i] - partsB[i];
                          }
                        }

                        return partsA.length - partsB.length;
                      });

                      const finalIds = ids.reduce((acc, curr) => {
                        if (!acc.includes(curr)) {
                          if (!acc.some((n) => curr.includes(n))) {
                            acc.push(curr);
                          }
                        }

                        return acc;
                      }, [] as string[]);

                      onCharChange(finalIds.join(','));
                      onClose();
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Box>
        )}
      </Portal>
    </>
  );
};

interface COAMenuProps {
  char: string;
  variable: string;
  setCOAModalPosition: ({ x, y }: { x: number; y: number }) => void;
  onOpen: () => void;
}

const COAMenu = ({ char, setCOAModalPosition, onOpen, variable }: COAMenuProps) => {
  const coaSelectRef = useRef<HTMLInputElement | null>(null);

  return (
    <Menu placement="bottom-start" key={variable}>
      {({ isOpen: menuIsOpen }) => (
        <>
          <MenuButton data-coa={variable}>
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
                  const offsetLeft = coaSelectRef?.current?.offsetLeft;
                  const offsetTop = coaSelectRef?.current?.offsetTop;

                  const clientWidth = coaSelectRef?.current?.clientWidth;

                  if (offsetLeft && offsetTop && clientWidth) {
                    setCOAModalPosition({
                      x: offsetLeft + clientWidth + 3,
                      y: offsetTop,
                    });
                    onOpen();
                  }
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
