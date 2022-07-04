import React, { ReactElement } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import router from 'next/router';
import { FormControl, FormLabel } from '@chakra-ui/react';

import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Input,
  MainLayoutInventory,
  Text,
} from '@coop/shared/ui';

const AddNewItemPage = () => {
  return (
    <Container
      minW="container.xl"
      height="fit-content"
      mt="130"
      p="0"
      pb="55px"
    >
      <Box
        height="60px"
        display="flex"
        justifyContent="space-between"
        alignItems={'center'}
        px="5"
        background="white"
        borderBottom="1px solid #E6E6E6"
        borderTopRadius={5}
      >
        <Text fontSize="r2" fontWeight="600">
          Add New Item
        </Text>

        <IconButton
          variant={'ghost'}
          aria-label="close"
          icon={<Icon as={IoCloseOutline} size="md" />}
          onClick={() => router.back()}
        />
      </Box>
      <br />
      <Box
        w="100%"
        background="white"
        p={5}
        display="flex"
        flexDirection="column"
        gap={6}
      >
        {/* <Text fontSize="r1" fontWeight="600">
          Basic Information
        </Text> */}
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
          <FormControl>
            <FormLabel htmlFor="name">Item Name</FormLabel>
            <Input id="name" placeholder="Enter Item Name" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Item Type</FormLabel>
            <Input id="type" placeholder="Enter Item Type" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Item Unit</FormLabel>
            <Input id="type" placeholder="Enter Item Unit" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Unit Price</FormLabel>
            <Input id="type" placeholder="Enter Unit Price" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Total Cost</FormLabel>
            <Input id="type" placeholder="Enter Total Cost" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Item Quantity</FormLabel>
            <Input id="type" placeholder="Enter Item Quantity" />
          </FormControl>
        </Box>
      </Box>
      <br />
      <Box
        height="60px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="5"
        background="white"
        borderTopRadius={5}
      >
        <Text>Save as Draft</Text>
        <Button>Add</Button>
      </Box>
    </Container>
  );
};

export default AddNewItemPage;

AddNewItemPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
