import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';

import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  CooperativeUnionPersonnelSection,
  CoopUnionPersonnelInput,
  useAllAdministrationQuery,
  useGetBoardOfDirectorsDetailsListQuery,
  useGetCentralRepresentativeDetailsQuery,
  useGetNewIdMutation,
  useSetPersonnelDetailsMutation,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Grid,
  RadioGroup,
  Switch,
  Text,
  TextFields,
} from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  isDeepEmpty,
  useTranslation,
} from '@coop/shared/utils';

import { CentralRepresentativeTraining } from './centralRepresentativeTraining';

interface ICRDirectorsSelectionProps {
  setSection: (section?: { section: string; subSection: string }) => void;
  refetch: any;
  crId: string;
  notAmongDirectors: boolean;
}

const CRDirectorsSelection = ({
  setSection,
  refetch,
  crId,
  notAmongDirectors,
}: ICRDirectorsSelectionProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const methods = useForm<CoopUnionPersonnelInput>();

  const { getValues, reset, watch, control } = methods;

  const { data: bodEditValues } = useGetBoardOfDirectorsDetailsListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  const directorArray =
    bodEditValues?.members?.cooperativeUnion?.formState?.data?.formData?.boardOfDirectorsDetails?.personnelDetails?.map(
      (personnel) => ({ name: personnel?.fullName, id: personnel?.id })
    );

  const { data: crDetailsEditData } = useGetCentralRepresentativeDetailsQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  console.log({ notAmongDirectors });

  console.log({ directorArray });

  const { mutate } = useSetPersonnelDetailsMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id && data && !isDeepEmpty(data)) {
          mutate({
            id,
            personnelId: data?.notAmongDirectors ? crId : '',
            sectionType: CooperativeUnionPersonnelSection.CentralRepresentative,
            data,
          });
          // refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <GroupContainer>
          {!notAmongDirectors && (
            <FormRadioGroup
              name="centralRepID"
              options={directorArray?.map((director) => ({
                label: director.name,
                value: director.id,
              }))}
              orientation="vertical"
              size={'md'}
              label={'Select Central Representative among Directors'}
            />
          )}

          <FormSwitch
            px={'s16'}
            id="centralRepresentativeDetails"
            name="notAmongDirectors"
            label={t['kymCoopUnionCRNotDir']}
          />
        </GroupContainer>
      </form>
    </FormProvider>
  );
};

interface IAddRepresentativeProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const AddRepresentative = ({ setSection }: IAddRepresentativeProps) => {
  const { t } = useTranslation();

  const [notAmongDirectors, setNotAmongDirectors] = useState<boolean>(false);

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const [crId, setCRId] = useState<string>('');

  const { data } = useAllAdministrationQuery();

  const methods = useForm<CoopUnionPersonnelInput>();

  const { getValues, reset, watch, control } = methods;

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setCRId(res.newId);
    },
  });

  useEffect(() => {
    if (!crId) {
      newIdMutate({});
    }

    return () => setCRId('');
  }, []);

  const { mutate } = useSetPersonnelDetailsMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id && data && !isDeepEmpty(data)) {
          mutate({
            id,
            personnelId: crId,
            sectionType: CooperativeUnionPersonnelSection.CentralRepresentative,
            data,
          });
          // refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const { data: crDetailsEditData, refetch } =
    useGetCentralRepresentativeDetailsQuery(
      {
        id: String(id),
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (crDetailsEditData) {
      const crDetail =
        crDetailsEditData?.members?.cooperativeUnion?.formState?.data?.formData
          ?.centralRepresentativeDetails;

      if (crDetail) {
        reset({
          ...omit(
            pickBy(crDetail, (v) => v !== null),
            ['id']
          ),
        });

        setNotAmongDirectors(crDetail.notAmongDirectors ?? false);
      }
    }
  }, [crDetailsEditData]);

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

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('permanentAddress.provinceId');
  const currentDistrictId = watch('permanentAddress.districtId');
  const currentLocalGovernmentId = watch('permanentAddress.localGovernmentId');

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

  const wardList = useMemo(
    () =>
      localityList.find((d) => d.id === currentLocalGovernmentId)?.wards ?? [],
    [currentLocalGovernmentId]
  );

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch('temporaryAddress.districtId');
  const currentTempLocalGovernmentId = watch(
    'temporaryAddress.localGovernmentId'
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

  const wardTempList = useMemo(
    () =>
      localityTempList.find((d) => d.id === currentTempLocalGovernmentId)
        ?.wards ?? [],
    [currentTempLocalGovernmentId]
  );

  return (
    <Box
      id="kymCoopUnionAccDetailsofdirectorsaffiliatedwithotherFirms"
      scrollMarginTop={'200px'}
    >
      <GroupContainer>
        <CRDirectorsSelection
          crId={crId}
          setSection={setSection}
          refetch={refetch}
          notAmongDirectors={notAmongDirectors}
        />

        {notAmongDirectors && (
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
                          name={`designationEn`}
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
                          placeholder={
                            t['kymCoopUnionDirSelectVDCMunicipality']
                          }
                          options={localityList.map((d) => ({
                            label: d.name,
                            value: d.id,
                          }))}
                        />
                        <FormSelect
                          name={`permanentAddress.wardNo`}
                          label={t['kymCoopUnionDirWardNo']}
                          placeholder={t['kymCoopUnionDirEnterWardNo']}
                          options={wardList.map((d) => ({
                            label: d,
                            value: d,
                          }))}
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
                              <FormSelect
                                name={`temporaryAddress.wardNo`}
                                label={t['kymCoopUnionDirWardNo']}
                                placeholder={t['kymCoopUnionDirEnterWardNo']}
                                options={wardTempList.map((d) => ({
                                  label: d,
                                  value: d,
                                }))}
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
                          name={`mobileNumber`}
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
                          name={`citizenshipNo`}
                          label={
                            t[
                              'kymCoopUnionDirCitizenshipPassportDrivingLicenseNo'
                            ]
                          }
                          placeholder={t['keyCoopUnionDirEnterNo']}
                        />

                        <FormInput
                          type="string"
                          name={`panNo`}
                          label={'PAN No'}
                          placeholder={'Enter PAN No'}
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
                      getKymSection={getKymSectionCoOperativeUnion}
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
                        getKymSection={getKymSectionCoOperativeUnion}
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
                        getKymSection={getKymSectionCoOperativeUnion}
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
                        getKymSection={getKymSectionCoOperativeUnion}
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
      </GroupContainer>
    </Box>
  );
};
