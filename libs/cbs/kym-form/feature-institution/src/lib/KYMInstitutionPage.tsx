import React from 'react';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { useGetKymFormStatusInstitutionQuery } from '@coop/cbs/data-access';
import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { AccorrdianAddInstitution } from '@coop/myra/components';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  Icon,
  Text,
} from '@coop/shared/ui';
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

export function KYMInstitutionPage() {
  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const kymFormStatusQuery = useGetKymFormStatusInstitutionQuery({ id });
  const kymFormStatus =
    kymFormStatusQuery?.data?.members?.institution?.formState?.data
      ?.sectionStatus;

  return (
    <>
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <FormHeader
            title={t['membersFormAddNewMembers']}
            closeLink="/members/list"
          />
        </Container>
      </Box>

      <Container minW="container.xl" height="fit-content">
        <Box pb="s40" display="flex" width="100%">
          <Box display="flex">
            <Box
              w={320}
              p={2}
              position="fixed"
              borderRight="1px solid #E6E6E6"
              minHeight="100%"
              bg="white"
            >
              <AccorrdianAddInstitution
                formStatus={kymFormStatus}
                kymCurrentSection={kymCurrentSection}
              />
            </Box>

            <Box background="white" ml={320} px="s20" pt="s20" pb="120px">
              <SectionContainer>
                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymIns1InformationofInstitution']}
                  </Text>
                  <ContainerWithDivider>
                    <BasicDetailsInstitution
                      setSection={setKymCurrentSection}
                    />
                    <RegisteredDetailsInstitution
                      setSection={setKymCurrentSection}
                    />
                    <OperatorOfficeAddress setSection={setKymCurrentSection} />
                    <BranchOfficeAddress setSection={setKymCurrentSection} />
                    <ContactDetailsInstitution
                      setSection={setKymCurrentSection}
                    />
                    <BankAccountDetailsInstitution
                      setSection={setKymCurrentSection}
                    />
                    <InstitutionKYMSisterConcernDetails
                      setSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymIns2TransactionProfile']}
                  </Text>
                  <ContainerWithDivider>
                    {' '}
                    <TransactionProfileInstitution
                      setSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymIns3DetailsofProprietorpartnersDirectors']}
                  </Text>
                  <ContainerWithDivider>
                    <BoardDirectorInfo setSection={setKymCurrentSection} />
                    {/* <InstitutionKYMDirectorWithAffiliation /> */}
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymIns4AccountOperations']}
                  </Text>
                  <ContainerWithDivider>
                    <InstitutionKYMAccountDetail
                      setSection={setKymCurrentSection}
                    />
                    <AccountOperationInstitution
                      setSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>
                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymIns5Declaration']}
                  </Text>
                  <ContainerWithDivider>
                    <DocumentDeclarationInstitution
                      setSection={setKymCurrentSection}
                    />
                    <AccountHolderDeclarationInstitution
                      setSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>
              </SectionContainer>
            </Box>
          </Box>
        </Box>
        {/* </form>
        </FormProvider> */}
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
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
                <Button type="submit" variant="ghost">
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
              mainButtonHandler={() =>
                router.push(`/members/translation/${id}`)
              }
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default KYMInstitutionPage;
