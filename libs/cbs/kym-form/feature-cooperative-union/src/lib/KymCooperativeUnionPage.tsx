/* eslint-disable-next-line */
import {
  useTranslation,
  getKymSectionCoOperativeUnion,
} from '@coop/shared/utils';
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
  BoardDirectorInfo,
  AccountOperatorInfo,
  AddRepresentative,
  CurrentMembers,
  KymAssestsAndtarget,
  KymEquilities,
  IncomeDetails,
  ExpenseDetails,
  KymMemberdetailsCOOP,
  DocumentDeclarationInstitutionCOOPUnion,
} from '../components';
import {
  SectionContainer,
  ContainerWithDivider,
} from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccorrdianAddCOOPUnion } from '@coop/myra/components';

export function KYMCooperativeUnionPage() {
  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();
  // const methods = useForm<IFormValues>();
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetCooperativeUnionDataMutation({});
  // const kymFormStatusQuery = useGetKymFormStatusQuery({ id });
  // const kymFormStatus =
  //   kymFormStatusQuery?.data?.members?.individual?.formState?.data
  //     ?.sectionStatus;

  const methods = useForm({
    defaultValues: {
      boardOfDirectorsDetails: [
        {
          fullName: '',
          designation: '',
          permanentStateId: '',
          permanentDistrictId: '',
          permanentVdcOrMunicId: '',
          permanentWardId: '',
          permanentLocality: '',
          isPermanentAndTemporaryAddressSame: false,
          temporaryStateId: '',
          temporaryDistrictId: '',
          temporaryVdcOrMunicId: '',
          temporaryWardId: '',
          temporaryLocality: '',
          dateOfMembership: '',
          highestQualification: '',
          contactNumber: '',
          email: '',
          citizenshipOrPassportOrLisenceNo: 0,
          subjectOfTraining: '',
          dateOfTraining: '',
          trainingOrganization: '',
          photograph: '',
          identityDocumentPhoto: '',
        },
      ],
      accountOperatorsDetails: [
        {
          fullName: '',
          designation: '',
          permanentStateId: '',
          permanentDistrictId: '',
          permanentVdcOrMunicId: '',
          permanentWardId: '',
          permanentLocality: '',
          isPermanentAndTemporaryAddressSame: false,
          temporaryStateId: '',
          temporaryDistrictId: '',
          temporaryVdcOrMunicId: '',
          temporaryWardId: '',
          temporaryLocality: '',
          dateOfMembership: '',
          highestQualification: '',
          contactNumber: '',
          email: '',
          citizenshipOrPassportOrLisenceNo: 0,
          subjectOfTraining: '',
          dateOfTraining: '',
          trainingOrganization: '',
          photograph: '',
          identityDocumentPhoto: '',
          signature: '',
        },
      ],
      // cashAndCashEquivalentCurrent: 0,
      // cashAndCashEquivalentTarget: 0,
      // bankCurrent: 0,
      // bankTarget: 0,
      // investmentsCurrent: 0,
      // investmentsTarget: 0,
      // loanCurrent: 0,
      // loanTarget: 0,
      // nonCurrentAssetsCurrent: 0,
      // nonCurrentAssetsTarget: 0,
      // otherNonCurrentAssetsCurrent: 0,
      // otherNonCurrentAssetsTarget: 0,
      totalAssetsCurrent: 0,
      totalAssetsTarget: 0,
      // shareCapitalCurrent: 0,
      // shareCapitalTarget: 0,
      // reserveAndSurplusCurrent: 0,
      // reserveAndSurplusTarget: 0,
      // savingDepositCurrent: 0,
      // savingDepositTarget: 0,
      // loanAccountCurrent: 0,
      // loanAccountTarget: 0,
      // capitalGrantCurrent: 0,
      // capitalGrantTarget: 0,
      // currentLiabilitiesCurrent: 0,
      // currentLiabilitiesTarget: 0,
      // nonCurrentLiabilitiesCurrent: 0,
      // nonCurrentLiabilitiesTarget: 0,
      // totalEquityAndLiabilitiesCurrent: 0,
      // totalEquityAndLiabilitiesTarget: 0,
      // incomeFromFinancialInvestment: 0,
      // incomeFromNonFinancialInvestment: 0,
      // incomeFromInvestment: 0,
      // incomeFromServiceOperation: 0,
      // incomeFromSales: 0,
      // otherIncome: 0,
      // miscellnousIncome: 0,
      // totalIncome: 0,
      // purchase: 0,
      // directExpense: 0,
      // administrativeExpense: 0,
      // financialCost: 0,
      // riskManangementCost: 0,
      // deferredTaxExpense: 0,
      // totalExpense: 0,
    },
  });

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
              console.log('hello', getValues());
              mutate({ id, data: getValues() });
            }, 800)}
            onSubmit={handleSubmit((data) => {
              console.log('data', data);
            })}
            onFocus={(e) => {
              const kymSection = getKymSectionCoOperativeUnion(e.target.id);

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
                  <AccorrdianAddCOOPUnion
                    // formStatus={kymFormStatus}
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
                        {/* <CurrentMemberDetails /> */}
                        <BankAccountDetails />
                        <ApplicantDetails />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        2. Details of Board Directors
                      </Text>
                      <ContainerWithDivider>
                        <BoardDirectorInfo watch={watch} control={control} />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        3. Details of Account Operators
                      </Text>
                      <ContainerWithDivider>
                        <AccountOperatorInfo watch={watch} control={control} />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        4. Details of Central Representative{' '}
                      </Text>
                      <ContainerWithDivider>
                        <AddRepresentative watch={watch} control={control} />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        5. Details of member
                      </Text>
                      <ContainerWithDivider>
                        {/* <CurrentMembers /> */}
                        <KymMemberdetailsCOOP watch={watch} />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        6. Economic Details
                      </Text>
                      <ContainerWithDivider>
                        <KymAssestsAndtarget watch={watch} />
                        <KymEquilities watch={watch} />
                        <IncomeDetails watch={watch} />
                        <ExpenseDetails watch={watch} />
                      </ContainerWithDivider>
                    </SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        7. Declaration
                      </Text>
                      <ContainerWithDivider>
                        <DocumentDeclarationInstitutionCOOPUnion />
                      </ContainerWithDivider>
                    </SectionContainer>
                  </SectionContainer>
                </Box>
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
                <Button>Next</Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default KYMCooperativeUnionPage;
