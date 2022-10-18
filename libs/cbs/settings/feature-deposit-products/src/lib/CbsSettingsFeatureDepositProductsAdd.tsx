import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  CriteriaSection,
  DepositFrequency as DepositFreq,
  DepositProductInput,
  Frequency,
  FrequencyTenure,
  KymMemberTypesEnum,
  NatureOfDepositProduct,
  ServiceType,
  useGetDepositProductSettingsEditDataQuery,
  useSetDepositProductMutation,
} from '@coop/cbs/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  AccountCloseServices,
  AccountOpenServices,
  AllowedTransaction,
  BalanceLimit,
  Critera,
  DefaultAccountName,
  DepositFrequency,
  DormantSetup,
  FixedDepositAmount,
  GridItems,
  Interest,
  LadderRate,
  MandatoryProduct,
  Penalty,
  PostingFrequency,
  PrematuredPenalty,
  Product,
  ProductCode,
  Questions,
  Rebate,
  RequiredDocumentSetup,
  Tenure,
  TransactionLimit,
  TypesOfMember,
  WithdrawPenalty,
} from '../components/form';

type SelectOption = {
  label: string;
  value: string;
}[];

type DepositForm = Omit<
  DepositProductInput,
  | 'genderId'
  | 'maritalStatusId'
  | 'educationQualification'
  | 'occupation'
  | 'ethnicity'
  | 'natureOFBusinessCoop'
  | 'natureOfBusinessInstitution'
> & {
  genderId: SelectOption;
  maritalStatusId: SelectOption;
  educationQualification: SelectOption;
  occupation: SelectOption;
  ethnicity: SelectOption;
  natureOFBusinessCoop: SelectOption;
  natureOfBusinessInstitution: SelectOption;
  chequeCharge: ServiceType[];
  atmCharge: ServiceType[];
};

