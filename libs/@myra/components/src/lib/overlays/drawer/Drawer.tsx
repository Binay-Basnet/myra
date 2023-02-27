import React from 'react';
import {
  Divider,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps as ChakraDrawerProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface DrawerProps extends Omit<ChakraDrawerProps, 'isOpen' | 'onClose'> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode | string;
}

export const Drawer = (props: DrawerProps) => {
  const { onClose, open, children, title, ...rest } = props;

  return (
    <ChakraDrawer {...rest} isOpen={open} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent w="40vw" maxW="40vw">
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <Divider />
        <DrawerBody>{children}</DrawerBody>

        {/* <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter> */}
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
