/* eslint-disable-next-line */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation, getKymCoopSection } from '@coop/shared/utils';
import {
  useSetKymCooperativeDataMutation,
  useGetKymFormStatusQuery,
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
} from '@coop/shared/ui';
import { GrClose } from 'react-icons/gr';
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
  const { mutate } = useSetKymCooperativeDataMutation({});
  // const kymFormStatusQuery = useGetKymFormStatusQuery({ id });
  // const kymFormStatus =
  //   kymFormStatusQuery?.data?.members?.individual?.formState?.data
  //     ?.sectionStatus;

  const methods = useForm<KymCooperativeFormInput>({});

  const { control, handleSubmit, getValues, watch, setError } = methods;
  return (
    <>
      {/* // Top Bar */}
      <Box position="relative" h="80px" margin="0px auto">
        <Box
          position="fixed"
          margin="0px auto"
          pt="20px"
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
              borderTopRadius="br3"
            >
              <Text fontSize="r2" fontWeight="SemiBold">
                {t.membersFormAddNewMembers}
              </Text>
              <IconButton
                variant={'ghost'}
                aria-label="close"
                icon={<GrClose />}
                onClick={() => router.back()}
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Container minW="container.xl" height="fit-content">
        <FormProvider {...methods}>
          <form
            onChange={debounce(() => {
              mutate({ id, data: getValues() });
            }, 3000)}
            onSubmit={handleSubmit((data) => {
              console.log('data', data);
            })}
            onFocus={(e) => {
              const kymSection = getKymCoopSection(e.target.id);
              setKymCurrentSection(kymSection);
            }}
          >
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

                <Box background="white" ml={320} p="s20" pb="s40">
                  <SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        1. Information of Organization
                      </Text>
                      <ContainerWithDivider>
                        <KymCoopBasicInfo />
                        <KymCoopRegdAddress watch={watch} />
                        <KymCoopOpAddress watch={watch} />
                        <KymCoopContactDetails />
                        <KymCoopCurrentMembers />
                        <KymCoopDate />
                        <KymCoopRepresentative />
                        <KymCoopAddCoopDetails />
                        <KymCoopNoEmployee />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        2. Economic Details
                      </Text>
                      <ContainerWithDivider>
                        <KymEquityLiabilities watch={watch} />
                        <KymCoopAssets watch={watch} />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        3. Details of Board Directors
                      </Text>
                      <ContainerWithDivider>
                        <KymCoopBoardDirectorDetail
                          watch={watch}
                          control={control}
                        />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        4. Details of Account Operators
                      </Text>
                      <ContainerWithDivider>
                        <KymCoopAccountOperatorDetail
                          watch={watch}
                          control={control}
                        />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        5. Declaration
                      </Text>
                      <ContainerWithDivider>
                        <KymAccountHolderDeclaration />
                        <KymCoopDocumentDeclarationForm />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <Box display="flex" gap="s16" alignItems="start">
                      <Checkbox fontSize="s3">{''}</Checkbox>
                      <TextFields variant="formInput" mt="-6px">
                        I/We hereby confirm that the information provede by
                        me/us in this form and documents provided to the Bank
                        are true and corrent. I/We further confirm that I/We
                        have read and understood to the Bank's terms and
                        conditions governing account opening/operations and
                        shall abide and be bound by present/future rules Nepal
                        Rastra Bank, Himalayan Bank Limited and Laws of the
                        country. In the event I/We fail to abide by the terms
                        and conditions, I/We shall bear the damage and/or
                        penalties resulting as a consequence thereof.
                      </TextFields>
                    </Box>
                  </SectionContainer>
                </Box>
              </Box>
            </Box>
            {/* </Box> */}

            {/* footer */}
            <Box
              minWidth="container.xl"
              height="60px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px="5"
              background="white"
              borderTopLeftRadius="br3"
              borderTopRightRadius="br3"
              bottom="0"
              position="fixed"
              boxShadow="0px -4px 60px rgba(52, 60, 70, 0.2)"
            >
              <Text>Form Details saved to draft</Text>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignSelf="center"
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignSelf="center"
                >
                  <Button mr="10px" type="submit" variant="ghost">
                    <Icon as={BiSave} color="primary.500" />
                    <Text
                      alignSelf="center"
                      color="primary.500"
                      fontWeight="Medium"
                      fontSize="s2"
                      ml="5px"
                    >
                      Save Draft
                    </Text>
                  </Button>
                </Box>
                &nbsp;
                <Button
                  onClick={() => router.push(`/members/translation/${id}`)}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box position="relative" h="80px" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100">
          <Container minW="container.xl" height="fit-content">
            <Box
              display="flex"
              height="60px"
              justifyContent="space-between"
              alignItems="center"
              background="white"
              borderTopLeftRadius="br3"
              borderTopRightRadius="br3"
              px="5"
              boxShadow="0px -4px 60px rgba(52, 60, 70, 0.2)"
            >
              <Text>Form Details saved to draft</Text>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignSelf="center"
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignSelf="center"
                >
                  <Button type="submit" variant="ghost">
                    <Icon as={BiSave} color="primary.500" />
                    <Text
                      alignSelf="center"
                      color="primary.500"
                      fontWeight="Medium"
                      fontSize="s2"
                      ml="5px"
                    >
                      Save Draft
                    </Text>
                  </Button>
                </Box>
                &nbsp;
                <Button
                  onClick={() => router.push(`/members/translation/${id}`)}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default KYMCooperativePage;
