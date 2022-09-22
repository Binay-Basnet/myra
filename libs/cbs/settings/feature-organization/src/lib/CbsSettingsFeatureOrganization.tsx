import { FormProvider, useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';

import { KymMemberTypesEnum, useSetOrganizationDataMutation } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { FormFileInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, Button, Text } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

import {
  AddressOrganization,
  ContactDetailsOrganization,
  MainContactPersonOrganization,
  RegistrationDetailsOrganization,
} from '../components';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureOrganizationProps {}

export const CbsSettingsFeatureOrganization = () => {
  const { t } = useTranslation();
  const methods = useForm({});
  const { getValues } = methods;

  const { mutate } = useSetOrganizationDataMutation();
  return (
    <Box width="100%" display="flex" flexDirection="column">
      <SettingsPageHeader heading={`Organizations - ${featureCode?.settingsOrganization}`} />
      <Box display="flex" flexDirection="row" h="fit-content">
        <Box
          w="250px"
          position="fixed"
          px="s8"
          py="s16"
          borderRight="1px"
          borderRightColor="border.layout"
          minHeight="100vh"
        >
          <Box bg="gray.200" p="s16" borderRadius="br2">
            <Text fontSize="r1" fontWeight="SemiBold">
              {t['settingsOrganization']}
            </Text>
          </Box>
        </Box>

        <FormProvider {...methods}>
          <form
            onChange={debounce(() => {
              mutate({
                data: getValues(),
              });
            }, 500)}
          >
            <Box ml="250px" px="s16" flex={1} display="flex" flexDirection="column">
              <Box py="s24">
                <Text fontWeight="SemiBold">{t['settingsOrganizationBasicDetails']}</Text>
                <Box mt="s24" w="100%">
                  <FormInput
                    label={t['settingsOrganizationOrganizationName']}
                    __placeholder={t['settingsOrganizationEntername']}
                    name="name"
                    type="text"
                  />
                </Box>
                <Text mt="s16" fontSize="s3" fontWeight="500">
                  {t['settingsOrganizationOrganizationLogo']}
                </Text>
                <Box mt="s16" w="110px">
                  {/* =====================TODO ADD FILE DROPBOX ===================================================== */}
                  <FormFileInput name="logo" size="md" />
                </Box>
                <Box mt="s16">
                  <FormRadioGroup
                    label={t['settingsOrganizationTypeOfOrganization']}
                    name="typeOfOrganization"
                    options={[
                      {
                        label: t['settingsIndividual'],
                        value: KymMemberTypesEnum.Cooperative,
                      },
                      {
                        label: t['settingsInstitutional'],
                        value: KymMemberTypesEnum.CooperativeUnion,
                      },
                    ]}
                    labelFontSize="s3"
                  />
                </Box>
                <Box mt="s16" py="s24">
                  <Text fontSize="r1" fontWeight="SemiBold" color="gray.800">
                    {' '}
                    {t['settingsOrganizationContactDetails']}
                  </Text>
                  <Box mt="s16">
                    <ContactDetailsOrganization />
                  </Box>
                </Box>
                <Box mt="s16" py="s24">
                  <Text fontSize="r1" fontWeight="SemiBold" color="gray.800">
                    {' '}
                    {t['settingsOrganizationMainContactPerson']}
                  </Text>
                  <Box mt="s16">
                    <MainContactPersonOrganization />
                  </Box>
                </Box>
                <Box mt="s16" py="s24">
                  <Text fontSize="r1" fontWeight="SemiBold" color="gray.800">
                    {' '}
                    {t['settingsOrganizationAddress']}
                  </Text>
                  <Box mt="s16">
                    <AddressOrganization />
                  </Box>
                </Box>
                {/* <Button
                  leftIcon={<Icon size="md" as={FaMap} />}
                  mt={'s16'}
                  type="submit"
                >
                  {t['settingsOrganizationPinOnMap']}
                </Button> */}
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="SemiBold" color="gray.800">
                  {' '}
                  {t['settingsOrganizationRegistrationDetails']}
                </Text>
                <Box mt="s16">
                  <RegistrationDetailsOrganization />
                </Box>
              </Box>
              <Box mt="s16" py="s24">
                <Text fontSize="r1" fontWeight="SemiBold" color="gray.800">
                  {' '}
                  {t['settingsOrganizationDocumnents']}
                </Text>
                <Box w="100%" mt="s16" h="500px">
                  {/* ==========================TODO ADD DROPDOWN HERE ===================== */}
                  <FormFileInput name="documents" size="lg" />
                  <Box mt="s60" display="flex" justifyContent="flex-end">
                    {' '}
                    <Button size="md" type="submit">
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

export default CbsSettingsFeatureOrganization;
