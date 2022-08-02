import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { GrRotateRight } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  CooperativeUnionPersonnelSection,
  CoopUnionPersonnelDetails,
  CoopUnionPersonnelInput,
  useAllAdministrationQuery,
  useDeletePersonnelDetailsMutation,
  useGetAccountOperatorDetailsListQuery,
  useGetNewIdMutation,
  useSetPersonnelDetailsMutation,
} from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  isDeepEmpty,
  useTranslation,
} from '@coop/shared/utils';

import { AccountOperatorTraining } from './accountOperatorTraining';

interface IAddDirectorProps {
  setSection: (section?: { section: string; subSection: string }) => void;
  removeAccount: (accountOperatorId: string) => void;
  index: number;
  accountOperatorId: string;
  accountOperatorDetail: CoopUnionPersonnelDetails | null | undefined;
}

const AddDirector = ({
  removeAccount,
  setSection,
  index,
  accountOperatorId,
  accountOperatorDetail,
}: IAddDirectorProps) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const methods = useForm<CoopUnionPersonnelInput>();

  const { getValues, reset, watch } = methods;

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    `isPermanentAndTemporaryAddressSame`
  );

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  const { mutate } = useSetPersonnelDetailsMutation();

  useEffect(() => {
    if (accountOperatorDetail) {
      if (accountOperatorDetail) {
        reset({
          ...omit(accountOperatorDetail, ['id', 'cooperativeUnionId']),
          permanentAddress: {
            ...accountOperatorDetail?.permanentAddress,
            locality: accountOperatorDetail?.permanentAddress?.locality?.local,
          },
          temporaryAddress: {
            ...accountOperatorDetail?.temporaryAddress,
            locality: accountOperatorDetail?.temporaryAddress?.locality?.local,
          },
        });
      }
    }
  }, [accountOperatorDetail]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id && data && !isDeepEmpty(data)) {
          mutate({
            id,
            personnelId: accountOperatorId,
            sectionType: CooperativeUnionPersonnelSection.AccountOperators,
            data,
          });
          // refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch(`permanentAddress.provinceId`);
  const currentDistrictId = watch(`permanentAddress.districtId`);
  const currentLocalGovernmentId = watch('permanentAddress.localGovernmentId');

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch(`temporaryAddress.districtId`);
  const currentTempLocalGovernmentId = watch(
    'temporaryAddress.localGovernmentId'
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

  const wardList = useMemo(
    () =>
      localityList.find((d) => d.id === currentLocalGovernmentId)?.wards ?? [],
    [currentLocalGovernmentId]
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

  const resetDirectorForm = () => {
    // const values = getValues();
    // values['accountOperatorsDetails'][index] = {};
    // reset({
    //   accountOperatorsDetails: values['accountOperatorsDetails'],
    // });
  };
  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px={2}
          py={3}
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor={'pointer'}
          h="60px"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Account Operator ${index + 1}`}</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoChevronDownOutline} />}
              />
            )}
          </Box>
        </Box>
        {!isOpen && (
          <IconButton
            size="sm"
            variant={'ghost'}
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={() => removeAccount(accountOperatorId)}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DynamicBoxGroupContainer
          p="s20"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <SectionContainer>
            <FormProvider {...methods}>
              <form
                onFocus={(e) => {
                  const kymSection = getKymSectionCoOperativeUnion(e.target.id);

                  setSection(kymSection);
                }}
              >
                <SectionContainer>
                  <InputGroupContainer>
                    <FormInput
                      type="text"
                      name={`fullName`}
                      label={t['kymCoopUnionOpFullName']}
                      placeholder={t['kymCoopUnionOpEnterFullName']}
                    />
                    <FormInput
                      type="text"
                      name={`designationEn`}
                      label={t['kymCoopUnionOpDesignation']}
                      placeholder={t['kymCoopUnionOpEnterDesignation']}
                    />
                  </InputGroupContainer>

                  <Text fontSize="r1" fontWeight="SemiBold">
                    {t['kymCoopUnionOpPermanentAddress']}
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
                      label={t['kymCoopUnionOpState']}
                      placeholder={t['kymCoopUnionOpSelectState']}
                      options={province}
                    />
                    <FormSelect
                      name={`permanentAddress.districtId`}
                      label={t['kymCoopUnionOpDistrict']}
                      placeholder={t['kymCoopUnionOpSelectDistrict']}
                      options={districtList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name={`permanentAddress.localGovernmentId`}
                      label={t['kymCoopUnionOpVDCMunicipality']}
                      placeholder={t['kymCoopUnionOpSelectVDCMunicipality']}
                      options={localityList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name={`permanentAddress.wardNo`}
                      label={t['kymCoopUnionOpWardNo']}
                      placeholder={t['kymCoopUnionOpEnterWardNo']}
                      options={wardList.map((d) => ({ label: d, value: d }))}
                    />
                    <FormInput
                      type="text"
                      name={`permanentAddress.locality`}
                      label={t['kymCoopUnionOpLocality']}
                      placeholder={t['kymCoopUnionOpEnterLocality']}
                    />
                    <FormInput
                      type="text"
                      name={`permanentAddress.houseNo`}
                      label={t['kymIndHouseNo']}
                      placeholder={t['kymIndEnterHouseNo']}
                    />
                  </InputGroupContainer>

                  <Box mt="-32px">
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
                      {t['kymCoopUnionOpTemporaryAddress']}
                    </Text>

                    <FormSwitch
                      id="accountOperatorsDetails"
                      name={`isPermanentAndTemporaryAddressSame`}
                      label={t['kymCoopUnionOpTemporaryAddressPermanent']}
                    />

                    {!isPermanentAndTemporaryAddressSame && (
                      <>
                        <InputGroupContainer>
                          <FormSelect
                            name={`temporaryAddress.provinceId`}
                            label={t['kymCoopUnionOpState']}
                            placeholder={t['kymCoopUnionOpSelectState']}
                            options={province}
                          />
                          <FormSelect
                            name={`temporaryAddress.districtId`}
                            label={t['kymCoopUnionOpDistrict']}
                            placeholder={t['kymCoopUnionOpSelectDistrict']}
                            options={districtTempList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            name={`temporaryAddress.localGovernmentId`}
                            label={t['kymCoopUnionOpVDCMunicipality']}
                            placeholder={
                              t['kymCoopUnionOpSelectVDCMunicipality']
                            }
                            options={localityTempList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            name={`temporaryAddress.wardNo`}
                            label={t['kymCoopUnionOpWardNo']}
                            placeholder={t['kymCoopUnionOpEnterWardNo']}
                            options={wardList.map((d) => ({
                              label: d,
                              value: d,
                            }))}
                          />
                          <FormInput
                            type="text"
                            name={`temporaryAddress.locality`}
                            label={t['kymCoopUnionOpLocality']}
                            placeholder={t['kymCoopUnionOpEnterLocality']}
                          />
                          <FormInput
                            type="text"
                            name={`temporaryAddress.houseNo`}
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
                      label={t['kymCoopUnionOpDateOfMembership']}
                      placeholder="DD-MM-YYYY"
                    />
                    <FormInput
                      type="text"
                      name={`highestQualification`}
                      label={t['kymCoopUnionOpHighestQualification']}
                      placeholder={t['kymCoopUnionOpEnterHighestQualification']}
                    />
                    <FormInput
                      type="number"
                      name={`mobileNumber`}
                      label={t['kymCoopUnionOpMobileNo']}
                      placeholder={t['kymCoopUnionOpEnterMobileNo']}
                    />
                    <FormInput
                      type="text"
                      name={`email`}
                      label={t['kymCoopUnionOpEmail']}
                      placeholder={t['kymCoopUnionOpEnterEmail']}
                    />
                    <FormInput
                      type="string"
                      name={`citizenshipNo`}
                      label={
                        t['kymCoopUnionOpCitizenshipPassportDrivingLicenseNo']
                      }
                      placeholder={t['kymCoopUnionOpEnterCitizenshipNo']}
                    />
                  </InputGroupContainer>
                  {/* <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymCoopUnionOpTrainingRelatedToCoop']}
            </Text>
            <InputGroupContainer>
              <FormInput
                type="text"
                name={`subjectOfTraining`}
                label={t['kymCoopUnionOpSubjectofTraining']}
                placeholder={t['kymCoopUnionOpEnterSubjectofTraining']}
              />
              <FormInput
                type="date"
                name={`dateOfTraining`}
                label={t['kymCoopUnionOpDateofTraining']}
                placeholder={t['kymCoopUnionOpEnterDateofTraining']}
              />
              <FormInput
                type="number"
                name={`trainingOrganization`}
                label={t['kymCoopUnionOpTrainingOrganization']}
                placeholder={t['kymCoopUnionOpEnterTrainingOrganization']}
              />
            </InputGroupContainer> */}

                  <AccountOperatorTraining />
                </SectionContainer>
              </form>
            </FormProvider>

            <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <KYMDocumentField
                label={t['kymCoopUnionOpPhotograph']}
                name={`photograph`}
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
              <KYMDocumentField
                label={t['kymCoopUnionOpPhotographOfIdentityProofDocument']}
                name={`identityDocumentPhoto`}
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
            </Grid>
            <InputGroupContainer>
              <Box w="124px">
                <KYMDocumentField
                  name={`signature`}
                  label={t['kymCoopUnionOpSpecimenSignature']}
                  setKymCurrentSection={setSection}
                  getKymSection={getKymSectionCoOperativeUnion}
                />
              </Box>
            </InputGroupContainer>
          </SectionContainer>
        </DynamicBoxGroupContainer>
        <Box
          display="flex"
          justifyContent="flex-end"
          border="1px solid"
          borderColor="border.layout"
          alignItems={'center'}
          h="60px"
          px="s20"
        >
          {/* <Button
            variant="ghost"
            leftIcon={<GrRotateRight />}
            onClick={resetDirectorForm}
          >
            {t['kymInsReset']}
          </Button> */}
          <Button
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => removeAccount(accountOperatorId)}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
      {/* </DynamicBoxGroupContainer> */}
    </>
  );
};

interface IAccountOperatorInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const AccountOperatorInfo = ({
  setSection,
}: IAccountOperatorInfoProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const [accountOperatorIds, setAccountOperatorIds] = useState<string[]>([]);

  const { data: accountOperatorEditValues, refetch } =
    useGetAccountOperatorDetailsListQuery(
      {
        id: String(id),
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (accountOperatorEditValues) {
      const editValueData =
        accountOperatorEditValues?.members?.cooperativeUnion?.formState?.data
          ?.formData?.accountOperatorsDetails?.personnelDetails;

      setAccountOperatorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [accountOperatorEditValues]);

  useEffect(() => {
    refetch();
  }, []);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setAccountOperatorIds([...accountOperatorIds, res.newId]);
    },
  });

  const addAccountOperator = () => {
    newIdMutate({});
  };

  const { mutate: deleteMutation } = useDeletePersonnelDetailsMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.cooperativeUnion?.deletePersonnel?.recordId
      );

      const tempAccOperatorIds = [...accountOperatorIds];

      tempAccOperatorIds.splice(tempAccOperatorIds.indexOf(deletedId), 1);

      setAccountOperatorIds([...tempAccOperatorIds]);
    },
  });

  const removeAccountOperator = (accountOperatorId: string) => {
    deleteMutation({ personnelId: accountOperatorId });
  };

  return (
    <GroupContainer
      id="kymCoopUnionAccDetailsofAccountOperators"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopUnionDetailsOfAccountOperators']}
      </Text>
      {accountOperatorIds.map((accountOperatorId, index) => {
        return (
          <Box
            key={accountOperatorId}
            display="flex"
            flexDirection={'column'}
            id="Details of Account Operators"
            scrollMarginTop={'200px'}
          >
            <AddDirector
              index={index}
              setSection={setSection}
              accountOperatorId={accountOperatorId}
              removeAccount={() => removeAccountOperator(accountOperatorId)}
              accountOperatorDetail={accountOperatorEditValues?.members?.cooperativeUnion?.formState?.data?.formData?.accountOperatorsDetails?.personnelDetails?.find(
                (accOperator) => accOperator?.id === accountOperatorId
              )}
            />
          </Box>
        );
      })}
      <Button
        id="accountOperatorButton"
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          addAccountOperator();
        }}
      >
        {t['kymCoopUnionAddOperator']}
      </Button>
    </GroupContainer>
  );
};
