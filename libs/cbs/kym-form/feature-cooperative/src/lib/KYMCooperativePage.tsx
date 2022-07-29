/* eslint-disable-next-line */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation, getKymCoopSection } from '@coop/shared/utils';
import {
  useSetKymCooperativeDataMutation,
  KymCooperativeFormInput,
} from '@coop/shared/data-access';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Box,
  Container,
  Text,
  IconButton,
  Checkbox,
  TextFields,
  Button,
  Icon,
  FormFooter,
} from '@coop/shared/ui';
import { IoCloseOutline } from 'react-icons/io5';
import debounce from 'lodash/debounce';
import {
  KymCoopBasicInfo,
  KymCoopRegdAddress,
  KymCoopOpAddress,
  KymCoopContactDetails,
  KymCoopDate,
  KymCoopCurrentMembers,
  KymCoopRepresentative,
  KymCoopAddCoopDetails,
  KymCoopNoEmployee,
  KymEquityLiabilities,
  KymCoopAssets,
  KymAccountHolderDeclaration,
  KymCoopDocumentDeclarationForm,
  KymCoopBoardDirectorDetail,
  KymCoopAccountOperatorDetail,
} from '../components/form';
import {
  SectionContainer,
  ContainerWithDivider,
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

  // const kymFormStatusQuery = useGetKymFormStatusQuery({ id });
  // const kymFormStatus =
  //   kymFormStatusQuery?.data?.members?.individual?.formState?.data
  //     ?.sectionStatus;

  const methods = useForm<KymCooperativeFormInput>({});

  const { control, handleSubmit, getValues, watch, setError } = methods;
  return (
    <>
      {/* // Top Bar */}
      <Box position="relative" margin="0px auto">
        <Box
          position="fixed"
          margin="0px auto"
          bg="gray.100"
          width="100%"
          zIndex="10"
        >
          <Container minW="container.xl" height="fit-content">
            <Box
              height="60px"
              display="flex"
              justifyContent="space-between"
              alignItems={'center'}
              px="5"
              background="white"
              borderBottom="1px solid #E6E6E6"
            >
              <Text fontSize="r2" fontWeight="SemiBold">
                {t['membersFormAddNewMembers']}
              </Text>
              <IconButton
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoCloseOutline} size="md" />}
                onClick={() => router.push('/members/list')}
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Container minW="container.xl" height="fit-content">
        {/* main */}
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
              <AccordionKymCoopForm kymCurrentSection={kymCurrentSection} />
            </Box>

            <Box
              background="white"
              ml={320}
              px="s20"
              mt="60px"
              pt="s20"
              pb="120px"
            >
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

export default KYMCooperativePage;
