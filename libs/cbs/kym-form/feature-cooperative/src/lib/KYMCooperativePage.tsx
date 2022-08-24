/* eslint-disable-next-line */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@coop/shared/utils';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormFooter,
  FormHeader,
  Icon,
  Text,
  TextFields,
} from '@coop/shared/ui';
import {
  KymAccountHolderDeclaration,
  KymCoopAccountOperatorDetail,
  KymCoopAddCoopDetails,
  KymCoopAssets,
  KymCoopBasicInfo,
  KymCoopBoardDirectorDetail,
  KymCoopContactDetails,
  KymCoopCurrentMembers,
  KymCoopDate,
  KymCoopDocumentDeclarationForm,
  KymCoopNoEmployee,
  KymCoopOpAddress,
  KymCoopRegdAddress,
  KymCoopRepresentative,
  KymEquityLiabilities,
} from '../components/form';
import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccordionKymCoopForm } from '@coop/myra/components';

export function KYMCooperativePage() {
  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = useState<{
    section: string;
    subSection: string;
  }>();

  const router = useRouter();
  const id = String(router?.query?.['id']);

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
              borderRight="1px solid"
              borderColor="border.layout"
              minHeight="100%"
              bg="white"
            >
              <AccordionKymCoopForm kymCurrentSection={kymCurrentSection} />
            </Box>

            <Box background="white" ml={320} px="s20" pt="s20" pb="120px">
              <SectionContainer>
                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymCoop1InformationofOrganization']}
                  </Text>
                  <ContainerWithDivider>
                    <KymCoopBasicInfo setSection={setKymCurrentSection} />
                    <KymCoopRegdAddress setSection={setKymCurrentSection} />
                    <KymCoopOpAddress setSection={setKymCurrentSection} />
                    <KymCoopContactDetails setSection={setKymCurrentSection} />
                    <KymCoopCurrentMembers setSection={setKymCurrentSection} />
                    <KymCoopDate setSection={setKymCurrentSection} />
                    <KymCoopRepresentative setSection={setKymCurrentSection} />
                    <KymCoopAddCoopDetails setSection={setKymCurrentSection} />
                    <KymCoopNoEmployee setSection={setKymCurrentSection} />
                  </ContainerWithDivider>
                </SectionContainer>
                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymCoop2EconomicDetails']}
                  </Text>
                  <ContainerWithDivider>
                    <KymEquityLiabilities setSection={setKymCurrentSection} />
                    <KymCoopAssets setSection={setKymCurrentSection} />
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymCoop3DetailsofBoardDirectors']}
                  </Text>
                  <ContainerWithDivider>
                    <KymCoopBoardDirectorDetail
                      setSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>
                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymCoop4DetailsofAccountOperators']}
                  </Text>
                  <ContainerWithDivider>
                    <KymCoopAccountOperatorDetail
                      setSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>
                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    {t['kymCoop5Declaration']}
                  </Text>
                  <ContainerWithDivider>
                    <KymAccountHolderDeclaration
                      setSection={setKymCurrentSection}
                    />
                    <KymCoopDocumentDeclarationForm
                      setSection={setKymCurrentSection}
                    />
                  </ContainerWithDivider>
                </SectionContainer>
                <Box display="flex" gap="s16" alignItems="start">
                  <Checkbox fontSize="s3">{''}</Checkbox>
                  <TextFields variant="formInput" mt="-6px">
                    I/We hereby confirm that the information provede by me/us in
                    this form and documents provided to the Bank are true and
                    corrent. I/We further confirm that I/We have read and
                    understood to the Bank's terms and conditions governing
                    account opening/operations and shall abide and be bound by
                    present/future rules Nepal Rastra Bank, Himalayan Bank
                    Limited and Laws of the country. In the event I/We fail to
                    abide by the terms and conditions, I/We shall bear the
                    damage and/or penalties resulting as a consequence thereof.
                  </TextFields>
                </Box>
              </SectionContainer>
            </Box>
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
}

export default KYMCooperativePage;
