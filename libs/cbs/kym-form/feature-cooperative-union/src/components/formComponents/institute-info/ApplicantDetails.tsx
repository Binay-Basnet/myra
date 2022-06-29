import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ApplicantDetails = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const isPermanentAndTemporaryAddressSame = watch(
    'applicantIsPermanentAndTemporaryAddressSame'
  );
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
  const currentProvinceId = watch('applicantPermanentStateId');
  const currentDistrictId = watch('applicantPermanentDistrictId');

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentProvinceId]
  );

  const localityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentDistrictId]
  );

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch('applicantTemporaryStateId');
  const currentTemptDistrictId = watch('applicantTemporaryDistrictId');

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentTempProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtList.find((d) => d.id === currentTemptDistrictId)
        ?.municipalities ?? [],
    [currentTemptDistrictId]
  );
  return (
    <>
      <GroupContainer id="Current Member Details" scrollMarginTop={'200px'}>
        <Text
          fontSize="r1"
          fontWeight="semibold"
          color="neutralColorLight.Gray-80"
        >
          {t['kymCoopUnionApplicant']}
        </Text>
        <InputGroupContainer>
          <FormInput
            type="text"
            name="applicantName"
            label={t['kymCoopUnionName']}
            placeholder={t['kymCoopUnionEnterName']}
          />
          <FormInput
            type="text"
            name="applicantDesignation"
            label={t['kymCoopUnionDesignation']}
            placeholder={t['kymCoopUnionEnterDesignation']}
          />
          <Box></Box>
          <FormInput
            type="text"
            name="applicantEmail"
            label={t['kymCoopUnionEmailAddress']}
            placeholder={t['kymCoopUnionEmailAddressPlaceholder']}
          />
          <FormInput
            type="text"
            name="applicantContactNo"
            label={t['kymCoopUnionContactNo']}
            placeholder={t['kymCoopUnionContactNoPlaceholder']}
          />
          <FormInput
            type="text"
            name="applicantPANNo"
            label={t['kymCoopUnionPANNo']}
            placeholder={t['kymCoopUnionPANNoPlaceholder']}
          />
        </InputGroupContainer>

        <Box
          id="kymAccIndPermanentAddress"
          gap="s32"
          display={'flex'}
          flexDirection="column"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymIndPermanentAddress']}
          </Text>
          <Box
            id="Permanent Address"
            gap="s32"
            display={'flex'}
            flexDirection="column"
          >
            <InputGroupContainer>
              <FormSelect
                name="applicantPermanentStateId"
                label={t['kymIndProvince']}
                placeholder={t['kymIndSelectProvince']}
                options={province}
              />
              <FormSelect
                name="applicantPermanentDistrictId"
                label={t['kymIndDistrict']}
                placeholder={t['kymIndSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="applicantPermanentLocalityId"
                label={t['kymIndLocalGovernment']}
                placeholder={t['kymIndSelectLocalGovernment']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name="applicantPermanentWardId"
                label={t['kymIndWardNo']}
                placeholder={t['kymIndEnterWardNo']}
              />
              <FormInput
                type="text"
                name="applicantPermanentTole"
                label={t['kymIndLocality']}
                placeholder={t['kymIndEnterLocality']}
              />
              <FormInput
                type="text"
                name="applicantPermanentHouseNo"
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              />
            </InputGroupContainer>

            <Box mt="-16px">
              <FormMap name="applicantPermanentAddressLocation" />
            </Box>
          </Box>
        </Box>
        <Box
          id="kymAccIndTemporaryAddress"
          gap="s32"
          display={'flex'}
          flexDirection="column"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymIndTemporaryAddress']}
          </Text>

          <FormSwitch
            name="applicantIsPermanentAndTemporaryAddressSame"
            label={t['kymIndTemporaryAddressPermanent']}
          />

          {!isPermanentAndTemporaryAddressSame && (
            <>
              <InputGroupContainer>
                <FormSelect
                  name="applicantTemporaryStateId"
                  label={t['kymIndProvince']}
                  placeholder={t['kymIndSelectProvince']}
                  options={province}
                />
                <FormSelect
                  name="applicantTemporaryDistrictId"
                  label={t['kymIndDistrict']}
                  placeholder={t['kymIndSelectDistrict']}
                  options={districtTempList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name="applicantTemporaryLocalityId"
                  label={t['kymIndLocalGovernment']}
                  placeholder={t['kymIndSelectLocalGovernment']}
                  options={localityTempList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormInput
                  type="number"
                  name="applicantTemporaryWardId"
                  label={t['kymIndWardNo']}
                  placeholder={t['kymIndEnterWardNo']}
                />
                <FormInput
                  type="text"
                  name="applicantTemporaryTole"
                  label={t['kymIndLocality']}
                  placeholder={t['kymIndEnterLocality']}
                />
                <FormInput
                  type="text"
                  name="applicantTemporaryHouseNo"
                  label={t['kymIndHouseNo']}
                  placeholder={t['kymIndEnterHouseNo']}
                />
              </InputGroupContainer>

              <Box mt="-16px">
                <FormMap name="applicantTemporaryAddressLocation" />
              </Box>
            </>
          )}
        </Box>
      </GroupContainer>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <FormFileInput
          size="md"
          label={t['kymCoopUnionSignature']}
          // control={control}
          name="applicantSign"
        />
        <FormFileInput
          size="md"
          label={t['kymCoopUnionStamp']}
          // control={control}
          name="applicantStamp"
        />
        <FormFileInput
          size="md"
          label={'Applicant Decision Document'}
          // control={control}
          name="applicantDecisionDocument"
        />
      </Grid>
    </>
  );
};
