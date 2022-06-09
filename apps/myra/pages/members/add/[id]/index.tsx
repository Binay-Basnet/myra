import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import {
  AccorrdianAddMember,
  ContainerWithDivider,
  KYMBasiccoopDetails,
  KYMDeclaration,
  KYMDocumentDeclaration,
  KYMEstimatedAmount,
  KYMFinancialTransactionDetails,
  KYMLocation,
  MemberKYMAddress,
  MemberKYMBasicInfo,
  MemberKYMContactDetails,
  MemberKYMFamilyDetails,
  MemberKYMHusbandWifeOccupation,
  MemberKYMIdentificationDetails,
  MemberKYMIncomeSourceDetails,
  MemberKYMMainOccupation,
  MemberKYMProfession,
  SectionContainer,
} from '@coop/myra/components';
import {
  KymIndMemberInput,
  useGetKymFormStatusQuery,
  useSetMemberDataMutation,
} from '@coop/myra/graphql';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  IconButton,
  MainLayout,
  Text,
  TextFields,
} from '@coop/myra/ui';
import { getKymSection, useTranslation } from '@coop/myra/util';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

const AddMember = () => {
  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = React.useState();
  // const methods = useForm<IFormValues>();
  const router = useRouter();
  const id = String(router?.query?.id);
  const { mutate } = useSetMemberDataMutation({
    onSuccess: () => {
      setError('firstName', { type: 'custom', message: 'gg' });
      setError('middleName', { type: 'custom', message: 'kkkk' });
    },
    onError: () => {
      setError('firstName', { type: 'custom', message: 'gg' });
      setError('middleName', { type: 'custom', message: 'kkkk' });
    },
  });
  const kymFormStatusQuery = useGetKymFormStatusQuery({ id });
  const kymFormStatus =
    kymFormStatusQuery?.data?.members?.individual?.formState?.data
      ?.sectionStatus;

  const { control, handleSubmit, getValues, watch, setError } =
    useForm<KymIndMemberInput>({
      defaultValues: {
        familyDetails: [{ relationshipId: '', fullName: '' }],
        mainOccupation: [
          {
            occupation: '',
            orgName: '',
            idNumber: '',
            address: '',
            estimatedAnnualIncome: 0,
          },
        ],
        spouseOccupation: [
          {
            occupation: '',
            orgName: '',
            idNumber: '',
            address: '',
            estimatedAnnualIncome: 0,
          },
        ],
        incomeSourceDetails: [
          {
            source: '',
            amount: 0,
          },
        ],
        familyMemberInThisCooperative: [
          {
            relationshipId: '',
            memberId: '',
          },
        ],
      },
    });

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
              borderTopRadius={5}
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
        <form
          onChange={debounce(() => {
            mutate({ id, data: getValues() });
          }, 3000)}
          onSubmit={handleSubmit((data) => {
            console.log('data', data);
          })}
          onFocus={(e) => {
            console.log('event', e.target.id);
            setKymCurrentSection(getKymSection(e.target.id));
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
                <AccorrdianAddMember
                  formStatus={kymFormStatus}
                  kymCurrentSection={kymCurrentSection}
                />
              </Box>

              <Box background="white" ml={320} p="s20" pb="s40">
                <SectionContainer>
                  <SectionContainer>
                    <Text fontSize="r3" fontWeight="600">
                      1. Personal Information
                    </Text>
                    <ContainerWithDivider>
                      <MemberKYMBasicInfo control={control} />
                      <MemberKYMContactDetails control={control} />
                      <MemberKYMIdentificationDetails control={control} />
                      <MemberKYMAddress control={control} watch={watch} />
                      <MemberKYMFamilyDetails control={control} />
                    </ContainerWithDivider>
                  </SectionContainer>

                  <SectionContainer>
                    <Text fontSize="r3" fontWeight="600">
                      2. Professional Information
                    </Text>
                    <ContainerWithDivider>
                      <MemberKYMProfession control={control} />
                      <MemberKYMMainOccupation
                        control={control}
                        watch={watch}
                      />
                      <MemberKYMHusbandWifeOccupation
                        control={control}
                        watch={watch}
                      />
                      <MemberKYMIncomeSourceDetails control={control} />
                    </ContainerWithDivider>
                  </SectionContainer>

                  <SectionContainer>
                    <Text fontSize="r3" fontWeight="600">
                      3. COOP membership
                    </Text>
                    <ContainerWithDivider>
                      <KYMBasiccoopDetails control={control} />
                      <KYMFinancialTransactionDetails control={control} />
                      <KYMEstimatedAmount control={control} />
                    </ContainerWithDivider>
                  </SectionContainer>

                  <SectionContainer>
                    <Text fontSize="r3" fontWeight="600">
                      4. Declaration
                    </Text>
                    <ContainerWithDivider>
                      <KYMDeclaration control={control} />
                      <KYMLocation control={control} />
                      <KYMDocumentDeclaration control={control} />
                    </ContainerWithDivider>
                  </SectionContainer>

                  <Box display="flex" gap="s16" alignItems="start">
                    <Checkbox fontSize="s3">{''}</Checkbox>
                    <TextFields variant="formInput" mt="-6px">
                      I hereby declare that the information provided by me/us in
                      this form and documents provided to the co-operative are
                      true and correct. All transaction in this account are from
                      legitimate source. If found otherwise, I shall bear the
                      consequences thereof.
                    </TextFields>
                  </Box>
                </SectionContainer>
              </Box>
            </Box>
          </Box>
          {/* </Box> */}

          {/* footer */}
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
            <Box>
              <Button type="submit" variant="ghost">
                Save Draft
              </Button>
              &nbsp;
              <Button onClick={() => router.push(`/members/translation/${id}`)}>
                Next
              </Button>
            </Box>
          </Box>
        </form>{' '}
        <Box position="relative" width="100%" h="80px">
          <Box
            position="fixed"
            margin="0px auto"
            pt="20px"
            bg="gray.100"
            width={1248}
            // zIndex="200"
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
                borderTopRadius={5}
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
      </Container>
    </>
  );
};

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
