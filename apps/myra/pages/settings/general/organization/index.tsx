import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';

import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsPageHeader,
} from '@coop/cbs/settings/ui-layout';
import {
  AddressOrganization,
  ContactDetailsOrganization,
  MainContactPersonOrganization,
  RadioOrganization,
  RegistrationDetailsOrganization,
} from '@coop/myra/components';
import { FormFileInput, FormInput } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const Organization = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, getValues } = useForm();
  const methods = useForm();

  return (
    // onSubmit={handleSubmit((data) => console.log('data', data))}

    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <SettingsPageHeader heading="Organizations" />
      <Box display={'flex'} flexDirection="row" h="fit-content">
        <Box
          w="300px"
          position="fixed"
          px="s8"
          py="s16"
          borderRight={'1px'}
          borderRightColor="border.layout"
          minHeight="100vh"
        >
          <Box bg="#EEF2F7" p="s16">
            <Text fontSize={'r1'} fontWeight="600">
              {t['settingsOrganization']}
            </Text>
          </Box>
        </Box>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => console.log('data', data))}
            onChange={(e) => {
              console.log('hello', getValues());
            }}
          >
            <Box
              ml="300px"
              px="s16"
              flex={1}
              display="flex"
              flexDirection={'column'}
            >
              <Box py={'s24'}>
                <Text fontWeight="600">
                  {t['settingsOrganizationBasicDetails']}
                </Text>
                <Box mt="s24" w="100%">
                  <FormInput
                    label={t['settingsOrganizationOrganizationName']}
                    placeholder={t['settingsOrganizationEntername']}
                    control={control}
                    name="organizationName"
                    type="text"
                  />
                </Box>
                <Text mt={'s16'} fontSize="s3" fontWeight="500">
                  {t['settingsOrganizationOrganizationLogo']}
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
                    {t['settingsOrganizationTypeOfOrganization']}
                  </Text>
                  <Box mt="s16">
                    {/* <RadioGroup radioList={radiolist}> </RadioGroup> */}
                    <RadioOrganization />
                  </Box>
                </Box>
                <Box mt="s16" py="s24">
                  <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                    {' '}
                    {t['settingsOrganizationContactDetails']}
                  </Text>
                  <Box mt="s16">
                    <ContactDetailsOrganization control={control} />
                  </Box>
                </Box>
                <Box mt="s16" py="s24">
                  <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                    {' '}
                    {t['settingsOrganizationMainContactPerson']}
                  </Text>
                  <Box mt="s16">
                    <MainContactPersonOrganization control={control} />
                  </Box>
                </Box>
                <Box mt="s16" py="s24">
                  <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                    {' '}
                    {t['settingsOrganizationAddress']}
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
                  {t['settingsOrganizationPinOnMap']}
                </Button>
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                  {' '}
                  {t['settingsOrganizationRegistrationDetails']}
                </Text>
                <Box mt="s16">
                  <RegistrationDetailsOrganization control={control} />
                </Box>
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="600" color={'gray.800'}>
                  {' '}
                  {t['settingsOrganizationDocumnents']}
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
                    <Button size={'md'}>
                      {t['settingsOrganizationSaveChanges']}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Organization;

Organization.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
