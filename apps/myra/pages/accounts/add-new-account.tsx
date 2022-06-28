import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import router from 'next/router';

import { FormInput } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  IconButton,
  MainLayout,
  Text,
} from '@coop/shared/ui';

const AddNewAccount = () => {
  const methods = useForm();

  return (
    <Container
      minW="container.xl"
      height="fit-content"
      mt="130"
      p="0"
      pb="55px"
    >
      <FormProvider {...methods}>
        <form>
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
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
              icon={<IoCloseOutline />}
              onClick={() => router.back()}
            />
          </Box>
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
              <FormInput
                type="text"
                name="name"
                label="Account Name"
                placeholder="Enter Account Name"
              />

              <FormInput
                type="text"
                name="type"
                label="Account Type"
                placeholder="Enter Account Type"
              />

              <FormInput
                type="text"
                name="parent_group"
                label="Enter Parent Group"
                placeholder="Enter Parent Group"
              />
            </Box>
          </Box>

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
        </form>
      </FormProvider>
    </Container>
  );
};

export default AddNewAccount;

AddNewAccount.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
