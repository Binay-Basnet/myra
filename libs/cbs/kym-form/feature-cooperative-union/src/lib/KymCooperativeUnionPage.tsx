/* eslint-disable-next-line */
import { useTranslation, getKymSection } from '@coop/shared/utils';
import React from 'react';
import { useRouter } from 'next/router';
import {
  useGetKymFormStatusQuery,
  useSetCooperativeUnionDataMutation,
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
  InstituteBasicInfo,
  RegisteredDetails,
  ContactDetails,
  CurrentMemberDetails,
  BankAccountDetails,
  ApplicantDetails,
} from '../components';
import {
  SectionContainer,
  ContainerWithDivider,
} from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccorrdianAddMember } from '@coop/myra/components';

export function KYMCooperativeUnionPage() {
  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();
  // const methods = useForm<IFormValues>();
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetCooperativeUnionDataMutation({
    onSuccess: (res) => {
      setError('firstName', {
        type: 'custom',
        message:
          res?.members?.cooperativeUnion?.add?.error?.error?.['firstName'][0],
      });
    },
    onError: () => {
      setError('firstName', { type: 'custom', message: 'shet' });
    },
  });
  const kymFormStatusQuery = useGetKymFormStatusQuery({ id });
  const kymFormStatus =
    kymFormStatusQuery?.data?.members?.individual?.formState?.data
      ?.sectionStatus;

  const methods = useForm();

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
              const kymSection = getKymSection(e.target.id);
              setKymCurrentSection(kymSection);
            }}
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
                  <AccorrdianAddMember
                    formStatus={kymFormStatus}
                    kymCurrentSection={kymCurrentSection}
                  />
                </Box>

                <Box background="white" ml={320} px="s20" pb="120px">
                  <SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        1. Institution Information
                      </Text>
                      <ContainerWithDivider>
                        <InstituteBasicInfo />
                        <RegisteredDetails />
                        <ContactDetails />
                        <CurrentMemberDetails />
                        <BankAccountDetails />
                        <ApplicantDetails />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        2. Professional Information
                      </Text>
                      <ContainerWithDivider>
                        {/* <MemberKYMProfession control={control} /> */}
                        {/* <MemberKYMMainOccupation
                          control={control}
                          watch={watch}
                        /> */}
                        {/* <MemberKYMHusbandWifeOccupation
                          control={control}
                          watch={watch}
                        /> */}
                        {/* <MemberKYMIncomeSourceDetails control={control} /> */}
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        3. COOP membership
                      </Text>
                      <ContainerWithDivider>
                        {/* <KYMBasiccoopDetails control={control} /> */}
                        {/* <KYMFinancialTransactionDetails control={control} /> */}
                        {/* <KYMEstimatedAmount control={control} /> */}
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        4. Declaration
                      </Text>
                      <ContainerWithDivider>
                        {/* <KYMDeclaration control={control} /> */}
                        {/* <KYMLocation control={control} /> */}
                        {/* <KYMDocumentDeclaration control={control} /> */}
                      </ContainerWithDivider>
                    </SectionContainer>

                    <Box display="flex" gap="s16" alignItems="start">
                      <Checkbox fontSize="s3">{''}</Checkbox>
                      <TextFields variant="formInput" mt="-6px">
                        I hereby declare that the information provided by me/us
                        in this form and documents provided to the co-operative
                        are true and correct. All transaction in this account
                        are from legitimate source. If found otherwise, I shall
                        bear the consequences thereof.
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
          </form>
        </FormProvider>
      </Container>
    </>
  );
}

export default KYMCooperativeUnionPage;
