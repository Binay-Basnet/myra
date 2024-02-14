import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import omit from 'lodash/omit';

import { asyncToast, Box, Button, FormHeader, Icon, Text } from '@myra-ui';

import {
  GetInstitutionKymEditDataQuery,
  KymInsInput,
  useGetInstitutionKymEditDataQuery,
  useSetKymInstitutionDataMutation,
} from '@coop/cbs/data-access';
import { AccorrdianAddInstitution, KYMUpdateModal } from '@coop/cbs/kym-form/formElements';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { featureCode, getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import {
  AccountHolderDeclarationInstitution,
  AccountOperationInstitution,
  BankAccountDetailsInstitution,
  BasicDetailsInstitution,
  BoardDirectorInfo,
  BranchOfficeAddress,
  ContactDetailsInstitution,
  DocumentDeclarationInstitution,
  InstitutionKYMAccountDetail,
  InstitutionKYMSisterConcernDetails,
  OperatorOfficeAddress,
  RegisteredDetailsInstitution,
  TransactionProfileInstitution,
} from '../components-form';

const documentFields = [
  'institutionAgmDocument',
  'InsRegisteredCertificate',
  'InsMOA/AOA',
  'InsPanCertificate',
  'InsTaxClearance',
  'InsLatestAuditReport',
  'companyStamp',
];

const directorDocFields = ['photograph', 'documentPhotograph'];

const accountOperatorDocFields = ['specimenSignature'];

const getInstitutionData = (data: GetInstitutionKymEditDataQuery | undefined) => {
  const editData = data?.members?.institution?.formState?.data;

  if (!editData) return {};

  return {
    ...omit(editData, 'objState'),
    registeredAddress: {
      ...editData?.registeredAddress,
      locality: editData?.registeredAddress?.locality?.local,
    },
    operatingOfficeAddress: {
      ...editData?.operatingOfficeAddress,
      locality: editData?.operatingOfficeAddress?.locality?.local,
    },
    branchOfficeAddress: {
      ...editData?.branchOfficeAddress,
      locality: editData?.branchOfficeAddress?.locality?.local,
    },
    sisterConcern: editData?.sisterConcern ?? [],
    director:
      editData?.director?.map((director) => ({
        ...director,
        permanentAddress: {
          ...director?.permanentAddress,
          locality: director?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...director?.temporaryAddress,
          locality: director?.temporaryAddress?.locality?.local,
        },
        documents: directorDocFields?.map((document) => ({
          fieldId: document,
          identifiers: director?.documents?.find((d) => d?.fieldId === document)?.identifiers || [],
        })),
      })) ?? [],
    accountOperator:
      editData?.accountOperator?.map((accountOp) => ({
        ...accountOp,
        permanentAddress: {
          ...accountOp?.permanentAddress,
          locality: accountOp?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...accountOp?.temporaryAddress,
          locality: accountOp?.temporaryAddress?.locality?.local,
        },
        documents: accountOperatorDocFields?.map((document) => ({
          fieldId: document,
          identifiers:
            accountOp?.documents?.find((d) => d?.fieldId === document)?.identifiers || [],
        })),
      })) ?? [],
    documents: documentFields?.map((document) => ({
      fieldId: document,
      identifiers: editData?.documents?.find((d) => d?.fieldId === document)?.identifiers || [],
    })),
    accountHolderAddress: {
      ...editData?.accountHolderAddress,
      locality: editData?.accountHolderAddress?.locality?.local,
    },
  };
};

export const KYMInstitutionPage = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const methods = useForm<KymInsInput>({
    defaultValues: {
      documents: documentFields?.map((docFieldId) => ({ fieldId: docFieldId, identifiers: [] })),
      director: [
        {
          documents: directorDocFields?.map((document) => ({
            fieldId: document,
            identifiers: [],
          })),
        },
      ],
      accountOperator: [
        {
          documents: accountOperatorDocFields?.map((document) => ({
            fieldId: document,
            identifiers: [],
          })),
        },
      ],
    },
  });

  const { mutateAsync } = useSetKymInstitutionDataMutation();

  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();
  const router = useRouter();
  const action = String(router.query['action']);

  const id = router?.query?.['id'];

  const { data: institutionEditData, isFetching } = useGetInstitutionKymEditDataQuery(
    { id: id as string },
    { enabled: !!id }
  );

  useEffect(() => {
    if (action !== 'add') {
      methods.reset({ ...methods.getValues(), ...getInstitutionData(institutionEditData) });
    }
  }, [action, institutionEditData, methods]);

  const submitForm = (forDraft = false) => {
    methods.handleSubmit(async (data) => {
      await asyncToast({
        id: 'individual-add',
        msgs: {
          loading:
            action === 'edit'
              ? `${t['membersFormEditingMembers']}`
              : `${t['membersFormAddingMembers']}`,
          success:
            action === 'edit'
              ? `${t['memberEditedSuccessfull']}`
              : `${t['memberAddedSuccessfull']}`,
        },
        promise: mutateAsync({
          id: router.query['id'] as string,
          data,
          forDraft,
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof KymInsInput, {
                message: error.validationErrorMsg[key][0],
              })
            );
          }
        },
        onSuccess: () => {
          if (forDraft) {
            router.push(ROUTES.CBS_MEMBER_DRAFT_LIST);
          } else {
            router.push(`${ROUTES.CBS_MEMBER_TRANSLATION}?id=${router.query['id']}`);
          }
        },
      });
    })();
  };
  return (
    <form
      onFocus={(e) => {
        const kymSection = getKymSectionInstitution(e.target.id);
        setKymCurrentSection(kymSection);
      }}
    >
      <FormLayout methods={methods} hasSidebar>
        <FormHeader
          title={
            action === 'edit' || action === 'update'
              ? `${t['membersFormUpdateMembers']}  - ${featureCode?.newMemberInstitution}`
              : `${t['membersFormAddNewMembers']}  - ${featureCode?.newMemberInstitution}`
          }
          closeLink={ROUTES.CBS_MEMBER_LIST}
        />

        <FormLayout.Content>
          <FormLayout.Sidebar borderPosition="right">
            <Box p="s16" pr="s20">
              <AccorrdianAddInstitution kymCurrentSection={kymCurrentSection} />
            </Box>
          </FormLayout.Sidebar>

          <FormLayout.Form>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns1InformationofInstitution']}
              </Text>
              <BasicDetailsInstitution />
              <RegisteredDetailsInstitution />
              <OperatorOfficeAddress />
              <BranchOfficeAddress />
              <ContactDetailsInstitution />
              <BankAccountDetailsInstitution />
              <InstitutionKYMSisterConcernDetails />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns2TransactionProfile']}
              </Text>
              <TransactionProfileInstitution />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns3DetailsofProprietorpartnersDirectors']}
              </Text>
              <BoardDirectorInfo />
              {/* <InstitutionKYMDirectorWithAffiliation /> */}
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns4AccountOperations']}
              </Text>
              <InstitutionKYMAccountDetail />
              <AccountOperationInstitution />
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns5Declaration']}
              </Text>
              <DocumentDeclarationInstitution />
              <AccountHolderDeclarationInstitution />
            </SectionContainer>
          </FormLayout.Form>
        </FormLayout.Content>

        <FormLayout.Footer
          draftButton={
            !['APPROVED', 'VALIDATED']?.includes(
              institutionEditData?.members?.institution?.formState?.data?.objState || ''
            ) && (
              <Button variant="ghost" onClick={() => submitForm(true)}>
                <Icon as={BiSave} color="primary.500" />
                <Text
                  alignSelf="center"
                  color="primary.500"
                  fontWeight="Medium"
                  fontSize="s2"
                  ml="5px"
                >
                  {t['saveDraft']}
                </Text>
              </Button>
            )
          }
          isMainButtonDisabled={isFetching}
          mainButtonLabel={action === 'update' ? 'Update' : t['next']}
          mainButtonHandler={() => {
            if (action === 'update') {
              onOpen();
            } else {
              submitForm();
            }
          }}
        />
      </FormLayout>
      <KYMUpdateModal
        isOpen={isOpen}
        onClose={onClose}
        onUpdateClick={() =>
          mutateAsync({
            id: router.query['id'] as string,
            data: methods.getValues(),
            forDraft: false,
          })
        }
      />
    </form>
  );
};

export default KYMInstitutionPage;
