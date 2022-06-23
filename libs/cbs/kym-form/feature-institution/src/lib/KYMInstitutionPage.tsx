import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import { useTranslation } from '@coop/shared/utils';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { AccorrdianAddInstitution } from '@coop/myra/components';
import {
  KymInsFormData,
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { getKymSectionInstitution } from '@coop/shared/utils';

import {
  AccountHolderDeclarationInstitution,
  AccountOperationInstitution,
  BankAccountDetailsInstitution,
  BasicDetailsInstitution,
  BoardDirectorInfo,
  ContactDetailsInstitution,
  DocumentDeclarationInstitution,
  InstitutionKYMAccountDetail,
  InstitutionKYMDirectorWithAffiliation,
  InstitutionKYMSisterConcernDetails,
  RegisteredDetailsInstitution,
  TransactionProfileInstitution,
} from '../components-form';

/* eslint-disable-next-line */
export interface KYMInstitutionPageProps {}

export function KYMInstitutionPage(props: KYMInstitutionPageProps) {
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

  const methods = useForm<KymInsFormData>({});
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });
  const { control, handleSubmit, getValues, watch, setError } = methods;
  return (
    <>
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
                {t['kymInsAddNewMember']}
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
            }, 800)}
            onSubmit={handleSubmit((data) => {
              console.log('data', data);
            })}
            onFocus={(e) => {
              const kymSection = getKymSectionInstitution(e.target.id);
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
                  <AccorrdianAddInstitution
                    formStatus={kymFormStatus}
                    kymCurrentSection={kymCurrentSection}
                  />
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
                        {t['kymIns1InformationofInstitution']}
                      </Text>
                      <ContainerWithDivider>
                        <BasicDetailsInstitution />
                        <RegisteredDetailsInstitution />
                        <ContactDetailsInstitution />
                        <BankAccountDetailsInstitution />
                        <InstitutionKYMSisterConcernDetails />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        {t['kymIns2TransactionProfile']}
                      </Text>
                      <ContainerWithDivider>
                        {' '}
                        <TransactionProfileInstitution />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        {t['kymIns3DetailsofProprietorpartnersDirectors']}
                      </Text>
                      <ContainerWithDivider>
                        <BoardDirectorInfo watch={watch} control={control} />
                        <InstitutionKYMDirectorWithAffiliation />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        {t['kymIns4AccountOperations']}
                      </Text>
                      <ContainerWithDivider>
                        <InstitutionKYMAccountDetail />
                        <AccountOperationInstitution />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        {t['kymIns5Declaration']}
                      </Text>
                      <ContainerWithDivider>
                        <DocumentDeclarationInstitution />
                        <AccountHolderDeclarationInstitution />
                      </ContainerWithDivider>
                    </SectionContainer>
                  </SectionContainer>
                </Box>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
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
              <Text>{t['formDetails']}</Text>
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
                      {t['saveDraft']}
                    </Text>
                  </Button>
                </Box>
                &nbsp;
                <Button
                  onClick={() => router.push(`/members/translation/${id}`)}
                >
                  {t['next']}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default KYMInstitutionPage;
