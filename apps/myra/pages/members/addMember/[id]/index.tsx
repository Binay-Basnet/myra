import React from 'react';
import { GrClose } from 'react-icons/gr';
import { useForm } from 'react-hook-form';

import {
  Box,
  Container,
  Navbar,
  TabMenu,
  Text,
  Divider,
  Button,
} from '@saccos/myra/ui';

import {
  MemberBasicInfo,
  MemberContactDetails,
  MemberIdentificationDetails,
  MemberAddress,
  MemberFamilyDetails,
} from '@saccos/myra/components';
import { useTranslation } from '@saccos/myra/util';

const Header = ({ t }) => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const AddMember = () => {
  const { t } = useTranslation();
  // const methods = useForm<IFormValues>();
  const { control, handleSubmit } = useForm();

  // const debounced = () => console.log('hello123', getValues());

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Box
        position="fixed"
        width="100%"
        top={0}
        zIndex={2}
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Header t={t} />
      </Box>
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
          boxShadow="xl"
        >
          <Text fontSize="r2" fontWeight="SemiBold">
            {t.membersFormAddNewMembers}
          </Text>
          <GrClose size="14px" color="#91979F" />
        </Box>
        <Box display="flex" width="100%">
          <Box w={320} p={2} minHeight="100%" bg="white">
            <Text fontSize="r1">1. Personal Information</Text>
            <Text fontSize="r1">2. Professional Details</Text>
          </Box>
          <Divider orientation="vertical" />
          <Box w="100%">
            <Box background="white" p={5}>
              <Text fontSize="r3" fontWeight="SemiBold">
                1. Personal Information
              </Text>
              <br />
              <MemberBasicInfo control={control} />
              <Divider my={8} />
              <MemberContactDetails control={control} />
              <Divider my={8} />
              <MemberIdentificationDetails control={control} />
              <Divider my={8} />
              <MemberAddress control={control} />
              <Divider my={8} />
              <MemberFamilyDetails control={control} />
            </Box>
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
          <Button>Next</Button>
        </Box>
      </Container>
    </form>
  );
};

export default AddMember;
