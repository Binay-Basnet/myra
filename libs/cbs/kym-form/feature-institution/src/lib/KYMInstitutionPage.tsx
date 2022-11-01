import React from 'react';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { useGetKymFormStatusInstitutionQuery } from '@coop/cbs/data-access';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { AccorrdianAddInstitution } from '@coop/myra/components';
import { Box, Button, Container, FormFooter, FormHeader, Icon, Text } from '@coop/shared/ui';
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
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const kymFormStatusQuery = useGetKymFormStatusInstitutionQuery({ id });
  const kymFormStatus =
    kymFormStatusQuery?.data?.members?.institution?.formState?.data?.sectionStatus;

  return (
    <>
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <FormHeader title={t['membersFormAddNewMembers']} closeLink="/members/list" />
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
            <AccorrdianAddInstitution
              formStatus={kymFormStatus}
              kymCurrentSection={kymCurrentSection}
            />
          </Box>

          <Box zIndex={1} background="gray.0" ml="320" pb="120px">
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns1InformationofInstitution']}
              </Text>
              <BasicDetailsInstitution setSection={setKymCurrentSection} />
              <RegisteredDetailsInstitution setSection={setKymCurrentSection} />
              <OperatorOfficeAddress setSection={setKymCurrentSection} />
              <BranchOfficeAddress setSection={setKymCurrentSection} />
              <ContactDetailsInstitution setSection={setKymCurrentSection} />
              <BankAccountDetailsInstitution setSection={setKymCurrentSection} />
              <InstitutionKYMSisterConcernDetails setSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns2TransactionProfile']}
              </Text>
              <TransactionProfileInstitution setSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns3DetailsofProprietorpartnersDirectors']}
              </Text>
              <BoardDirectorInfo setSection={setKymCurrentSection} />
              {/* <InstitutionKYMDirectorWithAffiliation /> */}
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns4AccountOperations']}
              </Text>
              <InstitutionKYMAccountDetail setSection={setKymCurrentSection} />
              <AccountOperationInstitution setSection={setKymCurrentSection} />
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymIns5Declaration']}
              </Text>
              <DocumentDeclarationInstitution setSection={setKymCurrentSection} />
              <AccountHolderDeclarationInstitution setSection={setKymCurrentSection} />
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
                <Text as="i" fontSize="r1">
                  09:41 AM
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" onClick={() => router.push('/members/list')}>
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
            mainButtonLabel={t['next']}
            mainButtonHandler={() => router.push(`/members/translation/${id}`)}
          />
        </Container>
      </Box>
    </>
  );
};

export default KYMInstitutionPage;
