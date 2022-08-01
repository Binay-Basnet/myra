import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  CoopUnionPersonnelInput,
  useAllAdministrationQuery,
  useSetPersonnelDetailsMutation,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  isDeepEmpty,
  useTranslation,
} from '@coop/shared/utils';

import { CentralRepresentativeTraining } from './centralRepresentativeTraining';

interface ICRNotAmongDirectorsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

const CRNotAmongDirectors = ({ setSection }: ICRNotAmongDirectorsProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionPersonnelInput>();

  const { getValues, reset, watch, control } = methods;

  const { mutate } = useSetPersonnelDetailsMutation();

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <FormSwitch
          px={'s16'}
          id="centralRepresentativeDetails"
          name="notAmongDirectors"
          label={t['kymCoopUnionCRNotDir']}
        />
      </form>
    </FormProvider>
  );
};

interface IAddRepresentativeProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const AddRepresentative = ({ setSection }: IAddRepresentativeProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { data } = useAllAdministrationQuery();

  const methods = useForm<CoopUnionPersonnelInput>();

  const { getValues, reset, watch, control } = methods;

  const { mutate } = useSetPersonnelDetailsMutation();

  // useEffect(() => {
  //   const subscription = watch(
  //     debounce((data) => {
  //       if (id && data && !isDeepEmpty(data)) {
  //         mutate({
  //           id,
  //           personnelId: accountOperatorId,
  //           sectionType: CooperativeUnionPersonnelSection.AccountOperators,
  //           data: { id, ...data },
  //         });
  //         // refetch();
  //       }
  //     }, 800)
  //   );

  //   return () => subscription.unsubscribe();
  // }, [watch, router.isReady]);

  const isPermanentAndTemporaryAddressSame = watch(
    'isPermanentAndTemporaryAddressSame'
  );

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);
  // const directorList = watch('boardOfDirectorsDetails');
  // const direcctorArray = directorList?.map((a) => a?.fullName);
  // console.log('director', direcctorArray);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('permanentAddress.provinceId');
  const currentDistrictId = watch('permanentAddress.districtId');

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
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch('temporaryAddress.districtId');

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
  const tab = true ?? false;
  return (
    <Box
      id="kymCoopUnionAccDetailsofdirectorsaffiliatedwithotherFirms"
      scrollMarginTop={'200px'}
    >
      {/* {!tab && (
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDirection={'column'}
          px="s16"
        >
          <FormRadioGroup
            name="directorchoosing"
            radioList={direcctorArray}
            orientation="vertical"
            size={'md'}
          />
        </Box>
      )} */}
      <CRNotAmongDirectors setSection={setSection} />

      {tab && (
        <Box display="flex" alignItems="center">
          {/* <DynamicBoxGroupContainer> */}

          <DynamicBoxGroupContainer p="s20">
            <SectionContainer>
              <FormProvider {...methods}>
                <form
                  onFocus={(e) => {
                    const kymSection = getKymSectionCoOperativeUnion(
                      e.target.id
                    );

                    setSection(kymSection);
                  }}
                >
                  <SectionContainer>
                    <InputGroupContainer>
                      <FormInput
                        type="text"
                        name={`fullName`}
                        label={t['kymCoopUnionDirFullName']}
                        placeholder={t['kymCoopUnionDirEnterFullName']}
                      />
                      <FormInput
                        type="text"
                        name={`designation`}
                        label={t['kymCoopUnionDirDesignation']}
                        placeholder={t['kymCoopUnionDirEnterDesignation']}
                      />
                    </InputGroupContainer>

                    <Text fontSize="r1" fontWeight="SemiBold">
                      {t['kymCoopUnionDirPermanentAddress']}
                    </Text>
                    {/* <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            > */}
                    <InputGroupContainer>
                      <FormSelect
                        name={`permanentAddress.provinceId`}
                        label={t['kymCoopUnionDirState']}
                        placeholder={t['kymCoopUnionDirSelectState']}
                        options={province}
                      />
                      <FormSelect
                        name={`permanentAddress.districtId`}
                        label={t['kymCoopUnionDirDistrict']}
                        placeholder={t['kymCoopUnionDirSelectDistrict']}
                        options={districtList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        name={`permanentAddress.localGovernmentId`}
                        label={t['kymCoopUnionDirVDCMunicipality']}
                        placeholder={t['kymCoopUnionDirSelectVDCMunicipality']}
                        options={localityList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormInput
                        type="number"
                        name={`permanentAddress.wardNo`}
                        label={t['kymCoopUnionDirWardNo']}
                        placeholder={t['kymCoopUnionDirEnterWardNo']}
                      />
                      <FormInput
                        type="text"
                        name={`permanentAddress.locality`}
                        label={t['kymCoopUnionDirLocality']}
                        placeholder={t['kymCoopUnionDirEnterLocality']}
                      />
                      <FormInput
                        type="text"
                        name="permanentAddress.houseNo"
                        label={t['kymIndHouseNo']}
                        placeholder={t['kymIndEnterHouseNo']}
                      />
                    </InputGroupContainer>

                    <Box>
                      <FormMap name={`permanentAddress.coordinates`} />
                    </Box>
                    {/* </Box> */}

                    <Box
                      id="Temporary Address"
                      gap="s32"
                      display={'flex'}
                      flexDirection="column"
                      scrollMarginTop={'200px'}
                    >
                      <Text fontSize="r1" fontWeight="SemiBold">
                        {t['kymCoopUnionDirTemporaryAddress']}
                      </Text>

                      <FormSwitch
                        id="isPermanentAndTemporaryAddressSame"
                        name="isPermanentAndTemporaryAddressSame"
                        label={t['kymCoopUnionDirTemporaryAddressPermanent']}
                      />

                      {!isPermanentAndTemporaryAddressSame && (
                        <>
                          <InputGroupContainer>
                            <FormSelect
                              name={`temporaryAddress.provinceId`}
                              label={t['kymCoopUnionDirState']}
                              placeholder={t['kymCoopUnionDirSelectState']}
                              options={province}
                            />
                            <FormSelect
                              name={`temporaryAddress.districtId`}
                              label={t['kymCoopUnionDirDistrict']}
                              placeholder={t['kymCoopUnionDirSelectDistrict']}
                              options={districtTempList.map((d) => ({
                                label: d.name,
                                value: d.id,
                              }))}
                            />
                            <FormSelect
                              name={`temporaryAddress.localGovernmentId`}
                              label={t['kymCoopUnionDirVDCMunicipality']}
                              placeholder={
                                t['kymCoopUnionDirSelectVDCMunicipality']
                              }
                              options={localityTempList.map((d) => ({
                                label: d.name,
                                value: d.id,
                              }))}
                            />
                            <FormInput
                              type="number"
                              name={`temporaryAddress.wardNo`}
                              label={t['kymCoopUnionDirWardNo']}
                              placeholder={t['kymCoopUnionDirEnterWardNo']}
                            />
                            <FormInput
                              type="text"
                              name={`temporaryAddress.locality`}
                              label={t['kymCoopUnionDirLocality']}
                              placeholder={t['kymCoopUnionDirEnterLocality']}
                            />
                            <FormInput
                              type="text"
                              name="temporaryAddress.houseNo"
                              label={t['kymIndHouseNo']}
                              placeholder={t['kymIndEnterHouseNo']}
                            />
                          </InputGroupContainer>

                          <Box mt="-16px">
                            <FormMap name={`temporaryAddress.coordinates`} />
                          </Box>
                        </>
                      )}
                    </Box>
                    <InputGroupContainer>
                      <FormInput
                        type="date"
                        name={`dateOfMembership`}
                        label={t['kymCoopUnionDirDateofMembership']}
                        placeholder="DD-MM-YYYY"
                      />
                      <FormInput
                        type="text"
                        name={`highestQualification`}
                        label={t['kymCoopUnionDirHighestQualification']}
                        placeholder={
                          t['kymCoopUnionDirEnterHigestQualification']
                        }
                      />
                      <FormInput
                        type="number"
                        name={`contactNumber`}
                        label={t['kymCoopUnionDirMobileNo']}
                        placeholder={t['kymCoopUnionDirEnterMobileNo']}
                      />
                      <FormInput
                        type="text"
                        name={`email`}
                        label={t['kymCoopUnionDirEmail']}
                        placeholder={t['kymCoopUnionDirEnterEmail']}
                      />
                      <FormInput
                        type="string"
                        name={`citizenshipOrPassportOrLisenceNo`}
                        label={
                          t[
                            'kymCoopUnionDirCitizenshipPassportDrivingLicenseNo'
                          ]
                        }
                        placeholder={t['keyCoopUnionDirEnterNo']}
                      />
                    </InputGroupContainer>
                    {/* <Text fontSize="r1" fontWeight="SemiBold">
                {t['kymCoopUnionDirTrainingRelatedtoCoop']}
              </Text> */}
                    {/* <InputGroupContainer>
                <FormInput
                  type="text"
                  name={`subjectOfTraining`}
                  label={t['kymCoopUnionDirSubjectOfTraining']}
                  placeholder={t['kymCoopUnionDirEnterSubjectOfTraining']}
                />
                <FormInput
                  type="date"
                  name={`dateOfTraining`}
                  label={t['kymCoopUnionDirDateOfTraining']}
                  placeholder={t['kymCoopUnionDirEnterDateOfTraining']}
                />
                <FormInput
                  type="number"
                  name={`trainingOrganization`}
                  label={t['kymCoopUnionDirTrainingOrganization']}
                  placeholder={t['kymCoopUnionDirEnterTrainingOrganization']}
                />
              </InputGroupContainer> */}
                    <CentralRepresentativeTraining />
                  </SectionContainer>
                </form>
              </FormProvider>

              <Grid
                templateColumns="repeat(2, 1fr)"
                rowGap="s32"
                columnGap="s20"
              >
                <Box w="124px">
                  <KYMDocumentField
                    // size="md"
                    label={t['kymCoopUnionDirPhotograph']}
                    // control={control}
                    name={`photograph`}
                    setKymCurrentSection={setSection}
                  />
                </Box>
                <Box display={'flex'} flexDirection="column" gap={'s8'}>
                  <Text fontSize={'s3'} fontWeight="500">
                    {t['kymCoopUnionDirPhotographOfIdentityProofDocument']}
                  </Text>
                  <Box w="124px">
                    <KYMDocumentField
                      // size="md"
                      // control={control}
                      name={`identityDocumentPhoto`}
                      setKymCurrentSection={setSection}
                    />
                  </Box>
                </Box>

                <Box display={'flex'} flexDirection="column" gap={'s8'}>
                  <Text fontSize={'s3'} fontWeight="500">
                    {t['kymCoopUnionDirSpecimenSignature']}
                  </Text>
                  <Box w="124px">
                    <KYMDocumentField
                      // size="md"
                      // control={control}
                      name={`signature`}
                      setKymCurrentSection={setSection}
                    />
                  </Box>
                </Box>

                <Box display={'flex'} flexDirection="column" gap={'s8'}>
                  <Text fontSize={'s3'} fontWeight="500">
                    {t['kymCoopUnionCRDecisionDocument']}
                  </Text>
                  <Box w="124px">
                    <KYMDocumentField
                      // size="md"
                      // control={control}
                      name={`crDecisionDocument`}
                      setKymCurrentSection={setSection}
                    />
                  </Box>
                </Box>
              </Grid>
              {/* <InputGroupContainer>
                <Box w="124px">
                  <FormFileInput
                    name={`signature`}
                    label={t['kymCoopUnionDirSpecimenSignature']}
                  />
                </Box>
              </InputGroupContainer> */}
            </SectionContainer>
          </DynamicBoxGroupContainer>
        </Box>
      )}
    </Box>
  );
};
