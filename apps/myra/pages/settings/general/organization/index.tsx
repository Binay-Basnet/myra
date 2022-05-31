import {
  AddressOrganization,
  ContactDetailsOrganization,
  MainContactPersonOrganization,
  RadioOrganization,
  RegistrationDetailsOrganization,
} from '@saccos/myra/components';
import { Box, Button, Icon, Text, TextInput } from '@saccos/myra/ui';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';

const Organization = () => {
  const { register, handleSubmit } = useForm();
  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display={'flex'}
        alignItems={'center'}
        h="60px"
      >
        <Text
          fontSize="r2"
          px="s16"
          fontWeight="600"
          color="neutralColorLight.Gray-80"
        >
          Organization
        </Text>
      </Box>
      <Box display={'flex'} flexDirection="row" h="fit-content">
        <Box
          w="300px"
          px="s8"
          py="s16"
          borderRight={'1px'}
          borderRightColor="border.layout"
        >
          <Box bg="#EEF2F7" p="s16">
            <Text fontSize={'r1'} fontWeight="600">
              Initial Setup
            </Text>
          </Box>
        </Box>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Box px="s16" flex={1} display="flex" flexDirection={'column'}>
            <Box py={'s24'}>
              <Text fontWeight="600">BASIC DETAILS</Text>
              <Box mt="s24" w="100%">
                <TextInput
                  label="Organization Name"
                  {...register('OrganizationName')}
                  placeholder="Enter name"
                />
              </Box>
              <Text mt={'s16'} fontSize="s3" fontWeight="500">
                Organization Logo
              </Text>
              <Box mt="s16">
                {/* =====================TODO ADD FILE DROPBOX =====================================================*/}
              </Box>
              <Box mt={'s16'}>
                {' '}
                <Text color={'gray.700'} fontSize="s3" fontWeight={'500'}>
                  Type of Member
                </Text>
                <Box mt="s16">
                  {/* <RadioGroup radioList={radiolist}> </RadioGroup> */}
                  <RadioOrganization />
                </Box>
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                  {' '}
                  CONTACT DETAILS
                </Text>
                <Box mt="s16">
                  <ContactDetailsOrganization />
                </Box>
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                  {' '}
                  MAIN CONTACT PERSON
                </Text>
                <Box mt="s16">
                  <MainContactPersonOrganization />
                </Box>
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                  {' '}
                  ADDRESS
                </Text>
                <Box mt="s16">
                  <AddressOrganization />
                </Box>
              </Box>
              <Button leftIcon={<Icon size="md" as={FaMap} />} mt={'s16'}>
                Pin on Map
              </Button>
            </Box>
            <Box mt="s16" py="s24">
              <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                {' '}
                REGISTRATION DETAILS
              </Text>
              <Box mt="s16">
                <RegistrationDetailsOrganization />
              </Box>
            </Box>
            <Box mt="s16" py="s24">
              <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                {' '}
                DOCUMENTS
              </Text>
              <Box w="100%">
                {/* ==========================TODO ADD DROPDOWN HERE ===================== */}
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Organization;

Organization.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
