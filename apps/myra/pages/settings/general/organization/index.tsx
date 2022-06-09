import React from 'react';
import { useForm } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';
import {
  AddressOrganization,
  ContactDetailsOrganization,
  FormFileInput,
  FormTextInput,
  MainContactPersonOrganization,
  RadioOrganization,
  RegistrationDetailsOrganization,
} from '@coop/myra/components';
import { Box, Button, Icon, Text } from '@coop/myra/ui';

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';

const Organization = () => {
  const { control, handleSubmit, getValues } = useForm();

  return (
    // onSubmit={handleSubmit((data) => console.log('data', data))}
    <form
      onSubmit={handleSubmit((data) => console.log('data', data))}
      onChange={(e) => {
        console.log('hello', getValues());
      }}
    >
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

          <Box px="s16" flex={1} display="flex" flexDirection={'column'}>
            <Box py={'s24'}>
              <Text fontWeight="600">BASIC DETAILS</Text>
              <Box mt="s24" w="100%">
                <FormTextInput
                  label="Organization Name"
                  placeholder="Enter name"
                  control={control}
                  name="organizationName"
                  type="text"
                />
              </Box>
              <Text mt={'s16'} fontSize="s3" fontWeight="500">
                Organization Logo
              </Text>
              <Box mt="s16" w={'110px'}>
                {/* =====================TODO ADD FILE DROPBOX =====================================================*/}
                <FormFileInput
                  control={control}
                  name="organizationLogo"
                  size="md"
                />
              </Box>
              <Box mt={'s16'}>
                {' '}
                <Text color={'gray.700'} fontSize="s3" fontWeight={'500'}>
                  Type of Organization
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
                  <ContactDetailsOrganization control={control} />
                </Box>
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                  {' '}
                  MAIN CONTACT PERSON
                </Text>
                <Box mt="s16">
                  <MainContactPersonOrganization control={control} />
                </Box>
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                  {' '}
                  ADDRESS
                </Text>
                <Box mt="s16">
                  <AddressOrganization control={control} />
                </Box>
              </Box>
              <Button
                leftIcon={<Icon size="md" as={FaMap} />}
                mt={'s16'}
                type="submit"
              >
                Pin on Map
              </Button>
            </Box>
            <Box mt="s16" py="s24">
              <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                {' '}
                REGISTRATION DETAILS
              </Text>
              <Box mt="s16">
                <RegistrationDetailsOrganization control={control} />
              </Box>
            </Box>
            <Box mt="s16" py="s24">
              <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                {' '}
                DOCUMENTS
              </Text>
              <Box w="100%" mt="s16" h="500px">
                {/* ==========================TODO ADD DROPDOWN HERE ===================== */}
                <FormFileInput
                  control={control}
                  name="organizationLogo"
                  size="lg"
                />
                <Box mt="s60" display={'flex'} justifyContent="flex-end">
                  {' '}
                  <Button size={'md'}>Save Changes</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default Organization;

Organization.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
