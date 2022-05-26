import React, { ReactElement } from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  MainLayout,
  Text,
} from '@saccos/myra/ui';
import { GrClose } from 'react-icons/gr';
import { FormControl, FormLabel } from '@chakra-ui/react';

const AddNewItemGroupPage = () => {
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
          Add New Item Group
        </Text>
        <GrClose size="14px" color="#91979F" />
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
        <Text fontSize="r1" fontWeight="600">
          Basic Information
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
          <FormControl>
            <FormLabel htmlFor="name">Item Group Name</FormLabel>
            <Input id="name" placeholder="Enter Item Group Name" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Location</FormLabel>
            <Input id="type" placeholder="Enter Location" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Phone number</FormLabel>
            <Input id="type" placeholder="Enter Phone Number" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Email Address</FormLabel>
            <Input id="type" placeholder="Enter Email Address" />
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

export default AddNewItemGroupPage;

AddNewItemGroupPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
