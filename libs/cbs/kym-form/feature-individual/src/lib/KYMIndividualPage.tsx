/* eslint-disable-next-line */
import { featureCode, useTranslation } from '@coop/shared/utils';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  addIndividualError,
  FormFieldSearchTerm,
  reset,
  RootState,
  setIndividualHasPressedNext,
  useAppDispatch,
  useAppSelector,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useGetKymFormStatusQuery,
} from '@coop/cbs/data-access';
import { Box, Button, Icon, Text, toast } from '@myra-ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { AccorrdianAddMember, KYMUpdateModal } from '@coop/cbs/kym-form/formElements';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { useDisclosure } from '@chakra-ui/react';
import { BiSave } from 'react-icons/bi';
import {
  KYMBasiccoopDetails,
  KYMDeclaration,
  KYMDeclarationAgree,
  KYMDocumentDeclaration,
  KYMEstimatedAmount,
  KYMFinancialTransactionDetails,
  MemberKYMAddress,
  MemberKYMBasicInfo,
  MemberKYMContactDetails,
  MemberKYMFamilyDetails,
  MemberKYMHusbandWifeOccupation,
  MemberKYMIdentificationDetails,
  MemberKYMIncomeSourceDetails,
  MemberKYMMainOccupation,
  MemberKYMProfession,
} from '../components/form';

export const KYMIndividualPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isMarried, setIsMarried] = useState(false);

  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();

  const kymFormStatusQuery = useGetKymFormStatusQuery({ id }, { enabled: id !== 'undefined' });
  const kymFormStatus = kymFormStatusQuery?.data?.members?.individual?.formState?.sectionStatus;

  const { data: editValues, refetch: refetchEdit } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetchEdit();
  }, [preference?.date]);

  const { data: maritalStatusData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.MaritalStatus,
  });

  const maritialStatus = maritalStatusData?.form?.options?.predefined?.data;
  const marriedData = editValues?.members?.individual?.formState?.data?.formData?.maritalStatusId;

  useEffect(() => {
    // refetch();
    if (marriedData && maritialStatus) {
      if (maritialStatus[0]?.id === marriedData) {
        setIsMarried(true);
      } else {
        setIsMarried(false);
      }
    }
  }, [marriedData]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const { refetch } = useGetKymFormStatusQuery(
    { id, hasPressedNext: true },
    {
      enabled: false,
    }
  );

  const isFormDirty = useAppSelector((state) => state.individual.isFormDirty);

  const action = String(router.query['action']);

  return (
    <>
      <FormLayout hasSidebar>
        <FormLayout.Header
          title={`${t['membersFormAddNewMembers']} - ${featureCode?.newMemberIndiviual}`}
          closeLink={ROUTES.CBS_MEMBER_LIST}
        />

        <FormLayout.Content>
          <FormLayout.Sidebar borderPosition="right">
            <Box p="s16" pr="s20">
              <AccorrdianAddMember
                formStatus={kymFormStatus}
                kymCurrentSection={kymCurrentSection}
              />
            </Box>
          </FormLayout.Sidebar>

          <FormLayout.Form>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymInd1PersonalInformation']}
              </Text>
              <MemberKYMBasicInfo setKymCurrentSection={setKymCurrentSection} />
              <MemberKYMContactDetails setKymCurrentSection={setKymCurrentSection} />
              <MemberKYMIdentificationDetails setKymCurrentSection={setKymCurrentSection} />
              <MemberKYMAddress setKymCurrentSection={setKymCurrentSection} />
              <MemberKYMFamilyDetails setKymCurrentSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymInd2ProfessionalInformation']}
              </Text>
              <MemberKYMProfession setKymCurrentSection={setKymCurrentSection} />
              <MemberKYMMainOccupation setKymCurrentSection={setKymCurrentSection} />
              {isMarried && (
                <MemberKYMHusbandWifeOccupation setKymCurrentSection={setKymCurrentSection} />
              )}

              <MemberKYMIncomeSourceDetails setKymCurrentSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymInd3COOPmembership']}
              </Text>
              <KYMBasiccoopDetails setKymCurrentSection={setKymCurrentSection} />
              <KYMFinancialTransactionDetails setKymCurrentSection={setKymCurrentSection} />
              <KYMEstimatedAmount setKymCurrentSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymInd4Declaration']}
              </Text>
              <KYMDeclaration setKymCurrentSection={setKymCurrentSection} />
              <KYMDocumentDeclaration setKymCurrentSection={setKymCurrentSection} />
            </SectionContainer>

            <KYMDeclarationAgree />
          </FormLayout.Form>
        </FormLayout.Content>

        <FormLayout.Footer
          status={
            <Box display="flex" gap="s8">
              <Text as="i" fontSize="r1">
                {t['formDetails']}
              </Text>
            </Box>
          }
          draftButton={
            <Button
              type="submit"
              variant="ghost"
              onClick={() => router.push(ROUTES.CBS_MEMBER_LIST)}
            >
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
          }
          isMainButtonDisabled={!isFormDirty}
          mainButtonLabel={action === 'update' ? 'Update' : t['next']}
          mainButtonHandler={async () => {
            if (action === 'update') {
              onOpen();
            } else {
              const response = await refetch();
              const sectionStatus =
                response?.data?.members?.individual?.formState?.sectionStatus?.errors;
              const basicAllErrors =
                response?.data?.members?.individual?.formState?.sectionStatus?.errors;

              if (basicAllErrors) {
                dispatch(addIndividualError(basicAllErrors));
              } else {
                dispatch(addIndividualError({}));
              }
              if (response) {
                dispatch(setIndividualHasPressedNext(true));
                if (!sectionStatus) {
                  router.push(
                    `${ROUTES.CBS_MEMBER_TRANSLATION}/${router.query['id']}?type=individual`
                  );
                } else {
                  toast({
                    id: 'validation-error',
                    message: 'Some fields are empty or have error',
                    type: 'error',
                  });
                }
              }
            }
          }}
        />
      </FormLayout>
      <KYMUpdateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default KYMIndividualPage;
