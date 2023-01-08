import React, { useCallback } from 'react';
import { BiSave } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { Box, Button, Container, FormFooter, FormHeader, Icon, Text, toast } from '@myra-ui';

import {
  addAccountError,
  addInstitutionDirectorError,
  addInstitutionError,
  addSisterError,
  setInstitutionHasPressedNext,
  useAppSelector,
  useGetKymOverallFormStatusQuery,
} from '@coop/cbs/data-access';
import { AccorrdianAddInstitution } from '@coop/cbs/kym-form/formElements';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

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

export const KYMInstitutionPage = () => {
  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();
  const dispatch = useDispatch();
  const router = useRouter();
  const id = String(router?.query?.['id']);

  const setSection = useCallback(
    (section?: { section: string; subSection: string }) => setKymCurrentSection(section),
    []
  );

  const { refetch } = useGetKymOverallFormStatusQuery(
    { id, hasPressedNext: true },
    {
      enabled: false,
    }
  );
  const isFormDirty = useAppSelector((state) => state.institution.isFormDirty);

  // const kymFormStatusQuery = useGetKymFormStatusInstitutionQuery({ id });
  // const kymFormStatus =
  //   kymFormStatusQuery?.data?.members?.institution?.formState?.data?.sectionStatus;

  return (
    <>
      <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <FormHeader title={t['membersFormAddNewMembers']} closeLink={ROUTES.CBS_MEMBER_LIST} />
        </Container>
      </Box>

      <Container minW="container.xl" height="fit-content">
        <Box>
          <Box
            w={320}
            p="s16"
            pr="s20"
            position="fixed"
            borderRight="1px solid "
            borderColor="border.layout"
            minHeight="100%"
            bg="gray.0"
            zIndex={2}
          >
            <AccorrdianAddInstitution kymCurrentSection={kymCurrentSection} />
          </Box>

          <Box zIndex={1} background="gray.0" ml="320" pb="120px">
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns1InformationofInstitution']}
              </Text>
              <BasicDetailsInstitution setSection={setSection} />
              <RegisteredDetailsInstitution setSection={setSection} />
              <OperatorOfficeAddress setSection={setSection} />
              <BranchOfficeAddress setSection={setSection} />
              <ContactDetailsInstitution setSection={setSection} />
              <BankAccountDetailsInstitution setSection={setSection} />
              <InstitutionKYMSisterConcernDetails setSection={setSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns2TransactionProfile']}
              </Text>
              <TransactionProfileInstitution setSection={setSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns3DetailsofProprietorpartnersDirectors']}
              </Text>
              <BoardDirectorInfo setSection={setSection} />
              {/* <InstitutionKYMDirectorWithAffiliation /> */}
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns4AccountOperations']}
              </Text>
              <InstitutionKYMAccountDetail setSection={setSection} />
              <AccountOperationInstitution setSection={setSection} />
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns5Declaration']}
              </Text>
              <DocumentDeclarationInstitution setSection={setSection} />
              <AccountHolderDeclarationInstitution setSection={setSection} />
            </SectionContainer>
          </Box>
        </Box>
      </Container>

      <Box position="sticky" bottom="0" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <FormFooter
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
            mainButtonLabel={t['next']}
            mainButtonHandler={async () => {
              const response = await refetch();

              const sectionStatus = response?.data?.members?.institution?.overallFormStatus;

              const basicErrors = sectionStatus?.institutionDetails?.errors;
              const accountDetailsErrors = sectionStatus?.accountOperatorDetails?.map(
                (accountOperator, index) => ({
                  operatorId: String(index),
                  errors: accountOperator?.errors ?? {},
                })
              );

              const directorDetailsErrors = sectionStatus?.accountOperatorDetails?.map(
                (director, index) => ({
                  directorId: String(index),
                  errors: director?.errors ?? {},
                })
              );
              const sisterErrors = sectionStatus?.accountOperatorDetails?.map((sister, index) => ({
                sisterId: String(index),
                errors: sister?.errors ?? {},
              }));

              if (basicErrors) {
                dispatch(addInstitutionError(basicErrors));
              }
              if (accountDetailsErrors) {
                dispatch(addAccountError(accountDetailsErrors));
              }

              if (sisterErrors) {
                dispatch(addSisterError(sisterErrors));
              }
              if (directorDetailsErrors) {
                dispatch(addInstitutionDirectorError(directorDetailsErrors));
              }

              if (response) {
                dispatch(setInstitutionHasPressedNext(true));
                if (!basicErrors) {
                  router.push(`${ROUTES.CBS_MEMBER_TRANSLATION}/${router.query['id']}`);
                } else {
                  toast({
                    id: 'validation-error',
                    message: 'Some fields are empty or have error',
                    type: 'error',
                  });
                }
              }
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export default KYMInstitutionPage;
