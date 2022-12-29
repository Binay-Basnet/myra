import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

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
} from '@myra-ui';

import {
  CoopUnionPersonnelInput,
  useDeletePersonnelDetailsMutation,
  useGetAccountOperatorDetailsListQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormAddress, FormDatePicker, FormInput, FormSwitch } from '@coop/shared/form';
import { getKymSectionCoOperativeUnion, useTranslation } from '@coop/shared/utils';

import { AccountOperatorTraining } from './accountOperatorTraining';
import { useCoopUnionAccountOperator } from '../../../hooks/useCoopUnionAccountOperator';

interface IAddDirectorProps {
  setSection: (section?: { section: string; subSection: string }) => void;
  removeAccount: (accountOperatorId: string) => void;
  index: number;
  accountOperatorId: string;
}

const AddDirector = ({
  removeAccount,
  setSection,
  index,
  accountOperatorId,
}: IAddDirectorProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionPersonnelInput>();

  const { watch } = methods;
  useCoopUnionAccountOperator({ methods, accountOpId: accountOperatorId });

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(`isPermanentAndTemporaryAddressSame`);

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
          cursor="pointer"
          h="60px"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Account Operator ${index + 1}`}</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronDownOutline} />}
              />
            )}
          </Box>
        </Box>
        {!isOpen && (
          <IconButton
            size="sm"
            variant="ghost"
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
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
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
                        isRequired
                        type="text"
                        name="fullName"
                        id="accountOperator.fullName"
                        label={t['kymCoopUnionOpFullName']}
                      />
                      <FormInput
                        isRequired
                        type="text"
                        name="designationEn"
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

                    <Box />
                  </Box>

                  <Box
                    id="Temporary Address"
                    gap="s16"
                    display="flex"
                    flexDirection="column"
                    scrollMarginTop="200px"
                  >
                    <Text fontSize="r1" fontWeight="SemiBold">
                      {t['kymCoopUnionOpTemporaryAddress']}
                    </Text>

                    <FormSwitch
                      name="isPermanentAndTemporaryAddressSame"
                      id="accountOperator.isPermanentAndTemporaryAddressSame"
                      label={t['kymCoopUnionOpTemporaryAddressPermanent']}
                    />

                    {!isPermanentAndTemporaryAddressSame && (
                      <>
                        <InputGroupContainer>
                          <FormAddress name="temporaryAddress" />
                        </InputGroupContainer>

                        <Box mt="-16px" />
                      </>
                    )}
                  </Box>
                  <InputGroupContainer>
                    <FormDatePicker
                      name="dateOfMembership"
                      id="accountOperator.dateOfMembership"
                      label={t['kymCoopUnionOpDateOfMembership']}
                    />
                    <FormInput
                      type="text"
                      name="highestQualification"
                      id="accountOperator.highestQualification"
                      label={t['kymCoopUnionOpHighestQualification']}
                    />
                    <FormInput
                      isRequired
                      type="number"
                      name="mobileNumber"
                      id="accountOperator.mobileNumber"
                      label={t['kymCoopUnionOpMobileNo']}
                    />
                    <FormInput
                      isRequired
                      type="text"
                      name="email"
                      id="accountOperator.email"
                      label={t['kymCoopUnionOpEmail']}
                    />
                    <FormInput
                      isRequired
                      type="string"
                      name="citizenshipNo"
                      id="accountOperator.citizenshipNo"
                      label={t['kymCoopUnionOpCitizenshipPassportDrivingLicenseNo']}
                    />

                    <FormInput
                      isRequired
                      type="string"
                      name="panNo"
                      id="centralRepresentative.panNo"
                      label={t['kymCoopUnionPANNo']}
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
              />
              <FormInput
                type="date"
                name={`dateOfTraining`}
                label={t['kymCoopUnionOpDateofTraining']}
              />
              <FormInput
                type="number"
                name={`trainingOrganization`}
                label={t['kymCoopUnionOpTrainingOrganization']}
              />
            </InputGroupContainer> */}

                  <AccountOperatorTraining />
                </Box>
              </form>
            </FormProvider>

            <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" mt="s32" columnGap="s20">
              <KYMDocumentField
                mutationId={accountOperatorId}
                label={t['kymCoopUnionOpPhotograph']}
                name="photograph"
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
              <KYMDocumentField
                mutationId={accountOperatorId}
                label={t['kymCoopUnionOpPhotographOfIdentityProofDocument']}
                name="identityDocumentPhoto"
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
              <Box w="124px">
                <KYMDocumentField
                  size="md"
                  mutationId={accountOperatorId}
                  name="signature"
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
          alignItems="center"
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

export const AccountOperatorInfo = ({ setSection }: IAccountOperatorInfoProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const [accountOperatorIds, setAccountOperatorIds] = useState<string[]>([]);

  const { data: accountOperatorEditValues, refetch } = useGetAccountOperatorDetailsListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (accountOperatorEditValues) {
      const editValueData =
        accountOperatorEditValues?.members?.cooperativeUnion?.formState?.formData
          ?.accountOperatorsDetails?.data?.personnelDetails;

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
      const deletedId = String(res?.members?.cooperativeUnion?.deletePersonnel?.recordId);

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
          {accountOperatorIds.map((accountOperatorId, index) => (
            <Box
              key={accountOperatorId}
              display="flex"
              flexDirection="column"
              id="Details of Account Operators"
              scrollMarginTop="200px"
            >
              <AddDirector
                index={index}
                setSection={setSection}
                accountOperatorId={accountOperatorId}
                removeAccount={() => removeAccountOperator(accountOperatorId)}
              />
            </Box>
          ))}
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
