/* eslint-disable-next-line */
import { getRouterQuery, useTranslation } from '@coop/shared/utils';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FormFieldSearchTerm,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useGetKymFormStatusQuery,
} from '@coop/cbs/data-access';
import { Box, Button, Container, FormFooter, FormHeader, Icon, Text } from '@coop/shared/ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccorrdianAddMember } from '@coop/myra/components';
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

  const [isMarried, setIsMarried] = useState(false);

  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();

  const kymFormStatusQuery = useGetKymFormStatusQuery({ id }, { enabled: id !== 'undefined' });
  const kymFormStatus =
    kymFormStatusQuery?.data?.members?.individual?.formState?.data?.sectionStatus;

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  const { data: maritalStatusData, refetch } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.MaritalStatus,
  });

  const maritialStatus = maritalStatusData?.form?.options?.predefined?.data;
  const marriedData = editValues?.members?.individual?.formState?.data?.formData?.maritalStatusId;

  useEffect(() => {
    refetch();
    if (marriedData && maritialStatus) {
      if (maritialStatus[0]?.id === marriedData) {
        setIsMarried(true);
      } else {
        setIsMarried(false);
      }
    }
  }, [marriedData]);

  return (
    <>
      {/* // Top Bar */}

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
            borderRight="1px solid"
            borderColor="border.layout"
            minHeight="100%"
            bg="gray.0"
            zIndex={2}
          >
            <AccorrdianAddMember formStatus={kymFormStatus} kymCurrentSection={kymCurrentSection} />
          </Box>

          <Box zIndex={1} background="gray.0" ml="320" pb="120px">
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
            mainButtonHandler={() => router.push(`/members/translation/${id}`)}
          />
        </Container>
      </Box>
    </>
  );
};

export default KYMIndividualPage;
