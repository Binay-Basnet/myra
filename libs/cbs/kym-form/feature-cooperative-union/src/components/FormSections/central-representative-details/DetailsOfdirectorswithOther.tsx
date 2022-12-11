import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';

import { Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import {
  CooperativeUnionPersonnelSection,
  CoopUnionPersonnelInput,
  useGetBoardOfDirectorsDetailsListQuery,
  useGetCentralRepresentativeDetailsQuery,
  useGetNewIdMutation,
  useSetPersonnelDetailsMutation,
} from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormAddress,
  FormDatePicker,
  FormInput,
  FormRadioGroup,
  FormSwitch,
} from '@coop/shared/form';
import { getKymSectionCoOperativeUnion, isDeepEmpty, useTranslation } from '@coop/shared/utils';

import { CentralRepresentativeTraining } from './CentralRepresentativeTraining';
import { useCoopUnionCentralRep } from '../../../hooks/useCoopUnionCentralRep';

interface ICRDirectorsSelectionProps {
  setSection: (section?: { section: string; subSection: string }) => void;
  crId: string;
  setCRId: React.Dispatch<React.SetStateAction<string>>;
}

const CRDirectorsSelection = ({ setSection, crId, setCRId }: ICRDirectorsSelectionProps) => {
  const { t } = useTranslation();

  const [notAmongDirectors, setNotAmongDirectors] = useState<boolean>(false);

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const methods = useForm<CoopUnionPersonnelInput>();

  const { getValues, reset, watch } = methods;

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setCRId(res.newId);
    },
  });

  useEffect(() => {
    if (watch('notAmongDirectors') && !crId) {
      newIdMutate({});
    }
  }, [watch('notAmongDirectors'), crId]);

  useEffect(() => {
    if (crId) {
      const data = getValues();
      if (data?.notAmongDirectors) {
        mutate({
          id,
          personnelId: data?.notAmongDirectors ? crId : null,
          sectionType: CooperativeUnionPersonnelSection.CentralRepresentative,
          data,
        });
      }
    }
  }, [crId]);

  const { data: bodEditValues } = useGetBoardOfDirectorsDetailsListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  const directorArray =
    bodEditValues?.members?.cooperativeUnion?.formState?.formData?.boardOfDirectorsDetails?.data?.personnelDetails?.map(
      (personnel) => ({ name: personnel?.fullName, id: personnel?.id })
    );

  const { data: crDetailsEditData, refetch: refetchCentralRepresentativeDetail } =
    useGetCentralRepresentativeDetailsQuery(
      {
        id: String(id),
        includeRequiredErrors: false,
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (crDetailsEditData) {
      const crDetail =
        crDetailsEditData?.members?.cooperativeUnion?.formState?.formData
          ?.centralRepresentativeDetails?.data;

      if (crDetail) {
        reset({
          ...omit(
            pickBy(crDetail, (v) => v !== null),
            ['id']
          ),
        });

        setNotAmongDirectors(crDetail?.notAmongDirectors ?? false);
      }
    }
  }, [crDetailsEditData]);

  useEffect(() => {
    if (id) {
      refetchCentralRepresentativeDetail();
    }
  }, [id]);

  const { mutate } = useSetPersonnelDetailsMutation({
    onSuccess: () => refetchCentralRepresentativeDetail(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const crDetail = {
          ...omit(
            pickBy(
              crDetailsEditData?.members?.cooperativeUnion?.formState?.formData
                ?.centralRepresentativeDetails?.data,
              (v) => v !== null
            ),
            ['id']
          ),
        };
        if (id && data && !isDeepEmpty(data) && !isEqual(data, crDetail)) {
          if (!data?.notAmongDirectors) {
            mutate({
              id,
              personnelId: null,
              sectionType: CooperativeUnionPersonnelSection.CentralRepresentative,
              data: omit(data, ['id', 'cooperativeUnionId']),
            });
          }

          if (data?.notAmongDirectors && crId) {
            mutate({
              id,
              personnelId: crId,
              sectionType: CooperativeUnionPersonnelSection.CentralRepresentative,
              data: omit(data, ['id', 'cooperativeUnionId']),
            });
          }
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, crId]);

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
              size="md"
              label={t['kymCoopUnionSelectCentralRepresentativeamongDirectors']}
            />
          )}

          <FormSwitch
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

  const methods = useForm<CoopUnionPersonnelInput>();
  const { watch } = methods;

  const { crId, notAmongDirectors, setCRId } = useCoopUnionCentralRep({
    methods,
  });

  const isPermanentAndTemporaryAddressSame = watch('isPermanentAndTemporaryAddressSame');

  return (
    <FormSection id="kymCoopUnionAccDetailsofdirectorsaffiliatedwithotherFirms">
      <GridItem colSpan={3}>
        <CRDirectorsSelection crId={crId} setSection={setSection} setCRId={setCRId} />
      </GridItem>

      <GridItem colSpan={3}>
        {notAmongDirectors && (
          <Box display="flex" alignItems="center">
            <DynamicBoxGroupContainer p="s20">
              <SectionContainer>
                <FormProvider {...methods}>
                  <form
                    onFocus={(e) => {
                      const kymSection = getKymSectionCoOperativeUnion(e.target.id);

                      setSection(kymSection);
                    }}
                  >
                    <SectionContainer gap="s20">
                      <InputGroupContainer>
                        <FormInput
                          type="text"
                          name="fullName"
                          id="centralRepresentative.fullName"
                          label={t['kymCoopUnionDirFullName']}
                        />
                        <FormInput
                          type="text"
                          name="designationEn"
                          id="centralRepresentative.designationEn"
                          label={t['kymCoopUnionDirDesignation']}
                        />
                      </InputGroupContainer>

                      <Text fontSize="r1" fontWeight="SemiBold">
                        {t['kymCoopUnionDirPermanentAddress']}
                      </Text>
                      <InputGroupContainer>
                        <FormAddress name="permanentAddress" />
                      </InputGroupContainer>

                      <Box
                        id="Temporary Address"
                        gap="s16"
                        display="flex"
                        flexDirection="column"
                        scrollMarginTop="200px"
                      >
                        <Text fontSize="r1" fontWeight="SemiBold">
                          {t['kymCoopUnionDirTemporaryAddress']}
                        </Text>

                        <FormSwitch
                          id="centralRepresentative.isPermanentAndTemporaryAddressSame"
                          name="isPermanentAndTemporaryAddressSame"
                          label={t['kymCoopUnionDirTemporaryAddressPermanent']}
                        />

                        {!isPermanentAndTemporaryAddressSame && (
                          <InputGroupContainer>
                            <FormAddress name="temporaryAddress" />
                          </InputGroupContainer>
                        )}
                      </Box>
                      <InputGroupContainer>
                        <FormDatePicker
                          name="dateOfMembership"
                          id="centralRepresentative.dateOfMembership"
                          label={t['kymCoopUnionDirDateofMembership']}
                        />
                        <FormInput
                          type="text"
                          name="highestQualification"
                          id="centralRepresentative.highestQualification"
                          label={t['kymCoopUnionDirHighestQualification']}
                        />
                        <FormInput
                          type="number"
                          name="mobileNumber"
                          id="centralRepresentative.mobileNumber"
                          label={t['kymCoopUnionDirMobileNo']}
                        />
                        <FormInput
                          type="text"
                          name="email"
                          id="centralRepresentative.email"
                          label={t['kymCoopUnionDirEmail']}
                        />
                        <FormInput
                          type="string"
                          name="citizenshipNo"
                          id="centralRepresentative.citizenshipNo"
                          label={t['kymCoopUnionDirCitizenshipPassportDrivingLicenseNo']}
                        />

                        <FormInput
                          type="string"
                          name="panNo"
                          id="centralRepresentative.panNo"
                          label={t['kymCoopUnionPANNo']}
                        />
                      </InputGroupContainer>

                      <CentralRepresentativeTraining />
                    </SectionContainer>
                  </form>
                </FormProvider>

                <Grid templateColumns="repeat(2, 1fr)" gap="s32" mt="s20">
                  <Box w="124px">
                    <KYMDocumentField
                      mutationId={crId}
                      size="md"
                      label={t['kymCoopUnionDirPhotograph']}
                      name="photograph"
                      setKymCurrentSection={setSection}
                      getKymSection={getKymSectionCoOperativeUnion}
                    />
                  </Box>
                  <Box display="flex" flexDirection="column" gap="s8">
                    <Text fontSize="s3" fontWeight="500">
                      {t['kymCoopUnionDirPhotographOfIdentityProofDocument']}
                    </Text>
                    <Box w="124px">
                      <KYMDocumentField
                        mutationId={crId}
                        size="md"
                        name="identityDocumentPhoto"
                        setKymCurrentSection={setSection}
                        getKymSection={getKymSectionCoOperativeUnion}
                      />
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s8">
                    <Text fontSize="s3" fontWeight="500">
                      {t['kymCoopUnionDirSpecimenSignature']}
                    </Text>
                    <Box w="124px">
                      <KYMDocumentField
                        mutationId={crId}
                        size="md"
                        name="signature"
                        setKymCurrentSection={setSection}
                        getKymSection={getKymSectionCoOperativeUnion}
                      />
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s8">
                    <Text fontSize="s3" fontWeight="500">
                      {t['kymCoopUnionCRDecisionDocument']}
                    </Text>
                    <Box w="124px">
                      <KYMDocumentField
                        mutationId={crId}
                        size="md"
                        name="crDecisionDocument"
                        setKymCurrentSection={setSection}
                        getKymSection={getKymSectionCoOperativeUnion}
                      />
                    </Box>
                  </Box>
                </Grid>
              </SectionContainer>
            </DynamicBoxGroupContainer>
          </Box>
        )}
      </GridItem>
    </FormSection>
  );
};