export const SettingsDepositProductsAdd = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const id = String(router?.query?.['id']);

  const { mutateAsync } = useSetDepositProductMutation();

  const methods = useForm<DepositForm>({
    defaultValues: {
      depositFrequency: Frequency.Daily,
      transactionAllowed: DepositFreq.Monthly,
      isTenureApplicable: false,
      penalty: false,
      rebate: false,
      postingFrequency: DepositFreq.Monthly,
      autoOpen: false,
      staffProduct: false,
      isForMinors: false,
      atmFacility: false,
      chequeIssue: false,
      allowLoan: false,
      supportMultiple: false,
      withdrawRestricted: false,
      wealthBuildingProduct: false,
      ladderRate: false,
      isMandatorySaving: false,
      alternativeChannels: false,
      tenureUnit: FrequencyTenure.Day,
    },
  });

  const { getValues, watch, reset, resetField } = methods;
  const criteria = watch('criteria');
  const chequeIssue = watch('chequeIssue');
  const penalty = watch('penalty');
  const rebate = watch('rebate');
  const atmFacility = watch('atmFacility');
  const allowLoan = watch('allowLoan');
  const depositNature = watch('nature');
  const ladderRate = watch('ladderRate');
  const typesOfMember = watch('typeOfMember');
  const withdrawRestricted = watch('withdrawRestricted');
  const isMandatorySaving = watch('isMandatorySaving');
  const isTenureApplicable = watch('isTenureApplicable');

  const submitForm = () => {
    const values = getValues();

    const genderList = criteria?.includes(CriteriaSection.Gender)
      ? values?.genderId?.map((data) => data?.value ?? data)
      : null;
    const maritalStatusList = criteria?.includes(CriteriaSection.MaritalStatus)
      ? values?.maritalStatusId?.map((data) => data?.value ?? data)
      : null;
    const educationQualificationList = criteria?.includes(CriteriaSection.EducationQualification)
      ? values?.educationQualification?.map((data) => data?.value ?? data)
      : null;
    const occupationList = criteria?.includes(CriteriaSection.OccupationDetails)
      ? values?.occupation?.map((data) => data?.value ?? data)
      : null;
    const ethnicityList = criteria?.includes(CriteriaSection.Ethnicity)
      ? values?.ethnicity?.map((data) => data?.value ?? data)
      : null;
    const natureOFBusinessCoopList = criteria?.includes(CriteriaSection.NatureOfBusinessCoopunion)
      ? values?.natureOFBusinessCoop?.map((data) => data?.value ?? data)
      : null;
    const natureOfBusinessInstitutionList = criteria?.includes(
      CriteriaSection.NatureOfBusinessInstitutions
    )
      ? values?.natureOfBusinessInstitution?.map((data) => data?.value ?? data)
      : null;
    const coopTypeList = criteria?.includes(CriteriaSection.CooperativeType)
      ? values?.cooperativeType?.map((data) => data)
      : null;

    const ladderRateDataList = ladderRate
      ? values?.ladderRateData?.map((data) => ({
          type: data?.type,
          rate: data?.rate,
          amount: data?.amount.toString(),
        }))
      : null;

    const serviceChargeList = values?.serviceCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const accountCloseChargeList = values?.accountCloseCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const chequeChargeList = chequeIssue
      ? values?.chequeCharge?.map((data) => ({
          serviceName: data?.serviceName,
          ledgerName: data?.ledgerName,
          amount: data?.amount.toString(),
        }))
      : null;

    const atmChargeList = atmFacility
      ? values?.atmCharge?.map((data) => ({
          serviceName: data?.serviceName,
          ledgerName: data?.ledgerName,
          amount: data?.amount.toString(),
        }))
      : null;

    const updatedData = {
      ...values,
      genderId: genderList,
      maritalStatusId: maritalStatusList,
      educationQualification: educationQualificationList,
      ethnicity: ethnicityList,
      occupation: occupationList,
      natureOfBusinessInstitution: natureOfBusinessInstitutionList,
      natureOFBusinessCoop: natureOFBusinessCoopList,
      cooperativeType: coopTypeList,
      ladderRateData: ladderRateDataList,
      serviceCharge: serviceChargeList,
      accountCloseCharge: accountCloseChargeList,
      chequeCharge: chequeChargeList,
      atmCharge: atmChargeList,
      specifyWithdrawRestriction: withdrawRestricted ? values?.specifyWithdrawRestriction : null,
      transactionAllowed:
        depositNature !== NatureOfDepositProduct.TermSavingOrFd && values?.transactionAllowed
          ? values?.transactionAllowed
          : null,
      tenureUnit: values?.tenureUnit && isTenureApplicable ? values?.tenureUnit : null,
      maxTenureUnitNumber:
        values?.maxTenureUnitNumber && isTenureApplicable ? values?.maxTenureUnitNumber : null,
      minTenureUnitNumber:
        values?.minTenureUnitNumber && isTenureApplicable ? values?.minTenureUnitNumber : null,
      depositFrequency:
        depositNature === NatureOfDepositProduct.RecurringSaving || isMandatorySaving
          ? values?.depositFrequency
          : null,
      postingFrequency: values?.postingFrequency ? values?.postingFrequency : null,
      accountType: values?.accountType ? values?.accountType : null,
      interest: {
        additionalRate: values?.interest?.additionalRate ?? null,
        boardAuthority: values?.interest?.boardAuthority ?? null,
        ceoAuthority: values?.interest?.ceoAuthority ?? null,
        defaultRate: values?.interest?.defaultRate ?? null,
        maxRate: values?.interest?.maxRate ?? null,
        minRate: values?.interest?.minRate ?? null,
      },
      penaltyData: {
        dayAfterInstallmentDate: penalty ? values?.penaltyData?.dayAfterInstallmentDate : null,
        penaltyAmount: penalty ? values?.penaltyData?.penaltyAmount : null,
        penaltyRate: penalty ? values?.penaltyData?.penaltyRate : null,
        // penaltyLedgerMapping: penalty ? values?.penaltyData?.penaltyLedgerMapping : null,
      },
      rebateData: {
        dayBeforeInstallmentDate: rebate ? values?.rebateData?.dayBeforeInstallmentDate : null,
        noOfInstallment: rebate ? values?.rebateData?.noOfInstallment : null,
        rebateRate: rebate ? values?.rebateData?.rebateRate : null,
        rebateAmount: rebate ? values?.rebateData?.rebateAmount : null,
        rebateLedgerMapping: rebate ? values?.rebateData?.rebateLedgerMapping : null,
      },
      maxAge:
        values?.maxAge && criteria?.includes(CriteriaSection.Age) ? Number(values?.maxAge) : null,
      minAge:
        values?.minAge && criteria?.includes(CriteriaSection.Age) ? Number(values?.minAge) : null,
      maxPostingFreqDifference: values?.maxPostingFreqDifference ?? null,
      percentageOfDeposit: allowLoan ? values?.percentageOfDeposit : null,
      depositAmount: {
        maxAmount: values?.depositAmount?.maxAmount ?? null,
        minAmount: values?.depositAmount?.minAmount ?? null,
      },
      withdrawAmountLimit: {
        maxAmount: values?.withdrawAmountLimit?.maxAmount ?? null,
        minAmount: values?.withdrawAmountLimit?.minAmount ?? null,
      },
      fixedDepositAmountLimit: {
        maxAmount: values?.fixedDepositAmountLimit?.maxAmount ?? null,
        minAmount: values?.fixedDepositAmountLimit?.minAmount ?? null,
      },
      balanceLimit: {
        avgAmount: values?.balanceLimit?.avgAmount ?? null,
        maxAmount: values?.balanceLimit?.maxAmount ?? null,
        minAmount: values?.balanceLimit?.minAmount ?? null,
      },
      prematurePenalty: {
        ...values?.prematurePenalty,
        penaltyDateType: values?.prematurePenalty?.penaltyDateType
          ? values?.prematurePenalty?.penaltyDateType
          : null,
      },
    };

    asyncToast({
      id: 'deposit-id',
      msgs: {
        success: 'New Product Added',
        loading: 'Adding New Deposit',
      },
      onSuccess: () => router.push('/settings/general/deposit-products'),
      promise: mutateAsync({ id, data: updatedData as DepositProductInput }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof DepositProductInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  const { data: editValues, refetch } = useGetDepositProductSettingsEditDataQuery(
    {
      id,
    },
    {
      staleTime: 0,
    }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.settings?.general?.depositProduct?.formState?.data;

      if (editValueData) {
        reset({
          ...(editValueData as unknown as DepositForm),
        });
      }
    }
  }, [editValues, id]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    resetField('minAge');
    resetField('maxAge');
    resetField('genderId');
    resetField('maritalStatusId');
    resetField('educationQualification');
    resetField('ethnicity');
    resetField('occupation');
    resetField('natureOfBusinessInstitution');
    resetField('foreignEmployment');
    resetField('cooperativeType');
    resetField('natureOFBusinessCoop');
    resetField('typeOfMember');
    resetField('criteria');
  }, [JSON.stringify(depositNature)]);

  return (
    <>
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title={t['depositProductAddDepositProducts']} />
        </Container>
      </Box>
      <Container bg="white" height="fit-content" minW="container.lg" pb="120px" paddingInline="0">
        <FormProvider {...methods}>
          <form>
            <Box>
              <Product />
              <ProductCode />
              <TypesOfMember />

              <Box display="flex" flexDirection="column" gap="s16">
                {typesOfMember && <Critera />}
                <GridItems />
              </Box>

              {depositNature !== NatureOfDepositProduct.TermSavingOrFd && <BalanceLimit />}

              {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                depositNature === NatureOfDepositProduct.Saving) && <AllowedTransaction />}

              {depositNature === NatureOfDepositProduct.RecurringSaving && <DepositFrequency />}

              {depositNature !== NatureOfDepositProduct.TermSavingOrFd && <TransactionLimit />}

              {depositNature === NatureOfDepositProduct.Saving && <MandatoryProduct />}

              {depositNature === NatureOfDepositProduct.Saving && isMandatorySaving && (
                <DepositFrequency />
              )}

              {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                (depositNature === NatureOfDepositProduct.Saving && isMandatorySaving)) && (
                <>
                  {/* <DepositAmount /> */}
                  <Penalty />
                  <Rebate />
                </>
              )}

              {depositNature === NatureOfDepositProduct.TermSavingOrFd && <FixedDepositAmount />}

              {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                depositNature === NatureOfDepositProduct.TermSavingOrFd) && <Tenure />}

              {((depositNature === NatureOfDepositProduct.RecurringSaving && isTenureApplicable) ||
                (depositNature === NatureOfDepositProduct.TermSavingOrFd &&
                  isTenureApplicable)) && <DefaultAccountName />}

              {depositNature !== NatureOfDepositProduct.Current && (
                <>
                  <Interest />
                  <PostingFrequency />
                </>
              )}

              <AccountOpenServices />
              <AccountCloseServices />

              <Questions />

              {depositNature === NatureOfDepositProduct.Saving && <LadderRate />}

              {(depositNature === NatureOfDepositProduct.Current ||
                depositNature === NatureOfDepositProduct.Saving) && <DormantSetup />}

              {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                depositNature === NatureOfDepositProduct.TermSavingOrFd) && <PrematuredPenalty />}

              {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                depositNature === NatureOfDepositProduct.TermSavingOrFd) && <WithdrawPenalty />}

              {(typesOfMember?.includes(KymMemberTypesEnum.Individual) ||
                typesOfMember?.includes(KymMemberTypesEnum.Institution) ||
                typesOfMember?.includes(KymMemberTypesEnum.Cooperative) ||
                typesOfMember?.includes(KymMemberTypesEnum.CooperativeUnion)) && (
                <RequiredDocumentSetup />
              )}
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text color="neutralColorLight.Gray-60" fontWeight="Regular" as="i" fontSize="r1">
                    {t['depositProductPressCompletetosaveform']}
                  </Text>
                </Box>
              }
              mainButtonLabel={t['complete']}
              mainButtonHandler={() => submitForm()}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SettingsDepositProductsAdd;
