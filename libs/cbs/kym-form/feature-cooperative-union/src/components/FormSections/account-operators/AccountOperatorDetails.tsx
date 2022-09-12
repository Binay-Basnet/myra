import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import {
  CooperativeUnionPersonnelSection,
  CoopUnionPersonnelDetails,
  CoopUnionPersonnelInput,
  GetAccountOperatorDetailsListQuery,
  useDeletePersonnelDetailsMutation,
  useGetAccountOperatorDetailsListQuery,
  useGetNewIdMutation,
  useSetPersonnelDetailsMutation,
} from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormAddress, FormInput, FormSwitch } from '@coop/shared/form';
import {
  Box,
  Button,
  Collapse,
  FormSection,
  Grid,
  GridItem,
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
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<
    QueryObserverResult<GetAccountOperatorDetailsListQuery, unknown>
  >;
}

const AddDirector = ({
  removeAccount,
  setSection,
  index,
  accountOperatorId,
  accountOperatorDetail,
  refetch,
}: IAddDirectorProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const methods = useForm<CoopUnionPersonnelInput>();

  const { reset, watch } = methods;

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    `isPermanentAndTemporaryAddressSame`
  );

  const { mutateAsync } = useSetPersonnelDetailsMutation();

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
        const operatorData = {
          ...omit(accountOperatorDetail, ['id', 'cooperativeUnionId']),
          permanentAddress: {
            ...accountOperatorDetail?.permanentAddress,
            locality: accountOperatorDetail?.permanentAddress?.locality?.local,
          },
          temporaryAddress: {
            ...accountOperatorDetail?.temporaryAddress,
            locality: accountOperatorDetail?.temporaryAddress?.locality?.local,
          },
        };

        if (id && data && !isDeepEmpty(data) && !isEqual(operatorData, data)) {
          mutateAsync({
            id,
            personnelId: accountOperatorId,
            sectionType: CooperativeUnionPersonnelSection.AccountOperators,
            data,
          }).then(() => refetch());
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

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
                <Box display="flex" flexDirection="column" gap="s32">
                  <Box display="flex" flexDirection="column" gap="s16">
                    <InputGroupContainer>
                      <FormInput
                        type="text"
                        name={`fullName`}
                        id="accountOperator.fullName"
                        label={t['kymCoopUnionOpFullName']}
                      />
                      <FormInput
                        type="text"
                        name={`designationEn`}
                        id="accountOperator.designationEn"
                        label={t['kymCoopUnionOpDesignation']}
                      />
                    </InputGroupContainer>

                    <Text fontSize="r1" fontWeight="SemiBold">
                      {t['kymCoopUnionOpPermanentAddress']}
                    </Text>

                    <InputGroupContainer>
                      <FormAddress name="permanentAddress" />
                    </InputGroupContainer>

                    <Box></Box>
                  </Box>

                  <Box
                    id="Temporary Address"
                    gap="s16"
                    display={'flex'}
                    flexDirection="column"
                    scrollMarginTop={'200px'}
                  >
                    <Text fontSize="r1" fontWeight="SemiBold">
                      {t['kymCoopUnionOpTemporaryAddress']}
                    </Text>

                    <FormSwitch
                      name={`isPermanentAndTemporaryAddressSame`}
                      id="accountOperator.isPermanentAndTemporaryAddressSame"
                      label={t['kymCoopUnionOpTemporaryAddressPermanent']}
                    />

                    {!isPermanentAndTemporaryAddressSame && (
                      <>
                        <InputGroupContainer>
                          <FormAddress name="temporaryAddress" />
                        </InputGroupContainer>

                        <Box mt="-16px"></Box>
                      </>
                    )}
                  </Box>
                  <InputGroupContainer>
                    <FormInput
                      type="date"
                      name={`dateOfMembership`}
                      id="accountOperator.dateOfMembership"
                      label={t['kymCoopUnionOpDateOfMembership']}
                      __placeholder="DD-MM-YYYY"
                    />
                    <FormInput
                      type="text"
                      name={`highestQualification`}
                      id="accountOperator.highestQualification"
                      label={t['kymCoopUnionOpHighestQualification']}
                      __placeholder={
                        t['kymCoopUnionOpEnterHighestQualification']
                      }
                    />
                    <FormInput
                      type="number"
                      name={`mobileNumber`}
                      id="accountOperator.mobileNumber"
                      label={t['kymCoopUnionOpMobileNo']}
                      __placeholder={t['kymCoopUnionOpEnterMobileNo']}
                    />
                    <FormInput
                      type="text"
                      name={`email`}
                      id="accountOperator.email"
                      label={t['kymCoopUnionOpEmail']}
                      __placeholder={t['kymCoopUnionOpEnterEmail']}
                    />
                    <FormInput
                      type="string"
                      name={`citizenshipNo`}
                      id="accountOperator.citizenshipNo"
                      label={
                        t['kymCoopUnionOpCitizenshipPassportDrivingLicenseNo']
                      }
                      __placeholder={t['kymCoopUnionOpEnterCitizenshipNo']}
                    />

                    <FormInput
                      type="string"
                      name={`panNo`}
                      id="centralRepresentative.panNo"
                      label={t['kymCoopUnionPANNo']}
                      __placeholder={t['kymCoopUnionPANNo__placeholder']}
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
                __placeholder={t['kymCoopUnionOpEnterSubjectofTraining']}
              />
              <FormInput
                type="date"
                name={`dateOfTraining`}
                label={t['kymCoopUnionOpDateofTraining']}
                __placeholder={t['kymCoopUnionOpEnterDateofTraining']}
              />
              <FormInput
                type="number"
                name={`trainingOrganization`}
                label={t['kymCoopUnionOpTrainingOrganization']}
                __placeholder={t['kymCoopUnionOpEnterTrainingOrganization']}
              />
            </InputGroupContainer> */}

                  <AccountOperatorTraining />
                </Box>
              </form>
            </FormProvider>

            <Grid
              templateColumns="repeat(2, 1fr)"
              rowGap="s32"
              mt="s32"
              columnGap="s20"
            >
              <KYMDocumentField
                mutationId={accountOperatorId}
                label={t['kymCoopUnionOpPhotograph']}
                name={`photograph`}
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
              <KYMDocumentField
                mutationId={accountOperatorId}
                label={t['kymCoopUnionOpPhotographOfIdentityProofDocument']}
                name={`identityDocumentPhoto`}
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
              <Box w="124px">
                <KYMDocumentField
                  size="md"
                  mutationId={accountOperatorId}
                  name={`signature`}
                  label={t['kymCoopUnionOpSpecimenSignature']}
                  setKymCurrentSection={setSection}
                  getKymSection={getKymSectionCoOperativeUnion}
                />
              </Box>
            </Grid>
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
            id="accountOperator.accountOperatorButton"
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
        accountOperatorEditValues?.members?.cooperativeUnion?.formState
          ?.formData?.accountOperatorsDetails?.data?.personnelDetails;

      setAccountOperatorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal?.id ? [...prevVal, curVal.id] : prevVal),
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
    <FormSection
      id="kymCoopUnionAccDetailsofAccountOperators"
      header="kymCoopUnionDetailsOfAccountOperators"
    >
      <GridItem colSpan={3}>
        <Grid gap="s16">
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
                  accountOperatorDetail={accountOperatorEditValues?.members?.cooperativeUnion?.formState?.formData?.accountOperatorsDetails?.data?.personnelDetails?.find(
                    (accOperator) => accOperator?.id === accountOperatorId
                  )}
                  refetch={refetch}
                />
              </Box>
            );
          })}
          <GridItem colSpan={1}>
            <Button
              id="accountOperator.accountOperatorButton"
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={() => {
                addAccountOperator();
              }}
            >
              {t['kymCoopUnionAddOperator']}
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </FormSection>
  );
};
