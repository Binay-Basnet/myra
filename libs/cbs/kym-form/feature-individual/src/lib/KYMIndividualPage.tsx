/* eslint-disable-next-line */
import {useTranslation} from '@coop/shared/utils';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {
  FormFieldSearchTerm,
  reset,
  RootState,
  useAppDispatch,
  useAppSelector,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useGetKymFormStatusQuery,
} from '@coop/cbs/data-access';
import {Box, Container, FormHeader, Text} from '@coop/shared/ui';
import {SectionContainer} from '@coop/cbs/kym-form/ui-containers';
import {AccorrdianAddMember} from '@coop/cbs/kym-form/formElements';
import {
  KYMBasiccoopDetails,
  KYMDeclaration,
  KYMDeclarationAgree,
  KYMDocumentDeclaration,
  KYMEstimatedAmount,
  KYMFinancialTransactionDetails,
  KymIndividualFooter,
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
  const {t} = useTranslation();
  const router = useRouter();
  const id = String(router?.query?.['id']);

  const [isMarried, setIsMarried] = useState(false);

  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();

  const kymFormStatusQuery = useGetKymFormStatusQuery({id}, {enabled: id !== 'undefined'});
  const kymFormStatus = kymFormStatusQuery?.data?.members?.individual?.formState?.sectionStatus;

  const {data: editValues, refetch: refetchEdit} = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    {enabled: !!id}
  );

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetchEdit();
  }, [preference?.date]);

  const {data: maritalStatusData, refetch} = useGetIndividualKymOptionsQuery({
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <>
      {/* // Top Bar */}

      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <FormHeader title={t['membersFormAddNewMembers']} closeLink="/members/list"/>
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
            <AccorrdianAddMember formStatus={kymFormStatus} kymCurrentSection={kymCurrentSection}/>
          </Box>

          <Box zIndex={1} background="gray.0" ml="320" pb="120px">
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymInd1PersonalInformation']}
              </Text>
              <MemberKYMBasicInfo setKymCurrentSection={setKymCurrentSection}/>
              <MemberKYMContactDetails setKymCurrentSection={setKymCurrentSection}/>
              <MemberKYMIdentificationDetails setKymCurrentSection={setKymCurrentSection}/>
              <MemberKYMAddress setKymCurrentSection={setKymCurrentSection}/>
              <MemberKYMFamilyDetails setKymCurrentSection={setKymCurrentSection}/>
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymInd2ProfessionalInformation']}
              </Text>
              <MemberKYMProfession setKymCurrentSection={setKymCurrentSection}/>
              <MemberKYMMainOccupation setKymCurrentSection={setKymCurrentSection}/>
              {isMarried && (
                <MemberKYMHusbandWifeOccupation setKymCurrentSection={setKymCurrentSection}/>
              )}

              <MemberKYMIncomeSourceDetails setKymCurrentSection={setKymCurrentSection}/>
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymInd3COOPmembership']}
              </Text>
              <KYMBasiccoopDetails setKymCurrentSection={setKymCurrentSection}/>
              <KYMFinancialTransactionDetails setKymCurrentSection={setKymCurrentSection}/>
              <KYMEstimatedAmount setKymCurrentSection={setKymCurrentSection}/>
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymInd4Declaration']}
              </Text>
              <KYMDeclaration setKymCurrentSection={setKymCurrentSection}/>
              <KYMDocumentDeclaration setKymCurrentSection={setKymCurrentSection}/>
            </SectionContainer>

            <KYMDeclarationAgree/>
          </Box>
        </Box>
      </Container>

      <Box position="sticky" bottom="0" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <KymIndividualFooter/>
        </Container>
      </Box>
    </>
  );
};

export default KYMIndividualPage;
