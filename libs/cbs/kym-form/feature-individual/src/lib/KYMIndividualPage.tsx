/* eslint-disable-next-line */
import { featureCode, getKymSection, useTranslation } from '@coop/shared/utils';
import { useRouter } from 'next/router';

import { asyncToast, Box, Button, FormHeader, Icon, Text } from '@myra-ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { AccorrdianAddMember, KYMUpdateModal } from '@coop/cbs/kym-form/formElements';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { useDisclosure } from '@chakra-ui/react';
import { BiSave } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  GetKymIndividualFormDataQuery,
  KymIndMemberInput,
  useGetKymIndividualFormDataQuery,
  useSetKymIndividualDataMutation,
} from '@coop/cbs/data-access';
import omit from 'lodash/omit';
import {
  KYMDeclaration,
  KYMDeclarationAgree,
  KYMDocumentDeclaration,
  KYMEstimatedAmount,
  KYMFinancialTransactionDetails,
  KYMIndCoopBasicDetails,
  MemberKYMHusbandWifeOccupation,
  MemberKYMProfession,
} from '../components/form';
import { MemberKYMMainOccupation } from '../components/form/professional-info/MemberKYMMainOccupation';
import { KYMIndPersonalInfo } from '../components/form/personal-info/KYMIndPersonalInfo';
import { KYMIndIncomeSourceDetails } from '../components/form/professional-info/KYMIndIncomeSourceDetails';
import { KYMIndCoopDetailsFamilyMember } from '../components/form/coop-membership-form/KYMBasiccoopDetailsFamilyMember';
import { KYMBankDetails } from '../components/form/coop-membership-form/KYMBankDetails';

type KYMSection = {
  section: string;
  subSection: string;
};

const identificationMap = ['citizenship', 'drivingLicense', 'nationalId', 'passport', 'voterCard'];
const documentMap = ['passport', 'signature', 'citizenship', 'fingerprint'];
const familyMemberMap = ['file'];

const getIndividualEditData = (data: GetKymIndividualFormDataQuery | undefined) => {
  if (!data) {
    return {};
  }
  const editValues = data?.members?.individual?.formState?.data;
  if (!editValues) {
    return {};
  }

  return {
    ...omit(editValues, 'objState'),
    firstName: editValues?.firstName?.local,
    middleName: editValues?.middleName?.local,
    lastName: editValues?.lastName?.local,
    landlordName: editValues?.landlordName?.local,

    identification: identificationMap?.map((identification) => ({
      idType: identification,
      ...editValues?.identification?.find((f) => f?.idType === identification),
    })),

    permanentAddress: {
      ...editValues?.permanentAddress,
      locality: editValues?.permanentAddress?.locality?.local,
    },

    temporaryAddress: {
      ...editValues?.temporaryAddress,
      locality: editValues?.temporaryAddress?.locality?.local,
    },

    familyMembers:
      editValues?.familyMembers?.map((member) => ({
        ...member,
        documents: familyMemberMap?.map((d) => ({
          fieldId: d,
          identifiers: member?.documents?.find((e) => e?.fieldId === d)?.identifiers || [],
        })),
      })) || [],

    incomeSource: editValues?.incomeSource || [],

    familyCoopMembers: editValues?.familyCoopMembers || [],

    documents:
      documentMap?.map((document) => ({
        fieldId: document,
        identifiers: editValues?.documents?.find((d) => d?.fieldId === document)?.identifiers || [],
      })) || [],
  };
};

export const KYMIndividualPage = () => {
  const router = useRouter();

  const { data: editData, isFetching } = useGetKymIndividualFormDataQuery(
    {
      id: router.query['id'] as string,
    },
    { enabled: !!router.query['id'] }
  );

  const methods = useForm<KymIndMemberInput>({
    defaultValues: {
      identification: [
        {
          idType: 'citizenship',
        },
        {
          idType: 'drivingLicense',
        },
        {
          idType: 'nationalId',
        },
        {
          idType: 'passport',
        },
        {
          idType: 'voterCard',
        },
      ],
      documents: documentMap?.map((document) => ({
        fieldId: document,
        identifiers: [],
      })),

      familyMembers: [
        {
          relationshipId: null,
          dateOfBirth: undefined,
          fullName: undefined,
          documents: [
            {
              fieldId: 'file',
              identifiers: [],
            },
          ],
        },
      ],
    },
  });
  const { t } = useTranslation();

  const { mutateAsync } = useSetKymIndividualDataMutation();

  const [kymCurrentSection, setKymCurrentSection] = useState<KYMSection | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { action } = router.query;

  useEffect(() => {
    if (action !== 'add') {
      methods.reset({
        ...methods.getValues(),
        ...getIndividualEditData(editData),
      });
    }
  }, [action, editData, methods]);

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
              methods.setError(key as keyof KymIndMemberInput, {
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
        const kymSection = getKymSection(e.target.id);

        if (kymSection) setKymCurrentSection(kymSection);
      }}
    >
      <FormLayout methods={methods} hasSidebar>
        <FormHeader
          title={
            action === 'edit' || action === 'update'
              ? `${t['membersFormUpdateMembers']} - ${featureCode?.newMemberIndiviual}`
              : `${t['membersFormAddNewMembers']} - ${featureCode?.newMemberIndiviual}`
          }
          closeLink={ROUTES.CBS_MEMBER_LIST}
        />

        <FormLayout.Content>
          <FormLayout.Sidebar borderPosition="right">
            <Box p="s16" pr="s20">
              <AccorrdianAddMember
                // formStatus={kymFormStatus}
                kymCurrentSection={kymCurrentSection}
              />
            </Box>
          </FormLayout.Sidebar>

          <FormLayout.Form>
            <KYMIndPersonalInfo />

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymAccInd2ProfessionalDetails']}
              </Text>
              <MemberKYMProfession />
              <MemberKYMMainOccupation />
              <MemberKYMHusbandWifeOccupation />
              <KYMIndIncomeSourceDetails />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymAccInd3CoopMembership']}
              </Text>
              <KYMIndCoopBasicDetails />
              <KYMIndCoopDetailsFamilyMember />
              <KYMFinancialTransactionDetails />
              <KYMBankDetails />
              <KYMEstimatedAmount />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymAccInd4Declaration']}
              </Text>
              <KYMDeclaration />
              <KYMDocumentDeclaration />
            </SectionContainer>

            <KYMDeclarationAgree />
          </FormLayout.Form>
        </FormLayout.Content>

        <FormLayout.Footer
          draftButton={
            editData?.members?.individual?.formState?.data?.objState &&
            !['APPROVED', 'VALIDATED']?.includes(
              editData?.members?.individual?.formState?.data?.objState || ''
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

export default KYMIndividualPage;
