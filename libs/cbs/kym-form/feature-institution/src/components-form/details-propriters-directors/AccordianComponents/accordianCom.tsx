import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  RootState,
  useAllAdministrationQuery,
  useAppSelector,
  useGetInsBoardDirectorEditListQuery,
  useSetAddDirectorInstitutionMutation,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  directorId: string;
}

export const DirectorTopPart = ({ setKymCurrentSection, directorId }: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useForm();

  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { mutate } = useSetAddDirectorInstitutionMutation();
  const { data: editValues, refetch: refetchEdit } = useGetInsBoardDirectorEditListQuery({
    id,
  });
  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.institution?.listDirectors?.data;

      const familyMemberDetail = editValueData?.find((data) => data?.id === directorId);

      if (familyMemberDetail) {
        reset({
          name: familyMemberDetail?.name,
          designation: familyMemberDetail?.designation,
          permanentAddress: {
            ...familyMemberDetail?.permanentAddress,

            locality: familyMemberDetail?.permanentAddress?.locality?.local,

            // }
          },
          temporaryAddress: {
            ...familyMemberDetail?.temporaryAddress,

            locality: familyMemberDetail?.permanentAddress?.locality?.local,

            // }
          },
          isTemporaryAndPermanentAddressSame:
            familyMemberDetail?.isTemporaryAndPermanentAddressSame,
          dateOfMembership: familyMemberDetail?.dateOfMembership,
          highestQualification: familyMemberDetail?.highestQualification,
          mobileNo: familyMemberDetail?.mobileNo,
          email: familyMemberDetail?.email,
          citizenshipNo: familyMemberDetail?.citizenshipNo,
          panNo: familyMemberDetail?.panNo,
          isHeadOfOrganization: familyMemberDetail?.isHeadOfOrganization,
        });
      }
    }
  }, [editValues]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetchEdit();
  }, [preference?.date]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, dir: directorId, data: { ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const { data } = useAllAdministrationQuery();

  const province = useMemo(
    () =>
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    [data?.administration?.all]
  );

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch(`permanentAddress.provinceId`);
  const currentDistrictId = watch(`permanentAddress.districtId`);
  const currentLocalityId = watch('permanentAddress.localGovernmentId');

  const districtList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentProvinceId)?.districts ?? [],
    [currentProvinceId]
  );

  const localityList = useMemo(
    () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
    [currentDistrictId]
  );
  const wardList = useMemo(
    () => localityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId]
  );

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch(`temporaryAddress.districtId`);
  const currentTempLocalityId = watch('temporaryAddress.localGovernmentId');

  const districtTempList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentTempProvinceId)?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () => districtTempList.find((d) => d.id === currentTemptDistrictId)?.municipalities ?? [],
    [currentTemptDistrictId]
  );

  const wardTempList = useMemo(
    () => localityTempList.find((d) => d.id === currentTempLocalityId)?.wards ?? [],
    [currentTempLocalityId]
  );

  const isPermanentAndTemporaryAddressSame = watch(`isTemporaryAndPermanentAddressSame`);

  //   const resetDirectorForm = () => {
  //     const values = getValues();

  //     // values['detailsOfDirectors'][index] = {};

  //     reset({ detailsOfDirectors: values['detailsOfDirectors'] });
  //   };

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <Box display="flex" flexDirection="column" gap="s32">
          <InputGroupContainer>
            <FormInput
              id="DirectorInstitutionId"
              type="text"
              name="name"
              label={t['kymInsFullName']}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="text"
              name="designation"
              label={t['kymInsDesignation']}
            />
          </InputGroupContainer>

          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsPermanentAddress']}
          </Text>
          {/* <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            > */}
          <InputGroupContainer>
            <FormSelect
              name="permanentAddress.provinceId"
              id="DirectorInstitutionId"
              label={t['kymInsState']}
              options={province}
            />
            <FormSelect
              name="permanentAddress.districtId"
              id="DirectorInstitutionId"
              label={t['kymInsDistrict']}
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              id="DirectorInstitutionId"
              name="permanentAddress.localGovernmentId"
              label={t['kymInsVDCMunicipality']}
              options={localityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              id="DirectorInstitutionId"
              name="permanentAddress.wardNo"
              label={t['kymInsWardNo']}
              options={wardList?.map((d) => ({
                label: d,
                value: d,
              }))}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="text"
              name="permanentAddress.locality"
              label={t['kymInsLocality']}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="text"
              name="permanentAddress.houseNo"
              label={t['kymInsHouseNo']}
            />
          </InputGroupContainer>

          <Box>
            <FormMap name="permanentAddress.coordinates" id="DirectorInstitutionId" />
          </Box>

          <Box
            id="Temporary Address"
            gap="s32"
            display="flex"
            flexDirection="column"
            scrollMarginTop="200px"
          >
            <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymInsTemporaryAddress']}
            </Text>

            <FormSwitch
              id="isPermanentAndTemporaryAddressSame"
              name="isTemporaryAndPermanentAddressSame"
              label={t['kymInsTemporaryAddressPermanent']}
            />

            {!isPermanentAndTemporaryAddressSame && (
              <>
                <InputGroupContainer>
                  <FormSelect
                    id="DirectorInstitutionId"
                    name="temporaryAddress.provinceId"
                    label={t['kymInsState']}
                    options={province}
                  />
                  <FormSelect
                    id="DirectorInstitutionId"
                    name="temporaryAddress.districtId"
                    label={t['kymInsDistrict']}
                    options={districtTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    id="DirectorInstitutionId"
                    name="temporaryAddress.localGovernmentId"
                    label={t['kymInsVDCMunicipality']}
                    options={localityTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    id="DirectorInstitutionId"
                    name="temporaryAddress.wardNo"
                    label={t['kymInsWardNo']}
                    options={wardTempList?.map((d) => ({
                      label: d,
                      value: d,
                    }))}
                  />
                  <FormInput
                    id="DirectorInstitutionId"
                    type="text"
                    name="temporaryAddress.locality"
                    label={t['kymInsLocality']}
                  />
                  <FormInput
                    id="DirectorInstitutionId"
                    type="text"
                    name="temporaryAddress.houseNo"
                    label={t['kymInsHouseNo']}
                  />
                </InputGroupContainer>
                <FormMap id="DirectorInstitutionId" name="temporaryAddress.coordinates" />
              </>
            )}
          </Box>

          <Box>
            <InputGroupContainer>
              <FormDatePicker
                id="DirectorInstitutionId"
                name="dateOfMembership"
                label={t['kymInsDateOfMembership']}
              />
              <FormInput
                id="DirectorInstitutionId"
                type="text"
                name="highestQualification"
                label={t['kymInsHighestQualification']}
              />
              <FormInput
                id="DirectorInstitutionId"
                type="string"
                name="mobileNo"
                label={t['kymInsMobileNo']}
              />
              <FormInput
                id="DirectorInstitutionId"
                type="text"
                name="email"
                label={t['kymInsEmail']}
              />
              <FormInput
                id="DirectorInstitutionId"
                type="string"
                name="citizenshipNo"
                label={t['kymInsCitizenshipPassportDrivingLicenseNo']}
              />
              <FormInput
                id="DirectorInstitutionId"
                type="string"
                name="panNo"
                label={t['kymInsPanNo']}
              />
            </InputGroupContainer>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
