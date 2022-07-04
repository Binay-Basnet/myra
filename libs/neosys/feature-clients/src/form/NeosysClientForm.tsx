import { useMemo } from 'react';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
} from '@coop/shared/form';
import { Box, Divider, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const NeosysClientForm = ({ watch }: any) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('oprProvinceId');
  const currentDistrictId = watch('oprDistrictId');

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentProvinceId]
  );

  const muncipalityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentDistrictId]
  );

  return (
    <Box display="flex" flexDirection="column" gap="s32" p="s20">
      <Box display="flex" flexDirection="column" gap="s32">
        <InputGroupContainer>
          <FormInput
            type="text"
            name="orgnanizationType"
            label={t['neoClientOrganizationType']}
            placeholder={t['neoClientOrganizationType']}
          />

          <FormInput
            type="text"
            name="orgnanizationCode"
            label={t['neoClientOrganizationCode']}
            placeholder={t['neoClientOrganizationCode']}
          />
        </InputGroupContainer>
        <FormInput
          type="text"
          name="orgnanizationName"
          label={t['neoClientOrganizationName']}
          placeholder={t['neoClientOrganizationName']}
        />
        <Box w="110px">
          <FormFileInput
            size="md"
            label={t['neoClientOrganizationLogo']}
            name="OrganizationLogo"
          />
        </Box>
        <FormInput
          type="text"
          name="URL"
          label={t['neoClientURL']}
          placeholder={t['neoClientSlug']}
        />
      </Box>

      <Divider />

      <Box display="flex" flexDirection="column" gap="s16">
        <Text
          fontSize="r1"
          fontWeight="SemiBold"
          color="neutralColorLight.Gray-60"
        >
          {t['neoClientContactDetails']}
        </Text>
        <InputGroupContainer>
          <FormInput
            type="text"
            name="officePhone"
            label={t['neoClientOfficePhone']}
            placeholder={t['neoClientOfficePhone']}
          />
          <FormInput
            type="text"
            name="emailAddress"
            label={t['neoClientEmailAddress']}
            placeholder={t['neoClientEmailAddress']}
          />
          <FormInput
            type="text"
            name="cientWebsite"
            label={t['neoClientWebsite']}
            placeholder={t['neoClientWebsite']}
          />
        </InputGroupContainer>
      </Box>

      <Divider />

      <Box display="flex" flexDirection="column" gap="s16">
        <Text
          fontSize="r1"
          fontWeight="SemiBold"
          color="neutralColorLight.Gray-60"
        >
          {t['neoClientRegistrationDetails']}
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="registeredOffice"
              label={t['neoClientRegisteredOffice']}
              placeholder={t['neoClientRegisteredOffice']}
            />
          </GridItem>
          <GridItem>
            <FormInput
              type="text"
              name="registeredNo"
              label={t['neoClientRegisteredNo']}
              placeholder={t['neoClientRegisteredNo']}
            />
          </GridItem>
        </Grid>
        <FormInput
          type="text"
          name="registeredAddress"
          label={t['neoClientRegisteredAddress']}
          placeholder={t['neoClientRegisteredAddress']}
        />
        <InputGroupContainer>
          <FormInput
            type="text"
            name="registrationDate"
            label={t['neoClientRegistrationDate']}
            placeholder={t['neoClientRegistrationDate']}
          />
          <FormInput
            type="text"
            name="clientPANVATNo"
            label={t['neoClientPANVATNo']}
            placeholder={t['neoClientPANVATNo']}
          />
        </InputGroupContainer>
      </Box>

      <Divider />

      <Box display="flex" flexDirection="column" gap="s16">
        <Text
          fontSize="r1"
          fontWeight="SemiBold"
          color="neutralColorLight.Gray-60"
        >
          {t['neoClientAddress']}
        </Text>
        <InputGroupContainer>
          <FormSelect
            name="province"
            label={t['neoClientProvince']}
            placeholder={t['neoClientSelectProvince']}
            options={province.map((d) => ({
              label: d.label,
              value: d.value,
            }))}
          />

          <FormSelect
            name="clientDistrict"
            label={t['neoClientDistrict']}
            placeholder={t['neoClientSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />

          <FormSelect
            name="localGovernment"
            label={t['neoClientLocalGovernment']}
            placeholder={t['neoClienSelectLocalGovernment']}
            options={muncipalityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormInput
            type="text"
            name="wardNo"
            label={t['neoClientWardNo']}
            placeholder={t['neoClientEnterWardNo']}
          />
          <FormInput
            type="text"
            name="locality"
            label={t['neoClientLocality']}
            placeholder={t['neoClientEnterLocality']}
          />
          <FormInput
            type="text"
            name="houseNo"
            label={t['neoClientHouseNo']}
            placeholder={t['neoClientEnterHouseNo']}
          />
        </InputGroupContainer>
        <Box>
          <FormMap name="kymCoopLocation" />
        </Box>
      </Box>

      <Divider />

      <Box display="flex" flexDirection="column" gap="s16">
        <Text
          fontSize="r1"
          fontWeight="SemiBold"
          color="neutralColorLight.Gray-60"
        >
          {t['neoClientMainContactPerson']}
        </Text>

        <InputGroupContainer>
          <FormInput
            type="text"
            name="name"
            label={t['neoClientName']}
            placeholder={t['neoClientName']}
          />
          <FormInput
            type="text"
            name="emailAddress"
            label={t['neoClientEmailAddress']}
            placeholder={t['neoClientEmailAddress']}
          />
          <FormInput
            type="text"
            name="phoneNumber"
            label={t['neoClientPhoneNumber']}
            placeholder={t['neoClientPhoneNumber']}
          />
        </InputGroupContainer>
      </Box>
    </Box>
  );
};
