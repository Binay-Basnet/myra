import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import { FormInput } from '@coop/myra/components';
import {
  Box,
  Button,
  Container,
  IconButton,
  MainLayout,
  Text,
} from '@coop/shared/ui';
import router from 'next/router';

const AddNewAccount = () => {
  const { control } = useForm();

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
          icon={<GrClose />}
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
        <Text fontSize="r1" fontWeight="600">
          Basic Information
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
          <FormInput
            control={control}
            type="text"
            name="name"
            label="Account Name"
            placeholder="Enter Account Name"
          />

          <FormInput
            control={control}
            type="text"
            name="type"
            label="Account Type"
            placeholder="Enter Account Type"
          />

          <FormInput
            control={control}
            type="text"
            name="parent_group"
            label="Enter Parent Group"
            placeholder="Enter Parent Group"
          />
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

export default AddNewAccount;

AddNewAccount.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
