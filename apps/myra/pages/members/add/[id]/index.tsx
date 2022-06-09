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
      <Box
        position="fixed"
        width="100%"
        top={0}
        zIndex={2}
        backdropFilter="saturate(180%) blur(5px)"
      ></Box>
      <Container
        minW="container.xl"
        height="fit-content"
        mt="130"
        p="0"
        pb="55px"
      >
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          px="5"
          background="white"
          borderBottom="1px solid #E6E6E6"
          borderTopRadius={5}
          boxShadow="xl"
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
        <Box display="flex" width="100%">
          <Box w={320} p={2} minHeight="100%" bg="white">
            <AccorrdianAddMember
              formStatus={kymFormStatus}
              kymCurrentSection={kymCurrentSection}
            />
          </Box>
          <Divider orientation="vertical" />
          <Box w="100%">
            <Box background="white" p="s20">
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
                    <MemberKYMMainOccupation control={control} watch={watch} />
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
        <br />
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          background="white"
          borderTopRadius={5}
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
      </Container>
    </form>
  );
};

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
