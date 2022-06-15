import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
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
  Checkbox,
  Container,
  Icon,
  IconButton,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

import {
  AccountHolderDeclarationInstitution,
  AccountOperationInstitution,
  BankAccountDetailsInstitution,
  BasicDetailsInstitution,
  ContactDetailsInstitution,
  DocumentDeclarationInstitution,
  InstitutionKYMAccountDetail,
  InstitutionKYMSisterConcernDetails,
  RegisteredDetailsInstitution,
  TransactionProfileInstitution,
} from '../components-form';
/* eslint-disable-next-line */
export interface KYMInstitutionPageProps {}

export function KYMInstitutionPage(props: KYMInstitutionPageProps) {
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const kymFormStatusQuery = useGetKymFormStatusInstitutionQuery({ id });
  const kymFormStatus =
    kymFormStatusQuery?.data?.members?.institution?.formState?.data
      ?.sectionStatus;

  const methods = useForm<KymInsFormData>({});
  const { mutate } = useSetInstitutionDataMutation();
  const { control, handleSubmit, getValues, watch, setError } = methods;
  return (
    <>
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
                Add New Member
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
          // onChange={debounce(() => {
          //   mutate({ id, data: getValues() });
          // }, 3000)}
          // onSubmit={handleSubmit((data) => {
          //   console.log('data', data);
          // })}
          // onFocus={(e) => {
          //   const kymSection = getKymSection(e.target.id);
          //   setKymCurrentSection(kymSection);
          // }}
          >
            {/* main */}
            <Box display="flex" width="100%">
              <Box display="flex">
                <Box
                  w={320}
                  p={2}
                  position="fixed"
                  borderRight="1px solid #E6E6E6"
                  minHeight="100%"
                  bg="white"
                >
                  <AccorrdianAddInstitution />
                </Box>

                <Box background="white" ml={320} p="s20" pb="120px">
                  <SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        1. Information of Institution
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
                        2. Transaction Profile
                      </Text>
                      <ContainerWithDivider>
                        {' '}
                        <TransactionProfileInstitution />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        3. Details of Proprietor, partners, Directors
                      </Text>
                      <ContainerWithDivider>
                        Happy New Year
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        4. Account Operations
                      </Text>
                      <ContainerWithDivider>
                        <InstitutionKYMAccountDetail />
                        <AccountOperationInstitution />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        5. Declaration
                      </Text>
                      <ContainerWithDivider>
                        <DocumentDeclarationInstitution />
                        <AccountHolderDeclarationInstitution />
                      </ContainerWithDivider>
                    </SectionContainer>
                  </SectionContainer>
                </Box>
              </Box>
              <Box
                minW="container.xl"
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
                  alignItems="center"
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
                  &nbsp;
                  <Button>Next</Button>
                </Box>
              </Box>
            </Box>

            {/* </Box> */}
          </form>
        </FormProvider>
      </Container>
    </>
  );
}

export default KYMInstitutionPage;
