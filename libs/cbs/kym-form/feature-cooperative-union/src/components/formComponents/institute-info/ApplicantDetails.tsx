import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  CoopUnionInstitutionInformationInput,
  useAllAdministrationQuery,
} from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IApplicantDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const ApplicantDetails = ({ setSection }: IApplicantDetailsProps) => {
  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  const { sectionStatus } = useCooperativeUnionInstitution({ methods });
  const sectionErrors = sectionStatus?.errors?.[0]?.errors;

  const { watch } = methods;

  const isPermanentAndTemporaryAddressSame = watch(
    'applicantIsPermanentAndTemporaryAddrSame'
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
  const currentProvinceId = watch('applicantPermanentAddress.provinceId');
  const currentDistrictId = watch('applicantPermanentAddress.districtId');
  const currentLocalGovernmentId = watch(
    'applicantPermanentAddress.localGovernmentId'
  );

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

  const permanentWardList = useMemo(
    () =>
      localityList.find((d) => d.id === currentLocalGovernmentId)?.wards ?? [],
    [currentLocalGovernmentId]
  );

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch('applicantTemporaryAddress.provinceId');
  const currentTemptDistrictId = watch('applicantTemporaryAddress.districtId');
  const currentTempLocalGovernmentId = watch(
    'applicantTemporaryAddress.localGovernmentId'
  );

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentTempProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtTempList.find((d) => d.id === currentTemptDistrictId)
        ?.municipalities ?? [],
    [currentTemptDistrictId]
  );

  const temporaryWardList = useMemo(
    () =>
      localityTempList.find((d) => d.id === currentTempLocalGovernmentId)
        ?.wards ?? [],
    [currentTempLocalGovernmentId]
  );

  return (
    <>
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSectionCoOperativeUnion(e.target.id);

            setSection(kymSection);
          }}
        >
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
                errorText={
                  sectionErrors?.['applicantName'] &&
                  sectionErrors['applicantName'][0]
                }
              />
              <FormInput
                type="text"
                name="applicantDesignationEn"
                label={t['kymCoopUnionDesignation']}
                placeholder={t['kymCoopUnionEnterDesignation']}
                errorText={
                  sectionErrors?.['applicantDesignationEn'] &&
                  sectionErrors['applicantDesignationEn'][0]
                }
              />
              <Box></Box>
              <FormInput
                type="text"
                name="applicantEmail"
                label={t['kymCoopUnionEmailAddress']}
                placeholder={t['kymCoopUnionEmailAddressPlaceholder']}
                errorText={
                  sectionErrors?.['applicantEmail'] &&
                  sectionErrors['applicantEmail'][0]
                }
              />
              <FormInput
                type="text"
                name="applicantContactNo"
                label={t['kymCoopUnionContactNo']}
                placeholder={t['kymCoopUnionContactNoPlaceholder']}
                errorText={
                  sectionErrors?.['applicantContactNo'] &&
                  sectionErrors['applicantContactNo'][0]
                }
              />
              <FormInput
                type="text"
                name="applicantPanNo"
                label={t['kymCoopUnionPANNo']}
                placeholder={t['kymCoopUnionPANNoPlaceholder']}
                errorText={
                  sectionErrors?.['applicantPanNo'] &&
                  sectionErrors['applicantPanNo'][0]
                }
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
                    name="applicantPermanentAddress.provinceId"
                    label={t['kymIndProvince']}
                    placeholder={t['kymIndSelectProvince']}
                    options={province}
                  />
                  <FormSelect
                    name="applicantPermanentAddress.districtId"
                    label={t['kymIndDistrict']}
                    placeholder={t['kymIndSelectDistrict']}
                    options={districtList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name="applicantPermanentAddress.localGovernmentId"
                    label={t['kymIndLocalGovernment']}
                    placeholder={t['kymIndSelectLocalGovernment']}
                    options={localityList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />

                  <FormSelect
                    name="applicantPermanentAddress.wardNo"
                    label={t['kymIndWardNo']}
                    placeholder={t['kymIndEnterWardNo']}
                    options={permanentWardList?.map((d) => ({
                      label: d,
                      value: d,
                    }))}
                  />
                  <FormInput
                    type="text"
                    name="applicantPermanentAddress.locality"
                    label={t['kymIndLocality']}
                    placeholder={t['kymIndEnterLocality']}
                  />
                  {/* <FormInput
                type="text"
                name="applicantPermanentAddress.HouseNo"
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              /> */}
                </InputGroupContainer>

                <Box mt="-16px">
                  <FormMap name="applicantPermanentAddress.coordinates" />
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
                name="applicantIsPermanentAndTemporaryAddrSame"
                label={t['kymIndTemporaryAddressPermanent']}
              />

              {!isPermanentAndTemporaryAddressSame && (
                <>
                  <InputGroupContainer>
                    <FormSelect
                      name="applicantTemporaryAddress.provinceId"
                      label={t['kymIndProvince']}
                      placeholder={t['kymIndSelectProvince']}
                      options={province}
                    />
                    <FormSelect
                      name="applicantTemporaryAddress.districtId"
                      label={t['kymIndDistrict']}
                      placeholder={t['kymIndSelectDistrict']}
                      options={districtTempList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name="applicantTemporaryAddress.localGovernmentId"
                      label={t['kymIndLocalGovernment']}
                      placeholder={t['kymIndSelectLocalGovernment']}
                      options={localityTempList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name="applicantTemporaryAddress.wardNo"
                      label={t['kymIndWardNo']}
                      placeholder={t['kymIndEnterWardNo']}
                      options={temporaryWardList?.map((d) => ({
                        label: d,
                        value: d,
                      }))}
                    />
                    <FormInput
                      type="text"
                      name="applicantTemporaryAddress.locality"
                      label={t['kymIndLocality']}
                      placeholder={t['kymIndEnterLocality']}
                    />
                    {/* <FormInput
                  type="text"
                  name="applicantTemporaryAddress.HouseNo"
                  label={t['kymIndHouseNo']}
                  placeholder={t['kymIndEnterHouseNo']}
                /> */}
                  </InputGroupContainer>

                  <Box mt="-16px">
                    <FormMap name="applicantTemporaryAddress.coordinates" />
                  </Box>
                </>
              )}
            </Box>
          </GroupContainer>
        </form>
      </FormProvider>

      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <KYMDocumentField
          mutationId={id}
          size="md"
          label={t['kymCoopUnionSignature']}
          name="applicantSign"
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          mutationId={id}
          size="md"
          label={t['kymCoopUnionStamp']}
          name="applicantStamp"
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        {/* <FormFileInput
          size="md"
          label={'Applicant Decision Document'}
          // control={control}
          name="applicantDecisionDocument"
        /> */}
      </Grid>
    </>
  );
};
