/* eslint-disable-next-line */
import { useTranslation } from '@coop/shared/utils';
import React from 'react';
import { useRouter } from 'next/router';
import { useGetKymFormStatusQuery } from '@coop/cbs/data-access';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  Icon,
  Text,
} from '@coop/shared/ui';
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
import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccorrdianAddMember } from '@coop/myra/components';

export function KYMIndividualPage() {
  const { t } = useTranslation();

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();

  const kymFormStatusQuery = useGetKymFormStatusQuery(
    { id },
    { enabled: id !== 'undefined' }
  );
  const kymFormStatus =
    kymFormStatusQuery?.data?.members?.individual?.formState?.data
      ?.sectionStatus;

  return (
    <>
      {/* // Top Bar */}

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
              <AccorrdianAddMember
                formStatus={kymFormStatus}
                kymCurrentSection={kymCurrentSection}
              />
            </Box>

            <Box background="white" px="s20" ml="320" pt="s20" pb="120px">
              <SectionContainer>
                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymInd1PersonalInformation']}
                  </Text>
                  <ContainerWithDivider>
                    <MemberKYMBasicInfo
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <MemberKYMContactDetails
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <MemberKYMIdentificationDetails
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <MemberKYMAddress
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <MemberKYMFamilyDetails
                      setKymCurrentSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymInd2ProfessionalInformation']}
                  </Text>
                  <ContainerWithDivider>
                    <MemberKYMProfession
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <MemberKYMMainOccupation
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <MemberKYMHusbandWifeOccupation
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <MemberKYMIncomeSourceDetails
                      setKymCurrentSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymInd3COOPmembership']}
                  </Text>
                  <ContainerWithDivider>
                    <KYMBasiccoopDetails
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <KYMFinancialTransactionDetails
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <KYMEstimatedAmount
                      setKymCurrentSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymInd4Declaration']}
                  </Text>
                  <ContainerWithDivider>
                    <KYMDeclaration
                      setKymCurrentSection={setKymCurrentSection}
                    />
                    <KYMDocumentDeclaration
                      setKymCurrentSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>

                <KYMDeclarationAgree />
              </SectionContainer>
            </Box>
          </Box>
        </Box>
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

export default KYMIndividualPage;
