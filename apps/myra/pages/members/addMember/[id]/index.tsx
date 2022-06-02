import React from 'react';
import { useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import {
  AccorrdianAddMember,
  ContainerWithDivider,
  KYMBasicSaccosDetails,
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
} from '@saccos/myra/components';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Navbar,
  TabMenu,
  Text,
  TextFields,
} from '@saccos/myra/ui';
import { useTranslation } from '@saccos/myra/util';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

// import { useSetMemberDataMutation } from '../../../../generated/graphql';

const Header = ({ t }) => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const AddMember = () => {
  const { t } = useTranslation();
  // const methods = useForm<IFormValues>();
  const router = useRouter();
  console.log('hello', router);
  // const id = router?.query?.id;
  // const setMembers = useSetMemberDataMutation();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      familyDetails: [{ relationshipId: '', fullName: '' }],
      mainOccupation: [
        {
          occupation: '',
          orgName: '',
          idNumber: '',
          address: '',
          estimatedAnnualIncome: '',
        },
      ],
      spouceOccupation: [
        {
          occupation: '',
          orgName: '',
          idNumber: '',
          address: '',
          estimatedAnnualIncome: '',
        },
      ],
      incomeSourceDetails: [
        {
          source: '',
          amount: '',
        },
      ],
    },
  });

  return (
    <form
      onChange={debounce(() => {
        console.log('values', getValues());
      }, 3000)}
      onSubmit={handleSubmit((data) => console.log('data', data))}
    >
      <Box
        position="fixed"
        width="100%"
        top={0}
        zIndex={2}
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Header t={t} />
      </Box>
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
          <GrClose size="14px" color="#91979F" />
        </Box>
        <Box display="flex" width="100%">
          <Box w={320} p={2} minHeight="100%" bg="white">
            <AccorrdianAddMember />
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
                    <MemberKYMAddress control={control} />
                    <MemberKYMFamilyDetails control={control} />
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    2. Professional Information
                  </Text>
                  <ContainerWithDivider>
                    <MemberKYMProfession control={control} />
                    <MemberKYMMainOccupation control={control} />
                    <MemberKYMHusbandWifeOccupation control={control} />
                    <MemberKYMIncomeSourceDetails control={control} />
                  </ContainerWithDivider>
                </SectionContainer>

                <SectionContainer>
                  <Text fontSize="r3" fontWeight="600">
                    3. SACCOS membership
                  </Text>
                  <ContainerWithDivider>
                    <KYMBasicSaccosDetails control={control} />
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
            <Button>Next</Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
};

export default AddMember;
